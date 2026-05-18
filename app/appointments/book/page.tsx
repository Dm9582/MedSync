'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DEPARTMENTS } from '@/lib/constants';
import { CalendarIcon, ArrowLeft, Clock, User, Stethoscope } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

const appointmentSchema = z.object({
  department: z.string().min(1, 'Please select a department'),
  doctor: z.string().min(1, 'Please select a doctor'),
  date: z.date({
    required_error: 'Please select a date',
  }),
  time: z.string().min(1, 'Please select a time'),
  reason: z.string().min(10, 'Please provide a detailed reason (minimum 10 characters)'),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export default function BookAppointmentPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const selectedDate = watch('date');

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

  const selectedDept = DEPARTMENTS.find(dept => dept.id === selectedDepartment);
  const availableDoctors = selectedDept?.doctors || [];
  const selectedDoc = availableDoctors.find(doc => doc.id === selectedDoctor);
  const availableSlots = selectedDoc?.availableSlots || [];

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send SMS notification
      const smsData = {
        to: user.phone,
        appointmentDetails: {
          date: format(data.date, 'PPP'),
          time: data.time,
          doctor: selectedDoc?.name || '',
          department: selectedDept?.name || '',
        }
      };

      await fetch('/api/sms/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smsData),
      });

      setShowSuccess(true);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Appointment Booked!</CardTitle>
            <CardDescription>
              Your appointment has been successfully scheduled. You'll receive an SMS confirmation shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/appointments">
              <Button className="w-full">View My Appointments</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
          <p className="text-gray-600">Schedule your appointment with our specialists</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>
              Please fill in all the required information to book your appointment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Department Selection */}
              <div className="space-y-2">
                <Label>Department</Label>
                <Select
                  value={selectedDepartment}
                  onValueChange={(value) => {
                    setSelectedDepartment(value);
                    setSelectedDoctor('');
                    setValue('department', value);
                    setValue('doctor', '');
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4" />
                          {dept.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-red-600">{errors.department.message}</p>
                )}
              </div>

              {/* Doctor Selection */}
              {selectedDepartment && (
                <div className="space-y-2">
                  <Label>Doctor</Label>
                  <Select
                    value={selectedDoctor}
                    onValueChange={(value) => {
                      setSelectedDoctor(value);
                      setValue('doctor', value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{doctor.name}</div>
                              <div className="text-sm text-gray-500">{doctor.specialization}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.doctor && (
                    <p className="text-sm text-red-600">{errors.doctor.message}</p>
                  )}
                </div>
              )}

              {/* Date Selection */}
              <div className="space-y-2">
                <Label>Appointment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => setValue('date', date!)}
                      disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              {/* Time Selection */}
              {selectedDoctor && (
                <div className="space-y-2">
                  <Label>Appointment Time</Label>
                  <Select onValueChange={(value) => setValue('time', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {slot}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.time && (
                    <p className="text-sm text-red-600">{errors.time.message}</p>
                  )}
                </div>
              )}

              {/* Reason */}
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  placeholder="Please describe your symptoms or reason for the appointment..."
                  className="min-h-[100px]"
                  {...register('reason')}
                />
                {errors.reason && (
                  <p className="text-sm text-red-600">{errors.reason.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Booking Appointment...' : 'Book Appointment'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}