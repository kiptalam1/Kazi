import { useMutation, useQueryClient } from '@tanstack/react-query';
import { withdrawApplication } from '../api/withdrawApplication';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';

export function useWithdrawApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (applicationId: string) => withdrawApplication(applicationId),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({
        queryKey: ['myapps'],
      });
      queryClient.invalidateQueries({
        queryKey: ['applications', result.data.id],
      });
    },
  });
}
