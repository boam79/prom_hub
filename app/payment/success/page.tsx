import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/components/AuthProvider'
import Header from '@/components/Header'

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  useEffect(() => {
    const processPayment = async () => {
      const paymentKey = searchParams.get('paymentKey')
      const orderId = searchParams.get('orderId')
      const amount = searchParams.get('amount')
      const promptId = searchParams.get('promptId')

      if (!paymentKey || !orderId || !amount) {
        alert('결제 정보가 올바르지 않습니다')
        router.push('/')
        return
      }

      if (!user) {
        alert('로그인이 필요합니다')
        router.push('/login')
        return
      }

      try {
        // 구매 내역 저장
        const supabase = createClient()
        
        if (promptId) {
          const { error: purchaseError } = await supabase
            .from('purchases')
            .insert({
              buyer_id: user.id,
              prompt_id: promptId,
              amount: parseFloat(amount),
              status: 'completed',
            })

          if (purchaseError) {
            console.error('Purchase insert error:', purchaseError)
            // 에러가 있어도 결제는 완료된 상태
          }
        }

        alert('결제가 완료되었습니다!')
        router.push('/dashboard')
      } catch (error) {
        console.error('Payment confirmation error:', error)
        alert('결제는 완료되었지만 처리 중 오류가 발생했습니다')
        router.push('/dashboard')
      }
    }

    processPayment()
  }, [searchParams, user, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">결제 처리 중...</h1>
        <p className="text-gray-600">잠시만 기다려주세요</p>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
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
        <PaymentSuccessContent />
      </Suspense>
    </div>
  )
}

