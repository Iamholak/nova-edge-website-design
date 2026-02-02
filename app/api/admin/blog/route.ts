import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getSessionUser } from '@/lib/auth'

async function checkAuth(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value
  if (!token) {
    return { authenticated: false, user: null }
  }

  try {
    const user = await getSessionUser(token)
    return { authenticated: !!user, user }
  } catch {
    return { authenticated: false, user: null }
  }
}

export async function GET(request: NextRequest) {
  const { authenticated } = await checkAuth(request)

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!supabaseAdmin) {
      throw new Error('Admin client not configured')
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const { authenticated, user } = await checkAuth(request)

  if (!authenticated || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, slug, excerpt, content, status } = await request.json()

    if (!supabaseAdmin) {
      throw new Error('Admin client not configured')
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert({
        title,
        slug,
        excerpt,
        content,
        status,
        author_id: user.id,
        published_at: status === 'published' ? new Date().toISOString() : null,
      })
      .select()

    if (error) throw error

    return NextResponse.json({ data: data[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
