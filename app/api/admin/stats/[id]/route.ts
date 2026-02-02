import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { value } = await request.json()
    const { id: statKey } = await params

    console.log(`[v0] PATCH /api/admin/stats/${statKey} - updating to ${value}`)

    // Use admin client for writes
    const { data, error } = await supabaseAdmin
      .from('company_stats')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('stat_key', statKey)
      .select()

    if (error) {
      console.error('[v0] Database error updating stat:', error)
      return NextResponse.json({ error: 'Failed to update stat', data: null }, { status: 200 })
    }

    console.log(`[v0] Stat ${statKey} updated successfully, rows affected:`, data?.length)
    return NextResponse.json({ data, success: true }, { status: 200 })
  } catch (error) {
    console.error('[v0] Error in PATCH /api/admin/stats:', error)
    return NextResponse.json({ error: 'Internal server error', data: null }, { status: 200 })
  }
}
