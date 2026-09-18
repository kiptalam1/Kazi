import { useForm } from 'react-hook-form';
import useUpdateCandidateProfile from '../../hooks/useUpdateCandidateProfile';
import { useEffect } from 'react';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { Candidate } from '@/features/common/types/common.types';
import Button from '@/components/ui/Button';

type Props = {
  open: boolean;
  onClose: () => void;
  candidate: Candidate;
};

type LinksForm = {
  githubUrl: string;
  portfolioUrl: string;
  linkedinUrl: string;
};

export default function UpdateLinks({ open, onClose, candidate }: Props) {
  const { mutate, isPending } = useUpdateCandidateProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LinksForm>({
    defaultValues: {
      githubUrl: candidate.githubUrl ?? '',
      portfolioUrl: candidate.portfolioUrl ?? '',
      linkedinUrl: candidate.linkedinUrl ?? '',
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

  if (!open) return null;

  const onSubmit = (data: LinksForm) => {
    mutate(
      {
        linkedinUrl: data.linkedinUrl.trim() || null,
        portfolioUrl: data.portfolioUrl.trim() || null,
        githubUrl: data.githubUrl.trim() || null,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

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
          Links
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 text-sm">
          <div className="flex flex-col gap-1">
            <Label className="text-xs" htmlFor="github-url">
              GitHub
            </Label>
            <Input
              id="github-url"
              placeholder="https://github.com/username"
              {...register('githubUrl', {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: 'Enter a valid URL',
                },
              })}
            />
            {errors.githubUrl && (
              <p className="text-danger">{errors.githubUrl.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs" htmlFor="linkedin-url">
              LinkedIn
            </Label>
            <Input
              id="linkedin-url"
              placeholder="https://linkedin.com/in/username"
              {...register('linkedinUrl', {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: 'Enter a valid URL',
                },
              })}
            />
            {errors.linkedinUrl && (
              <p className="text-danger">{errors.linkedinUrl.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs" htmlFor="portfolio-url">
              Portfolio
            </Label>
            <Input
              id="portfolio-url"
              placeholder="https://yourportfolio.com"
              {...register('portfolioUrl', {
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: 'Enter a valid URL',
                },
              })}
            />
            {errors.portfolioUrl && (
              <p className="text-danger">{errors.portfolioUrl.message}</p>
            )}
          </div>
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
