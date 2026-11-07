import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/auth-context';
import { LanguageProvider } from '@/contexts/language-context';
import { Navigation } from '@/components/layout/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MedSync - Your Health, Our Priority',
  description: 'Comprehensive healthcare management system with AI health assistant, appointment booking, and emergency services.',
  keywords: 'healthcare, medical, appointments, AI health assistant, emergency services, hospital management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <AuthProvider>
            <Navigation />
            <main>{children}</main>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}