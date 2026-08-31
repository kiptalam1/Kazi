'use client';

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EmployerPage() {
  const { data, isPending, isError, } = useAuth();
  const router = useRouter();
  const user = data?.data;
  const isEmployer = user?.roles.some((role) => role === 'COMPANY_ADMIN' ||
    role === 'RECRUITER');

  useEffect(() => {
    if (isPending) return;
    if (isError || !user) {
      router.replace('/login');
    }

    if (isEmployer) {
      router.replace('/employer/dashboard');
    } else {
      router.replace('/employer/onboarding');
    }
  }, [isPending, isError, user, router, isEmployer]);


  return null;
}

