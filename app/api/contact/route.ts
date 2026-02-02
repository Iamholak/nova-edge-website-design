import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    console.log('[v0] Contact form submission received:', { name, email, subject })

    // Validate input
    if (!name || !email || !subject || !message) {
      console.log('[v0] Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store in database
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
        { error: 'Failed to save message' },
        { status: 500 }
      )
    }

    console.log('[v0] Message saved to database:', data)

    // Try sending emails, but don't fail if email service isn't configured
    try {
      if (resend) {
        // Send confirmation email to user
        await resend.emails.send({
          from: 'noreply@novaedge.com',
          to: email,
          subject: 'We received your message - NovaEdge Solutions',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1f2937;">Thank you for reaching out!</h2>
              <p>Hi ${name},</p>
              <p>We've received your message and will get back to you as soon as possible.</p>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #374151;">Your Message Details:</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong> ${message}</p>
              </div>
              <p>Best regards,<br>NovaEdge Solutions Team</p>
            </div>
          `,
        })

        // Send notification email to admin
        await resend.emails.send({
          from: 'noreply@novaedge.com',
          to: 'hello@novaedge.com',
          subject: `New Contact Message from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Contact Message</h2>
              <p><strong>From:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
              <a href="https://app.supabase.com/project" style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">View in Dashboard</a>
            </div>
          `,
        })
        console.log('[v0] Confirmation emails sent')
      }
    } catch (emailError) {
      console.warn('[v0] Email sending failed (non-critical):', emailError)
      // Don't fail the request if emails don't send
    }

    return NextResponse.json(
      { message: 'Message sent successfully', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
