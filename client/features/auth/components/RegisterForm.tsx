import Link from 'next/link';
import Image from 'next/image';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type SyntheticEvent, useEffect } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { useRegister } from '../hooks/useRegister';
import Spinner from '@/components/ui/Spinner';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterBody>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerMutation = useRegister();
  const router = useRouter();
  const { data: authData, isPending: isAuthPending } = useAuth();

  useEffect(() => {
    if (authData?.data) {
      router.replace('/jobs');
    }
  }, [authData, router]);

  if (isAuthPending || authData?.data) {
    return (
      <div
        className="flex items-center justify-center p-8"
        aria-label="Loading"
      >
        <Spinner />
      </div>
    );
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const passwordMatch = formData.password === formData.confirmPassword;
    if (!passwordMatch) {
      toast.error('Passwords do not match.');
      return;
    }

    registerMutation.mutate(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => router.push('/login'),
      },
    );
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
          Create your account
        </h1>
      </div>
      <div>
        <Label className="text-text-secondary mb-2 block" htmlFor="firstName">
          First name
        </Label>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          type="text"
          autoComplete="given-name"
          required
          className="border-border-strong bg-background rounded-none"
        />
      </div>
      <div>
        <Label className="text-text-secondary mb-2 block" htmlFor="lastName">
          Last name
        </Label>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          type="text"
          autoComplete="family-name"
          required
          className="border-border-strong bg-background rounded-none"
        />
      </div>

      <div>
        <Label className="text-text-secondary mb-2 block" htmlFor="phone">
          Phone (optional)
        </Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          type="tel"
          autoComplete="tel"
          className="border-border-strong bg-background rounded-none"
        />
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
      <div>
        <Label
          className="text-text-secondary mb-2 block"
          htmlFor="confirmPassword"
        >
          Confirm password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            autoComplete="new-password"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            className="border-border-strong bg-background rounded-none pr-10"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={showConfirmPassword ? 'Hide Password' : 'Show Password'}
            aria-pressed={showConfirmPassword}
            className="focus-visible:outline-focus absolute top-1/2 right-1 size-9 -translate-y-1/2 rounded-none focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {showConfirmPassword ? (
              <EyeOff className="text-text-muted size-5" />
            ) : (
              <Eye className="text-text-muted size-5" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={registerMutation.isPending}
        className="flex min-h-11 w-full items-center justify-center rounded-none"
      >
        {registerMutation.isPending ? <Spinner /> : 'Sign Up'}
      </Button>
      <div className="border-border-muted flex flex-col gap-2 border-t pt-5 text-center">
        <span className="text-text-muted mx-auto text-xs">Or</span>
        <Link
          href={'/login'}
          className="text-brand-primary hover:text-brand-hover mx-auto text-sm duration-150"
        >
          Log in to your account
        </Link>
      </div>
    </form>
  );
}
