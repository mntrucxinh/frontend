import { useMutation } from '@tanstack/react-query'

import contactService from '@/service/contact-service'
import type { ContactCreateRequest, ContactCreateResponse } from '@/types/contact'
import type { AxiosErrorResponse } from '@/types/errors'

export const useCreateContactMessage = () => {
  return useMutation<ContactCreateResponse, AxiosErrorResponse, ContactCreateRequest>({
    mutationFn: contactService.createContactMessage,
  })
}
