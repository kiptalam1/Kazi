'use client';
import { Avatar } from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import { useJobs } from '@/features/jobs/hooks/useJobs';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function JobsPage() {
  const { data, isError, isPending, error } = useJobs();
  const jobs = data?.data ?? [];
  const meta = data?.meta;

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="space-y-6 overflow-hidden p-4 sm:py-8">
      <h1 className="text-text-primary text-xl font-semibold sm:text-2xl">
        Jobs
      </h1>
      <section className="grid gap-4">
        {isPending && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <Spinner />
          </div>
        )}

        {jobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`} className="block">
            <Card className="space-y-2">
              <div className="flex items-center gap-3">
                {job.company.logoUrl ? (
                  <Avatar
                    className="size-10"
                    src={job.company.logoUrl}
                    alt={job.company.name}
                    width={50}
                    height={50}
                  />
                ) : (
                  <span className="border-border text-text-muted flex size-10 items-center justify-center rounded-full border font-bold">
                    {job.company.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <h2 className="text-text-secondary text-sm font-medium">
                  {job.company.name}
                </h2>
              </div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-text-muted text-sm">
                {job.location ?? 'Location not specified.'}
              </p>
              {job.isRemote && (
                <span className="text-text-secondary border-border-muted bg-background-subtle inline-flex rounded-full border px-2.5 py-1 text-xs font-medium shadow-xs">
                  Remote
                </span>
              )}
            </Card>
          </Link>
        ))}
      </section>
      {/* Pagination */}
      {meta && (
        <section className="flex items-center justify-center gap-3">
          <Button variant="basic" disabled={meta.page <= 1}>
            <ArrowLeft size={16} />
          </Button>
          <span className="text-xs">
            {meta.page} / {meta.totalPages}
          </span>
          <Button variant="basic" disabled={meta.page >= meta.totalPages}>
            <ArrowRight size={16} />
          </Button>
        </section>
      )}
    </div>
  );
}
