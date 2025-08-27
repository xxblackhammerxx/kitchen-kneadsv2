import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    const states = await payload.find({
      collection: 'states',
      limit: 1000,
    })
    
    return NextResponse.json(states)
  } catch (error) {
    console.error('Error fetching states:', error)
    return NextResponse.json({ error: 'Failed to fetch states' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const data = await request.json()
    
    const state = await payload.create({
      collection: 'states',
      data,
    })
    
    return NextResponse.json(state)
  } catch (error) {
    console.error('Error creating state:', error)
    return NextResponse.json({ error: 'Failed to create state' }, { status: 500 })
  }
}