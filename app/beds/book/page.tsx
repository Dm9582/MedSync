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
import { BED_TYPES, WARDS } from '@/lib/constants';
import { CalendarIcon, ArrowLeft, Bed, MapPin, Phone } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

const bedBookingSchema = z.object({
  bedType: z.string().min(1, 'Please select a bed type'),
  ward: z.string().min(1, 'Please select a ward'),
  admissionDate: z.date({
    required_error: 'Please select admission date',
  }),
  dischargeDate: z.date().optional(),
  reason: z.string().min(10, 'Please provide a detailed reason (minimum 10 characters)'),
  emergencyContact: z.string().min(10, 'Please provide emergency contact number'),
  medicalHistory: z.string().min(5, 'Please provide brief medical history'),
});

type BedBookingFormData = z.infer<typeof bedBookingSchema>;

export default function BookBedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BedBookingFormData>({
    resolver: zodResolver(bedBookingSchema),
  });

  const admissionDate = watch('admissionDate');
  const dischargeDate = watch('dischargeDate');
  const selectedBedType = watch('bedType');

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

  const selectedBedTypeInfo = BED_TYPES.find(type => type.id === selectedBedType);

  const onSubmit = async (data: BedBookingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send SMS notification
      const smsData = {
        to: user.phone,
        bedDetails: {
          bedNumber: 'B-' + Math.floor(Math.random() * 100 + 1),
          ward: data.ward,
          date: format(data.admissionDate, 'PPP'),
        }
      };

      await fetch('/api/sms/bed', {
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
              <Bed className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Bed Booked!</CardTitle>
            <CardDescription>
              Your bed has been successfully reserved. You'll receive an SMS confirmation with bed details shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard">
              <Button className="w-full">Back to Dashboard</Button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Hospital Bed</h1>
          <p className="text-gray-600">Reserve a bed for hospital admission</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bed Booking Details</CardTitle>
            <CardDescription>
              Please provide all required information for bed reservation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Bed Type Selection */}
              <div className="space-y-2">
                <Label>Bed Type</Label>
                <Select onValueChange={(value) => setValue('bedType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bed type" />
                  </SelectTrigger>
                  <SelectContent>
                    {BED_TYPES.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4" />
                            {type.name}
                          </div>
                          <span className="text-sm text-gray-500 ml-4">${type.price}/day</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedBedTypeInfo && (
                  <p className="text-sm text-gray-600">
                    Cost: ${selectedBedTypeInfo.price} per day
                  </p>
                )}
                {errors.bedType && (
                  <p className="text-sm text-red-600">{errors.bedType.message}</p>
                )}
              </div>

              {/* Ward Selection */}
              <div className="space-y-2">
                <Label>Ward</Label>
                <Select onValueChange={(value) => setValue('ward', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ward" />
                  </SelectTrigger>
                  <SelectContent>
                    {WARDS.map((ward) => (
                      <SelectItem key={ward} value={ward}>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {ward}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ward && (
                  <p className="text-sm text-red-600">{errors.ward.message}</p>
                )}
              </div>

              {/* Admission Date */}
              <div className="space-y-2">
                <Label>Admission Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {admissionDate ? format(admissionDate, 'PPP') : 'Pick admission date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={admissionDate}
                      onSelect={(date) => setValue('admissionDate', date!)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.admissionDate && (
                  <p className="text-sm text-red-600">{errors.admissionDate.message}</p>
                )}
              </div>

              {/* Expected Discharge Date (Optional) */}
              <div className="space-y-2">
                <Label>Expected Discharge Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dischargeDate ? format(dischargeDate, 'PPP') : 'Pick discharge date (optional)'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dischargeDate}
                      onSelect={(date) => setValue('dischargeDate', date)}
                      disabled={(date) => date < (admissionDate || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="emergencyContact"
                    type="tel"
                    placeholder="Enter emergency contact number"
                    className="pl-10"
                    {...register('emergencyContact')}
                  />
                </div>
                {errors.emergencyContact && (
                  <p className="text-sm text-red-600">{errors.emergencyContact.message}</p>
                )}
              </div>

              {/* Reason for Admission */}
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Admission</Label>
                <Textarea
                  id="reason"
                  placeholder="Please describe the reason for hospital admission..."
                  className="min-h-[100px]"
                  {...register('reason')}
                />
                {errors.reason && (
                  <p className="text-sm text-red-600">{errors.reason.message}</p>
                )}
              </div>

              {/* Medical History */}
              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Brief Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  placeholder="Please provide relevant medical history, allergies, current medications..."
                  className="min-h-[100px]"
                  {...register('medicalHistory')}
                />
                {errors.medicalHistory && (
                  <p className="text-sm text-red-600">{errors.medicalHistory.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Booking Bed...' : 'Book Bed'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}