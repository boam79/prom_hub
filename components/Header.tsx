'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            PromHub
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="text-gray-700 hover:text-blue-600">
              마켓플레이스
            </Link>
            <Link href="/sell" className="text-gray-700 hover:text-blue-600">
              판매하기
            </Link>
            {user && (
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                대시보드
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {loading ? (
              <div className="px-4 py-2">로딩 중...</div>
            ) : user ? (
              <>
                <span className="text-gray-700">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 hover:text-red-600"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
