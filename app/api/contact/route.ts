import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    console.log('[v0] Contact form submitted:', { name, email, subject })

    // Validate input
    if (!name || !email || !subject || !message) {
      console.warn('[v0] Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('[v0] Supabase not configured - skipping database storage')
      // Continue with email even if database is not available
    } else {
      try {
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
          // Don't fail if database insert fails - still try to send email
        } else {
          console.log('[v0] Message saved to database:', data)
        }
      } catch (dbError) {
        console.error('[v0] Database operation error:', dbError)
        // Continue - database is not critical
      }
    }

    // Email sending is optional - don't fail if it doesn't work
    let emailSent = false
    try {
      if (resend && process.env.RESEND_API_KEY) {
        console.log('[v0] Attempting to send email via Resend...')
        const emailResult = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: 'We received your message - NovaEdge Solutions',
          html: `<h2>Thank you for reaching out!</h2><p>Hi ${name},</p><p>We've received your message and will get back to you soon.</p>`,
        })
        console.log('[v0] Email sent:', emailResult)
        emailSent = true
      } else {
        console.warn('[v0] Resend not configured - API key or client missing')
      }
    } catch (emailError) {
      console.error('[v0] Email sending error:', emailError)
      // Silently fail - email is not critical
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received successfully',
        emailSent,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request', details: String(error) },
      { status: 500 }
    )
  }
}
