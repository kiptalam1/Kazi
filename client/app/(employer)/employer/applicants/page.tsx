'use client';

import QueryError from '@/app/error';
import Loader from '@/app/loading';
import NavLink from '@/components/ui/NavLink';
import useAllCompanyApplications from '@/features/employer/hooks/useAllCompanyApplications';
import EmployerPageHeader from '@/features/employer/components/EmployerPageHeader';
import ApplicationStatusBadge from '@/features/applications/components/ApplicationStatusBadge';
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
      <EmployerPageHeader
        title="Applicants"
        description="Review candidates across your open roles."
      />
      <section className="border-border overflow-hidden border">
        <div className="border-border-muted flex items-center justify-between border-b px-4 py-4">
          <h2 className="text-text-primary font-semibold">All applicants</h2>
          <span className="text-text-muted text-sm">
            {data.length} {data.length === 1 ? 'candidate' : 'candidates'}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-175 border-collapse">
            <thead className="bg-background-muted border-border border-b text-left">
              <tr>
                <th className="px-4 py-3 text-sm font-medium">Name</th>
                <th className="hidden px-4 py-3 text-sm font-medium sm:table-cell">
                  Email
                </th>
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
                    className="text-text-secondary px-4 py-3 text-center text-sm"
                  >
                    No applicants yet. Candidates will appear here when they
                    apply.
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
                    <td className="text-text-secondary hidden max-w-45 px-4 py-3 text-left wrap-break-word sm:table-cell">
                      {app.candidate.user.email}
                    </td>
                    <td className="px-4 py-3 text-left text-xs">
                      {app.candidate.experienceLevel ?? '_'}
                    </td>
                    <td className="px-4 py-3 text-left text-sm font-semibold">
                      <NavLink href={`/employer/jobs/${app.job.id}`}>
                        {app.job.title}
                      </NavLink>
                    </td>
                    <td className="text-text-muted px-4 py-3 text-left text-xs">
                      <ApplicationStatusBadge status={app.status} />
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
      </section>
    </div>
  );
}
