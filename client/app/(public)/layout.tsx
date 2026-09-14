import TopBar from '@/components/ui/TopBar';
import { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
}
