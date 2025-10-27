'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './AuthProvider'

// Toss Payments SDK는 HTML 스크립트로 로드
declare global {
  interface Window {
    TossPayments: any
  }
}

interface PaymentButtonProps {
  amount: number
  promptId: string
  promptTitle: string
}

export default function PaymentButton({ amount, promptId, promptTitle }: PaymentButtonProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  // Toss Payments SDK 로드 (v1 방식 - 구버전)
  const loadTossPayments = () => {
    // 이미 로드되어 있으면 바로 반환
    if (window.TossPayments) {
      return Promise.resolve(window.TossPayments)
    }

    // 이미 스크립트 태그가 있으면 기다림
      const existingScript = document.querySelector('script[src="https://js.tosspayments.com/v1/payment"]')
    if (existingScript) {
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (window.TossPayments) {
            clearInterval(checkInterval)
            resolve(window.TossPayments)
          }
        }, 100)

        // 5초 후 타임아웃
        setTimeout(() => {
          clearInterval(checkInterval)
          resolve(window.TossPayments)
        }, 5000)
      })
    }

    // 새로 스크립트 로드
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://js.tosspayments.com/v1/payment' // v1 URL로 변경
      script.async = true
      script.defer = true
      script.onload = () => {
        // 약간의 지연을 주어 SDK가 완전히 초기화되도록 함
        setTimeout(() => {
          if (window.TossPayments) {
            resolve(window.TossPayments)
          } else {
            reject(new Error('Toss Payments SDK 초기화 실패'))
          }
        }, 100)
      }
      script.onerror = () => reject(new Error('Toss Payments SDK 로드 실패'))
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    if (!user) {
      alert('로그인이 필요합니다')
      router.push('/login')
      return
    }

    setLoading(true)
    
    try {
      const supabase = createClient()
      
      // 프롬프트 소유자 확인
      const { data: promptData, error: promptError } = await supabase
        .from('prompts')
        .select('seller_id')
        .eq('id', promptId)
        .single()

      if (promptError) {
        console.error('Prompt error:', promptError)
        alert('프롬프트를 찾을 수 없습니다')
        setLoading(false)
        return
      }

      if (promptData.seller_id === user.id) {
        alert('자신의 프롬프트는 구매할 수 없습니다')
        setLoading(false)
        return
      }

      // 이미 구매한 프롬프트인지 확인
      const { data: existingPurchase } = await supabase
        .from('purchases')
        .select('id')
        .eq('buyer_id', user.id)
        .eq('prompt_id', promptId)
        .eq('status', 'completed')
        .single()

      if (existingPurchase) {
        alert('이미 구매한 프롬프트입니다')
        router.push('/prompts/' + promptId)
        setLoading(false)
        return
      }

      // Toss Payments SDK 로드
      const TossPayments = await loadTossPayments()
      
      // 클라이언트 키는 환경 변수에서 가져오거나 테스트 키 사용
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
      const tossPayments = TossPayments(clientKey)

      // 결제 ID 생성
      const orderId = `promhub-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

      // 결제 요청 (결제창이 열리고 처리됨)
      await tossPayments.requestPayment('카드', {
        amount: amount,
        orderId: orderId,
        orderName: promptTitle,
        customerName: user.email || '구매자',
        customerEmail: user.email || '',
        successUrl: `${window.location.origin}/payment/success?promptId=${promptId}&orderId=${orderId}`,
        failUrl: `${window.location.origin}/payment/fail?orderId=${orderId}`,
      })

      // 결제창이 열리므로 여기서는 처리 끝
      // successUrl에서 구매 내역 저장 처리
    } catch (err) {
      console.error('Payment error:', err)
      alert('결제 중 오류가 발생했습니다')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
    >
      {loading ? '결제 중...' : `지금 구매하기 - $${amount}`}
    </button>
  )
}

