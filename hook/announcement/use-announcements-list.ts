import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import announcementService from '@/service/announcement-service'
import { AnnouncementListResponse } from '@/types/announcement'

interface UseAnnouncementsListParams {
  page?: number
  pageSize?: number
  grade?: string
  options?: UseQueryOptions<AnnouncementListResponse>
}

export function useAnnouncementsList({
  page = 1,
  pageSize = 20,
  grade,
  options,
}: UseAnnouncementsListParams = {}) {
  return useQuery<AnnouncementListResponse>({
    queryKey: ['announcements', 'list', page, pageSize, grade],
    queryFn: () => announcementService.getAnnouncementsList(page, pageSize, grade),
    ...options,
  })
}
