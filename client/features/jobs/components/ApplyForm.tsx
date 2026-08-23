import Button from "@/components/ui/Button"
import Label from "@/components/ui/Label"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import useApplyjob from "@/features/applications/hooks/useApplyJob";
import { ApplyJobBody } from "@/features/applications/types/apply-job.types";
import { useCandidateResumes } from "@/features/candidates/hooks/useCandidateResumes";
import { ChangeEvent, SubmitEvent, useState } from "react";

type Props = {
  jobId: string;
  onClose: () => void;
};

export const ApplyForm = ({ jobId, onClose }: Props) => {
  const { data: resumes, isPending: isPendingResume, isError: isErrorResume, } = useCandidateResumes();
  const applyJobMutation = useApplyjob();
  const [formData, setFormData] = useState<ApplyJobBody>({
    coverLetter: '',
    resumeId: '',
  });

  function handleChange(event: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev, [name]: value,
    }));
  }

  const data: ApplyJobBody = {
    resumeId: formData.resumeId || undefined,
    coverLetter: formData.coverLetter || undefined,
  };

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    applyJobMutation.mutate({
      jobId,
      data
    }, {
      onSuccess: () => onClose()
    });
  }

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit}
      className="p-4 sm:p-6 md:p-8 bg-background w-full max-w-lg space-y-6 shadow-sm">
      <h2
        id="apply-modal-title"
        className="font-semibold"
      >
        Apply for this job
      </h2>
      <div className="flex flex-col gap-1">
        <Label htmlFor="resume">Resume</Label>
        {
          isPendingResume ? (
            <div className="text-xs text-text-muted">
              Loading resume...
            </div>
          ) : isErrorResume ? (
            <div className="text-xs text-text-muted">
              Unable to load resumes.
            </div>
          ) :
            resumes && resumes.length > 0 ? (
              <Select
                id="resume"
                name="resumeId"
                value={formData.resumeId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  No resume
                </option>

                {resumes.map((resume) => (
                  <option key={resume.id}
                    value={resume.id}
                  >
                    {resume.displayName || resume.fileName}
                  </option>
                ))}
              </Select>
            ) : (
              <div className="flex items-center justify-between gap-4 text-xs text-text-muted">
                <span>No resume uploaded</span>
                <Button
                  variant='basic'
                  type="button"
                  className="text-xs">
                  Upload
                </Button>
              </div>
            )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor='coverLetter'>
          Cover Letter
        </Label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          className="min-h-48"
          placeholder="Tell the employer why you're a good fit for this position..."
          rows={8}
          maxLength={5000}
          spellCheck
          autoCorrect="on"
          autoCapitalize="sentences"
          autoComplete="off"
          wrap="soft"
        />
      </div>
      <div className='flex justify-end gap-4 items-center text-sm'>
        <Button variant='basic' type="button"
          onClick={onClose}
        >Cancel
        </Button>
        <Button
          type="submit"
          disabled={applyJobMutation.isPending}
        >
          {applyJobMutation.isPending
            ? 'Applying...'
            : 'Apply'
          }
        </Button>
      </div>
    </form >
  )
}
