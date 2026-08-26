'use client';

import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import Spinner from '@/components/ui/Spinner';
import { ApplyModal } from '@/features/jobs/components/modals/ApplyModal';
import { useOneJob } from '@/features/jobs/hooks/useOneJob';
import formattedDate from '@/lib/utils/formattedDate';
import { getInitials } from '@/lib/utils/getInitials';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function JobDetailsPage() {
  const { id } = useParams();
  const { data: job, isPending, isError, error } = useOneJob(id as string);
  const [openApplyModal, setOpenApplyModal] = useState(false);

  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <main className="p-4 sm:py-8 space-y-4 sm:spac-y-6">
      <section>
        <Link
          href={'/jobs'}
          className="mb-5 size-8 inline-flex items-center justify-center rounded-md text-text-secondary  hover:bg-background-muted hover:text-text-primary duration-75"
        >
          <ArrowLeft className="size-4" />
        </Link>
        {isPending && (
          <div className="flex items-center justify-center h-screen">
            <Spinner />
          </div>
        )}
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
                <span className="size-10  border border-border rounded-full flex items-center justify-center font-bold text-text-secondary">
                  {getInitials(job.company.name)}
                </span>
              )}
              <h3 className="text-lg text-text-secondary  font-medium">
                {job.company.name}
              </h3>
            </div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <Button
                type="button"
                onClick={() => setOpenApplyModal(true)}
                className="text-xs font-semibold cursor-pointer"
              >
                Apply
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
              <p className="text-sm text-text-muted">
                Posted {formattedDate(job.createdAt)}
              </p>
              <div className=" flex items-center gap-3">
                {job.isRemote && <Badge>Remote</Badge>}
                {job.experienceLevel && <Badge>{job.experienceLevel}</Badge>}
                {job.location && <Badge>{job.location}</Badge>}
              </div>
              <hr className="border border-border-muted my-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-text-muted">Description</h4>
              <div className="text-text-secondary ">{job.description}</div>
              <hr className="border border-border-muted my-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-text-muted">
                About the company
              </h4>
              <p className="text-sm font-medium text-text-secondary">
                {job.company.name}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
