import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Query the stats table directly
    const { data, error } = await supabaseAdmin
      .from('company_stats')
      .select('*')
      .order('stat_key', { ascending: true })

    if (error) {
      console.error('[v0] Stats query error:', error)
      return NextResponse.json({ data: [] }, { status: 200 })
    }

    console.log('[v0] Stats fetched:', data?.length || 0, 'rows')
    return NextResponse.json({ data: data || [] }, { status: 200 })
  } catch (error) {
    console.error('[v0] Stats API error:', error)
    return NextResponse.json({ data: [] }, { status: 200 })
  }
}
