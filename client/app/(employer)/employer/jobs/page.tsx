'use client';
import Button from '@/components/ui/Button';
import JobsTable from '@/features/employer/components/JobsTable';
import PostJobModal from '@/features/employer/components/modals/PostjobModal';
import useCompanyJobs from '@/features/employer/hooks/useCompanyJobs';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import EmployerPageHeader from '@/features/employer/components/EmployerPageHeader';
import Loader from '@/app/loading';
import QueryError from '@/app/error';

export default function CompanyJobs() {
  const [openJobModal, setOpenJobModal] = useState(false);
  const {
    data: jobs,
    isPending: isJobsPending,
    isError: isJobsError,
    error: jobsError,
  } = useCompanyJobs();

  if (isJobsPending) {
    return <Loader />;
  }

  if (isJobsError) {
    return <QueryError error={jobsError} />;
  }

  return (
    <div>
      <EmployerPageHeader
        title="Your job listings"
        description="Manage your active and past job listings."
        action={
          <Button
            type="button"
            onClick={() => setOpenJobModal(true)}
            className="flex items-center gap-1 self-start rounded-none text-xs font-semibold sm:text-sm"
          >
            <Plus className="size-5" />
            Post a job
          </Button>
        }
      />
      {jobs && jobs.length > 0 ? (
        <JobsTable jobs={jobs} />
      ) : (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-center">
          <h2 className="text-lg font-semibold">No jobs posted yet</h2>
          <p className="text-text-muted text-sm">
            Post your first job to start receiving applications.
          </p>
        </div>
      )}
      {
        <PostJobModal
          open={openJobModal}
          onClose={() => setOpenJobModal(false)}
        />
      }
    </div>
  );
}
