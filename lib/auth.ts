import bcrypt from 'bcrypt'
import { supabaseAdmin } from '@/lib/supabase'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createAdminUser(
  email: string,
  password: string,
  fullName: string
) {
  try {
    if (!supabaseAdmin || !supabaseAdmin.from) {
      console.error('[v0] Admin client not configured')
      throw new Error('Admin client not configured')
    }

    const passwordHash = await hashPassword(password)

    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .insert({
        email,
        password_hash: passwordHash,
        full_name: fullName,
        is_active: true,
      })
      .select()

    if (error) {
      console.error('[v0] Error creating admin user:', error)
      throw error
    }
    return data[0]
  } catch (err) {
    console.error('[v0] Exception in createAdminUser:', err)
    throw err
  }
}

export async function getAdminUser(email: string) {
  try {
    if (!supabaseAdmin || !supabaseAdmin.from) {
      console.error('[v0] Admin client not configured')
      return null
    }

    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      console.error('[v0] Error fetching admin user:', error)
      return null
    }
    return data
  } catch (err) {
    console.error('[v0] Exception in getAdminUser:', err)
    return null
  }
}

export async function createSession(userId: string, expiresAt: Date) {
  try {
    if (!supabaseAdmin || !supabaseAdmin.from) {
      console.error('[v0] Admin client not configured')
      throw new Error('Admin client not configured')
    }

    const token = require('crypto').randomBytes(32).toString('hex')

    const { data, error } = await supabaseAdmin
      .from('admin_sessions')
      .insert({
        user_id: userId,
        token,
        expires_at: expiresAt.toISOString(),
      })
      .select()

    if (error) {
      console.error('[v0] Error creating session:', error)
      throw error
    }
    return { token, session: data[0] }
  } catch (err) {
    console.error('[v0] Exception in createSession:', err)
    throw err
  }
}

export async function getSessionUser(token: string) {
  try {
    if (!supabaseAdmin || !supabaseAdmin.from) {
      console.error('[v0] Admin client not configured')
      return null
    }

    const { data: session, error: sessionError } = await supabaseAdmin
      .from('admin_sessions')
      .select('*, admin_users(*)')
      .eq('token', token)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (sessionError || !session) {
      console.error('[v0] Session error:', sessionError)
      return null
    }
    return session.admin_users
  } catch (err) {
    console.error('[v0] Exception in getSessionUser:', err)
    return null
  }
}

export async function deleteSession(token: string) {
  try {
    if (!supabaseAdmin || !supabaseAdmin.from) {
      console.error('[v0] Admin client not configured')
      return
    }

    const { error } = await supabaseAdmin
      .from('admin_sessions')
      .delete()
      .eq('token', token)

    if (error) {
      console.error('[v0] Error deleting session:', error)
    }
  } catch (err) {
    console.error('[v0] Exception in deleteSession:', err)
  }
}
