import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../api/login';
import { type LoginBody } from '../types/login.types';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginBody) => loginUser(data),
    onError(error) {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ['auth', 'me'],
      });
      toast.success(result.message);
    },
    retry: false,
  });
}
