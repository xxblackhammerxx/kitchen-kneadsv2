import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { Resend } from 'resend'
import config from '@payload-config'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const data = await request.json()
    
    // Validate required fields
    if (!data.email || !data.name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 })
    }
    
    // Store lead in database
    const lead = await payload.create({
      collection: 'leads',
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        state: data.state,
        estimatedBill: data.estimatedBill,
        systemSize: data.systemSize,
        savings: data.savings,
      },
    })
    
    // Send email notification using Resend
    try {
      await resend.emails.send({
        from: process.env.RESEND_DEFAULT_FROM_ADDRESS || 'info@gainzmarketing.com',
        to: [data.email],
        subject: 'Thank you for your interest in solar!',
        html: `
          <h2>Thank you for your interest, ${data.name}!</h2>
          <p>We've received your inquiry and will get back to you soon.</p>
          <p><strong>Your Information:</strong></p>
          <ul>
            <li>Email: ${data.email}</li>
            <li>Phone: ${data.phone || 'Not provided'}</li>
            <li>State: ${data.state || 'Not provided'}</li>
            <li>Estimated Monthly Bill: ${data.estimatedBill ? '$' + data.estimatedBill : 'Not provided'}</li>
            <li>System Size: ${data.systemSize || 'Not provided'}</li>
            <li>Estimated Savings: ${data.savings ? '$' + data.savings : 'Not provided'}</li>
          </ul>
          <p>A solar specialist will contact you within 24 hours to discuss your options.</p>
        `,
      })
      
      // Send notification to admin
      await resend.emails.send({
        from: process.env.RESEND_DEFAULT_FROM_ADDRESS || 'info@gainzmarketing.com',
        to: [process.env.ADMIN_EMAIL || 'info@gainzmarketing.com'],
        subject: 'New Solar Lead Received',
        html: `
          <h2>New Lead Alert</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>State:</strong> ${data.state || 'Not provided'}</p>
          <p><strong>Monthly Bill:</strong> ${data.estimatedBill ? '$' + data.estimatedBill : 'Not provided'}</p>
          <p><strong>System Size:</strong> ${data.systemSize || 'Not provided'}</p>
          <p><strong>Estimated Savings:</strong> ${data.savings ? '$' + data.savings : 'Not provided'}</p>
          <p><strong>Lead ID:</strong> ${lead.id}</p>
        `,
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Don't fail the request if email fails
    }
    
    return NextResponse.json({ success: true, id: lead.id })
  } catch (error) {
    console.error('Error processing contact:', error)
    return NextResponse.json({ error: 'Failed to process contact' }, { status: 500 })
  }
}