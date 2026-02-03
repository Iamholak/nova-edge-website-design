import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store in database - this is the primary goal
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        subject,
        message,
        status: 'new',
      })
      .select()

    if (error) {
      console.error('[v0] Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save message', details: error },
        { status: 500 }
      )
    }

    // Email sending is optional - don't fail if it doesn't work
    try {
      if (resend && process.env.RESEND_API_KEY) {
        // IMPORTANT: Change 'noreply@yourdomain.com' to your verified Resend email
        // You can use:
        // 1. Your domain email (if you verified it in Resend)
        // 2. Or: <anything>@doraepo.resend.app (default test email)
        const emailResult = await resend.emails.send({
          from: 'onboarding@resend.dev', // ← Using Resend's default test email
          to: email,
          subject: 'We received your message - NovaEdge Solutions',
          html: `<h2>Thank you for reaching out!</h2><p>Hi ${name},</p><p>We've received your message and will get back to you soon.</p>`,
        })
        console.log('[v0] Email sent:', emailResult)
      } else {
        console.warn('[v0] Resend not configured or API key missing')
      }
    } catch (emailError) {
      console.error('[v0] Email sending error:', emailError)
      // Silently fail - email is not critical
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
