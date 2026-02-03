import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    console.log('[v0] Contact form submitted:', { name, email, subject })
    console.log('[v0] Config - NEXT_PUBLIC_SUPABASE_URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('[v0] Config - NEXT_PUBLIC_SUPABASE_ANON_KEY:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    console.log('[v0] Config - RESEND_API_KEY:', !!process.env.RESEND_API_KEY)

    // Validate input
    if (!name || !email || !subject || !message) {
      console.warn('[v0] Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let dbSaved = false
    let emailSent = false
    let errors: string[] = []

    // Try to store in database
    try {
      console.log('[v0] Attempting to save to database...')
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
        errors.push(`Database error: ${error.message}`)
      } else {
        console.log('[v0] ✓ Message saved to database:', data)
        dbSaved = true
      }
    } catch (dbError) {
      const errorMsg = dbError instanceof Error ? dbError.message : String(dbError)
      console.error('[v0] Database operation error:', errorMsg)
      errors.push(`Database error: ${errorMsg}`)
    }

    // Try to send email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        console.log('[v0] Attempting to send email via Resend...')
        const emailResult = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: 'We received your message - NovaEdge Solutions',
          html: `<h2>Thank you for reaching out!</h2><p>Hi ${name},</p><p>We've received your message and will get back to you soon.</p>`,
        })
        console.log('[v0] ✓ Email send response:', emailResult)
        emailSent = true
      } catch (emailError) {
        const errorMsg = emailError instanceof Error ? emailError.message : String(emailError)
        console.error('[v0] Email sending error:', errorMsg)
        errors.push(`Email error: ${errorMsg}`)
      }
    } else {
      console.warn('[v0] ⚠ Resend API key not configured')
      errors.push('Resend API key not configured')
    }

    // Check if anything actually succeeded
    if (!dbSaved && !emailSent) {
      console.error('[v0] ✗ Neither database nor email succeeded')
      return NextResponse.json(
        { 
          success: false,
          error: 'Could not save or send message',
          dbSaved,
          emailSent,
          errors,
        },
        { status: 500 }
      )
    }

    console.log('[v0] ✓ Contact form processed successfully')
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received successfully',
        dbSaved,
        emailSent,
        errors: errors.length > 0 ? errors : undefined,
      },
      { status: 201 }
    )
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('[v0] Contact API error:', errorMsg)
    return NextResponse.json(
      { error: 'Failed to process request', details: errorMsg },
      { status: 500 }
    )
  }
}
