'use client';

import NavLink from '@/components/ui/NavLink';
import Spinner from '@/components/ui/Spinner';
import useApplicationsPerJob from '@/features/employer/hooks/useApplicationsPerJob';
import { getApiErrorMessage } from '@/lib/api/error';
import formattedDate from '@/lib/utils/formattedDate';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

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
    <div className="space-y-4">
      <NavLink
        href={`/employer/jobs/${id}`}
        className="hover:bg-background-muted flex w-fit items-center justify-center rounded-full p-2"
      >
        <ArrowLeft className="size-4" />
      </NavLink>

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
                    No applications yet.
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
                    <td className="text-text-secondary px-4 py-3">
                      {app.candidate.user.email}
                    </td>
                    <td className="text-text-muted px-4 py-3 text-xs">
                      {app.candidate.experienceLevel}
                    </td>
                    <td className="text-text-muted px-4 py-3 text-xs">
                      {app.status}
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
