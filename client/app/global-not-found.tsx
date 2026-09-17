import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '404 - Page Not Found | Kazi',
  description: 'The page you are looking for could not be found.',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <main className="flex min-h-screen items-center justify-center px-6 py-12">
          <section
            aria-labelledby="not-found-title"
            className="flex w-full max-w-md flex-col items-center text-center"
          >
            {/* Brand */}
            <a
              href={'/'}
              aria-label="Kazi home"
              className="text-brand-primary hover:text-brand-hover mb-16 text-xl font-bold tracking-tight transition-colors"
            >
              Kazi
            </a>

            {/* Error Indicator */}
            <div
              aria-hidden="true"
              className="text-brand-primary text-8xl leading-none font-extrabold tracking-tighter sm:text-9xl"
            >
              404
            </div>

            {/* Content */}
            <h1
              id="not-found-title"
              className="text-text-primary mt-8 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Page not found
            </h1>

            <p className="text-text-secondary mt-3 max-w-sm text-sm leading-6 sm:text-base">
              The page you are looking for doesn&apos;t exist or may have been
              moved to another location.
            </p>

            {/* Action */}
            <div className="mt-8">
              <a
                href={'/'}
                className="bg-brand-primary text-text-inverse hover:bg-brand-hover focus-visible:outline-focus inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Return to Home
              </a>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
