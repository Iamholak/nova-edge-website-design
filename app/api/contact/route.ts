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
    let warnings: string[] = []

    // Try to store in database - PRIMARY METHOD
    try {
      console.log('[v0] Attempting to save to database...')
      console.log('[v0] Payload:', { name, email, subject, message })
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
        console.error('[v0] Database error - Full error object:', JSON.stringify(error, null, 2))
        console.error('[v0] Database error - Code:', error.code)
        console.error('[v0] Database error - Message:', error.message)
        console.error('[v0] Database error - Details:', error.details)
        errors.push(`Database error: ${error.message} (${error.code})`)
      } else {
        console.log('[v0] ✓ Message saved to database:', data)
        dbSaved = true
      }
    } catch (dbError) {
      const errorMsg = dbError instanceof Error ? dbError.message : String(dbError)
      console.error('[v0] Database operation error:', errorMsg)
      console.error('[v0] Database operation error stack:', dbError)
      errors.push(`Database error: ${errorMsg}`)
    }

    // Try to send email via Resend - SECONDARY METHOD
    if (process.env.RESEND_API_KEY) {
      try {
        console.log('[v0] Attempting to send email via Resend...')
        
        // Note: onboarding@resend.dev can ONLY send to the sender's own email
        // For a real contact form, you MUST verify a domain in Resend
        const emailResult = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: 'We received your message - NovaEdge Solutions',
          html: `<h2>Thank you for reaching out!</h2><p>Hi ${name},</p><p>We've received your message and will get back to you soon.</p>`,
        })
        
        console.log('[v0] Email send response:', emailResult)
        
        if (emailResult.error) {
          console.warn('[v0] Email send failed:', emailResult.error)
          warnings.push('Email could not be sent (onboarding@resend.dev requires verified domain)')
        } else {
          console.log('[v0] ✓ Email sent successfully')
          emailSent = true
        }
      } catch (emailError) {
        const errorMsg = emailError instanceof Error ? emailError.message : String(emailError)
        console.error('[v0] Email sending error:', errorMsg)
        if (errorMsg.includes('testing') || errorMsg.includes('domain')) {
          warnings.push('Email domain restriction: onboarding@resend.dev only works with verified domains')
        } else {
          warnings.push(`Email error: ${errorMsg}`)
        }
      }
    } else {
      console.warn('[v0] Resend API key not configured')
    }

    // Check if database saved successfully (email is optional)
    if (dbSaved) {
      console.log('[v0] ✓ Contact form processed - database saved successfully')
      return NextResponse.json(
        { 
          success: true, 
          message: 'Message received and saved successfully',
          dbSaved,
          emailSent,
          warnings: warnings.length > 0 ? warnings : undefined,
          note: warnings.length > 0 ? 'To send confirmation emails to visitors, verify a domain in Resend' : undefined
        },
        { status: 201 }
      )
    }

    // Database failed - return error
    if (errors.length > 0) {
      console.error('[v0] Database save failed - cannot proceed')
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to save message',
          dbSaved,
          emailSent,
          errors,
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Could not process message',
        dbSaved,
        emailSent,
        errors,
      },
      { status: 500 }
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
