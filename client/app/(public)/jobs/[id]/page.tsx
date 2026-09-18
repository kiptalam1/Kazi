'use client';

import QueryError from '@/app/error';
import Loader from '@/app/loading';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ApplyModal } from '@/features/jobs/components/modals/ApplyModal';
import { useOneJob } from '@/features/jobs/hooks/useOneJob';
import formattedDate from '@/lib/utils/formattedDate';
import { getInitials } from '@/lib/utils/getInitials';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

function formatSalary(
  salaryMin: number | null,
  salaryMax: number | null,
  currency: string | null,
) {
  if (salaryMin == null && salaryMax == null) return null;

  const format = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency ?? 'KES',
      maximumFractionDigits: 0,
    }).format(value);

  if (salaryMin != null && salaryMax != null) {
    return `${format(salaryMin)} - ${format(salaryMax)}`;
  }

  return format(salaryMin ?? salaryMax!);
}

export default function JobDetailsPage() {
  const { id } = useParams();
  const {
    data: job,
    isPending: isJobPending,
    isError: isJobError,
    error: jobError,
  } = useOneJob(id as string);
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const {
    data: user,
    isPending: isAuthPending,
    isError: isAuthError,
  } = useAuth();
  const router = useRouter();

  if (isJobPending) {
    return <Loader />;
  }

  if (isJobError || !job) {
    return <QueryError error={jobError} />;
  }

  function handleClickApply() {
    if (!user || isAuthError) {
      router.push(`/login?callbackUrl=/jobs/${job?.id}`);
      return;
    } else {
      setOpenApplyModal(true);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6 sm:space-y-6 sm:px-6 sm:py-10 lg:px-8">
      <section>
        <Link
          href={'/jobs'}
          aria-label="Back to jobs"
          className="text-text-secondary hover:bg-background-muted hover:text-text-primary mb-5 inline-flex size-8 items-center justify-center duration-75"
        >
          <ArrowLeft className="size-4" />
        </Link>

        {job && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {job.company.logoUrl ? (
                <CompanyLogo
                  src={job.company.logoUrl}
                  alt={job.company.name}
                  width={50}
                  height={50}
                  className="size-10"
                />
              ) : (
                <span className="border-border text-text-secondary flex size-10 items-center justify-center rounded-full border font-bold">
                  {getInitials(job.company.name)}
                </span>
              )}
              <h3 className="text-text-secondary text-lg font-medium">
                {job.company.name}
              </h3>
            </div>
            <div className="border-border-muted flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="text-text-primary max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">
                {job.title}
              </h1>
              <Button
                type="button"
                onClick={handleClickApply}
                disabled={isAuthPending}
                className="w-full cursor-pointer text-xs font-semibold sm:w-auto"
              >
                {isAuthPending ? 'Checking' : 'Apply'}
              </Button>
            </div>
            {openApplyModal && (
              <ApplyModal
                jobId={job.id}
                open={openApplyModal}
                onClose={() => setOpenApplyModal(false)}
              />
            )}

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {job.isRemote && <Badge className="rounded-none">Remote</Badge>}
                {job.experienceLevel && (
                  <Badge className="rounded-none">{job.experienceLevel}</Badge>
                )}
                {job.location && (
                  <Badge className="rounded-none">{job.location}</Badge>
                )}
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-text-primary text-lg font-semibold">
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency) ??
                    'Salary not specified'}
                </p>
                <p className="text-text-muted text-sm">
                  Posted {formattedDate(job.createdAt)}
                </p>
              </div>
            </div>
            <div className="border-border-muted max-w-3xl space-y-3 border-t pt-6">
              <h2 className="text-text-primary font-semibold">Description</h2>
              <div className="text-text-secondary leading-7 whitespace-pre-wrap">
                {job.description}
              </div>
              <hr className="border-border-muted my-6 border" />
            </div>
            <div className="max-w-3xl space-y-2">
              <h2 className="text-text-primary font-semibold">
                About the company
              </h2>
              <p className="text-text-secondary text-sm font-medium">
                {job.company.name}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
