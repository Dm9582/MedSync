'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { Loader2, Shield } from 'lucide-react';

const adminLoginSchema = z.object({
  passcode: z.string().min(1, 'Passcode is required'),
});

type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

export function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { adminLogin } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    setLoading(true);
    setError('');
    
    try {
      await adminLogin(data.passcode);
      // Redirect to dashboard after successful admin login
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid passcode');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          Admin Access
        </CardTitle>
        <CardDescription className="text-center">
          Enter admin passcode to access dashboard
        </CardDescription>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-800">
          <p><strong>Demo Admin Access:</strong></p>
          <p>Passcode: 123456</p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="passcode">Admin Passcode</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="passcode"
                type="password"
                placeholder="Enter admin passcode"
                className="pl-10"
                {...register('passcode')}
              />
            </div>
            {errors.passcode && (
              <p className="text-sm text-red-600">{errors.passcode.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Access Dashboard'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}