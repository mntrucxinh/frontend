import { useMutation } from "@tanstack/react-query"

import authService from "@/service/auth"
import { LogoutResponse } from "@/types/auth"
import type { AxiosErrorResponse } from "@/types/errors"

export const useMutationLogout = () => {
  return useMutation<LogoutResponse, AxiosErrorResponse, void>({
    mutationFn: authService.logout,
  })
}
