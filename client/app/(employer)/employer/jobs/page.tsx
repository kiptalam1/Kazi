'use client';
import Spinner from '@/components/ui/Spinner';
import JobsTable from '@/features/employer/components/JobsTable';
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
      {jobs &&
        <JobsTable jobs={jobs} />
      }
    </div >
  );
}
