import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCompanyBody } from "../types/create-company.types";
import createCompany from "../api/create-company";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api/error";

export default function useCreateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCompanyBody) => createCompany(data),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result) => {
      toast.success(result.message || 'Company created successfully');
      queryClient.invalidateQueries({
        queryKey: ['mycompanies'],
      });
    },
  });
}
