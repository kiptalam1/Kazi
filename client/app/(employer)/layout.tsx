import EmployerTopbar from '@/features/employer/components/EmployerTopbar';
import { ReactNode } from 'react';

export default function EmployerLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <EmployerTopbar />

      <main className="space-y-6 px-4 sm:p-6">{children}</main>
    </div>
  );
}
