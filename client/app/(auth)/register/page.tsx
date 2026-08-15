'use client';
import Spinner from '@/components/ui/Spinner';
import RegisterForm from '@/features/auth/components/RegisterForm';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <RegisterForm />
    </Suspense>
  );
}
