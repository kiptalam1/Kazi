import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TopBar from '@/components/ui/TopBar';
import Providers from './providers';
import { Toaster } from 'sonner';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kazi',
  description: 'Jobs platform',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col mx-auto max-w-7xl scroll-smooth overflow-x-hidden">
        <Providers>
          <TopBar />
          <main>{children}</main>
        </Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
