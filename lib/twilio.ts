import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendSMS(to: string, message: string) {
  try {
    // In demo mode, just log the SMS instead of actually sending
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log('📱 Demo SMS would be sent to:', to);
      console.log('📝 Message:', message);
      return { success: true, demo: true };
    }

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('Twilio SMS error:', error);
    throw error;
  }
}

export async function sendAppointmentConfirmation(to: string, appointmentDetails: {
  date: string;
  time: string;
  doctor: string;
  department: string;
}) {
  const message = `🏥 MedSync अपॉइंटमेंट कन्फर्मेशन / Appointment Confirmation

✅ आपकी अपॉइंटमेंट कन्फर्म हो गई है!
Your appointment has been confirmed!

📅 दिनांक / Date: ${appointmentDetails.date}
⏰ समय / Time: ${appointmentDetails.time}
👨‍⚕️ डॉक्टर / Doctor: ${appointmentDetails.doctor}
🏥 विभाग / Department: ${appointmentDetails.department}

📍 कृपया 15 मिनट पहले पहुंचें
Please arrive 15 minutes early

🆘 आपातकाल के लिए: Emergency Services
📞 सहायता: Contact Support

धन्यवाद! Thank you!
- MedSync Team`;

  return sendSMS(to, message);
}

export async function sendBedBookingConfirmation(to: string, bedDetails: {
  bedNumber: string;
  ward: string;
  date: string;
}) {
  const message = `🏥 MedSync बेड बुकिंग कन्फर्मेशन / Bed Booking Confirmation

✅ आपका बेड बुकिंग कन्फर्म हो गया है!
Your bed booking has been confirmed!

🛏️ बेड नंबर / Bed Number: ${bedDetails.bedNumber}
🏥 वार्ड / Ward: ${bedDetails.ward}
📅 दिनांक / Date: ${bedDetails.date}

📋 कृपया निम्नलिखित दस्तावेज लेकर आएं:
Please bring the following documents:
• आधार कार्ड / Aadhar Card
• मेडिकल रिपोर्ट्स / Medical Reports
• बीमा कार्ड / Insurance Card

🆘 आपातकाल के लिए: Emergency Services
📞 सहायता: Contact Support

धन्यवाद! Thank you!
- MedSync Team`;

  return sendSMS(to, message);
}