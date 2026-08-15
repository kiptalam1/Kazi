import { useMutation } from '@tanstack/react-query';
import type { RegisterBody } from '../types/register.types';
import { registerUser } from '../api/register';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterBody) => registerUser(data),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result) => {
      toast.success(result.message);
    },
    retry: false,
  });
}
