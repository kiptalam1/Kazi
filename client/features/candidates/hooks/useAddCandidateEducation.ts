import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { EducationBody } from "../types/candidate.types";
import addCandidateEducation from "../api/add-candidate-education";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api/error";

export default function useAddCandidateEducation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EducationBody) => addCandidateEducation(data),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({
        queryKey: ['myeducation'],
      });
    },
  });
}
