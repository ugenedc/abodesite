import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Resend only if API key is available
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is required')
  }
  return new Resend(apiKey)
}

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { 
          error: 'Email service not configured',
          details: 'RESEND_API_KEY environment variable is missing'
        }, 
        { status: 503 }
      )
    }

    const resend = getResendClient()
    const { type, name, email, message } = await request.json()

    let emailData
    
    if (type === 'contact') {
      // Contact form email
      emailData = {
        from: 'Abode Website <onboarding@resend.dev>',
        to: ['ugenedc@gmail.com'],
        subject: 'New Contact Form Submission - Abode',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #8B5CF6; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #495057;">Contact Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #495057;">Message</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #e7f3ff; border-radius: 8px; font-size: 14px; color: #0066cc;">
              <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              <p><strong>Source:</strong> Abode Website Contact Form</p>
            </div>
          </div>
        `,
      }
    } else if (type === 'waitlist') {
      // Waitlist signup email
      emailData = {
        from: 'Abode Website <onboarding@resend.dev>',
        to: ['ugenedc@gmail.com'],
        subject: 'New Waitlist Signup - Abode',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #8B5CF6; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">New Waitlist Signup</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #495057;">Signup Details</h3>
              <p><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #e7f3ff; border-radius: 8px; font-size: 14px; color: #0066cc;">
              <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              <p><strong>Source:</strong> Abode Website Waitlist</p>
              <p><strong>Action Required:</strong> Add this email to the Abode waitlist</p>
            </div>
          </div>
        `,
      }
    } else {
      return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    const data = await resend.emails.send(emailData)

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      data 
    })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
} 