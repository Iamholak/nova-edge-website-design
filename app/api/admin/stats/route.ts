import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('[v0] GET /api/admin/stats - fetching all stats')
    
    // Use admin client if available, otherwise use regular client
    const client = supabaseAdmin || supabase
    
    const { data, error } = await client
      .from('company_stats')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[v0] Database error fetching stats:', error)
      return NextResponse.json({ 
        data: [],
        error: 'Failed to fetch stats from database'
      }, { status: 200 }) // Return 200 with empty array on error
    }

    console.log('[v0] Stats fetched successfully, count:', data?.length || 0)
    return NextResponse.json({ data: data || [] }, { status: 200 })
  } catch (error) {
    console.error('[v0] API error in GET /api/admin/stats:', error)
    return NextResponse.json({ 
      data: [],
      error: 'Internal server error'
    }, { status: 200 }) // Return 200 with empty array on error
  }
}
