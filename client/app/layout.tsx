import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
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
      <body className="mx-auto flex min-h-screen max-w-7xl flex-col overflow-x-hidden scroll-smooth">
        <Providers>
          <main>{children}</main>
        </Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
