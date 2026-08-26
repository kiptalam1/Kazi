import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import type { EmploymentType } from "@/features/common/types/common.types";
import useAddWorkExperience from "../../hooks/useAddWorkExperience";
import { useForm } from "react-hook-form";
import type { ExperienceBody } from "../../types/candidate.types";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
}
const employmentTypes: {
  label: string,
  value: EmploymentType,
}[] = [
    { label: 'Full Time', value: 'FULL_TIME', },
    { label: 'Part Time', value: 'PART_TIME', },
    { label: 'Contract', value: 'CONTRACT', },
    { label: 'Internship', value: 'INTERNSHIP', },
    { label: 'Apprenticeship', value: 'APPRENTICESHIP', },
    { label: 'Freelance', value: 'FREELANCE', },
    { label: 'Volunteer', value: 'VOLUNTEER', },
  ];

export default function AddWorkExperience({
  open,
  onClose,
}: Props) {
  const { mutate, isPending } = useAddWorkExperience();
  const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<ExperienceBody>();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isCurrent = watch('isCurrent')

  useEffect(() => {
    if (isCurrent) {
      setValue('endDate', null)
    }
  }, [isCurrent, setValue]);

  const onSubmit = (data: ExperienceBody) => {
    mutate({
      ...data,
      jobTitle: data.jobTitle.trim(),
      companyName: data.companyName.trim(),
      location: data.location?.trim() || null,
      description: data.description?.trim() || null,
      endDate: data.isCurrent ? null : data.endDate,
    }, {
      onSuccess: () => onClose(),
    });
  }

  if (!open) return null;


  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl border border-border-muted rounded-sm bg-background p-4 sm:p-6 shadow-lg animate-emerge max-h-[calc(100dvh-2rem)] overflow-y-auto" >
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-5">
          Add work experience
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='text-sm space-y-4 '>
          <div className="flex flex-col gap-1">
            <Label>Job Title</Label>
            <Input
              {...register('jobTitle', {
                required: 'Job title is required',
                validate: (value) =>
                  value.trim().length > 0 || 'Job title is required',
              })}
            />
            {
              errors.jobTitle &&
              <p className="text-danger text-xs">
                {errors.jobTitle.message}
              </p>
            }
          </div>

          <div className="flex flex-col gap-1">
            <Label>Company Name</Label>
            <Input
              {...register('companyName', {
                required: 'Company name is required',
                validate: (value) =>
                  value.trim().length > 0 || 'Company name is required',
              })} />
            {
              errors.companyName &&
              <p className="text-danger text-xs">
                {errors.companyName.message}
              </p>
            }
          </div>

          <div className="flex flex-col gap-1">
            <Label>Location</Label>
            <Input
              {...register('location')} />
          </div>

          <div className="flex flex-col gap-1 ">
            <Label>Employment Type</Label>
            <Select
              {...register('employmentType', {
                required: 'Select employment type'
              })}>
              <option value=''
                className='text-text-muted'>
                Select employment type
              </option>
              {
                employmentTypes.map((type) => (
                  <option
                    key={type.value}
                    value={type.value}>
                    {type.label}
                  </option>
                ))
              }
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Start Date</Label>
            <Input type='date'
              {...register('startDate', {
                required: 'Start date is required',
                setValueAs: (value) => new Date(value)
              })}
            />
            {
              errors.startDate &&
              <p className="text-danger text-xs">
                {errors.startDate.message}
              </p>
            }
          </div>

          <div className="flex gap-4 items-center">
            <Label>I am currently working here</Label>
            <Checkbox {...register('isCurrent')} />
          </div>
          {
            !isCurrent &&
            <div className="flex flex-col gap-1">
              <Label>End Date</Label>
              <Input type='date'
                {...register('endDate', {
                  setValueAs: (value) =>
                    value ? new Date(value) : null
                })}
              />
            </div>
          }
          <div className="flex flex-col gap-1">
            <Label>Description</Label>
            <Textarea {...register('description')} />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="basic"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit"
              disabled={isPending}>
              {
                isPending
                  ? 'Saving...'
                  : 'Save'
              }
            </Button>
          </div>

        </form>
      </div >
    </Modal >
  )
}

