'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'

function PaymentFailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const errorCode = searchParams.get('code')
  const errorMessage = searchParams.get('message')

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold mb-4 text-red-600">결제 실패</h1>
        {errorCode && (
          <p className="text-gray-600 mb-2">오류 코드: {errorCode}</p>
        )}
        {errorMessage && (
          <p className="text-gray-600 mb-6">{errorMessage}</p>
        )}
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  )
}

export default function PaymentFailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h1 className="text-2xl font-bold mb-2">로딩 중...</h1>
          </div>
        </div>
      }>
        <PaymentFailContent />
      </Suspense>
    </div>
  )
}

