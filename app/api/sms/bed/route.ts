import { NextRequest, NextResponse } from 'next/server';
import { sendBedBookingConfirmation } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  try {
    const { to, bedDetails } = await request.json();

    if (!to || !bedDetails) {
      return NextResponse.json(
        { error: 'Phone number and bed details are required' },
        { status: 400 }
      );
    }

    // In demo mode, just simulate SMS sending
    console.log('Demo SMS would be sent to:', to);
    console.log('Bed details:', bedDetails);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: 'SMS sent successfully (demo mode)' 
    });
  } catch (error) {
    console.error('SMS API error:', error);
    return NextResponse.json(
      { error: 'Failed to send SMS' },
      { status: 500 }
    );
  }
}