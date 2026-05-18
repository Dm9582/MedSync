'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { useAuth } from '@/contexts/auth-context';
import { Calendar, Bed, Bot, MapPin, Clock, Users, Award } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-600 rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-teal-600 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-400 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-teal-400 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('welcome')}
            <span className="block text-blue-600 mt-2">
              Advanced Healthcare Management
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('tagline')} - Experience seamless healthcare with our AI-powered platform, 
            featuring smart appointment booking, bed reservations, and 24/7 health assistance.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">55% Faster</h3>
              <p className="text-gray-600 text-sm">Reduced waiting times with smart scheduling</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-teal-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mx-auto mb-4">
                <Bot className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">24/7 health assistant for instant guidance</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">99.9% Uptime</h3>
              <p className="text-gray-600 text-sm">Reliable healthcare services when you need them</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth">
                  <Button size="lg" className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Login / Register
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300">
                    Demo Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Link href={user ? "/appointments/book" : "/auth"} className="group">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('bookAppointment')}</h3>
              <p className="text-gray-600 text-sm">Schedule with top specialists</p>
            </div>
          </Link>

          <Link href={user ? "/beds/book" : "/auth"} className="group">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 group-hover:bg-green-200 transition-colors">
                <Bed className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('bookBed')}</h3>
              <p className="text-gray-600 text-sm">Reserve hospital beds instantly</p>
            </div>
          </Link>

          <Link href={user ? "/ai-assistant" : "/auth"} className="group">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 group-hover:bg-purple-200 transition-colors">
                <Bot className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('aiAssistant')}</h3>
              <p className="text-gray-600 text-sm">Get instant health guidance</p>
            </div>
          </Link>

          <Link href="/emergency" className="group">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-red-200 transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4 group-hover:bg-red-200 transition-colors">
                <MapPin className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('emergency')}</h3>
              <p className="text-gray-600 text-sm">Find nearest emergency care</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}