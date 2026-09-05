'use client';

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import NavLink from "@/components/ui/NavLink";
import Spinner from "@/components/ui/Spinner";
import { CompanyJob } from "@/features/employer/types/get-company-jobs.types";
import { useOneJob } from "@/features/jobs/hooks/useOneJob"
import { getApiErrorMessage } from "@/lib/api/error";
import { ArrowLeft, MoveRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function JobPage() {
  const { id } = useParams();
  const { data: job, isPending, isError, error: jobError } = useOneJob(String(id));
  const router = useRouter();

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

  return (
    <div className="space-y-4">
      <button
        type='button'
        onClick={() => router.push('/employer/jobs')}
        className="p-2 rounded-full hover:bg-background-muted flex items-center justify-center">
        <ArrowLeft className="size-4" />
      </button>
      <header className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{job.title}</h2>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{job.experienceLevel}</Badge>
              <Badge>{job.status}</Badge>
              {job.isRemote && <Badge>REMOTE</Badge>}
            </div>
          </div>
          {/* actions */}
          <div className="flex items-center gap-2 text-xs">
            <Button>Edit</Button>
            <Button>{getButtonLabel(job)}</Button>
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

        <div className="flex items-center justify-between gap-2">
          <p> Applicants</p>
          <NavLink href="/" className="text-text-secondary flex items-center gap-1">View Applicants
            <MoveRight className="size-4" />
          </NavLink>
        </div>
      </section>
    </div >
  )
}

