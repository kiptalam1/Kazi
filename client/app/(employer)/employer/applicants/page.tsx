'use client';

import QueryError from '@/app/error';
import Loader from '@/app/loading';
import NavLink from '@/components/ui/NavLink';
import useAllCompanyApplications from '@/features/employer/hooks/useAllCompanyApplications';
import formattedDate from '@/lib/utils/formattedDate';

export default function ApplicantsPage() {
  const { data, isPending, isError, error } = useAllCompanyApplications();

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <QueryError error={error} />;
  }

  return (
    <div>
      <div className="border-border overflow-x-auto border">
        <table className="w-full border-collapse">
          <thead className="bg-background-muted border-border border-b text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-sm font-medium">Email</th>
              <th className="px-4 py-3 text-sm font-medium">Experience</th>
              <th className="px-4 py-3 text-sm font-medium">Job</th>
              <th className="px-4 py-3 text-sm font-medium">Status</th>
              <th className="px-4 py-3 text-sm font-medium">Applied</th>
            </tr>
          </thead>
          <tbody className="divide-border w-full divide-y">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-text-secondary text-center text-sm"
                >
                  No applicants yet
                </td>
              </tr>
            ) : (
              data.map((app) => (
                <tr
                  key={app.id}
                  className="text-text-secondary hover:bg-background-muted"
                >
                  <td className="text-text-primary max-w-45 px-4 py-3 text-left font-semibold wrap-break-word">
                    <NavLink
                      href={`/employer/jobs/${app.job.id}/applicants/${app.id}`}
                    >
                      {app.candidate.user.firstName}{' '}
                      {app.candidate.user.lastName}
                    </NavLink>
                  </td>
                  <td className="max-w-45 px-4 py-3 text-left wrap-break-word">
                    {app.candidate.user.email}
                  </td>
                  <td className="text-text-muted px-4 py-3 text-left text-xs">
                    {app.candidate.experienceLevel ?? '_'}
                  </td>
                  <td className="px-4 py-3 text-left text-sm font-semibold">
                    <NavLink href={`/employer/jobs/${app.job.id}`}>
                      {app.job.title}
                    </NavLink>
                  </td>
                  <td className="text-text-muted px-4 py-3 text-left text-xs">
                    {app.status}
                  </td>
                  <td className="px-4 py-3 text-left text-xs">
                    {formattedDate(app.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
