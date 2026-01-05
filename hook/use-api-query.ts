import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { api } from "@/lib/axios"

export function useApiQuery<TData = any>(
  key: string | unknown[], // Query key
  url: string, // API endpoint
  options?: Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">
) {
  return useQuery<TData>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const res = await api.get<TData>(url)
      return res.data
    },
    ...options,
  })
}
