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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { authenticated } = await checkAuth(request)

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { status } = await request.json()
    const { id } = await params

    if (!supabaseAdmin) {
      throw new Error('Admin client not configured')
    }

    const { data, error } = await supabaseAdmin
      .from('project_inquiries')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error updating inquiry:', error)
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
      .from('project_inquiries')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Inquiry deleted' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting inquiry:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
