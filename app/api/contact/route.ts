import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    console.log('[v0] Contact form submitted:', { name, email, subject })
    console.log('[v0] Environment check - Supabase URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('[v0] Environment check - Resend API Key:', !!process.env.RESEND_API_KEY)

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

    // Try to store in database
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
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
        } else {
          console.log('[v0] Message saved to database:', data)
          dbSaved = true
        }
      } catch (dbError) {
        console.error('[v0] Database operation error:', dbError)
      }
    } else {
      console.warn('[v0] Supabase not configured - set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
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
        console.log('[v0] Email send response:', emailResult)
        emailSent = true
      } catch (emailError) {
        console.error('[v0] Email sending error:', emailError)
      }
    } else {
      console.warn('[v0] Resend not configured - set RESEND_API_KEY in environment variables')
    }

    // Check if anything actually succeeded
    if (!dbSaved && !emailSent) {
      console.error('[v0] Neither database nor email was configured/successful')
      return NextResponse.json(
        { 
          error: 'No delivery method available',
          details: 'Please configure either Supabase or Resend',
          supabaseConfigured: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          resendConfigured: !!process.env.RESEND_API_KEY,
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received successfully',
        dbSaved,
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
