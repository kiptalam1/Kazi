import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import PostJobModal from './modals/PostjobModal';
import { CompanyJob } from '../types/get-company-jobs.types';
import ConfirmModal from '@/components/ui/ConfirmModal';
import useDeletejob from '../hooks/useDeleteJob';
import { useRouter } from 'next/navigation';
import NavLink from '@/components/ui/NavLink';

type Props = {
  jobs: CompanyJob[];
};

export default function JobsTable({ jobs }: Props) {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<CompanyJob | undefined>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutate: deleteJob, isPending: isDeletingJob } = useDeletejob();

  const handleOpenUpdateModal = (job: CompanyJob) => {
    setOpenUpdateModal(true);
    setSelectedJob(job);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedJob(undefined);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedJob(undefined);
  };

  const handleDeleteJob = () => {
    if (!selectedJob) return;
    deleteJob(selectedJob.id, {
      onSuccess: handleCloseDeleteModal,
    });
  };

  return (
    <div className="border-border overflow-hidden border">
      <table className="w-full border-collapse text-sm">
        <thead className="border-border-strong bg-background-subtle border-b">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Title</th>
            <th className="hidden px-4 py-3 text-left font-medium sm:table-cell">
              Level
            </th>
            <th className="hidden px-4 py-3 text-left font-medium sm:table-cell">
              Status
            </th>
            <th className="px-4 py-3 text-left font-medium">Posted</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="hover:bg-background-muted transition-colors"
            >
              <td className="px-4 py-3 font-medium">
                <NavLink
                  href={`/employer/jobs/${job.id}`}
                  className="cursor-pointer"
                >
                  {job.title}
                </NavLink>
              </td>
              <td className="text-text-muted hidden px-4 py-3 text-xs sm:table-cell">
                {job.experienceLevel}
              </td>
              <td className="hidden px-4 py-3 text-xs sm:table-cell">
                {job.status}
              </td>
              <td className="text-text-muted px-4 py-3 text-xs">
                {job.createdAt.split('T')[0]}
              </td>
              <td className="flex items-center justify-around gap-4 px-4 py-3 text-xs">
                <button
                  type="button"
                  aria-label={`Edit ${job.title} job`}
                  className="text-brand-primary hover:text-brand-primary/50 duration-100"
                  onClick={() => handleOpenUpdateModal(job)}
                >
                  <Edit className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label={`Delete ${job.title} job`}
                  className="text-danger hover:text-danger/50"
                  onClick={() => {
                    setSelectedJob(job);
                    setOpenDeleteModal(true);
                  }}
                >
                  <Trash2 className="size-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PostJobModal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        job={selectedJob}
      />
      <ConfirmModal
        title="Are you sure you want to delete this job?"
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        isPending={isDeletingJob}
        onConfirm={handleDeleteJob}
      />
    </div>
  );
}
