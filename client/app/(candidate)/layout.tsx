'use client';

import TopBar from '@/components/ui/TopBar';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import Loader from '../loading';
import axios from 'axios';

export default function CandidateLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isPending, isError, error } = useAuth();

  useEffect(() => {
    if (
      isError &&
      axios.isAxiosError(error) &&
      error.response?.status === 401
    ) {
      router.replace('/login');
    }
  }, [isError, error, router]);

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
}
