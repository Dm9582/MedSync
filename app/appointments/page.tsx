'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Stethoscope, ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

interface Appointment {
  id: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  reason: string;
}

export default function AppointmentsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      department: 'Cardiology',
      doctor: 'Dr. Sarah Smith',
      date: '2024-01-15',
      time: '10:00',
      status: 'confirmed',
      reason: 'Regular checkup'
    },
    {
      id: '2',
      department: 'General Medicine',
      doctor: 'Dr. Ana Garcia',
      date: '2024-01-20',
      time: '14:00',
      status: 'pending',
      reason: 'Follow-up consultation'
    }
  ]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
              <p className="text-gray-600">View and manage your scheduled appointments</p>
            </div>
            <Link href="/appointments/book">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Book New Appointment
              </Button>
            </Link>
          </div>
        </div>

        {appointments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments yet</h3>
              <p className="text-gray-600 mb-4">You haven't booked any appointments yet.</p>
              <Link href="/appointments/book">
                <Button>Book Your First Appointment</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Stethoscope className="h-5 w-5 text-blue-600" />
                        {appointment.department}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4" />
                        {appointment.doctor}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{appointment.time}</span>
                    </div>
                    <div className="md:col-span-1">
                      <p className="text-sm text-gray-600">{appointment.reason}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    {appointment.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}