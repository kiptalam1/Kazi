'use client';

import ApplicationStatusBadge from '@/features/applications/components/ApplicationStatusBadge';
import useMyApplications from '@/features/applications/hooks/useMyApplications';
import type { AppsParams } from '@/features/applications/types/get-my-applications.types';
import type { ApplicationStatus } from '@/features/common/types/common.types';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import Spinner from '@/components/ui/Spinner';
import formattedDate from '@/lib/utils/formattedDate';
import { getInitials } from '@/lib/utils/getInitials';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Loader from '@/app/loading';
import QueryError from '@/app/error';

const statusOptions: { value: ApplicationStatus | ''; label: string }[] = [
  { value: '', label: 'All applications' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'REVIEWING', label: 'Under review' },
  { value: 'INTERVIEW', label: 'Interview' },
  { value: 'SHORTLISTED', label: 'Shortlisted' },
  { value: 'OFFERED', label: 'Offer received' },
  { value: 'HIRED', label: 'Hired' },
  { value: 'REJECTED', label: 'Not selected' },
  { value: 'WITHDRAWN', label: 'Withdrawn' },
];

function getStatus(value: string | null): ApplicationStatus | undefined {
  if (value && statusOptions.some((option) => option.value === value)) {
    return value as ApplicationStatus;
  }
  return undefined;
}

function ApplicationsContent() {
  const searchParams = useSearchParams();
  const status = getStatus(searchParams.get('status'));
  const page = Math.max(Number(searchParams.get('page')) || 1, 1);
  const params: AppsParams = { page, status };
  const { data, isError, isPending, error } = useMyApplications(params);

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <QueryError error={error} />;
  }

  const applications = data?.data ?? [];
  const meta = data?.meta;

  function buildUrl(
    nextPage: number,
    nextStatus: ApplicationStatus | null = status ?? null,
  ) {
    const params = new URLSearchParams();
    if (nextStatus) params.set('status', nextStatus);
    if (nextPage > 1) params.set('page', String(nextPage));
    const query = params.toString();
    return query ? `/applications?${query}` : '/applications';
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="border-border-muted flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-text-primary text-2xl font-semibold tracking-tight">
            My applications
          </h1>
          <p className="text-text-muted mt-2 text-sm">
            Track the roles you have applied for and their latest status.
          </p>
        </div>
        {meta && (
          <p className="text-text-muted text-sm">
            {meta.total} {meta.total === 1 ? 'application' : 'applications'}
          </p>
        )}
      </div>

      <nav
        aria-label="Filter applications by status"
        className="border-border-muted flex flex-wrap gap-3 border-b pb-4"
      >
        {statusOptions.map((option) => (
          <Link
            key={option.value || 'all'}
            href={buildUrl(1, option.value || null)}
            className={`focus-visible:outline-focus shrink-0 border px-4 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${status === option.value || (!status && !option.value) ? 'border-brand-primary bg-selection text-brand-active font-medium' : 'border-border-muted text-text-secondary hover:border-brand-primary hover:text-brand-active'}`}
          >
            {option.label}
          </Link>
        ))}
      </nav>

      <section className="space-y-4">
        {applications.length === 0 && (
          <div className="border-border-muted border px-6 py-14 text-center">
            <h2 className="text-text-primary text-lg font-semibold">
              You have no applications yet
            </h2>
            <p className="text-text-muted mx-auto mt-2 max-w-md text-sm leading-6">
              When you apply for a role, it will appear here so you can track
              its progress.
            </p>
            <Link
              href="/jobs"
              className="bg-brand-primary text-text-inverse hover:bg-brand-hover mt-6 inline-flex px-4 py-2.5 text-sm font-semibold transition-colors"
            >
              Browse jobs
            </Link>
          </div>
        )}

        {applications.map((application) => (
          <Link
            href={`/applications/${application.id}`}
            key={application.id}
            className="group border-border hover:border-brand-primary focus-visible:outline-focus block border p-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                {application.job.company.logoUrl ? (
                  <CompanyLogo
                    src={application.job.company.logoUrl}
                    alt={application.job.company.name}
                    width={40}
                    height={40}
                    className="shrink-0"
                  />
                ) : (
                  <div className="border-border flex size-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
                    {getInitials(application.job.company.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="text-text-primary truncate text-lg font-semibold">
                    {application.job.title}
                  </h2>
                  <p className="text-text-secondary mt-1 text-sm">
                    {application.job.company.name}
                  </p>
                  <p className="text-text-muted mt-2 text-sm">
                    {application.job.location ?? 'Location not specified.'}
                    <span className="mx-2">·</span>
                    {application.job.isRemote ? 'Remote' : 'On-site'}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                <ApplicationStatusBadge status={application.status} />
                <p className="text-text-muted text-xs">
                  Applied {formattedDate(application.createdAt)}
                </p>
              </div>
            </div>
            <div className="text-brand-primary border-border-muted mt-5 border-t pt-4 text-sm font-semibold opacity-100 sm:text-right sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
              View application
            </div>
          </Link>
        ))}
      </section>

      {meta && applications.length > 0 && meta.totalPages > 0 && (
        <nav
          aria-label="Applications pagination"
          className="flex items-center justify-center gap-4"
        >
          <Link
            aria-label="Previous page"
            aria-disabled={meta.page <= 1}
            href={meta.page > 1 ? buildUrl(meta.page - 1) : buildUrl(meta.page)}
            className={`border-border inline-flex size-10 items-center justify-center border ${meta.page <= 1 ? 'pointer-events-none opacity-40' : 'hover:border-brand-primary'}`}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </Link>
          <span className="text-text-muted text-sm">
            Page {meta.page} of {meta.totalPages}
          </span>
          <Link
            aria-label="Next page"
            aria-disabled={meta.page >= meta.totalPages}
            href={
              meta.page < meta.totalPages
                ? buildUrl(meta.page + 1)
                : buildUrl(meta.page)
            }
            className={`border-border inline-flex size-10 items-center justify-center border ${meta.page >= meta.totalPages ? 'pointer-events-none opacity-40' : 'hover:border-brand-primary'}`}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
        </nav>
      )}
    </main>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ApplicationsContent />
    </Suspense>
  );
}
