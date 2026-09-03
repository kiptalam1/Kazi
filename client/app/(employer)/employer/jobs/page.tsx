'use client';
import Spinner from '@/components/ui/Spinner';
import useCompanyJobs from '@/features/employer/hooks/useCompanyJobs';
import { getApiErrorMessage } from '@/lib/api/error';

export default function CompanyJobs() {
  const {
    data: jobs,
    isPending: isJobsPending,
    isError: isJobsError,
    error: jobsError,
  } = useCompanyJobs();

  if (isJobsPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isJobsError) {
    return (
      <p className="text-text-muted text-center text-sm">
        {getApiErrorMessage(jobsError)}
      </p>
    );
  }

  return (
    <div>
      {jobs && (
        <div className="border-border overflow-hidden border">
          <table className="w-full border-collapse text-sm">
            <thead className="border-border-strong bg-background-subtle border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Level</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Posted</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-background-muted transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{job.title}</td>
                  <td className="text-text-muted px-4 py-3 text-xs">
                    {job.experienceLevel}
                  </td>
                  <td className="px-4 py-3 text-xs">{job.status}</td>
                  <td className="text-text-muted px-4 py-3 text-xs">
                    {job.createdAt.split('T')[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
