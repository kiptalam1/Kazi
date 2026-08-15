import Link from 'next/link';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type SyntheticEvent } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { useRegister } from '../hooks/useRegister';
import Spinner from '@/components/ui/Spinner';
import { toast } from 'sonner';

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
      className=" bg-background-muted p-6 flex flex-col gap-6 w-full max-w-lg rounded-xs"
    >
      <h1 className="text-text-secondary text-lg font-semibold text-center">
        Create an account
      </h1>
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          type="text"
          autoComplete="given-name"
          required
        />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          type="text"
          autoComplete="family-name"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone (Optional)</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          type="tel"
          autoComplete="tel"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            required
            className="pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide Password' : 'Show Password'}
            aria-pressed={showPassword}
            className="absolute -translate-y-1/2 top-1/2 right-2"
          >
            {showPassword ? (
              <EyeOff className="text-text-muted size-4" />
            ) : (
              <Eye className="size-4 text-text-muted" />
            )}
          </button>
        </div>
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            autoComplete="new-password"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            className="pr-10"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={showConfirmPassword ? 'Hide Password' : 'Show Password'}
            aria-pressed={showConfirmPassword}
            className="absolute -translate-y-1/2 top-1/2 right-2"
          >
            {showConfirmPassword ? (
              <EyeOff className="text-text-muted size-4" />
            ) : (
              <Eye className="size-4 text-text-muted" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={registerMutation.isPending}
        className="flex items-center justify-center"
      >
        {registerMutation.isPending ? <Spinner /> : 'Sign Up'}
      </Button>
      <div className="flex flex-col gap-2">
        <span className="mx-auto text-xs text-text-muted">Or</span>
        <Link
          href={'/login'}
          className="text-accent hover:text-accent-hover duration-150 text-sm mx-auto"
        >
          Log in to your account
        </Link>
      </div>
    </form>
  );
}
