import { useMutation, useQueryClient } from "@tanstack/react-query"
import updateCandidateExperience from "../api/update-candidate-experience";
import type { ExperienceBody } from "../types/candidate.types";
import { getApiErrorMessage } from "@/lib/api/error";
import { toast } from "sonner";

export default function useUpdateCandidateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ experienceId, data }: {
      experienceId: string, data: ExperienceBody,
    }) => updateCandidateExperience(experienceId, data),
    onError: (error) => {
      console.error(getApiErrorMessage(error));
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({
        queryKey: ['myexperiences'],
      });
    },
  });
}
