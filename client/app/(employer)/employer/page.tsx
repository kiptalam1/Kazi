'use client';

import useMyCompany from '@/features/employer/hooks/useMyCompany';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EmployerPage() {
  const { data: company, isPending, error } = useMyCompany();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        router.replace('/employer/onboarding');
        return;
      }
      return;
    }

    if (company) {
      router.replace('/employer/dashboard');
    }
  }, [isPending, company, router, error]);

  return null;
}
