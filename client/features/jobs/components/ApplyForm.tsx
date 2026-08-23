import Button from "@/components/ui/Button"
import Label from "@/components/ui/Label"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"

type Props = {
  onClose: () => void;
};
export const ApplyForm = ({ onClose }: Props) => {
  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className="p-4 sm:p-6 md:p-8 bg-background w-full max-w-lg space-y-6">
      <h2
        id="apply-modal-title"
        className="font-semibold"
      >
        Apply for this job
      </h2>
      <div className="flex flex-col gap-1">
        <Label htmlFor="resume">Resume</Label>
        <Select
          id="resume"
          name="resumeId"
          defaultValue=""
        >
          <option value="" disabled>
            Select a resume
          </option>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor='coverLetter'>
          Cover Letter
        </Label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          className="min-h-48"
          placeholder="Tell the employer why you're a good fit for this position..."
        />
      </div>
      <div className='flex justify-end gap-4 items-center text-sm'>
        <Button variant='basic' type="button"
          onClick={onClose}
        >Cancel
        </Button>
        <Button type="submit">Apply</Button>
      </div>
    </form >
  )
}
