import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatar } from "../api/upload-avatar";
import { getApiErrorMessage } from "@/lib/api/error";
import { toast } from "sonner";

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => uploadAvatar(data),
    onError: (error) => {
      console.error(error);
      toast.error(getApiErrorMessage(error));
    },
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({
        queryKey: ['auth', 'me']
      });
    },
  });
}
