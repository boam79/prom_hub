import Header from '@/components/Header'
import PaymentButton from '@/components/PaymentButton'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

async function getPrompt(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('prompts')
    .select(`
      *,
      profiles:profiles!prompts_seller_id_fkey(username, avatar_url, email),
      categories:categories!prompts_category_fkey(name, slug)
    `)
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const prompt = await getPrompt(id)
  
  if (!prompt) {
    return {
      title: 'Prompt Not Found | PromHub',
    }
  }

  return {
    title: `${prompt.title} | PromHub`,
    description: prompt.description,
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      type: 'website',
    },
  }
}

export default async function PromptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const prompt = await getPrompt(id)
  
  if (!prompt) {
    notFound()
  }
  const modelEmojis: Record<string, string> = {
    chatgpt: '💬',
    midjourney: '🎨',
    dalle: '🖼️',
    gemini: '✨',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: prompt.title,
                description: prompt.description,
                image: prompt.image_url || '/placeholder.png',
                offers: {
                  '@type': 'Offer',
                  price: prompt.price,
                  priceCurrency: 'USD',
                },
              }),
          }}
        />

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div className="relative w-full h-96 bg-gray-200 rounded-lg">
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                {modelEmojis[prompt.ai_model]} {prompt.ai_model}
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {prompt.title}
              </h1>
              <p className="text-gray-600 mb-6">
                {prompt.description}
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-blue-600">
                  ${prompt.price}
                </span>
                <span className="text-gray-500">
                  {prompt.views} 조회
                </span>
              </div>

              {prompt.profiles && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    판매자: {prompt.profiles.username || prompt.profiles.email}
                  </p>
                </div>
              )}

              <div className="mb-4">
                <PaymentButton
                  amount={prompt.price}
                  promptId={prompt.id}
                  promptTitle={prompt.title}
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">프롬프트 내용:</h3>
                <p className="text-gray-600 text-sm whitespace-pre-wrap">
                  {prompt.content}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related prompts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Similar Prompts
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Similar prompts will go here */}
          </div>
        </div>
      </main>
    </div>
  )
}
