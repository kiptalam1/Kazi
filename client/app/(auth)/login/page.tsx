'use client';
import Spinner from '@/components/ui/Spinner';
import LoginForm from '@/features/auth/components/LoginForm';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center h-screen p-4">
      <Suspense fallback={<Spinner />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
