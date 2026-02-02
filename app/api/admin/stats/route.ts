import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getSessionUser } from '@/lib/auth'

async function checkAuth(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value
  if (!token) {
    return { authenticated: false, user: null }
  }

  try {
    const user = await getSessionUser(token)
    return { authenticated: !!user, user }
  } catch {
    return { authenticated: false, user: null }
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      // Return default stats if supabase not configured
      return NextResponse.json({ 
        data: [{
          clients_satisfied: 98,
          projects_delivered: 500,
          team_members: 50,
          years_experience: 10,
        }] 
      }, { status: 200 })
    }

    const { data, error } = await supabaseAdmin
      .from('company_stats')
      .select('*')
      .order('stat_key', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      // Return default stats on error
      return NextResponse.json({ 
        data: [{
          clients_satisfied: 98,
          projects_delivered: 500,
          team_members: 50,
          years_experience: 10,
        }] 
      }, { status: 200 })
    }

    return NextResponse.json({ data: data || [] }, { status: 200 })
  } catch (error) {
    console.error('Error fetching stats:', error)
    // Return default stats on any error
    return NextResponse.json({ 
      data: [{
        clients_satisfied: 98,
        projects_delivered: 500,
        team_members: 50,
        years_experience: 10,
      }] 
    }, { status: 200 })
  }
}
