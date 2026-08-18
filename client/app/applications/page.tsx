'use client';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import Spinner from '@/components/ui/Spinner';
import useMyApplications from '@/features/applications/hooks/useMyApplications';
import { getApiErrorMessage } from '@/lib/api/error';
import formattedDate from '@/lib/utils/formattedDate';
import { getInitials } from '@/lib/utils/getInitials';
import Link from 'next/link';

export default function ApplicationsPage() {
  const { data, isError, isPending, error } = useMyApplications();

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center mx-auto p-6">{getApiErrorMessage(error)}</p>
    );
  }

  const applications = data?.data ?? [];
  // const meta = data?.meta ?? {};

  return (
    <main className="p-4 sm:py-8 space-y-4 sm:space-y-6 ">
      <h1 className="text-text-muted">My Applications</h1>
      <section className="space-y-4">
        {applications.length === 0 && (
          <div className="text-center text-text-secondary text-sm">
            You have no applications yet
          </div>
        )}
        {applications.map((app) => (
          <Link
            href={`/applications/${app.id}`}
            key={app.id}
            className="block space-y-2 border border-border-muted hover:border-focus duration-150 px-2 py-4 "
          >
            <h2 className="text-sm font-medium">{app.job.title}</h2>
            <span className="inline-block text-xs text-text-muted w-fit py-1 px-2 bg-background-muted rounded-full">
              {app.status}
            </span>
            <p className="text-xs text-text-secondary my-2">
              Applied on {formattedDate(app.createdAt)}
            </p>
            <div className="flex items-center gap-4">
              {app.job.company.logoUrl ? (
                <CompanyLogo
                  src={app.job.company.logoUrl}
                  alt={app.job.company.name}
                  width={28}
                  height={28}
                  className="w-auto h-auto"
                />
              ) : (
                <div className="border border-border p-2 rounded-full size-8 flex items-center justify-center">
                  {getInitials(app.job.company.name)}
                </div>
              )}
              <p className="text-sm text-text-secondary">
                {app.job.company.name}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
