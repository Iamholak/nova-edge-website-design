import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { getSessionUser } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get session token from cookie (same as login pattern)
    const token = request.cookies.get('admin_session')?.value
    
    if (!token) {
      console.log('[v0] No session token found')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify session is valid
    const user = await getSessionUser(token)
    if (!user) {
      console.log('[v0] Invalid or expired session')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { value } = await request.json()
    const { id: statKey } = await params

    console.log(`[v0] PATCH /api/admin/stats/${statKey} - updating to ${value}`)

    // Use admin client if available, otherwise use regular client
    const client = supabaseAdmin || supabase

    // Update using stat_key
    const { data, error } = await client
      .from('company_stats')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('stat_key', statKey)
      .select()

    if (error) {
      console.error('[v0] Database error updating stat:', error)
      return NextResponse.json({ error: 'Failed to update stat', data: null }, { status: 200 })
    }

    console.log(`[v0] Stat ${statKey} updated successfully`)
    return NextResponse.json({ data, success: true }, { status: 200 })
  } catch (error) {
    console.error('[v0] Error in PATCH /api/admin/stats:', error)
    return NextResponse.json({ error: 'Internal server error', data: null }, { status: 200 })
  }
}
