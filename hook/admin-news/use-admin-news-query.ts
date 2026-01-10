import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import adminNewsService from '@/service/admin-news-service'
import type {
  AdminNewsListParams,
  AdminNewsListResponse,
  AdminNewsResponse,
} from '@/types/admin-news'

export const useAdminNewsList = (
  params: AdminNewsListParams,
  options?: UseQueryOptions<AdminNewsListResponse>
) => {
  return useQuery<AdminNewsListResponse>({
    queryKey: ['admin-news', 'list', params],
    queryFn: () => adminNewsService.getNewsList(params),
    ...options,
  })
}

export const useAdminNewsDetail = (
  id?: string | number,
  options?: UseQueryOptions<AdminNewsResponse>
) => {
  return useQuery<AdminNewsResponse>({
    queryKey: ['admin-news', 'detail', id],
    queryFn: () => adminNewsService.getNewsDetail(id as string | number),
    enabled: Boolean(id),
    ...options,
  })
}
