import { api } from '@/lib/axios'

import type {
  AdminContactDeleteRequest,
  AdminContactListParams,
  AdminContactListResponse,
  AdminContactMessage,
  AdminContactStatusUpdateRequest,
} from '@/types/admin-contact'

const getContactMessages = async ({
  page = 1,
  pageSize = 20,
  status,
  q,
}: AdminContactListParams = {}): Promise<AdminContactListResponse> => {
  const res = await api.get<AdminContactListResponse>('/admin/contact-messages', {
    params: {
      page,
      page_size: pageSize,
      status,
      q,
    },
  })
  return res.data
}

const updateContactStatus = async ({
  id,
  status,
}: AdminContactStatusUpdateRequest): Promise<AdminContactMessage> => {
  const res = await api.patch<AdminContactMessage>(`/admin/contact-messages/${id}`, {
    status,
  })
  return res.data
}

const deleteContactMessage = async ({ id }: AdminContactDeleteRequest): Promise<void> => {
  await api.delete(`/admin/contact-messages/${id}`)
}

export default {
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
}
