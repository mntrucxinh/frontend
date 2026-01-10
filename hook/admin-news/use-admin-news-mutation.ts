import { useMutation } from '@tanstack/react-query'

import adminNewsService from '@/service/admin-news-service'
import type {
  AdminNewsCreateRequest,
  AdminNewsDeleteRequest,
  AdminNewsResponse,
  AdminNewsUpdateRequest,
} from '@/types/admin-news'
import type { AxiosErrorResponse } from '@/types/errors'

export const useCreateAdminNews = () => {
  return useMutation<AdminNewsResponse, AxiosErrorResponse, AdminNewsCreateRequest>({
    mutationFn: adminNewsService.createNews,
  })
}

export const useUpdateAdminNews = () => {
  return useMutation<AdminNewsResponse, AxiosErrorResponse, AdminNewsUpdateRequest>({
    mutationFn: adminNewsService.updateNews,
  })
}

export const useDeleteAdminNews = () => {
  return useMutation<void, AxiosErrorResponse, AdminNewsDeleteRequest>({
    mutationFn: adminNewsService.deleteNews,
  })
}
