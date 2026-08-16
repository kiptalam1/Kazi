import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '../api/logout';
import { toast } from 'sonner';

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onError: (error) => {
      console.error('logout error ->', error);
    },
    onSuccess: (data) => {
      toast.success(data.message ?? 'Logged out successfully');
      queryClient.invalidateQueries({
        queryKey: ['auth', 'me'],
      });
    },
  });
}
