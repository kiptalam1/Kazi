'use client';

import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import Spinner from '@/components/ui/Spinner';
import { useOneJob } from '@/features/jobs/hooks/useOneJob';
import { getInitials } from '@/lib/utils/getInitials';
import { useParams } from 'next/navigation';

export default function page() {
  const { id } = useParams();
  const { data: job, isPending, isError, error } = useOneJob(id as string);

  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <main className="p-4 sm:py-8 space-y-6">
      <section>
        {isPending && (
          <div className="flex items-center justify-center h-screen">
            <Spinner />
          </div>
        )}
        {job && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <Button className="text-xs font-semibold cursor-pointer">Apply</Button>
            </div>
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
              <h3 className="text-lg text-text-secondary  font-medium">{job.company.name}</h3>
            </div>
            {/* job specifics */}
            <div className='space-y-2'>
              {job.location ? (
                <p className="text-sm text-text-muted">
                  Location: {' '}
                  <span className="text-base text-text-secondary">
                    {job.location}
                  </span>
                </p>
              ) : (
                <p>Location not specified</p>
              )}
              <div className=' flex items-center gap-3'>
                {job.isRemote && <Badge>Remote</Badge>}

                <Badge>{job.experienceLevel}</Badge>
                <Badge>{job.location}</Badge>
              </div>
            </div>
            <div className='space-y-2'>
              <h4 className='font-semibold text-text-muted'>
                Description
              </h4>
              <div className='text-text-secondary '>
                {job.description}
              </div>
            </div>
            <div></div>
          </div>
        )}
      </section>
    </main>
  );
}
