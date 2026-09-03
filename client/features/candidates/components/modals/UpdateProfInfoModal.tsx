import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import {
  Candidate,
  ExperienceLevel,
} from '@/features/common/types/common.types';
import { useEffect } from 'react';
import { useWatch, useForm } from 'react-hook-form';
import useUpdateCandidateProfile from '../../hooks/useUpdateCandidateProfile';

type Props = {
  open: boolean;
  onClose: () => void;
  candidate: Candidate;
};

const experienceLevels: { value: ExperienceLevel; label: string }[] = [
  { value: 'INTERN', label: 'Intern' },
  { value: 'APPRENTICE', label: 'Apprentice' },
  { value: 'JUNIOR', label: 'Junior' },
  { value: 'MID', label: 'Mid-level' },
  { value: 'SENIOR', label: 'Senior' },
  { value: 'LEAD', label: 'Lead' },
];

type ProfessionalInfoForm = {
  headline: string;
  bio: string;
  currentJobTitle: string;
  location: string;
  experienceLevel: ExperienceLevel | undefined;
  skills: string[];
  availability: boolean;
};

export default function UpdateProfInfoModal({
  open,
  onClose,
  candidate,
}: Props) {
  const { mutate, isPending } = useUpdateCandidateProfile();
  const { register, control, setValue, handleSubmit } =
    useForm<ProfessionalInfoForm>({
      defaultValues: {
        headline: candidate.headline ?? '',
        bio: candidate.bio ?? '',
        currentJobTitle: candidate.currentJobTitle ?? '',
        location: candidate.location ?? '',
        experienceLevel: candidate.experienceLevel ?? undefined,
        skills: candidate.skills ?? [],
        availability: candidate.availability ?? true,
      },
    });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const availability = useWatch({
    control,
    name: 'availability',
  });

  const onSubmit = (data: ProfessionalInfoForm) => {
    mutate(
      {
        headline: data.headline.trim() || null,
        bio: data.bio.trim() || null,
        currentJobTitle: data.currentJobTitle.trim() || null,
        location: data.location.trim() || null,
        experienceLevel: data.experienceLevel,
        availability: data.availability,
        skills: data.skills.filter((skill) => skill.trim()),
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-2xl"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border-border-muted bg-background-muted animate-emerge w-full max-w-6xl rounded border p-6 shadow-lg"
      >
        <h2 className="text-text-muted mb-4 text-sm font-semibold tracking-wide uppercase">
          Professional Information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 text-sm">
          <div className="flex flex-col gap-1">
            <Label className="text-xs">Headline</Label>
            <Input {...register('headline')} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs">Bio</Label>
            <Textarea {...register('bio')} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs">Current Job Title</Label>
            <Input {...register('currentJobTitle')} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs">Experience Level</Label>
            <Select {...register('experienceLevel')}>
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs">Location</Label>
            <Input {...register('location')} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs">Skills</Label>
            <Input
              {...register('skills', {
                setValueAs: (value) =>
                  value
                    .split(',')
                    .map((skill: string) => skill.trim())
                    .filter(Boolean),
              })}
            />
          </div>
          <fieldset className="space-y-2">
            <legend className="text-text-muted text-xs">
              Are you available?
            </legend>

            <div className="flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={availability === true}
                  onChange={() => setValue('availability', true)}
                  className="size-4"
                />
                <span>Yes</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={availability === false}
                  onChange={() => setValue('availability', false)}
                  className="size-4"
                />
                <span>No</span>
              </label>
            </div>
          </fieldset>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="basic" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
