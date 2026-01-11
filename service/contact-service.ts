import { api } from '@/lib/axios'

import type { ContactCreateRequest, ContactCreateResponse } from '@/types/contact'

const createContactMessage = async (
  payload: ContactCreateRequest
): Promise<ContactCreateResponse> => {
  const res = await api.post<ContactCreateResponse>('/contact', payload)
  return res.data
}

export default {
  createContactMessage,
}
