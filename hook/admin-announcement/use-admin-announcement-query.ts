import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import adminAnnouncementService from '@/service/admin-announcement-service'
import type {
  AdminAnnouncementListParams,
  AdminAnnouncementListResponse,
  AdminAnnouncementResponse,
} from '@/types/admin-announcement'

export const useAdminAnnouncementList = (
  params: AdminAnnouncementListParams,
  options?: UseQueryOptions<AdminAnnouncementListResponse>
) => {
  return useQuery<AdminAnnouncementListResponse>({
    queryKey: ['admin-announcement', 'list', params],
    queryFn: () => adminAnnouncementService.getAnnouncementList(params),
    ...options,
  })
}

export const useAdminAnnouncementDetail = (
  id?: string | number,
  options?: UseQueryOptions<AdminAnnouncementResponse>
) => {
  return useQuery<AdminAnnouncementResponse>({
    queryKey: ['admin-announcement', 'detail', id],
    queryFn: () => adminAnnouncementService.getAnnouncementDetail(id as string | number),
    enabled: Boolean(id),
    ...options,
  })
}

