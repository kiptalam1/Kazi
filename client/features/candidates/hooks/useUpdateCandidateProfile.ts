import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CandidateUpdatePayload } from "../types/candidate.types";
import updateCandidateProfile from "../api/update-candidate-profile";
import { getApiErrorMessage } from "@/lib/api/error";
import { toast } from "sonner";

export default function useUpdateCandidateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CandidateUpdatePayload) => updateCandidateProfile(data),
    onError: (error) => {
      console.error(getApiErrorMessage(error));
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: () => {
      toast.success("Updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ['candidate', 'me'],
      });
    },
  });
}
