import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/lib/api/error";
import { toast } from "sonner";
import deleteCandidateEducation from "../api/delete-candidate-education";

export default function useDeleteCandidateEducation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (educationId: string) => deleteCandidateEducation(educationId),
    onError: (error) => {
      console.error(getApiErrorMessage(error));
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: () => {
      toast.success('Education deleted successfully.');
      queryClient.invalidateQueries({
        queryKey: ['myeducation'],
      });
    }
  });
}
