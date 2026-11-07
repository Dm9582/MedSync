'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { account } from '@/lib/appwrite';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
  adminLogin: (passcode: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await account.get();
      setUser({
        $id: session.$id,
        name: session.name,
        email: session.email,
        phone: session.phone || '',
        role: session.labels?.includes('admin') ? 'admin' : 'patient',
        createdAt: session.$createdAt,
      });
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // Demo credentials for testing
    if (email === 'demo@medsync.com' && password === '123456') {
      setUser({
        $id: 'demo-patient',
        name: 'Demo Patient',
        email: 'demo@medsync.com',
        phone: '+1-555-0123',
        role: 'patient',
        createdAt: new Date().toISOString(),
      });
      return;
    }

    try {
      await account.createEmailPasswordSession(email, password);
      await checkAuth();
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, phone: string) => {
    try {
      await account.create('unique()', email, password, name);
      await account.createEmailPasswordSession(email, password);
      await checkAuth();
    } catch (error) {
      throw error;
    }
  };

  const adminLogin = async (passcode: string) => {
    // In a real app, this would verify against a secure admin system
    if (passcode === '123456') {
      setUser({
        $id: 'admin',
        name: 'Administrator',
        email: 'admin@medsync.com',
        phone: '',
        role: 'admin',
        createdAt: new Date().toISOString(),
      });
    } else {
      throw new Error('Invalid admin passcode');
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      // Handle error
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, adminLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}