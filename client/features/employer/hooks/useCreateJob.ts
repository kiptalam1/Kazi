import { useMutation, useQueryClient } from "@tanstack/react-query";
import createJob from "../api/create-job";
import { getApiErrorMessage } from "@/lib/api/error";
import { toast } from "sonner";
import { CreateJobBody } from "../types/create-job.types";

type Props = {
  slug: string;
  data: CreateJobBody;
}
export default function useCreateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, data }: Props) => createJob(slug, data),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ['company-jobs']
      });

      queryClient.invalidateQueries({
        queryKey: ['dashboard-analytics']
      });
      toast.success(result.message);
    }
  });
}
