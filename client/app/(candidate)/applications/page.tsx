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
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="mx-auto p-6 text-center">{getApiErrorMessage(error)}</p>
    );
  }

  const applications = data?.data ?? [];
  // const meta = data?.meta ?? {};

  return (
    <main className="space-y-6 p-4 sm:py-8">
      <h1 className="text-text-primary text-xl font-semibold sm:text-2xl">
        My Applications
      </h1>
      <section className="space-y-4">
        {applications.length === 0 && (
          <div className="text-text-secondary text-center text-sm">
            You have no applications yet
          </div>
        )}
        {applications.map((app) => (
          <Link
            href={`/applications/${app.id}`}
            key={app.id}
            className="border-border-muted hover:border-focus block space-y-2 border px-2 py-4 duration-150"
          >
            <h2 className="text-sm font-medium">{app.job.title}</h2>
            <span className="text-text-muted bg-background-muted inline-block w-fit rounded-full px-2 py-1 text-xs">
              {app.status}
            </span>
            <p className="text-text-secondary my-2 text-xs">
              Applied on {formattedDate(app.createdAt)}
            </p>
            <div className="flex items-center gap-4">
              {app.job.company.logoUrl ? (
                <CompanyLogo
                  src={app.job.company.logoUrl}
                  alt={app.job.company.name}
                  width={28}
                  height={28}
                  className="h-auto w-auto"
                />
              ) : (
                <div className="border-border flex size-8 items-center justify-center rounded-full border p-2">
                  {getInitials(app.job.company.name)}
                </div>
              )}
              <p className="text-text-secondary text-sm">
                {app.job.company.name}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
