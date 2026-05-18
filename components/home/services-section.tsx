'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  Bed, 
  Bot, 
  MapPin, 
  Clock, 
  Shield, 
  Heart, 
  Users,
  Smartphone,
  Globe,
  Zap,
  CheckCircle
} from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: Calendar,
      title: 'Smart Appointment Booking',
      description: 'Book appointments with specialists using our intelligent scheduling system that minimizes wait times.',
      features: ['Real-time availability', 'Automated reminders', 'Easy rescheduling'],
      color: 'blue'
    },
    {
      icon: Bed,
      title: 'Hospital Bed Management',
      description: 'Reserve hospital beds across different wards with real-time availability and instant confirmation.',
      features: ['Live bed status', 'Multiple ward options', 'Priority booking'],
      color: 'green'
    },
    {
      icon: Bot,
      title: 'AI Health Assistant',
      description: '24/7 AI-powered health guidance providing basic remedies and medical advice for common symptoms.',
      features: ['Instant responses', 'Symptom analysis', 'Home remedies'],
      color: 'purple'
    },
    {
      icon: MapPin,
      title: 'Emergency Services',
      description: 'GPS-enabled emergency service locator with navigation to nearest medical facilities.',
      features: ['GPS navigation', 'Emergency contacts', 'Real-time directions'],
      color: 'red'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Access our platform in multiple languages including English, Spanish, and French.',
      features: ['3 languages', 'Cultural adaptation', 'Local preferences'],
      color: 'teal'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Fully responsive design optimized for mobile devices with offline capabilities.',
      features: ['Mobile optimized', 'Offline access', 'Push notifications'],
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100 border-blue-200 hover:border-blue-300',
      green: 'text-green-600 bg-green-100 border-green-200 hover:border-green-300',
      purple: 'text-purple-600 bg-purple-100 border-purple-200 hover:border-purple-300',
      red: 'text-red-600 bg-red-100 border-red-200 hover:border-red-300',
      teal: 'text-teal-600 bg-teal-100 border-teal-200 hover:border-teal-300',
      orange: 'text-orange-600 bg-orange-100 border-orange-200 hover:border-orange-300'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of healthcare management with our integrated platform 
            designed to make medical care more accessible, efficient, and personalized.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colorClasses = getColorClasses(service.color);
            
            return (
              <Card 
                key={index} 
                className={`hover:shadow-lg transition-all duration-300 border-2 ${colorClasses.split(' ').slice(2).join(' ')} group hover:scale-105`}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${colorClasses.split(' ').slice(1, 2).join(' ')} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-6 w-6 ${colorClasses.split(' ')[0]}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className={`h-4 w-4 ${colorClasses.split(' ')[0]}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform is designed with input from medical professionals to ensure 
              the highest standards of care and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Active Patients</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">Appointments Booked</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4">
                <Bot className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">25,000+</div>
              <div className="text-gray-600">AI Consultations</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                <Zap className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-600">System Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}