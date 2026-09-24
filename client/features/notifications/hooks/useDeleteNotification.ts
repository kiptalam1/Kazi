import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteNotification from '../api/delete-notification';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';

export default function useDeleteNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Notification deleted  successfully.');
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
      });
    },
  });
}
