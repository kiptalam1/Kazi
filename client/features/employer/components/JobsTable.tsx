import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import PostJobModal from "./modals/PostjobModal";
import { CompanyJob } from "../types/get-company-jobs.types";

type Props = {
  jobs: CompanyJob[];
};

export default function JobsTable({ jobs }: Props) {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<CompanyJob | undefined>();

  const handleOpenUpdateModal = (job: CompanyJob) => {
    setOpenUpdateModal(true);
    setSelectedJob(job);
  }

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedJob(undefined);
  }

  return (
    <div className="border-border overflow-hidden border">
      <table className="w-full border-collapse text-sm">
        <thead className="border-border-strong bg-background-subtle border-b">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Title</th>
            <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Level</th>
            <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Status</th>
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
              <td className="px-4 py-3 font-medium">{job.title}</td>
              <td className="text-text-muted px-4 py-3 text-xs hidden sm:table-cell">
                {job.experienceLevel}
              </td>
              <td className="px-4 py-3 text-xs hidden sm:table-cell">{job.status}</td>
              <td className="text-text-muted px-4 py-3 text-xs">
                {job.createdAt.split('T')[0]}
              </td>
              <td className='px-4 py-3 text-xs flex gap-4 items-center justify-around'>
                <Edit
                  onClick={() => handleOpenUpdateModal(job)}
                  className='size-5 text-brand-primary hover:text-brand-primary/50 duration-100' />
                <Trash2 className='size-5 text-danger hover:text-danger/50' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {
        <PostJobModal open={openUpdateModal}
          onClose={handleCloseUpdateModal}
          job={selectedJob}
        />
      }
    </div>
  )
}


