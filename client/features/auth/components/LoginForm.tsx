'use client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  type ChangeEvent,
  type SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import Spinner from '@/components/ui/Spinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLogin } from '../hooks/useLogin';
import { useAuth } from '../hooks/useAuth';
import Loader from '@/app/loading';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginMutation = useLogin();
  const { data: authData, isPending: isAuthPending } = useAuth();
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function getSafeCallbackUrl(value: string | null) {
    if (!value) return '/jobs';
    if (
      !value.startsWith('/') ||
      value.startsWith('//') ||
      value === '/login' ||
      value.startsWith('/login?')
    ) {
      return '/jobs';
    }
    return value;
  }

  const callbackUrl = getSafeCallbackUrl(searchParams.get('callbackUrl'));

  useEffect(() => {
    if (authData?.data) {
      router.replace(callbackUrl);
    }
  }, [authData, callbackUrl, router]);

  if (isAuthPending || authData?.data) {
    return <Loader />;
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    loginMutation.mutate(formData, {
      onSuccess: () => router.push(callbackUrl),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border bg-background flex w-full max-w-lg flex-col gap-6 border p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logo.png"
          width={108}
          height={39}
          alt="Kazi"
          priority
          className="h-auto w-auto"
        />
        <h1 className="text-text-primary text-center text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
      </div>
      <div>
        <Label className="text-text-secondary mb-2 block" htmlFor="email">
          Email address
        </Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          autoComplete="email"
          required
          className="border-border-strong bg-background rounded-none"
        />
      </div>
      <div>
        <Label className="text-text-secondary mb-2 block" htmlFor="password">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            required
            className="border-border-strong bg-background rounded-none pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide Password' : 'Show Password'}
            aria-pressed={showPassword}
            className="focus-visible:outline-focus absolute top-1/2 right-1 size-9 -translate-y-1/2 rounded-none focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {showPassword ? (
              <EyeOff className="text-text-muted size-5" />
            ) : (
              <Eye className="text-text-muted size-5" />
            )}
          </button>
        </div>
      </div>
      <Button
        type="submit"
        className="flex min-h-11 w-full items-center justify-center rounded-none"
      >
        {loginMutation.isPending ? <Spinner /> : 'Log in'}
      </Button>
      <div className="border-border-muted flex flex-col gap-2 border-t pt-5 text-center">
        <span className="text-text-muted mx-auto text-xs">Or</span>
        <Link
          href={'/register'}
          className="text-brand-primary hover:text-brand-hover mx-auto text-sm duration-150"
        >
          Create an account
        </Link>
      </div>
    </form>
  );
}
