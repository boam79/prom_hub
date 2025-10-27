import Header from '@/components/Header'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

async function getDashboardData() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // 내 구매 내역
  const { data: purchases } = await supabase
    .from('purchases')
    .select(`
      *,
      prompts:prompts!purchases_prompt_id_fkey(id, title, price, ai_model)
    `)
    .eq('buyer_id', user.id)
    .eq('status', 'completed')
    .order('created_at', { ascending: false })

  // 내 판매 내역
  const { data: myPrompts } = await supabase
    .from('prompts')
    .select('*')
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false })

  // 총 판매액 계산
  const { data: totalSales } = await supabase
    .from('purchases')
    .select('amount')
    .eq('status', 'completed')

  const salesToMyPrompts = totalSales?.filter(sale => 
    purchases?.some(p => p.prompt_id === sale.id)
  ) || []

  const totalSalesAmount = salesToMyPrompts.reduce((sum, sale) => sum + (sale.amount || 0), 0)

  return {
    purchases: purchases || [],
    myPrompts: myPrompts || [],
    totalSales: totalSalesAmount,
    totalPrompts: myPrompts?.length || 0,
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          대시보드
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* My Purchases */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              내 구매 내역
            </h2>
            {data.purchases.length === 0 ? (
              <p className="text-gray-600">
                아직 구매한 프롬프트가 없습니다.
              </p>
            ) : (
              <div className="space-y-3">
                {data.purchases.map((purchase: any) => (
                  <div key={purchase.id} className="border-b pb-3">
                    <h3 className="font-medium">{purchase.prompts?.title || '제목 없음'}</h3>
                    <p className="text-sm text-gray-600">${purchase.amount}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Sales */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              내 판매 내역
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">총 판매액</span>
                  <span className="font-bold">${data.totalSales.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">총 프롬프트</span>
                  <span className="font-bold">{data.totalPrompts}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Prompts */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              내 프롬프트
            </h2>
            <a
              href="/sell"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              새로 만들기
            </a>
          </div>
          {data.myPrompts.length === 0 ? (
            <p className="text-gray-600">
              아직 생성한 프롬프트가 없습니다.
            </p>
          ) : (
            <div className="space-y-3">
              {data.myPrompts.map((prompt: any) => (
                <div key={prompt.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h3 className="font-medium">{prompt.title}</h3>
                    <p className="text-sm text-gray-600">${prompt.price}</p>
                  </div>
                  <a
                    href={`/prompts/${prompt.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    보기
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
