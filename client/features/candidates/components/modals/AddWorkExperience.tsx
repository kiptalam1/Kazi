import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { EmploymentType } from "@/features/common/types/common.types";

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
  if (!open) return null;
  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl border border-border-muted rounded-sm bg-background p-6 shadow-lg animate-emerge" >
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
          Add work experience
        </h2>
        <form className='text-sm space-y-4'>
          <div className="flex flex-col gap-1">
            <Label>Job Title</Label>
            <Input />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Company Name</Label>
            <Input />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Location</Label>
            <Input />
          </div>

          <div className="flex flex-col gap-1 ">
            <Label>Employment Type</Label>
            <Select>
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

          <div className='flex flex-col sm:flex-row gap-4'>
            <div className="flex flex-1 flex-col gap-1">
              <Label>Start Date</Label>
              <Input type='date' />
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <Label>End Date</Label>
              <Input type='date' />
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <Label>I am currently working here</Label>
            <Checkbox />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Description</Label>
            <Textarea />
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
                  : 'Save changes'
              }
            </Button>
          </div>

        </form>
      </div>
    </Modal >
  )
}

