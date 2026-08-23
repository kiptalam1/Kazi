import { useMutation, useQueryClient } from "@tanstack/react-query";
import applyjob from "../api/applyjob";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api/error";
import type { ApplyJobBody } from "../types/apply-job.types";

export default function useApplyjob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      jobId, data }: {
        jobId: string,
        data: ApplyJobBody
      }) => applyjob(jobId, data),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result, variables) => {
      toast.success(result.message);
      queryClient.invalidateQueries({
        queryKey: ['myapps'],
      });
      queryClient.invalidateQueries({
        queryKey: ['jobs', variables.jobId],
      })
    },
  });
}
