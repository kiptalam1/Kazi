'use client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function page() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex justify-center items-center h-screen p-4">
      <form className=" bg-background-muted p-6 flex flex-col gap-6 w-full max-w-lg rounded-xs">
        <h1 className="text-text-secondary text-lg font-semibold text-center">
          Log in to Kazi
        </h1>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
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
        <Button>Log in</Button>
        <div className="flex flex-col gap-2">
          <span className="mx-auto text-xs text-text-muted">Or</span>
          <Link
            href={'/register'}
            className="text-accent hover:text-accent-hover duration-150 text-sm mx-auto"
          >
            Create an account
          </Link>
        </div>
      </form>
    </main>
  );
}
