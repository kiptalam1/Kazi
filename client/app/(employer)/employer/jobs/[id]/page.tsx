'use client';

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import NavLink from "@/components/ui/NavLink";
import Spinner from "@/components/ui/Spinner";
import { JobStatus } from "@/features/common/types/common.types";
import PostJobModal from "@/features/employer/components/modals/PostjobModal";
import useApplicationsPerJob from "@/features/employer/hooks/useApplicationsPerJob";
import useUpdateJob from "@/features/employer/hooks/useUpdateJob";
import { CompanyJob } from "@/features/employer/types/get-company-jobs.types";
import { useOneJob } from "@/features/jobs/hooks/useOneJob"
import { getApiErrorMessage } from "@/lib/api/error";
import { ArrowLeft, Loader2, MoveRight } from "lucide-react";
import { useParams, } from "next/navigation";
import { useState } from "react";

export default function JobPage() {
  const { id } = useParams();
  const { data: job, isPending, isError, error: jobError } = useOneJob(String(id));
  const { data: apps, isPending: isAppsPending, isError: isAppsError, error: appsError } = useApplicationsPerJob(String(id));
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { mutate: updateJob, isPending: isUpdatingJob } = useUpdateJob();


  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <p className="text-center text-danger text-sm p-6">{getApiErrorMessage(jobError)}</p>
    )
  }

  const createdAt = new Date(job.createdAt);
  const updatedAt = new Date(job.updatedAt);
  const wasUpdated = updatedAt > createdAt;

  function getButtonLabel(job: CompanyJob) {
    switch (job.status) {
      case 'PUBLISHED':
        return 'Close';
      default:
        return 'Publish';
    }
  }
  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateJobStatus = (status: JobStatus) => {
    updateJob({
      jobId: job.id,
      data: { status }
    })
  }



  return (
    <div className="space-y-4">
      <NavLink href='/employer/jobs'
        className="p-2 rounded-full hover:bg-background-muted flex items-center justify-center w-fit">
        <ArrowLeft className="size-4" />
      </NavLink>
      <header className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{job.experienceLevel}</Badge>
              <Badge>{job.status}</Badge>
              {job.isRemote && <Badge>REMOTE</Badge>}
            </div>
          </div>
          {/* actions */}
          <div className="flex items-center gap-2 text-xs">
            <Button
              type="button"
              onClick={handleOpenUpdateModal}
            >Edit</Button>
            <Button
              type="button"
              disabled={isUpdatingJob}
              onClick={() => handleUpdateJobStatus(job.status === 'PUBLISHED' ? 'CLOSED' : 'PUBLISHED')}
            >
              {isUpdatingJob
                ? <Loader2
                  className="size-3 animate-spin" />
                : getButtonLabel(job)}
            </Button>
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {job.location && (
          <div>
            <p className='text-xs text-text-muted'>Location</p>
            <p className="font-medium text-sm">
              {job.location}
            </p>
          </div>
        )}
        <div>
          <p className="text-text-muted text-xs">Salary</p>
          <p className="font-medium text-sm">
            {job.currency} {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-text-muted text-xs">Posted on</p>
          <p className="text-sm font-medium">
            {createdAt.toLocaleDateString()}
          </p>
        </div>

        {
          wasUpdated && (
            <div>
              <p className="text-text-muted text-xs">Updated on</p>
              <p className="text-sm font-medium">
                {updatedAt.toLocaleDateString()}
              </p>
            </div>
          )}

      </section>
      <section className="space-y-1 pt-4">
        <h3 className="text-text-muted uppercase text-sm font-semibold underline underline-offset-3">Job Description</h3>
        <p className="text-text-secondary whitespace-pre-wrap">
          {job.description}
        </p>
      </section>

      <section className="border-t border-border-muted p-4">
        {isAppsPending && (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        )}
        {
          isAppsError && (
            <p className="text-xs text-danger text-center">{getApiErrorMessage(appsError)}</p>
          )
        }
        {
          apps &&
          <div className="flex items-center justify-between gap-2">
            <p> Applicants ({apps.meta.total})</p>
            {apps.meta.total === 0 ? (
              <p className="text-sm text-text-muted">No applications yet.</p>
            ) : (
              <NavLink href={`/employer/jobs/${job.id}/applicants`} className="text-text-secondary flex items-center gap-1">View Applicants
                <MoveRight className="size-4" />
              </NavLink>
            )}
          </div>}
      </section>
      {
        <PostJobModal
          open={openUpdateModal}
          onClose={handleCloseUpdateModal}
          job={job}
        />
      }
    </div >
  )
}

