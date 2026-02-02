import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      console.error('[v0] Admin client not configured')
      return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 })
    }

    console.log('[v0] Fetching all stats from database')
    const { data, error } = await supabaseAdmin
      .from('company_stats')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[v0] Database error fetching stats:', error)
      return NextResponse.json({ error: 'Failed to fetch stats', details: String(error) }, { status: 500 })
    }

    console.log('[v0] Stats fetched successfully, count:', data?.length)
    return NextResponse.json({ data: data || [] }, { status: 200 })
  } catch (error) {
    console.error('[v0] API error in GET /api/admin/stats:', error)
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 })
  }
}
