import { useMutation, useQueryClient } from '@tanstack/react-query';
import uploadCanidateResume from '../api/upload-candidate-resume';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';

export default function useUploadCandidateResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => uploadCanidateResume(data),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({
        queryKey: ['myresumes'],
      });
    },
  });
}
