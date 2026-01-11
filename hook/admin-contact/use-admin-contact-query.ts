import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import adminContactService from '@/service/admin-contact-service'
import type { AdminContactListParams, AdminContactListResponse } from '@/types/admin-contact'

type UseAdminContactMessagesListOptions = Omit<
  UseQueryOptions<AdminContactListResponse>,
  'queryKey' | 'queryFn'
>

export const useAdminContactMessagesList = (
  params: AdminContactListParams,
  options?: UseAdminContactMessagesListOptions
) => {
  return useQuery<AdminContactListResponse>({
    queryKey: ['admin-contact-messages', 'list', params],
    queryFn: () => adminContactService.getContactMessages(params),
    ...options,
  })
}
