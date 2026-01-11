import { useMutation } from '@tanstack/react-query'

import adminContactService from '@/service/admin-contact-service'
import type {
  AdminContactDeleteRequest,
  AdminContactMessage,
  AdminContactStatusUpdateRequest,
} from '@/types/admin-contact'
import type { AxiosErrorResponse } from '@/types/errors'

export const useUpdateAdminContactStatus = () => {
  return useMutation<AdminContactMessage, AxiosErrorResponse, AdminContactStatusUpdateRequest>({
    mutationFn: adminContactService.updateContactStatus,
  })
}

export const useDeleteAdminContactMessage = () => {
  return useMutation<void, AxiosErrorResponse, AdminContactDeleteRequest>({
    mutationFn: adminContactService.deleteContactMessage,
  })
}
