import Header from '@/components/Header'
import PromptForm from '@/components/PromptForm'

export default function SellPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            프롬프트 판매하기
          </h1>
          <PromptForm />
        </div>
      </main>
    </div>
  )
}

