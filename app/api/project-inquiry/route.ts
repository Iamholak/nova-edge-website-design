import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      company,
      phone,
      projectDescription,
      budget,
      timeline,
    } = await request.json()

    // Validate input
    if (!name || !email || !projectDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store in database
    const { data, error } = await supabase
      .from('project_inquiries')
      .insert({
        name,
        email,
        company,
        phone,
        project_description: projectDescription,
        budget,
        timeline,
        status: 'new',
      })
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save inquiry' },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: 'noreply@novaedge.com',
      to: email,
      subject: 'Project Inquiry Received - NovaEdge Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">Thank you for your project inquiry!</h2>
          <p>Hi ${name},</p>
          <p>We've received your project inquiry and our team will review it shortly. We'll be in touch within 24-48 hours.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Your Project Details:</h3>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Project:</strong> ${projectDescription}</p>
            ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
            ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
          </div>
          <p>Best regards,<br>NovaEdge Solutions Team</p>
        </div>
      `,
    })

    // Send notification email to admin
    await resend.emails.send({
      from: 'noreply@novaedge.com',
      to: 'hello@novaedge.com',
      subject: `New Project Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Project Inquiry</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Project Description:</strong></p>
          <p>${projectDescription}</p>
          ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
          ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
          <a href="https://app.supabase.com/project" style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">View in Dashboard</a>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Inquiry sent successfully', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
