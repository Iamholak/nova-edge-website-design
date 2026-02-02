import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('[v0] GET /api/admin/stats')
    console.log('[v0] supabaseAdmin is dummy?', !supabaseAdmin?.from || typeof supabaseAdmin.from !== 'function')
    
    // Always use admin client for getting stats
    const { data, error } = await supabaseAdmin
      .from('company_stats')
      .select('*')
      .order('created_at', { ascending: true })

    console.log('[v0] Query result - rows:', data?.length, 'error:', error?.message)

    if (error) {
      console.error('[v0] Database error:', error.message)
      return NextResponse.json({ data: [] }, { status: 200 })
    }

    return NextResponse.json({ data: data || [] }, { status: 200 })
  } catch (error) {
    console.error('[v0] Exception:', error)
    return NextResponse.json({ data: [] }, { status: 200 })
  }
}
