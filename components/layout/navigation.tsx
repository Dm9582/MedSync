'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LANGUAGES } from '@/lib/constants';
import { 
  Heart, 
  Menu, 
  X, 
  Globe, 
  User, 
  LogOut,
  Shield,
  LayoutDashboard
} from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">MedSync</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {LANGUAGES.find(lang => lang.code === language)?.flag}
                  {LANGUAGES.find(lang => lang.code === language)?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className="flex items-center gap-2"
                  >
                    <span>{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    {user.role === 'admin' ? (
                      <Shield className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      {t('dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth">
                  <Button variant="outline">{t('login')}</Button>
                </Link>
                <Link href="/auth">
                  <Button>{t('register')}</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-4">
              {/* Language Selector Mobile */}
              <div className="px-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Language</p>
                <div className="grid grid-cols-3 gap-2">
                  {LANGUAGES.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLanguage(lang.code as any)}
                      className="flex items-center gap-1 text-xs"
                    >
                      <span>{lang.flag}</span>
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* User Menu Mobile */}
              {user ? (
                <div className="px-2 space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Welcome, {user.name}
                  </p>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {t('dashboard')}
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('logout')}
                  </Button>
                </div>
              ) : (
                <div className="px-2 space-y-2">
                  <Link href="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      {t('login')}
                    </Button>
                  </Link>
                  <Link href="/auth" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">
                      {t('register')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}