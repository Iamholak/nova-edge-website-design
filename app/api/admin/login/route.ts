import { NextRequest, NextResponse } from 'next/server'
import { getAdminUser, verifyPassword, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('[v0] Login attempt for email:', email)

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await getAdminUser(email)
    console.log('[v0] User found:', user)

    if (!user || !user.is_active) {
      console.log('[v0] User not found or inactive')
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    console.log('[v0] Verifying password for user:', email)
    const isPasswordValid = await verifyPassword(password, user.password_hash)
    console.log('[v0] Password valid:', isPasswordValid)

    if (!isPasswordValid) {
      console.log('[v0] Password verification failed')
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create session
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    const { token } = await createSession(user.id, expiresAt)

    // Set session cookie
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
        },
      },
      { status: 200 }
    )

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
