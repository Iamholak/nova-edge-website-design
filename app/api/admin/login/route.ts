import { NextRequest, NextResponse } from 'next/server'
import { getAdminUser, verifyPassword, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('[v0] Login attempt for email:', email)

    if (!email || !password) {
      console.log('[v0] Missing email or password')
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Get user from database
    const user = await getAdminUser(email)
    console.log('[v0] User found:', !!user, 'is_active:', user?.is_active)

    if (!user || !user.is_active) {
      console.log('[v0] User not found or inactive')
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    console.log('[v0] Verifying password')
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
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    const sessionResult = await createSession(user.id, expiresAt)
    console.log('[v0] Session created:', !!sessionResult?.token)

    if (!sessionResult?.token) {
      throw new Error('Failed to create session')
    }

    // Set session cookie with explicit headers
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

    response.cookies.set({
      name: 'admin_session',
      value: sessionResult.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    console.log('[v0] Login successful, cookie set')
    return response
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
