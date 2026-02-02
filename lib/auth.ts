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
  if (!supabaseAdmin) {
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

  if (error) throw error
  return data[0]
}

export async function getAdminUser(email: string) {
  if (!supabaseAdmin) {
    throw new Error('Admin client not configured')
  }

  const { data, error } = await supabaseAdmin
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single()

  if (error) throw error
  return data
}

export async function createSession(userId: string, expiresAt: Date) {
  if (!supabaseAdmin) {
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

  if (error) throw error
  return { token, session: data[0] }
}

export async function getSessionUser(token: string) {
  if (!supabaseAdmin) {
    throw new Error('Admin client not configured')
  }

  const { data: session, error: sessionError } = await supabaseAdmin
    .from('admin_sessions')
    .select('*, admin_users(*)')
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (sessionError || !session) return null
  return session.admin_users
}

export async function deleteSession(token: string) {
  if (!supabaseAdmin) {
    throw new Error('Admin client not configured')
  }

  const { error } = await supabaseAdmin
    .from('admin_sessions')
    .delete()
    .eq('token', token)

  if (error) throw error
}
