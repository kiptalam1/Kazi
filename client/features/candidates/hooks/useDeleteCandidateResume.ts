import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteCandidateResume from "../api/delete-candidate-resume";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api/error";

export default function useDeleteCandidateResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (resumeId: string) => deleteCandidateResume(resumeId),
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
