import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getApiErrorMessage } from '@/lib/api/error';
import { toast } from 'sonner';
import { CreateJobBody } from '../types/create-job.types';
import updateJob from '../api/update-job';

type Props = {
  jobId: string;
  data: Partial<CreateJobBody>;
};
export default function useUpdateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, data }: Props) => updateJob(jobId, data),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['company-jobs'],
      });

      queryClient.invalidateQueries({
        queryKey: ['dashboard-analytics'],
      });

      queryClient.invalidateQueries({
        queryKey: ['job', variables.jobId],
      });
      toast.success(result.message);
    },
  });
}
