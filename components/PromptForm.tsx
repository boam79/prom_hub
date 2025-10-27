'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './AuthProvider'

export default function PromptForm() {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    price: '',
    ai_model: 'chatgpt',
    category: 'art-illustration',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setError('로그인이 필요합니다')
      router.push('/login')
      return
    }

    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      
      // 카테고리 가져오기
      const { data: categories } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', formData.category)
        .single()

      const categoryId = categories?.id || null

      // 프롬프트 생성
      const { data, error: createError } = await supabase
        .from('prompts')
        .insert({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          price: parseFloat(formData.price),
          ai_model: formData.ai_model,
          category: categoryId,
          seller_id: user.id,
        })
        .select()
        .single()

      if (createError) {
        setError(createError.message)
        setLoading(false)
        return
      }

      // 성공 시 마켓플레이스로 이동
      router.push('/marketplace')
    } catch (err) {
      setError('프롬프트 생성 중 오류가 발생했습니다')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          제목
        </label>
        <input
          type="text"
          id="title"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          설명
        </label>
        <textarea
          id="description"
          required
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          프롬프트 내용
        </label>
        <textarea
          id="content"
          required
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            카테고리
          </label>
          <select
            id="category"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="art-illustration">아트 & 일러스트</option>
            <option value="logo-icon">로고 & 아이콘</option>
            <option value="graphic-design">그래픽 & 디자인</option>
            <option value="productivity-writing">생산성 & 글쓰기</option>
            <option value="marketing-business">마케팅 & 비즈니스</option>
            <option value="photography">사진</option>
            <option value="games-3d">게임 & 3D</option>
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            가격 ($)
          </label>
          <input
            type="number"
            id="price"
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="ai_model" className="block text-sm font-medium text-gray-700 mb-1">
            AI 모델
          </label>
          <select
            id="ai_model"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.ai_model}
            onChange={(e) => setFormData({ ...formData, ai_model: e.target.value })}
          >
            <option value="chatgpt">ChatGPT</option>
            <option value="midjourney">Midjourney</option>
            <option value="dalle">DALL-E</option>
            <option value="gemini">Gemini</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? '게시 중...' : '프롬프트 게시'}
      </button>
    </form>
  )
}

