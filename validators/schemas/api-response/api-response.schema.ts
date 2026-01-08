import { z } from 'zod'

export const PaginationResponseSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total_items: z.number(),
  total_pages: z.number(),
})

//* ---------------------------------- RESPONSE TYPES ----------------------------------
export type TPaginationResponse = z.infer<typeof PaginationResponseSchema>
