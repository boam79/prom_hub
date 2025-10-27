import Link from 'next/link'
import Image from 'next/image'

interface PromptCardProps {
  prompt: {
    id: string
    title: string
    price: number
    ai_model: string
    image_url: string
    description: string
  }
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const modelEmojis: Record<string, string> = {
    chatgpt: '💬',
    midjourney: '🎨',
    dalle: '🖼️',
    gemini: '✨',
  }

  return (
    <Link href={`/prompts/${prompt.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="relative w-full h-48 bg-gray-200">
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm">
            {modelEmojis[prompt.ai_model] || '🤖'} {prompt.ai_model}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-900">
            {prompt.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {prompt.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${prompt.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

