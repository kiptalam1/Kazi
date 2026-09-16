import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCompanyBody } from '../types/create-company.types';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api/error';
import updateCompany from '../api/update-company';

type Props = {
  id: string;
  data: CreateCompanyBody;
};

export default function useUpdateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: Props) => updateCompany(id, data),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result) => {
      toast.success(result.message || 'Company updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['mycompanies'],
      });
    },
  });
}
