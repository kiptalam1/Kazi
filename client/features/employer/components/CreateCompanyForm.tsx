'use client';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Textarea from '@/components/ui/Textarea';
import { useForm } from 'react-hook-form';
import type {
  CreateCompanyBody,
  CreatedCompany,
} from '../types/create-company.types';
import { useEffect } from 'react';
import useCreateCompany from '../hooks/useCreateCompany';
import { useRouter } from 'next/navigation';

type Props = {
  company?: CreatedCompany;
};

type FormFields = CreateCompanyBody;

export default function CreateCompanyForm({ company }: Props) {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const { mutate: createCompany, isPending: isCreating } = useCreateCompany();

  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
        description: company.description ?? '',
        industry: company.industry ?? '',
        location: company.location ?? '',
        logoUrl: company.logoUrl ?? '',
        website: company.website ?? '',
      });
    } else {
      reset({
        name: '',
        description: '',
        industry: '',
        location: '',
        logoUrl: '',
        website: '',
      });
    }
  }, [company, reset]);

  function onSubmit(data: FormFields) {
    const payload: FormFields = {
      ...data,
      website: data.website || null,
    };
    if (company) {
    } else {
      createCompany(payload, {
        onSuccess: () => router.replace('/employer/dashboard'),
      });
    }
  }

  return (
    <div className="border-border bg-background w-full max-w-2xl space-y-8 border px-5 py-6 shadow-sm sm:px-8 sm:py-10">
      <div>
        <p className="text-brand-primary text-xs font-semibold tracking-[0.14em] uppercase">
          Company setup
        </p>
        <h1 className="text-text-primary mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Create your company
        </h1>
        <p className="text-text-secondary mt-3 max-w-xl text-sm leading-6">
          Set up your company profile so candidates can understand who is hiring
          and what your team does.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col gap-1">
          <Label htmlFor="company-name">
            Company name
            <span className="text-danger">*</span>
          </Label>
          <Input
            id="company-name"
            {...register('name', {
              required: 'Company name is required',
              validate: (value) =>
                value.trim().length > 0 || 'Company name is required',
            })}
            className="border-border-strong"
          />
          {errors.name && (
            <p className="text-danger text-xs">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="company-description">Description</Label>
          <Textarea
            id="company-description"
            rows={4}
            className="border-border-strong min-h-32 rounded-none"
            {...register('description')}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="company-website">Website</Label>
          <Input
            id="company-website"
            type="url"
            placeholder="https://example.com"
            {...register('website', {
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: 'Enter a valid website URL',
              },
            })}
            className="border-border-strong"
          />
          {errors.website && (
            <p className="text-danger text-xs">{errors.website.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="company-industry">Industry</Label>
          <Input
            id="company-industry"
            {...register('industry')}
            className="border-border-strong"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="company-location">Location</Label>
          <Input
            id="company-location"
            {...register('location')}
            className="border-border-strong"
          />
        </div>
        <div className="border-border-muted mt-7 border-t pt-5">
          <Button
            type="submit"
            disabled={isCreating}
            className="min-h-11 w-full rounded-none"
          >
            {isCreating ? 'Creating company...' : 'Create company'}
          </Button>
        </div>
      </form>
    </div>
  );
}
