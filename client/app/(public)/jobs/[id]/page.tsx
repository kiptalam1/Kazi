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
    <main className="space-y-4 p-4 sm:space-y-6 sm:py-8">
      <section>
        <Link
          href={'/jobs'}
          aria-label="Back to jobs"
          className="text-text-secondary hover:bg-background-muted hover:text-text-primary mb-5 inline-flex size-8 items-center justify-center rounded-md duration-75"
        >
          <ArrowLeft className="size-4" />
        </Link>

        {job && (
          <div className="space-y-4">
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
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <Button
                type="button"
                onClick={handleClickApply}
                disabled={isAuthPending}
                className="cursor-pointer text-xs font-semibold"
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

            {/* job specifics */}
            <div className="space-y-2">
              <p className="text-text-secondary text-sm font-medium">
                {job.location ?? ''}
              </p>
              <p className="text-text-muted text-sm">
                Posted {formattedDate(job.createdAt)}
              </p>
              <div className="flex items-center gap-3">
                {job.isRemote && <Badge>Remote</Badge>}
                {job.experienceLevel && <Badge>{job.experienceLevel}</Badge>}
                {job.location && <Badge>{job.location}</Badge>}
              </div>
              <hr className="border-border-muted my-6 border" />
            </div>
            <div className="space-y-2">
              <h4 className="text-text-muted font-semibold">Description</h4>
              <div className="text-text-secondary">{job.description}</div>
              <hr className="border-border-muted my-6 border" />
            </div>
            <div className="space-y-2">
              <h4 className="text-text-muted font-semibold">
                About the company
              </h4>
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
