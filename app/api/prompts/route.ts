import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  
  const { searchParams } = new URL(request.url)
  const aiModel = searchParams.get('ai_model')
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  let query = supabase
    .from('prompts')
    .select(`
      *,
      profiles:profiles!prompts_seller_id_fkey(username, avatar_url),
      categories:categories!prompts_category_fkey(name, slug)
    `)
    .order('created_at', { ascending: false })

  if (aiModel) {
    query = query.eq('ai_model', aiModel)
  }

  if (category) {
    query = query.eq('category', category)
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const { data, error } = await supabase
    .from('prompts')
    .insert({
      ...body,
      seller_id: user.id,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

