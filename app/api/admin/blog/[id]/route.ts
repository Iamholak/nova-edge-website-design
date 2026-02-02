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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authenticated } = await checkAuth(request)

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params

    if (!supabaseAdmin) {
      throw new Error('Admin client not configured')
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authenticated } = await checkAuth(request)

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, slug, excerpt, content, status } = await request.json()
    const { id } = await params

    if (!supabaseAdmin) {
      throw new Error('Admin client not configured')
    }

    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update({
        title,
        slug,
        excerpt,
        content,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json({ data: data[0] }, { status: 200 })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authenticated } = await checkAuth(request)

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params

    if (!supabaseAdmin) {
      throw new Error('Admin client not configured')
    }

    const { error } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Post deleted' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
