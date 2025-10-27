import Header from '@/components/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              AI 프롬프트 마켓플레이스
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              ChatGPT, Midjourney, DALL-E, Gemini용 고품질 AI 프롬프트를 만나보세요
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/marketplace"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                마켓플레이스 둘러보기
              </Link>
              <Link
                href="/sell"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 border-2 border-blue-600 font-medium"
              >
                프롬프트 판매하기
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-4xl mb-4">🛍️</div>
                <h3 className="text-xl font-semibold mb-2">둘러보기 & 구매</h3>
                <p className="text-gray-600">
                  전문가들이 만든 수천 개의 고품질 AI 프롬프트를 만나보세요
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">판매 & 수익</h3>
                <p className="text-gray-600">
                  프롬프트를 업로드하고 몇 분 만에 수익을 올려보세요
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold mb-2">AI 중심</h3>
                <p className="text-gray-600">
                  최신 AI 모델과 플랫폼 지원
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
