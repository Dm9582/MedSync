'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/auth/login-form';
import { RegisterForm } from '@/components/auth/register-form';
import { AdminLogin } from '@/components/auth/admin-login';
import { Button } from '@/components/ui/button';
import { Shield, User } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register' | 'admin'>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MedSync</h1>
          <p className="text-gray-600">Your Health, Our Priority</p>
          
          {/* Demo Credentials Info */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
            <h3 className="font-semibold text-blue-900 mb-2">Demo Access:</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>Patient Login:</strong> demo@medsync.com / 123456</p>
              <p><strong>Admin Access:</strong> Use passcode <code className="bg-blue-100 px-1 rounded">123456</code></p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          <Button
            variant={mode === 'login' || mode === 'register' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('login')}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Patient
          </Button>
          <Button
            variant={mode === 'admin' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('admin')}
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            Admin
          </Button>
        </div>

        {mode === 'admin' ? (
          <AdminLogin />
        ) : mode === 'login' ? (
          <LoginForm onToggleMode={() => setMode('register')} />
        ) : (
          <RegisterForm onToggleMode={() => setMode('login')} />
        )}
      </div>
    </div>
  );
}