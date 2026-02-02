import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('[v0] GET /api/admin/stats - fetching statistics')
    console.log('[v0] supabaseAdmin available:', !!supabaseAdmin)
    console.log('[v0] supabase available:', !!supabase)
    
    const client = supabaseAdmin || supabase
    console.log('[v0] Using client:', supabaseAdmin ? 'supabaseAdmin' : 'supabase')
    
    console.log('[v0] Querying company_stats table...')
    const { data, error } = await client
      .from('company_stats')
      .select('*')
      .order('created_at', { ascending: true })

    console.log('[v0] Query result - data:', data, 'error:', error)

    if (error) {
      console.error('[v0] Database error:', error)
      return NextResponse.json({ data: [], error: String(error) }, { status: 200 })
    }

    console.log('[v0] Returned', data?.length || 0, 'stats')
    return NextResponse.json({ data: data || [] }, { status: 200 })
  } catch (error) {
    console.error('[v0] Error:', error)
    return NextResponse.json({ data: [], error: String(error) }, { status: 200 })
  }
}
