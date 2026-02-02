import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin || !supabaseAdmin.from) {
      return NextResponse.json({ 
        data: {
          clients_satisfied: 50,
          projects_delivered: 120,
          team_members: 15,
          years_experience: 5,
        } 
      }, { status: 200 })
    }

    const { data, error } = await supabaseAdmin
      .from('company_stats')
      .select('stat_key, value')

    if (error || !data) {
      console.error('[v0] Stats fetch error:', error)
      return NextResponse.json({ 
        data: {
          clients_satisfied: 50,
          projects_delivered: 120,
          team_members: 15,
          years_experience: 5,
        } 
      }, { status: 200 })
    }

    // Convert array of {stat_key, value} to object
    const stats: any = {}
    data.forEach((item: any) => {
      stats[item.stat_key] = item.value
    })

    return NextResponse.json({ 
      data: {
        clients_satisfied: stats.clients_satisfied || 50,
        projects_delivered: stats.projects_delivered || 120,
        team_members: stats.team_members || 15,
        years_experience: stats.years_experience || 5,
      }
    }, { status: 200 })
  } catch (error) {
    console.error('[v0] Error fetching stats:', error)
    return NextResponse.json({ 
      data: {
        clients_satisfied: 50,
        projects_delivered: 120,
        team_members: 15,
        years_experience: 5,
      } 
    }, { status: 200 })
  }
}
