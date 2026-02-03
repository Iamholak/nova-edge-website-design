import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { value } = await request.json()
    const { id: statKey } = await params

    // Update the stat
    const { data, error } = await supabaseAdmin
      .from('company_stats')
      .update({ value })
      .eq('stat_key', statKey)
      .select()

    if (error) {
      console.error('[v0] Update error:', error)
      return NextResponse.json({ success: false, error: String(error) }, { status: 200 })
    }

    console.log('[v0] Updated stat:', statKey, 'to', value)
    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('[v0] PATCH error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 200 })
  }
}
