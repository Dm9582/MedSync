import { NextRequest, NextResponse } from 'next/server';
import { sendAppointmentConfirmation } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  try {
    const { to, appointmentDetails } = await request.json();

    if (!to || !appointmentDetails) {
      return NextResponse.json(
        { error: 'Phone number and appointment details are required' },
        { status: 400 }
      );
    }

    // In demo mode, just simulate SMS sending
    console.log('Demo SMS would be sent to:', to);
    console.log('Appointment details:', appointmentDetails);

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