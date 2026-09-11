import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateApplicationBody } from '../types/update-application.types';
import UpdateCandidateApplication from '../api/update-candidate-application';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';

type Props = {
  applicationId: string;
  data: UpdateApplicationBody;
};

export default function useUpdateCandidateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ applicationId, data }: Props) =>
      UpdateCandidateApplication(applicationId, data),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result, variables) => {
      toast.success(result.message || 'Success');
      queryClient.invalidateQueries({
        queryKey: ['candidate-application', variables.applicationId],
      });
    },
  });
}
