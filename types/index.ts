export interface User {
  $id: string;
  name: string;
  email: string;
  phone: string;
  role: 'patient' | 'admin';
  createdAt: string;
}

export interface Appointment {
  $id?: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BedBooking {
  $id?: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  bedType: string;
  ward: string;
  bedNumber?: string;
  admissionDate: string;
  dischargeDate?: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'occupied' | 'discharged' | 'cancelled';
  emergencyContact: string;
  medicalHistory: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface Department {
  id: string;
  name: string;
  doctors: Doctor[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  availableSlots: string[];
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface EmergencyService {
  id: string;
  name: string;
  phone: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}