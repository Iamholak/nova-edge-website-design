import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ data: [] }, { status: 200 })
    }

    return NextResponse.json({ data: data || [] }, { status: 200 })
  } catch (error) {
    console.error('Error fetching published posts:', error)
    return NextResponse.json({ data: [] }, { status: 200 })
  }
}
