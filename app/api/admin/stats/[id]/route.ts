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
    const { value } = await request.json()
    const { id: statKey } = await params

    if (!supabaseAdmin) {
      throw new Error('Admin client not configured')
    }

    // Update using stat_key, not id
    const { data, error } = await supabaseAdmin
      .from('company_stats')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('stat_key', statKey)
      .select()

    if (error) throw error

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Error updating stat:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
