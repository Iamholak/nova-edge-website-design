import { NextRequest, NextResponse } from 'next/server'
import { hashPassword, createAdminUser, getAdminUser } from '@/lib/auth'

/**
 * SETUP ENDPOINT - Used to create the first admin user
 * SECURITY: This endpoint is DISABLED by default after initial setup
 * Only works if NO admin users exist in the database
 * 
 * Usage:
 * POST /api/admin/setup
 * Body: { email: "your@email.com", password: "your-password", fullName: "Your Name" }
 */

export async function POST(request: NextRequest) {
  try {
    // Security check: Only allow setup if no admin users exist
    const defaultAdmin = await getAdminUser('admin@novaedge.com')
    if (defaultAdmin) {
      console.log('[v0] Setup blocked: Admin users already exist')
      return NextResponse.json(
        { 
          error: 'Setup is disabled. Admin users already exist. Use login page instead.' 
        },
        { status: 403 }
      )
    }

    const { email, password, fullName } = await request.json()

    // Validation
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Create admin user
    console.log('[v0] Creating admin user with email:', email)
    const user = await createAdminUser(email, password, fullName)
    console.log('[v0] Admin user created successfully:', user)

    return NextResponse.json(
      {
        message: 'Admin user created successfully',
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Setup error:', error)

    // Check if it's a unique constraint violation (email already exists)
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'This email is already registered as an admin' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create admin user' },
      { status: 500 }
    )
  }
}
