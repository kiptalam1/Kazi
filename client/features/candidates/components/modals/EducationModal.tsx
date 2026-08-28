import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import type { Education, EducationBody, EducationLevel } from "../../types/candidate.types";
import { useEffect } from "react";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import useAddCandidateEducation from "../../hooks/useAddCandidateEducation";
import { useForm } from "react-hook-form";
import useUpdateCandidateEducation from "../../hooks/useUpdateCandidateEducation";

type Props = {
  open: boolean;
  onClose: () => void;
  education?: Education;
};

const educationLevel: {
  label: string;
  value: EducationLevel;
}[] = [
    { label: 'Primary', value: 'PRIMARY' },
    { label: 'Secondary', value: 'SECONDARY' },
    { label: 'High School', value: 'HIGH_SCHOOL' },
    { label: 'Certificate', value: 'CERTIFICATE' },
    { label: 'Diploma', value: 'DIPLOMA' },
    { label: 'Masters', value: 'MASTERS' },
    { label: 'Associate', value: 'ASSOCIATE' },
    { label: 'Bachelors', value: 'BACHELORS' },
    { label: 'Doctorate', value: 'DOCTORATE' },
    { label: 'Postgraduate Diploma', value: 'POSTGRADUATE_DIPLOMA' }
  ];

type FormFields = Omit<EducationBody, 'startDate' | 'endDate'> & {
  startDate: string;
  endDate: string;
}

export default function EducationModal({ open, onClose, education, }: Props) {
  const { mutate: addEducation, isPending: isAddingEducation } = useAddCandidateEducation();
  const { mutate: updateEducation, isPending: isUpdatingEducation } = useUpdateCandidateEducation();
  const { reset, register, handleSubmit, formState: { errors } } = useForm<FormFields>();

  useEffect(() => {
    if (education) {
      reset({
        schoolName: education.schoolName,
        fieldOfStudy: education.fieldOfStudy ?? '',
        qualification: education.qualification,
        city: education.city ?? '',
        country: education.country ?? '',
        startDate: new Date(education.startDate).toISOString().split('T')[0],
        endDate: education.endDate ? new Date(education.endDate).toISOString().split('T')[0] : '',
      });
    } else {
      reset({
        schoolName: '',
        fieldOfStudy: '',
        qualification: '' as EducationLevel,
        city: '',
        country: '',
        startDate: '',
        endDate: '',
      });
    }
  }, [education, reset]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    }
  }, [open]);

  if (!open) return null;

  const onSubmit = (data: FormFields) => {
    const payload: EducationBody = {
      ...data,
      schoolName: data.schoolName.trim(),
      fieldOfStudy: data.fieldOfStudy?.trim() || null,
      qualification: data.qualification,
      city: data.city?.trim() || null,
      country: data.country?.trim() || null,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
    }
    if (education) {
      updateEducation({
        educationId: education.id,
        data: payload,
      }, {
        onSuccess: () => onClose(),
      })
    } else {
      addEducation(payload, {
        onSuccess: () => onClose(),
      });
    }
  }

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl border border-border-muted rounded-sm bg-background p-4 sm:p-6 shadow-lg animate-emerge max-h-[calc(100dvh-2rem)] overflow-y-auto"
      >
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-5">
          {education ? 'Edit Education' : 'Add Education'}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 text-sm">
          <div className="flex flex-col gap-1">
            <Label>School Name</Label>
            <Input type="text"
              {...register('schoolName', {
                required: 'School name is required.',
                validate: (value) => value.trim().length > 0 || 'School name is required,',
              }
              )}
            />
            {
              errors.schoolName &&
              <p className="text-xs text-danger">
                {errors.schoolName.message}
              </p>
            }
          </div>
          <div className="flex flex-col gap-1">
            <Label>Field Of Study</Label>
            <Input
              type="text"
              {...register('fieldOfStudy', {
                validate: (value) => !value || value.trim().length >= 2 || 'Field must be at least 2 characters long.'
              })}
            />
            {
              errors.fieldOfStudy &&
              <p className="text-xs text-danger">
                {errors.fieldOfStudy.message}
              </p>
            }

          </div>
          <div className="flex flex-col gap-1">
            <Label>Qualification</Label>
            <Select {...register('qualification', {
              required: 'Qualification is required.'
            })}>
              <option value={''}>Select Education Level</option>
              {
                educationLevel.map((level) => (
                  <option
                    key={level.value}
                    value={level.value}
                  >{level.label}</option>
                ))
              }
            </Select>
            {
              errors.qualification &&
              <p className="text-xs text-danger">{errors.qualification.message}</p>
            }
          </div>
          <div className="flex flex-col gap-1">
            <Label>City</Label>
            <Input
              type="text"
              {...register('city')}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Country</Label>
            <Input
              type="text"
              {...register('country', {
                validate: (value) =>
                  !value || value.trim().length >= 2 || 'Country must be atleast 2 characters long.'
              })}
            />
            {
              errors.country &&
              <p className="text-xs text-danger">
                {errors.country.message}</p>
            }

          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <Label>Start Date</Label>
              <Input
                type="date"
                {...register('startDate', {
                  required: 'Start Date is required.'
                })}
              />
              {
                errors.startDate &&
                <p className="text-xs text-danger">{errors.startDate.message}</p>
              }
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <Label>End Date</Label>
              <Input
                type="date"
                {...register('endDate')}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="basic"
              onClick={onClose}>
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isAddingEducation
                || isUpdatingEducation}>
              {(isAddingEducation
                || isUpdatingEducation)
                ? 'Saving...'
                : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

