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
import { useAuth } from '../hooks/useAuth';
import Loader from '@/app/loading';

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

const KENYAN_PHONE_REGEX = /^(?:\+254|254|0)[17]\d{8}$/;
const INTERNATIONAL_PHONE_REGEX = /^\+[1-9]\d{7,14}$/;

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterBody>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [errors, setErrors] = useState<RegisterBody>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
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
    return <Loader />;
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validateInput() {
    let errors: RegisterBody = {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const password = formData.password;

    if (!firstName) {
      errors.firstName = 'First name is missing.';
    } else if (firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters.';
    } else if (firstName.length > 32) {
      errors.firstName = 'First name cannot exceed 32 characters.';
    }

    if (!lastName) {
      errors.lastName = 'Last name is required.';
    } else if (lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters.';
    } else if (lastName.length > 32) {
      errors.firstName = 'Last name cannot exceed 32 characters.';
    }

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address.';
    }

    const normalizedPhone = phone.replace(/[\s()-]/g, '');
    if (
      phone &&
      !KENYAN_PHONE_REGEX.test(normalizedPhone) &&
      !INTERNATIONAL_PHONE_REGEX.test(normalizedPhone)
    ) {
      errors.phone = 'Enter a valid phone number.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    } else if (password.length > 128) {
      errors.password = 'Password cannot exceed 128 characters.';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    return errors;
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateInput();

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== '',
    );

    if (hasErrors) {
      return;
    }

    registerMutation.mutate(
      {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
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
      noValidate
      aria-labelledby="register-heading"
      className="border-border bg-background flex w-full max-w-xl flex-col gap-3 border p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col items-center gap-3">
        <Image
          src="/logo.png"
          width={108}
          height={39}
          alt="Kazi"
          priority
          className="h-auto w-auto"
        />
        <h1
          id="register-heading"
          className="text-text-primary text-center text-2xl font-semibold tracking-tight"
        >
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
          placeholder="John"
          aria-invalid={Boolean(errors.firstName)}
          className="border-border-strong bg-background rounded-none"
        />
        <div className="min-h-5 pt-1">
          {errors.firstName && (
            <span role="alert" className="text-danger text-xs">
              {errors.firstName}
            </span>
          )}
        </div>
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
          placeholder="Doe"
          aria-invalid={Boolean(errors.lastName)}
          className="border-border-strong bg-background rounded-none"
        />
        <div className="min-h-5 pt-1">
          {errors.lastName && (
            <span role="alert" className="text-danger text-xs">
              {errors.lastName}
            </span>
          )}
        </div>
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
          placeholder="+254712345678"
          aria-invalid={Boolean(errors.phone)}
          className="border-border-strong bg-background rounded-none"
        />
        <div className="min-h-5 pt-1">
          {errors.phone && (
            <span role="alert" className="text-danger text-xs">
              {errors.phone}
            </span>
          )}
        </div>
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
          placeholder="johndoe@example.com"
          aria-invalid={Boolean(errors.email)}
          className="border-border-strong bg-background rounded-none"
        />
        <div className="min-h-5 pt-1">
          {errors.email && (
            <span role="alert" className="text-danger text-xs">
              {errors.email}
            </span>
          )}
        </div>
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
            autoComplete="new-password"
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="@VeryStrongPassword254"
            aria-invalid={Boolean(errors.password)}
            className="border-border-strong bg-background rounded-none pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide Password' : 'Show Password'}
            aria-pressed={showPassword}
            className="focus-visible:outline-focus hover:bg-background-subtle absolute top-1/2 right-1 flex size-9 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {showPassword ? (
              <EyeOff className="text-text-muted size-5" />
            ) : (
              <Eye className="text-text-muted size-5" />
            )}
          </button>
        </div>
        <div className="min-h-5 pt-1">
          {errors.password && (
            <span role="alert" className="text-danger text-xs">
              {errors.password}
            </span>
          )}
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
            placeholder="@VeryStrongPassword254"
            aria-invalid={Boolean(errors.confirmPassword)}
            className="border-border-strong bg-background rounded-none pr-10"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={showConfirmPassword ? 'Hide Password' : 'Show Password'}
            aria-pressed={showConfirmPassword}
            className="focus-visible:outline-focus hover:bg-background-subtle absolute top-1/2 right-1 flex size-9 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {showConfirmPassword ? (
              <EyeOff className="text-text-muted size-5" />
            ) : (
              <Eye className="text-text-muted size-5" />
            )}
          </button>
        </div>
        <div className="min-h-5 pt-1">
          {errors.confirmPassword && (
            <span role="alert" className="text-danger text-xs">
              {errors.confirmPassword}
            </span>
          )}
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
