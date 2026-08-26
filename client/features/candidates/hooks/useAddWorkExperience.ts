import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ExperienceBody } from '../types/candidate.types';
import addCandidateWorkExperience from '../api/add-candidate-work-experience';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';

export default function useAddWorkExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ExperienceBody) => addCandidateWorkExperience(data),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({
        queryKey: ['myexperiences'],
      });
    },
  });
}
