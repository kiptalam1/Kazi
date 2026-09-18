'use client';

import NavLink from '@/components/ui/NavLink';
import Spinner from '@/components/ui/Spinner';
import useApplicationsPerJob from '@/features/employer/hooks/useApplicationsPerJob';
import { getApiErrorMessage } from '@/lib/api/error';
import formattedDate from '@/lib/utils/formattedDate';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import ApplicationStatusBadge from '@/features/applications/components/ApplicationStatusBadge';

export default function JobApplicantsPage() {
  const { id } = useParams();
  const { data, isPending, isError, error } = useApplicationsPerJob(String(id));

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-danger text-center text-sm">
        {getApiErrorMessage(error)}
      </p>
    );
  }

  const applications = data.data;

  return (
    <div className="space-y-6">
      <NavLink
        href={`/employer/jobs/${id}`}
        aria-label="Back to job"
        className="hover:bg-background-muted focus-visible:outline-focus flex w-fit items-center justify-center p-2 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <ArrowLeft className="size-4" />
      </NavLink>

      <header className="border-border-muted flex items-end justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-text-primary text-2xl font-semibold tracking-tight">
            Job applicants
          </h1>
          <p className="text-text-muted mt-2 text-sm">
            Review and manage candidates for this role.
          </p>
        </div>
        <span className="text-text-muted shrink-0 text-sm">
          {applications.length}{' '}
          {applications.length === 1 ? 'applicant' : 'applicants'}
        </span>
      </header>

      <section className="border-border overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-background-subtle border-border-strong border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Experience</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="hidden px-4 py-3 text-left font-medium sm:table-cell">
                  Applied
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-text-muted px-4 py-8 text-center text-sm"
                  >
                    No applications yet. Candidates will appear here when they
                    apply.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-background-muted text-sm duration-75"
                  >
                    <td className="w-45 px-4 py-3 wrap-break-word">
                      <NavLink
                        href={`/employer/jobs/${id}/applicants/${app.id}`}
                      >
                        {app.candidate.user.firstName}{' '}
                        {app.candidate.user.lastName}
                      </NavLink>
                    </td>
                    <td className="text-text-secondary hidden px-4 py-3 sm:table-cell">
                      {app.candidate.user.email}
                    </td>
                    <td className="text-text-muted px-4 py-3 text-xs">
                      {app.candidate.experienceLevel}
                    </td>
                    <td className="text-text-muted px-4 py-3 text-xs">
                      <ApplicationStatusBadge status={app.status} />
                    </td>
                    <td className="text-text-muted hidden px-4 py-3 text-xs sm:table-cell">
                      {formattedDate(app.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
