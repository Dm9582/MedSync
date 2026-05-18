'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { Heart, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  const { user } = useAuth();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-teal-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join thousands of patients who have already discovered the convenience 
            of modern healthcare management with MedSync.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <Shield className="h-8 w-8 text-white mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Secure & Private</h3>
            <p className="text-blue-100 text-sm">Your health data is protected with enterprise-grade security</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <Clock className="h-8 w-8 text-white mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Save Time</h3>
            <p className="text-blue-100 text-sm">Reduce waiting times by up to 55% with smart scheduling</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
            <Users className="h-8 w-8 text-white mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Expert Care</h3>
            <p className="text-blue-100 text-sm">Connect with top healthcare professionals instantly</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {user ? (
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Login / Register
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/auth">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
                >
                  Demo Access
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="mt-8 text-blue-100 text-sm">
          No credit card required • Free forever • Setup in 2 minutes
        </div>
      </div>
    </section>
  );
}