'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Bed, Bot, MapPin, Phone, Clock, Users, Heart, Shield, Activity, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-orange-700 font-medium">लोड हो रहा है... / Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (user.role === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user.name}</p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Total Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">156</div>
                <p className="text-xs text-blue-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-green-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Bed Occupancy</CardTitle>
                <Bed className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">42/60</div>
                <p className="text-xs text-green-600">70% occupancy rate</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Active Patients</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">1,247</div>
                <p className="text-xs text-purple-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-700">AI Consultations</CardTitle>
                <Bot className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">892</div>
                <p className="text-xs text-orange-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +23% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Manage hospital operations efficiently</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/admin/appointments">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700" size="lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    Manage Appointments (24 pending)
                  </Button>
                </Link>
                <Link href="/admin/beds">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700" size="lg">
                    <Bed className="mr-2 h-5 w-5" />
                    Manage Bed Bookings (8 pending)
                  </Button>
                </Link>
                <Link href="/admin/patients">
                  <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700" size="lg">
                    <Users className="mr-2 h-5 w-5" />
                    Patient Management
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest system updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800">New appointment booked</p>
                      <p className="text-xs text-green-600">राज कुमार शर्मा - Cardiology - 2 min ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-800">Bed booking confirmed</p>
                      <p className="text-xs text-blue-600">प्रिया देवी - Private Room - 5 min ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-purple-800">AI consultation completed</p>
                      <p className="text-xs text-purple-600">अमित पटेल - Fever symptoms - 8 min ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-orange-800">Emergency service used</p>
                      <p className="text-xs text-orange-600">सुनीता रानी - Location: Mumbai - 12 min ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">रोगी डैशबोर्ड</h1>
              <p className="text-gray-600">नमस्ते, {user.name} - आपका स्वास्थ्य, हमारी प्राथमिकता</p>
            </div>
          </div>
          
          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-orange-100 to-green-100 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-orange-600" />
              <div>
                <h3 className="font-semibold text-orange-800">स्वागत है मेडसिंक में! Welcome to MedSync!</h3>
                <p className="text-sm text-orange-700">आपकी स्वास्थ्य यात्रा में हमारा साथ / Your health journey partner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 border-orange-200 hover:border-orange-300 bg-gradient-to-br from-white to-orange-50 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div>अपॉइंटमेंट बुक करें</div>
                  <div className="text-sm font-normal text-gray-600">Book Appointment</div>
                </div>
              </CardTitle>
              <CardDescription>
                विशेषज्ञ डॉक्टरों के साथ अपॉइंटमेंट बुक करें
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/appointments/book">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 group-hover:scale-105 transition-transform">
                  अभी बुक करें / Book Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-green-200 hover:border-green-300 bg-gradient-to-br from-white to-green-50 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Bed className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div>बेड बुक करें</div>
                  <div className="text-sm font-normal text-gray-600">Book Hospital Bed</div>
                </div>
              </CardTitle>
              <CardDescription>
                अस्पताल में भर्ती के लिए बेड आरक्षित करें
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/beds/book">
                <Button className="w-full bg-green-600 hover:bg-green-700 group-hover:scale-105 transition-transform">
                  बेड बुक करें / Book Bed
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-300 bg-gradient-to-br from-white to-purple-50 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Bot className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div>AI स्वास्थ्य सहायक</div>
                  <div className="text-sm font-normal text-gray-600">AI Health Assistant</div>
                </div>
              </CardTitle>
              <CardDescription>
                24/7 स्वास्थ्य सलाह और घरेलू उपचार
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/ai-assistant">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 group-hover:scale-105 transition-transform">
                  अभी चैट करें / Chat Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-red-200 hover:border-red-300 bg-gradient-to-br from-white to-red-50 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <MapPin className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div>आपातकालीन सेवाएं</div>
                  <div className="text-sm font-normal text-gray-600">Emergency Services</div>
                </div>
              </CardTitle>
              <CardDescription>
                निकटतम आपातकालीन चिकित्सा सेवाएं खोजें
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/emergency">
                <Button className="w-full bg-red-600 hover:bg-red-700 group-hover:scale-105 transition-transform">
                  आपातकाल / Emergency
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-blue-200 hover:border-blue-300 bg-gradient-to-br from-white to-blue-50 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div>मेरी अपॉइंटमेंट्स</div>
                  <div className="text-sm font-normal text-gray-600">My Appointments</div>
                </div>
              </CardTitle>
              <CardDescription>
                अपनी अपॉइंटमेंट्स देखें और प्रबंधित करें
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/appointments">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 group-hover:scale-105 transition-transform">
                  सभी देखें / View All
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-teal-200 hover:border-teal-300 bg-gradient-to-br from-white to-teal-50 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                  <Phone className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <div>सहायता संपर्क</div>
                  <div className="text-sm font-normal text-gray-600">Contact Support</div>
                </div>
              </CardTitle>
              <CardDescription>
                हमारी सहायता टीम से मदद प्राप्त करें
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/contact">
                <Button className="w-full bg-teal-600 hover:bg-teal-700 group-hover:scale-105 transition-transform">
                  संपर्क करें / Contact Us
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Health Tips Section */}
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Heart className="h-5 w-5" />
              आज का स्वास्थ्य सुझाव / Today's Health Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
                <div className="text-2xl mb-2">🧘‍♀️</div>
                <h4 className="font-semibold text-orange-800 mb-1">योग और ध्यान</h4>
                <p className="text-sm text-orange-700">Daily yoga keeps you healthy</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                <div className="text-2xl mb-2">🥗</div>
                <h4 className="font-semibold text-green-800 mb-1">संतुलित आहार</h4>
                <p className="text-sm text-green-700">Eat fresh fruits and vegetables</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                <div className="text-2xl mb-2">💧</div>
                <h4 className="font-semibold text-blue-800 mb-1">पानी पिएं</h4>
                <p className="text-sm text-blue-700">Drink 8-10 glasses of water daily</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}