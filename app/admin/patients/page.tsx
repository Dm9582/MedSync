'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Phone, Mail, ArrowLeft, Search, Filter, Calendar, MapPin, Heart } from 'lucide-react';
import Link from 'next/link';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string[];
  lastVisit: string;
  status: 'active' | 'inactive';
  registrationDate: string;
}

export default function AdminPatientsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'राज कुमार शर्मा',
      email: 'raj.sharma@gmail.com',
      phone: '+91-9876543210',
      age: 45,
      gender: 'male',
      bloodGroup: 'B+',
      address: 'सेक्टर 15, गुरुग्राम, हरियाणा',
      emergencyContact: '+91-9876543211',
      medicalHistory: ['Diabetes', 'Hypertension'],
      lastVisit: '2024-01-10',
      status: 'active',
      registrationDate: '2023-06-15'
    },
    {
      id: '2',
      name: 'प्रिया देवी',
      email: 'priya.devi@gmail.com',
      phone: '+91-8765432109',
      age: 32,
      gender: 'female',
      bloodGroup: 'A+',
      address: 'कनॉट प्लेस, नई दिल्ली',
      emergencyContact: '+91-8765432108',
      medicalHistory: ['Asthma'],
      lastVisit: '2024-01-12',
      status: 'active',
      registrationDate: '2023-08-20'
    },
    {
      id: '3',
      name: 'अमित पटेल',
      email: 'amit.patel@gmail.com',
      phone: '+91-7654321098',
      age: 28,
      gender: 'male',
      bloodGroup: 'O+',
      address: 'अहमदाबाद, गुजरात',
      emergencyContact: '+91-7654321097',
      medicalHistory: ['Allergies'],
      lastVisit: '2024-01-08',
      status: 'active',
      registrationDate: '2023-09-10'
    },
    {
      id: '4',
      name: 'सुनीता रानी',
      email: 'sunita.rani@gmail.com',
      phone: '+91-6543210987',
      age: 38,
      gender: 'female',
      bloodGroup: 'AB+',
      address: 'पुणे, महाराष्ट्र',
      emergencyContact: '+91-6543210986',
      medicalHistory: ['Thyroid', 'Migraine'],
      lastVisit: '2024-01-05',
      status: 'inactive',
      registrationDate: '2023-05-25'
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGenderIcon = (gender: string) => {
    return gender === 'female' ? '👩' : gender === 'male' ? '👨' : '👤';
  };

  const statusCounts = {
    total: patients.length,
    active: patients.filter(p => p.status === 'active').length,
    inactive: patients.filter(p => p.status === 'inactive').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="outline" className="mb-4 border-orange-200 text-orange-700 hover:bg-orange-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              डैशबोर्ड पर वापस जाएं
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">रोगी प्रबंधन</h1>
          </div>
          <p className="text-gray-600">सभी पंजीकृत रोगियों को देखें और प्रबंधित करें</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-700">{statusCounts.total}</div>
                  <div className="text-sm text-orange-600">कुल रोगी</div>
                </div>
                <User className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-700">{statusCounts.active}</div>
                  <div className="text-sm text-green-600">सक्रिय रोगी</div>
                </div>
                <Heart className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-700">{statusCounts.inactive}</div>
                  <div className="text-sm text-gray-600">निष्क्रिय रोगी</div>
                </div>
                <User className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-orange-200">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="नाम, ईमेल या फोन नंबर से खोजें..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-orange-200 focus:border-orange-400"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-orange-200">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">सभी स्थिति</SelectItem>
                    <SelectItem value="active">सक्रिय</SelectItem>
                    <SelectItem value="inactive">निष्क्रिय</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-lg transition-shadow border-orange-100 hover:border-orange-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">{getGenderIcon(patient.gender)}</span>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-600">{patient.age} वर्ष • {patient.bloodGroup} रक्त समूह</div>
                      </div>
                    </CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {patient.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {patient.phone}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(patient.status)} border`}>
                    {patient.status === 'active' ? 'सक्रिय' : 'निष्क्रिय'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <div className="text-sm font-medium">पता</div>
                      <div className="text-xs text-gray-600">{patient.address}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <div className="text-sm font-medium">आपातकालीन संपर्क</div>
                      <div className="text-xs text-gray-600">{patient.emergencyContact}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <div className="text-sm font-medium">अंतिम यात्रा</div>
                      <div className="text-xs text-gray-600">{new Date(patient.lastVisit).toLocaleDateString('hi-IN')}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">चिकित्सा इतिहास:</p>
                  <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.map((condition, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-orange-200 text-orange-700">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  पंजीकरण तिथि: {new Date(patient.registrationDate).toLocaleDateString('hi-IN')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card className="border-orange-200">
            <CardContent className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">कोई रोगी नहीं मिला</h3>
              <p className="text-gray-600">आपके वर्तमान फिल्टर से कोई रोगी मेल नहीं खाता।</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}