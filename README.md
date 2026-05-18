# 🏥 MedSync - Advanced Healthcare Management System

[![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991)](https://openai.com/)
[![Twilio](https://img.shields.io/badge/Twilio-SMS-F22F46)](https://www.twilio.com/)

A comprehensive healthcare management platform with AI-powered health assistance, smart appointment booking, bed reservations, and emergency services. Built with modern web technologies and designed specifically for the Indian healthcare system.

## 🌟 Features

### 🔐 **Authentication System**
- **Patient Portal**: Secure login for patients
- **Admin Dashboard**: Administrative access with passcode
- **Demo Credentials**: Ready-to-test accounts
- **Role-based Access**: Different interfaces for patients and admins

### 📱 **Patient Features**
- **Smart Appointment Booking**: Book with specialists across departments
- **Hospital Bed Reservation**: Reserve beds in different wards (General, Private, ICU)
- **AI Health Assistant**: 24/7 medical guidance with Indian traditional remedies
- **Emergency Services**: GPS-enabled emergency facility locator
- **Appointment Management**: View, reschedule, and cancel appointments
- **SMS Notifications**: Automatic booking confirmations

### 👨‍⚕️ **Admin Features**
- **Dashboard Analytics**: Real-time statistics and metrics
- **Appointment Management**: Approve, confirm, and track all appointments
- **Bed Management**: Monitor bed occupancy and bookings
- **Patient Database**: Comprehensive patient records and history
- **Status Tracking**: Real-time updates on all bookings

### 🤖 **AI Health Assistant**
- **Bilingual Support**: Responses in Hindi and English
- **Traditional Remedies**: Ayurvedic and home remedies
- **Symptom Analysis**: Intelligent symptom assessment
- **Emergency Detection**: Identifies serious conditions requiring immediate care
- **Cultural Sensitivity**: Adapted for Indian dietary habits and climate

### 🌐 **Multilingual Support**
- **Hindi (हिंदी)**: Complete Hindi interface
- **English**: Full English support
- **Dynamic Language Switching**: Seamless language transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional for AI features)
- Twilio account (optional for SMS)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/medsync.git
cd medsync
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

4. **Configure Environment Variables** (Optional)
```env
# OpenAI Configuration (for AI Assistant)
OPENAI_API_KEY=your_openai_api_key

# Twilio Configuration (for SMS)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Admin Configuration
NEXT_PUBLIC_ADMIN_PASSCODE=123456
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## 🔑 Demo Credentials

### Patient Login
- **Email**: `demo@medsync.com`
- **Password**: `123456`

### Admin Login
- **Passcode**: `123456`

## 📁 Project Structure

```
medsync/
├── app/                          # Next.js 13 App Router
│   ├── admin/                    # Admin pages
│   │   ├── appointments/         # Appointment management
│   │   ├── beds/                 # Bed management
│   │   └── patients/             # Patient management
│   ├── appointments/             # Patient appointment pages
│   ├── beds/                     # Bed booking pages
│   ├── ai-assistant/             # AI health assistant
│   ├── emergency/                # Emergency services
│   ├── contact/                  # Contact support
│   ├── auth/                     # Authentication pages
│   └── api/                      # API routes
├── components/                   # Reusable components
│   ├── auth/                     # Authentication components
│   ├── home/                     # Homepage components
│   ├── layout/                   # Layout components
│   ├── ai-assistant/             # AI chat interface
│   └── ui/                       # UI components (shadcn/ui)
├── contexts/                     # React contexts
│   ├── auth-context.tsx          # Authentication state
│   └── language-context.tsx      # Language state
├── lib/                          # Utility libraries
│   ├── appwrite.ts               # Appwrite configuration
│   ├── openai.ts                 # OpenAI integration
│   ├── twilio.ts                 # Twilio SMS integration
│   ├── constants.ts              # App constants
│   └── utils.ts                  # Utility functions
└── types/                        # TypeScript type definitions
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Custom auth with demo credentials
- **AI Integration**: OpenAI GPT-3.5 Turbo
- **SMS Service**: Twilio
- **Database**: Appwrite (configured but optional)
- **Deployment**: Vercel-ready

## 🎯 Key Features Explained

### AI Health Assistant
The AI assistant is trained specifically for Indian healthcare needs:
- **Traditional Remedies**: Turmeric, tulsi, neem, ginger, ajwain
- **Cultural Context**: Indian dietary habits and climate considerations
- **Safety First**: Emergency detection and professional medical advice
- **Bilingual**: Responds in both Hindi and English

### Smart Booking System
- **Real-time Availability**: Live slot checking
- **Department-wise Doctors**: Specialized doctor selection
- **Automated Confirmations**: SMS and email notifications
- **Easy Rescheduling**: One-click appointment changes

### Emergency Services
- **GPS Location**: Automatic location detection
- **Distance Calculation**: Find nearest hospitals
- **Direct Actions**: Call and navigate buttons
- **Emergency Contacts**: Quick access to emergency numbers

## 🔧 Configuration

### OpenAI Setup (Optional)
1. Get API key from [OpenAI Platform](https://platform.openai.com/)
2. Add to `.env.local`: `OPENAI_API_KEY=your_key_here`
3. AI assistant will work with enhanced responses

### Twilio Setup (Optional)
1. Create account at [Twilio](https://www.twilio.com/)
2. Get Account SID, Auth Token, and Phone Number
3. Add to `.env.local`
4. SMS notifications will be sent for bookings

### Appwrite Setup (Optional)
1. Create project at [Appwrite](https://appwrite.io/)
2. Configure database and collections
3. Add credentials to `.env.local`
4. Enable persistent data storage

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Static export compatible
- **Railway**: Full-stack deployment
- **DigitalOcean**: App Platform ready

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **OpenAI** for AI capabilities
- **Twilio** for SMS services
- **Vercel** for hosting platform
- **Indian Healthcare System** for inspiration and requirements

## 📞 Support

For support, email support@medsync.com or join our Slack channel.

## 🔗 Links

- **Live Demo**: [https://medsync-demo.vercel.app](https://medsync-demo.vercel.app)
- **Documentation**: [https://docs.medsync.com](https://docs.medsync.com)
- **API Reference**: [https://api.medsync.com](https://api.medsync.com)

---

Made with ❤️ for Indian Healthcare System