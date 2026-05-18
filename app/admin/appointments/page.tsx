'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Stethoscope, ArrowLeft, Search, Filter, CheckCircle, XCircle, Clock3 } from 'lucide-react';
import Link from 'next/link';

interface AdminAppointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reason: string;
  createdAt: string;
}

export default function AdminAppointmentsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<AdminAppointment[]>([
    {
      id: '1',
      patientName: 'John Doe',
      patientEmail: 'john@example.com',
      patientPhone: '+1-555-0123',
      department: 'Cardiology',
      doctor: 'Dr. Sarah Smith',
      date: '2024-01-15',
      time: '10:00',
      status: 'pending',
      reason: 'Regular checkup for heart condition',
      createdAt: '2024-01-10T09:00:00Z'
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      patientEmail: 'jane@example.com',
      patientPhone: '+1-555-0124',
      department: 'General Medicine',
      doctor: 'Dr. Ana Garcia',
      date: '2024-01-16',
      time: '14:00',
      status: 'confirmed',
      reason: 'Follow-up consultation for diabetes',
      createdAt: '2024-01-11T10:30:00Z'
    },
    {
      id: '3',
      patientName: 'Mike Johnson',
      patientEmail: 'mike@example.com',
      patientPhone: '+1-555-0125',
      department: 'Orthopedics',
      doctor: 'Dr. Robert Brown',
      date: '2024-01-17',
      time: '09:00',
      status: 'pending',
      reason: 'Knee pain after sports injury',
      createdAt: '2024-01-12T14:15:00Z'
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

  const updateAppointmentStatus = (id: string, newStatus: AdminAppointment['status']) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
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
      case 'completed':
        return 'bg-blue-100 text-blue-800';
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
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock3 className="h-4 w-4" />;
    }
  };

  const statusCounts = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Appointments</h1>
          <p className="text-gray-600">View and manage all patient appointments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
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
              <div className="text-2xl font-bold text-blue-600">{statusCounts.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
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
                    placeholder="Search by patient name, doctor, or department..."
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      {appointment.patientName}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {appointment.patientEmail} • {appointment.patientPhone}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(appointment.status)} flex items-center gap-1`}>
                    {getStatusIcon(appointment.status)}
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">{appointment.department}</div>
                      <div className="text-xs text-gray-500">{appointment.doctor}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{new Date(appointment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Booked: {new Date(appointment.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Reason:</strong> {appointment.reason}
                  </p>
                </div>

                {appointment.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="mr-1 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                )}

                {appointment.status === 'confirmed' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Mark Complete
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600">No appointments match your current filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}