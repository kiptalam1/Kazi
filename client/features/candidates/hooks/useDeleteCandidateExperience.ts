import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteCandidateExperience from '../api/delete-candidate-experience';
import { getApiErrorMessage } from '@/lib/api/error';
import { toast } from 'sonner';

export default function useDeleteCandidateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (experienceId: string) =>
      deleteCandidateExperience(experienceId),
    onError: (error) => {
      console.error(getApiErrorMessage(error));
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: () => {
      toast.success('Experience deleted successfully.');
      queryClient.invalidateQueries({
        queryKey: ['myexperiences'],
      });
    },
  });
}
