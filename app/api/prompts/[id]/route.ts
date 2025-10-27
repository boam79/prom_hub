import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('prompts')
    .select('*, profiles:profiles!prompts_seller_id_fkey(username, avatar_url, email), categories:categories!prompts_category_fkey(name, slug)')
    .eq('id', id)
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const { data: prompt, error: promptError } = await supabase.from('prompts').select('seller_id').eq('id', params.id).single()
  if (promptError || prompt?.seller_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { data, error } = await supabase.from('prompts').update(body).eq('id', params.id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data: prompt, error: promptError } = await supabase.from('prompts').select('seller_id').eq('id', id).single()
  if (promptError || prompt?.seller_id !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { error } = await supabase.from('prompts').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
