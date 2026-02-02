import { NextRequest, NextResponse } from 'next/server'
import { deleteSession, getSessionUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_session')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    await deleteSession(token)

    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    )

    response.cookies.delete('admin_session')
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_session')?.value

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    const user = await getSessionUser(token)

    if (!user) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    )
  }
}
