'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bed, User, MapPin, ArrowLeft, Search, Filter, CheckCircle, XCircle, Clock3, Calendar } from 'lucide-react';
import Link from 'next/link';

interface AdminBedBooking {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  bedType: string;
  ward: string;
  bedNumber?: string;
  admissionDate: string;
  dischargeDate?: string;
  status: 'pending' | 'confirmed' | 'occupied' | 'discharged' | 'cancelled';
  reason: string;
  emergencyContact: string;
  createdAt: string;
}

export default function AdminBedsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bedBookings, setBedBookings] = useState<AdminBedBooking[]>([
    {
      id: '1',
      patientName: 'Alice Johnson',
      patientEmail: 'alice@example.com',
      patientPhone: '+1-555-0126',
      bedType: 'private',
      ward: 'Private Wing',
      bedNumber: 'P-101',
      admissionDate: '2024-01-15',
      dischargeDate: '2024-01-18',
      status: 'confirmed',
      reason: 'Post-surgery recovery',
      emergencyContact: '+1-555-0127',
      createdAt: '2024-01-10T09:00:00Z'
    },
    {
      id: '2',
      patientName: 'Bob Wilson',
      patientEmail: 'bob@example.com',
      patientPhone: '+1-555-0128',
      bedType: 'general',
      ward: 'General Ward A',
      admissionDate: '2024-01-16',
      status: 'pending',
      reason: 'Observation for chest pain',
      emergencyContact: '+1-555-0129',
      createdAt: '2024-01-11T14:30:00Z'
    },
    {
      id: '3',
      patientName: 'Carol Davis',
      patientEmail: 'carol@example.com',
      patientPhone: '+1-555-0130',
      bedType: 'icu',
      ward: 'ICU',
      bedNumber: 'ICU-05',
      admissionDate: '2024-01-14',
      status: 'occupied',
      reason: 'Critical care monitoring',
      emergencyContact: '+1-555-0131',
      createdAt: '2024-01-09T11:15:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
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

  if (!user || user.role !== 'admin') {
    return null;
  }

  const updateBedStatus = (id: string, newStatus: AdminBedBooking['status']) => {
    setBedBookings(prev => 
      prev.map(booking => {
        if (booking.id === id) {
          const updated = { ...booking, status: newStatus };
          // Auto-assign bed number when confirming
          if (newStatus === 'confirmed' && !updated.bedNumber) {
            const bedTypePrefix = booking.bedType === 'icu' ? 'ICU' : 
                                 booking.bedType === 'private' ? 'P' : 'G';
            updated.bedNumber = `${bedTypePrefix}-${Math.floor(Math.random() * 100 + 1).toString().padStart(2, '0')}`;
          }
          return updated;
        }
        return booking;
      })
    );
  };

  const filteredBookings = bedBookings.filter(booking => {
    const matchesSearch = booking.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bedType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'discharged':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock3 className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'occupied':
        return <Bed className="h-4 w-4" />;
      case 'discharged':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock3 className="h-4 w-4" />;
    }
  };

  const statusCounts = {
    total: bedBookings.length,
    pending: bedBookings.filter(b => b.status === 'pending').length,
    confirmed: bedBookings.filter(b => b.status === 'confirmed').length,
    occupied: bedBookings.filter(b => b.status === 'occupied').length,
    discharged: bedBookings.filter(b => b.status === 'discharged').length,
    cancelled: bedBookings.filter(b => b.status === 'cancelled').length,
  };

  const getBedTypeDisplay = (bedType: string) => {
    const types: { [key: string]: string } = {
      'general': 'General Ward',
      'private': 'Private Room',
      'icu': 'ICU',
      'emergency': 'Emergency'
    };
    return types[bedType] || bedType;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Bed Bookings</h1>
          <p className="text-gray-600">View and manage all hospital bed reservations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{statusCounts.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{statusCounts.confirmed}</div>
              <div className="text-sm text-gray-600">Confirmed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.occupied}</div>
              <div className="text-sm text-gray-600">Occupied</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">{statusCounts.discharged}</div>
              <div className="text-sm text-gray-600">Discharged</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{statusCounts.cancelled}</div>
              <div className="text-sm text-gray-600">Cancelled</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by patient name, ward, or bed type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="discharged">Discharged</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bed Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      {booking.patientName}
                      {booking.bedNumber && (
                        <Badge variant="outline" className="ml-2">
                          Bed {booking.bedNumber}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {booking.patientEmail} • {booking.patientPhone}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
                    {getStatusIcon(booking.status)}
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">{getBedTypeDisplay(booking.bedType)}</div>
                      <div className="text-xs text-gray-500">{booking.ward}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">Admission</div>
                      <div className="text-xs text-gray-500">{new Date(booking.admissionDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  {booking.dischargeDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Discharge</div>
                        <div className="text-xs text-gray-500">{new Date(booking.dischargeDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    Emergency: {booking.emergencyContact}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Reason:</strong> {booking.reason}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Booked: {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateBedStatus(booking.id, 'confirmed')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Confirm & Assign Bed
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateBedStatus(booking.id, 'cancelled')}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="mr-1 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                )}

                {booking.status === 'confirmed' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateBedStatus(booking.id, 'occupied')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Mark as Occupied
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateBedStatus(booking.id, 'cancelled')}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {booking.status === 'occupied' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateBedStatus(booking.id, 'discharged')}
                      className="bg-gray-600 hover:bg-gray-700"
                    >
                      Discharge Patient
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Bed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No bed bookings found</h3>
              <p className="text-gray-600">No bed bookings match your current filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}