import { useApiQuery } from "@/hook/use-api-query"
import { FacebookStatusResponse } from "@/types/auth"

export function useFacebookStatus(options?: { enabled?: boolean }) {
  return useApiQuery<FacebookStatusResponse>(
    ["facebook-status"],
    "/auth/facebook/status",
    {
      enabled: options?.enabled ?? true,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  )
}

