import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { checkAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const { authenticated } = await checkAuth(request)
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 })
    }

    console.log('[v0] Fetching all stats from database')
    const { data, error } = await supabaseAdmin
      .from('company_stats')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[v0] Error fetching stats:', error)
      return NextResponse.json({ error: 'Failed to fetch stats', details: error }, { status: 500 })
    }

    console.log('[v0] Stats fetched successfully, count:', data?.length)
    
    // Return data as array for the admin page to display
    return NextResponse.json({ data: data || [] }, { status: 200 })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 })
  }
}
