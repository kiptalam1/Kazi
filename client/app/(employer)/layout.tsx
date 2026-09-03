import EmployerTopbar from '@/features/employer/components/EmployerTopbar';
import { ReactNode } from 'react';

export default function EmployerLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <EmployerTopbar />
      {children}
    </div>
  );
}
