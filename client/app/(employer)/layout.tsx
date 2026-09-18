import EmployerTopbar from '@/features/employer/components/EmployerTopbar';
import { ReactNode } from 'react';

export default function EmployerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <EmployerTopbar />

      <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {children}
      </main>
    </div>
  );
}
