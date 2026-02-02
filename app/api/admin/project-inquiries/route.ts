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
      .from('project_inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
