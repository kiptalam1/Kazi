import { useMutation, useQueryClient } from '@tanstack/react-query';
import markRead from '../api/mark-read';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';

export default function useMarkReadNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markRead(id),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
  });
}
