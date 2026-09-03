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
    <div className="w-full max-w-lg space-y-6 rounded-sm px-4 py-6 shadow-xs sm:px-6 sm:py-8">
      <h1 className="text-text-primary text-xl font-semibold sm:text-2xl">
        Create Your Company
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-1">
          <Label>
            Company Name
            <span className="text-danger">*</span>
          </Label>
          <Input
            {...register('name', {
              required: 'Company name is required',
              validate: (value) =>
                value.trim().length > 0 || 'Company name is required',
            })}
            className="border-border-muted"
          />
          {errors.name && (
            <p className="text-danger text-xs">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Description</Label>
          <Textarea
            rows={4}
            className="border-border-muted min-h-32"
            {...register('description')}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Website</Label>
          <Input
            type="url"
            placeholder="https://example.com"
            {...register('website', {
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: 'Enter a valid website URL',
              },
            })}
            className="border-border-muted"
          />
          {errors.website && (
            <p className="text-danger text-xs">{errors.website.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Industry</Label>
          <Input {...register('industry')} className="border-border-muted" />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Location</Label>
          <Input {...register('location')} className="border-border-muted" />
        </div>
        <div className="mt-6 flex justify-self-end">
          <Button type="submit" disabled={isCreating}>
            {isCreating ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
}
