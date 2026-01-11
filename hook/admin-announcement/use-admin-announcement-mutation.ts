import { useMutation } from '@tanstack/react-query'

import adminAnnouncementService from '@/service/admin-announcement-service'
import type {
  AdminAnnouncementCreateRequest,
  AdminAnnouncementDeleteRequest,
  AdminAnnouncementResponse,
  AdminAnnouncementUpdateRequest,
} from '@/types/admin-announcement'
import type { AxiosErrorResponse } from '@/types/errors'

export const useCreateAdminAnnouncement = () => {
  return useMutation<AdminAnnouncementResponse, AxiosErrorResponse, AdminAnnouncementCreateRequest>({
    mutationFn: adminAnnouncementService.createAnnouncement,
  })
}

export const useUpdateAdminAnnouncement = () => {
  return useMutation<AdminAnnouncementResponse, AxiosErrorResponse, AdminAnnouncementUpdateRequest>({
    mutationFn: adminAnnouncementService.updateAnnouncement,
  })
}

export const useDeleteAdminAnnouncement = () => {
  return useMutation<void, AxiosErrorResponse, AdminAnnouncementDeleteRequest>({
    mutationFn: adminAnnouncementService.deleteAnnouncement,
  })
}

