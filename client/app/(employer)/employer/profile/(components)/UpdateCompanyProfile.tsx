import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Modal from '@/components/ui/Modal';
import Textarea from '@/components/ui/Textarea';
import useUpdateCompany from '@/features/employer/hooks/useUpdateCompany';
import {
  CreateCompanyBody,
  MyCompany,
} from '@/features/employer/types/create-company.types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  open: boolean;
  onClose: () => void;
  company: MyCompany;
};

type FormFields = CreateCompanyBody;

export default function UpdateProfile({ open, onClose, company }: Props) {
  const { reset, handleSubmit, register } = useForm<FormFields>();
  const { mutate, isPending: isUpdatingCompany } = useUpdateCompany();

  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
        description: company.description,
        website: company.website,
        industry: company.industry,
        location: company.location,
        logoUrl: company.logoUrl,
      });
    }
  }, [company, reset]);

  const onSubmit = (data: FormFields) => {
    if (company) {
      mutate(
        { id: company.id, data },
        {
          onSuccess: () => onClose(),
        },
      );
    }
  };

  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="border-border-muted bg-background animate-emerge max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto rounded-sm border p-4 shadow-lg sm:p-6"
      >
        <h2 className="text-text-muted mb-5 text-sm font-semibold tracking-wide uppercase">
          Edit Company Information
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
          <div className="flex flex-col gap-1">
            <Label>Company Name</Label>
            <Input type="text" {...register('name')} />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Industry</Label>
            <Input
              type="text"
              placeholder="e.g., IT, HealthCare, Engineering..."
              {...register('industry')}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Location</Label>
            <Input
              type="text"
              placeholder="Nairobi, Kenya"
              {...register('location')}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Website Url</Label>
            <Input
              type="url"
              placeholder="www.examplewebsiteurl.com"
              {...register('website')}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Logo Url</Label>
            <Input
              type="url"
              placeholder="https://..."
              {...register('logoUrl')}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Description</Label>
            <Textarea
              rows={6}
              maxLength={4000}
              placeholder="About your company..."
              {...register('description')}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="basic" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isUpdatingCompany}>
              {isUpdatingCompany ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
