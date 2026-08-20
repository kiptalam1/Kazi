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
    <main className="p-4 sm:py-8 space-y-6 ">
      <h1 className="text-text-primary text-xl sm:text-2xl font-semibold">
        Jobs
      </h1>
      <section className="grid gap-4">
        {isPending && (
          <div className="flex items-center justify-center h-screen">
            <Spinner />
          </div>
        )}

        {jobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`} className="block">
            <Card className="space-y-2">
              <div className="flex items-center gap-3 ">
                {job.company.logoUrl ? (
                  <Avatar
                    className="size-10"
                    src={job.company.logoUrl}
                    alt={job.company.name}
                    width={50}
                    height={50}
                  />
                ) : (
                  <span className="font-bold border border-border text-text-muted rounded-full size-10 flex items-center justify-center">
                    {job.company.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <h2 className="text-sm text-text-secondary font-medium">
                  {job.company.name}
                </h2>
              </div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-text-muted">
                {job.location ?? 'Location not specified.'}
              </p>
              {job.isRemote && (
                <span className="text-xs text-text-secondary font-medium border border-border-muted shadow-xs inline-flex bg-background-subtle py-1 px-2.5 rounded-full">
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
    </main>
  );
}
