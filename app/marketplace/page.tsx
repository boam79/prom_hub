import Header from '@/components/Header'
import PromptCard from '@/components/PromptCard'

async function getPrompts() {
  const supabase = await import('@/lib/supabase/server').then(m => m.createClient())
  
  const { data, error } = await supabase
    .from('prompts')
    .select(`
      *,
      profiles:profiles!prompts_seller_id_fkey(username)
    `)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching prompts:', error)
    return []
  }

  return data || []
}

export default async function MarketplacePage() {
  const prompts = await getPrompts()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            프롬프트 둘러보기
          </h1>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="프롬프트 검색..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">전체 모델</option>
              <option value="chatgpt">ChatGPT</option>
              <option value="midjourney">Midjourney</option>
              <option value="dalle">DALL-E</option>
              <option value="gemini">Gemini</option>
            </select>
          </div>
        </div>

        {prompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">아직 프롬프트가 없습니다.</p>
            <a href="/sell" className="mt-4 inline-block text-blue-600 hover:underline">
              첫 번째 프롬프트를 만들어보세요!
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {prompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
