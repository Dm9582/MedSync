import { Department, Language, EmergencyService } from '@/types';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    doctors: [
      { id: 'dr-smith', name: 'Dr. Sarah Smith', specialization: 'Cardiologist', availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { id: 'dr-johnson', name: 'Dr. Michael Johnson', specialization: 'Cardiac Surgeon', availableSlots: ['08:00', '09:00', '13:00', '14:00', '16:00'] },
    ]
  },
  {
    id: 'neurology',
    name: 'Neurology',
    doctors: [
      { id: 'dr-davis', name: 'Dr. Emily Davis', specialization: 'Neurologist', availableSlots: ['09:00', '10:00', '11:00', '15:00', '16:00'] },
      { id: 'dr-wilson', name: 'Dr. James Wilson', specialization: 'Neurosurgeon', availableSlots: ['08:00', '10:00', '13:00', '14:00', '17:00'] },
    ]
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    doctors: [
      { id: 'dr-brown', name: 'Dr. Robert Brown', specialization: 'Orthopedic Surgeon', availableSlots: ['08:00', '09:00', '10:00', '14:00', '15:00'] },
      { id: 'dr-taylor', name: 'Dr. Lisa Taylor', specialization: 'Sports Medicine', availableSlots: ['09:00', '11:00', '13:00', '15:00', '16:00'] },
    ]
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    doctors: [
      { id: 'dr-anderson', name: 'Dr. Maria Anderson', specialization: 'Pediatrician', availableSlots: ['08:00', '09:00', '10:00', '11:00', '14:00'] },
      { id: 'dr-martinez', name: 'Dr. Carlos Martinez', specialization: 'Pediatric Surgeon', availableSlots: ['09:00', '10:00', '13:00', '15:00', '16:00'] },
    ]
  },
  {
    id: 'general',
    name: 'General Medicine',
    doctors: [
      { id: 'dr-garcia', name: 'Dr. Ana Garcia', specialization: 'General Practitioner', availableSlots: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'] },
      { id: 'dr-lee', name: 'Dr. David Lee', specialization: 'Internal Medicine', availableSlots: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'] },
    ]
  }
];

export const BED_TYPES = [
  { id: 'general', name: 'General Ward', price: 100 },
  { id: 'private', name: 'Private Room', price: 250 },
  { id: 'icu', name: 'ICU', price: 500 },
  { id: 'emergency', name: 'Emergency', price: 300 },
];

export const WARDS = [
  'General Ward A',
  'General Ward B',
  'Private Wing',
  'ICU',
  'Emergency Ward',
  'Pediatric Ward',
  'Maternity Ward',
];

export const EMERGENCY_SERVICES: EmergencyService[] = [
  {
    id: 'hospital-main',
    name: 'MedSync Main Hospital',
    phone: '+1-555-0123',
    address: '123 Medical Center Dr, Healthcare City, HC 12345',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 'emergency-center',
    name: 'Emergency Medical Center',
    phone: '+1-555-0911',
    address: '456 Emergency Ave, Healthcare City, HC 12346',
    coordinates: { lat: 40.7589, lng: -73.9851 }
  },
  {
    id: 'urgent-care',
    name: '24/7 Urgent Care',
    phone: '+1-555-0247',
    address: '789 Urgent Care Blvd, Healthcare City, HC 12347',
    coordinates: { lat: 40.7505, lng: -73.9934 }
  }
];

export const ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || '123456';

export const TRANSLATIONS = {
  en: {
    welcome: 'Welcome to MedSync',
    tagline: 'Your Health, Our Priority',
    bookAppointment: 'Book Appointment',
    bookBed: 'Book Bed',
    aiAssistant: 'AI Health Assistant',
    emergency: 'Emergency Services',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    logout: 'Logout',
    myAppointments: 'My Appointments',
    contactSupport: 'Contact Support',
  },
  hi: {
    welcome: 'मेडसिंक में आपका स्वागत है',
    tagline: 'आपका स्वास्थ्य, हमारी प्राथमिकता',
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    bookBed: 'बेड बुक करें',
    aiAssistant: 'एआई स्वास्थ्य सहायक',
    emergency: 'आपातकालीन सेवाएं',
    login: 'लॉगिन',
    register: 'रजिस्टर करें',
    dashboard: 'डैशबोर्ड',
    logout: 'लॉगआउट',
    myAppointments: 'मेरी अपॉइंटमेंट्स',
    contactSupport: 'सहायता संपर्क',
  }
};