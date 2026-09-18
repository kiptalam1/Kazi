'use client';
import QueryError from '@/app/error';
import { Avatar } from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import { useJobs } from '@/features/jobs/hooks/useJobs';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

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

function JobsContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('q') ?? '';
  const { data, isError, isPending, error } = useJobs({ search });
  const jobs = data?.data ?? [];
  const meta = data?.meta;

  if (isError) {
    return <QueryError error={error} />;
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="border-border-muted flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-text-primary text-xl font-semibold sm:text-2xl">
            Find your next opportunity
          </h1>
          <p className="text-text-muted mt-2 text-sm">
            Search open roles from teams hiring now.
          </p>
        </div>
        {data?.meta && (
          <p className="text-text-muted text-sm">
            {data.meta.total} {data.meta.total === 1 ? 'job' : 'jobs'} found
          </p>
        )}
      </div>

      <form
        action="/jobs"
        className="border-border bg-background flex flex-col gap-3 border p-2 sm:flex-row"
      >
        <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
          <Search
            className="text-text-muted size-5 shrink-0"
            aria-hidden="true"
          />
          <span className="sr-only">Search jobs</span>
          <input
            name="q"
            defaultValue={search}
            className="text-text-primary placeholder:text-text-muted min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
            placeholder="Search by job title, skill, or keyword"
          />
        </label>
        <button
          className="bg-brand-primary text-text-inverse hover:bg-brand-hover focus:ring-brand-primary flex items-center justify-center gap-2 rounded-none px-5 py-3 text-sm font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
          type="submit"
        >
          Search jobs
        </button>
      </form>

      <section className="grid gap-4">
        {isPending && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <Spinner />
          </div>
        )}

        {!isPending && jobs.length === 0 && (
          <div className="border-border-muted border px-6 py-12 text-center">
            <h2 className="text-text-primary text-lg font-semibold">
              No jobs found
            </h2>
            <p className="text-text-muted mt-2 text-sm">
              Try searching for a different role or keyword.
            </p>
          </div>
        )}

        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="group focus-visible:outline-focus block focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Card className="border-border group-hover:border-brand-primary space-y-5 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
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
                  <h2 className="text-text-secondary min-w-0 truncate text-sm font-medium">
                    {job.company.name}
                  </h2>
                </div>
                <span className="text-text-muted shrink-0 text-xs">
                  {new Date(job.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <h3 className="text-text-primary text-xl font-semibold tracking-tight">
                  {job.title}
                </h3>
                <p className="text-text-muted mt-2 text-sm">
                  {job.location ?? 'Location not specified.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {job.isRemote && (
                  <span className="text-brand-active border-selection bg-selection inline-flex border px-2.5 py-1 text-xs font-medium">
                    Remote
                  </span>
                )}
                {job.experienceLevel && (
                  <span className="text-text-secondary border-border-muted bg-background-subtle inline-flex border px-2.5 py-1 text-xs font-medium">
                    {job.experienceLevel}
                  </span>
                )}
              </div>
              <div className="border-border-muted flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                <span className="text-text-primary text-sm font-semibold">
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency) ??
                    'Salary not specified'}
                </span>
                <span className="text-brand-primary text-sm font-semibold">
                  View role
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </section>
      {/* Pagination */}
      {meta && jobs.length > 0 && meta.totalPages > 0 && (
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

export default function JobsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <JobsContent />
    </Suspense>
  );
}
