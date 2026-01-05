import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import facebookService from "@/service/facebook"
import { FacebookLinkRequest, FacebookLinkResponse } from "@/types/auth"
import type { AxiosErrorResponse } from "@/types/errors"

export function useLinkFacebook() {
  const queryClient = useQueryClient()

  return useMutation<
    FacebookLinkResponse,
    AxiosErrorResponse,
    FacebookLinkRequest
  >({
    mutationFn: (payload) => facebookService.linkFacebook(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["facebook-status"] })
      toast.success(data.message || "Liên kết Facebook thành công!")
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Liên kết Facebook thất bại"
      toast.error(message)
    },
  })
}

