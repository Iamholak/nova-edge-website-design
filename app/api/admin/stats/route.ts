import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('[v0] GET /api/admin/stats - fetching statistics')
    
    const client = supabaseAdmin || supabase
    
    const { data, error } = await client
      .from('company_stats')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[v0] Database error:', error)
      return NextResponse.json({ data: [] }, { status: 200 })
    }

    console.log('[v0] Returned', data?.length || 0, 'stats')
    return NextResponse.json({ data: data || [] }, { status: 200 })
  } catch (error) {
    console.error('[v0] Error:', error)
    return NextResponse.json({ data: [] }, { status: 200 })
  }
}
