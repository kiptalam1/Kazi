import Button from '@/components/ui/Button';
import Label from '@/components/ui/Label';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useUpdateCandidateApplication from '../../hooks/useUpdateCandidateApplication';
import { UpdateApplicationBody } from '../../types/update-application.types';
import { SingleApplicationResponse } from '../../types/get-single-application.types';

type Props = {
  open: boolean;
  onClose: () => void;
  application: Pick<
    SingleApplicationResponse,
    'status' | 'employerNotes' | 'id'
  >;
};

export default function UpdateApplicationModal({
  open,
  onClose,
  application,
}: Props) {
  const { mutate, isPending: isUpdatingApplication } =
    useUpdateCandidateApplication();
  const { handleSubmit, register, reset } = useForm<UpdateApplicationBody>();

  useEffect(() => {
    if (application) {
      reset({
        employerNotes: application.employerNotes,
        status: application.status,
      });
    }
  }, [application, reset]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const onSubmit = (data: UpdateApplicationBody) => {
    mutate(
      {
        applicationId: application.id,
        data,
      },
      { onSuccess: () => onClose() },
    );
  };

  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background animate-emerge max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto p-4 sm:p-6"
      >
        <h1 className="text-text-secondary text-sm font-medium uppercase">
          Update Application
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Status</Label>
            <Select {...register('status')}>
              <option value={''}>Select Status</option>
              <option value={'HIRED'}>HIRE</option>
              <option value={'REJECTED'}>REJECT</option>
              <option value={'REVIEWING'}>REVIEW</option>
              <option value={'PENDING'}>PENDING</option>
              <option value={'INTERVIEW'}>INTERVIEW</option>
              <option value={'OFFERED'}>OFFER</option>
              <option value={'SHORTLISTED'}>SHORTLIST</option>
            </Select>
          </div>
          <div>
            <Label>Employer Notes</Label>
            <Textarea {...register('employerNotes')} />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="basic" type="button" onClick={onClose}>
              Cancel
            </Button>

            <Button disabled={isUpdatingApplication} type="submit">
              {isUpdatingApplication ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
