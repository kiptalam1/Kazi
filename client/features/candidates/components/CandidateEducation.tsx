import Spinner from '@/components/ui/Spinner';
import { useCandidateEducation } from '../hooks/useCandidateEducation';
import { getApiErrorMessage } from '@/lib/api/error';
import formattedDate from '@/lib/utils/formattedDate';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import EducationModal from './modals/EducationModal';
import type { Education } from '../types/candidate.types';
import ConfirmModal from '@/components/ui/ConfirmModal';
import useDeleteCandidateEducation from '../hooks/useDeleteCandidateEducation';

export default function CandidateEducation() {
  const { data, isPending, isError, error } = useCandidateEducation();
  const [openEducationModal, setOpenEducationModal] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<
    Education | undefined
  >();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutate: deleteEducation, isPending: isDeleting } =
    useDeleteCandidateEducation();

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="mx-auto p-6 text-center">{getApiErrorMessage(error)}</p>
    );
  }

  const handleAdd = () => {
    setSelectedEducation(undefined);
    setOpenEducationModal(true);
  };

  const handleEdit = (education: Education) => {
    setSelectedEducation(education);
    setOpenEducationModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEducation(undefined);
    setOpenEducationModal(false);
  };

  const handleDelete = () => {
    if (!selectedEducation) return;
    deleteEducation(selectedEducation.id, {
      onSuccess: () => {
        setSelectedEducation(undefined);
        setOpenDeleteModal(false);
      },
    });
  };
  return (
    <section className="border-border min-h-32 border p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-text-muted text-sm font-semibold tracking-wide uppercase">
          Education
        </h2>
        <button
          type="button"
          aria-label="add new education"
          onClick={handleAdd}
          className="hover:bg-background-muted text-text-muted rounded-full p-2 duration-100"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <div className="divide-border-muted divide-y">
        {data.map((edu) => (
          <article
            key={edu.id}
            className="space-y-2 py-5 text-sm first:pt-0 last:pb-0"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold">{edu.schoolName}</h3>
              <div className="text-text-muted flex items-start gap-1 text-sm">
                <button
                  type="button"
                  aria-label={`Edit ${edu.schoolName}`}
                  onClick={() => handleEdit(edu)}
                  className="hover:bg-accent-soft hover:text-accent-hover rounded-full p-3 duration-100"
                >
                  <Pencil className="size-3" />
                </button>
                <button
                  type="button"
                  aria-label={`Delete ${edu.schoolName}`}
                  onClick={() => {
                    setOpenDeleteModal(true);
                    setSelectedEducation(edu);
                  }}
                  className="hover:text-danger rounded-full p-3 duration-100 hover:bg-red-50"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            </div>

            {edu.fieldOfStudy && (
              <p className="text-text-secondary">{edu.fieldOfStudy}</p>
            )}
            <p className="text-text-secondary bg-background-subtle w-fit rounded-full px-1.5 py-1 text-xs">
              {edu.qualification.trim().split('_').join(' ')}
            </p>
            {(edu.city || edu.country) && (
              <p className="text-text-secondary">
                {edu.city}
                {edu.city && edu.country && ', '}
                {edu.country}
              </p>
            )}
            <p className="text-text-muted text-xs">
              {formattedDate(edu.startDate)} –{' '}
              {edu.endDate ? formattedDate(edu.endDate) : 'Present'}
            </p>
          </article>
        ))}
      </div>
      {
        <EducationModal
          open={openEducationModal}
          onClose={handleCloseModal}
          education={selectedEducation}
        />
      }
      {
        <ConfirmModal
          title="Are you sure you want to delete this education? "
          open={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false);
            setSelectedEducation(undefined);
          }}
          onConfirm={handleDelete}
          isPending={isDeleting}
        />
      }
    </section>
  );
}
