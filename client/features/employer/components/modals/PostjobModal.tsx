import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import {
  ExperienceLevel,
  JobStatus,
} from '@/features/common/types/common.types';
import { useForm } from 'react-hook-form';
import { CreateJobBody } from '../../types/create-job.types';
import { useEffect } from 'react';
import { Job } from '@/features/jobs/types/get-job.types';
import useCreateJob from '../../hooks/useCreateJob';

type Props = {
  open: boolean;
  onClose: () => void;
  job?: Omit<Job, 'company'>;
  companySlug: string;
};

const experienceLevels: {
  label: string;
  value: ExperienceLevel;
}[] = [
  { label: 'Intern', value: 'INTERN' },
  { label: 'Apprentice', value: 'APPRENTICE' },
  { label: 'Junior', value: 'JUNIOR' },
  { label: 'Mid Level', value: 'MID' },
  { label: 'Senior', value: 'SENIOR' },
  { label: 'Lead', value: 'LEAD' },
];

const jobStatuses: {
  label: string;
  value: JobStatus;
}[] = [
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Published', value: 'PUBLISHED' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'Archived', value: 'ARCHIVED' },
];

export default function PostJobModal({
  open,
  onClose,
  job,
  companySlug,
}: Props) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateJobBody>();
  const { mutate: postJob, isPending: isCreatingPost } = useCreateJob();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (job) {
      reset({
        title: job.title,
        description: job.description,
        currency: job.currency,
        experienceLevel: job.experienceLevel,
        isRemote: job.isRemote,
        location: job.location,
        status: job.status,
        salaryMax: job.salaryMax ?? undefined,
        salaryMin: job.salaryMin ?? undefined,
      });
    } else {
      reset({
        title: '',
        description: '',
        currency: '',
        experienceLevel: '' as ExperienceLevel,
        isRemote: false,
        location: '',
        status: 'PUBLISHED',
        salaryMin: 0,
        salaryMax: 0,
      });
    }
  }, [reset, job]);

  const onSubmit = (data: CreateJobBody) => {
    const payload: CreateJobBody = {
      ...data,
      salaryMin: Number(data.salaryMin),
      salaryMax: Number(data.salaryMax),
    };
    if (job) {
    } else {
      postJob(
        {
          slug: companySlug,
          data: payload,
        },
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
        className="bg-background animate-emerge max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto p-4 sm:p-6"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              placeholder="e.g. Frontend Developer"
              {...register('title', {
                required: 'Title is required',
                validate: (value) =>
                  value.trim().length > 0 || 'Title is required',
              })}
            />
            {errors.title && (
              <p className="text-danger text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* Experience Level */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <Select
              id="experienceLevel"
              className="border-border bg-background rounded-md border px-3 py-2"
              defaultValue=""
              {...register('experienceLevel')}
            >
              <option value="" disabled>
                Select experience level
              </option>

              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the role, responsibilities and requirements..."
              rows={6}
              {...register('description')}
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g. Nairobi, Kenya"
              {...register('location')}
            />
          </div>

          {/* Remote */}
          <div className="flex items-center gap-2">
            <Checkbox id="isRemote" {...register('isRemote')} />
            <Label htmlFor="isRemote">Remote position</Label>
          </div>

          {/* Salary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="salaryMin">Minimum Salary</Label>
              <Input
                id="salaryMin"
                type="number"
                min={0}
                placeholder="e.g. 50000"
                {...register('salaryMin')}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="salaryMax">Maximum Salary</Label>
              <Input
                id="salaryMax"
                type="number"
                min={0}
                placeholder="e.g. 80000"
                {...register('salaryMax')}
              />
            </div>
          </div>

          {/* Currency */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="currency">Currency</Label>
            <Select id="currency" defaultValue="KES" {...register('currency')}>
              <option value="KES">KES</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="status">Status</Label>

            <Select id="status" {...register('status')}>
              {jobStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="basic" type="button" onClick={onClose}>
              Cancel
            </Button>

            <Button disabled={isCreatingPost} type="submit">
              {isCreatingPost ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
