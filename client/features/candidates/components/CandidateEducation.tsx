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
      <div className="flex items-center justify-center  min-h-[50vh] w-full ">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center mx-auto p-6">{getApiErrorMessage(error)}</p>
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
    <section className="p-4 sm:p-6 border border-border-muted min-h-32 ">
      <div className="flex items-center justify-between  mb-4">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide">
          Education
        </h2>
        <button
          type="button"
          aria-label="add new education"
          onClick={handleAdd}
          className="p-2 hover:bg-background-muted duration-100 rounded-full text-text-muted"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <div className="divide-y divide-border-muted">
        {data.map((edu) => (
          <article
            key={edu.id}
            className="text-sm space-y-2 py-5 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-4 justify-between">
              <h3 className="font-semibold">{edu.schoolName}</h3>
              <div className="flex items-start gap-1 text-sm text-text-muted">
                <button
                  type="button"
                  aria-label={`Edit ${edu.schoolName}`}
                  onClick={() => handleEdit(edu)}
                  className="p-3 hover:bg-accent-soft hover:text-accent-hover rounded-full duration-100"
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
                  className="p-3 hover:bg-red-50 hover:text-danger rounded-full duration-100"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            </div>

            {edu.fieldOfStudy && (
              <p className="text-text-secondary">{edu.fieldOfStudy}</p>
            )}
            <p className="text-text-secondary text-xs bg-background-subtle w-fit py-1 px-1.5 rounded-full">
              {edu.qualification.trim().split('_').join(' ')}
            </p>
            {(edu.city || edu.country) && (
              <p className="text-text-secondary">
                {edu.city}
                {edu.city && edu.country && ', '}
                {edu.country}
              </p>
            )}
            <p className="text-xs text-text-muted">
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
