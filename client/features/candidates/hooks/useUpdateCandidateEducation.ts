import { useMutation, useQueryClient } from "@tanstack/react-query";
import updatedCandidateEducation from "../api/update-candidate-education";
import type { EducationBody } from "../types/candidate.types";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api/error";

type Props = {
  educationId: string;
  data: EducationBody;
};
export default function useUpdateCandidateEducation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ educationId, data }: Props) => updatedCandidateEducation(educationId, data),
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
