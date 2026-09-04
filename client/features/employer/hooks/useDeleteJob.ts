import { useMutation, useQueryClient } from '@tanstack/react-query';
import deletejob from '../api/delete-job';
import { getApiErrorMessage } from '@/lib/api/error';
import { toast } from 'sonner';

export default function useDeletejob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId: string) => deletejob(jobId),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({
        queryKey: ['company-jobs'],
      });
      queryClient.invalidateQueries({
        queryKey: ['dashboard-analytics'],
      });
    },
  });
}
