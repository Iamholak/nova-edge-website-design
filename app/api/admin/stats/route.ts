import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { getSessionUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
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

    console.log('[v0] Session valid, fetching stats')
    
    // Use admin client if available, otherwise use regular client
    const client = supabaseAdmin || supabase
    
    const { data, error } = await client
      .from('company_stats')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[v0] Database error fetching stats:', error)
      return NextResponse.json({ data: [] }, { status: 200 })
    }

    console.log('[v0] Stats fetched successfully, count:', data?.length || 0)
    return NextResponse.json({ data: data || [] }, { status: 200 })
  } catch (error) {
    console.error('[v0] API error in GET /api/admin/stats:', error)
    return NextResponse.json({ data: [] }, { status: 200 })
  }
}
