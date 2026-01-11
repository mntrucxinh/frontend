export type AdminContactStatus = 'new' | 'handled' | 'spam'

export interface AdminContactMessage {
  id: number
  full_name: string
  phone?: string | null
  email?: string | null
  message: string
  status: AdminContactStatus
  ip?: string | null
  user_agent?: string | null
  spam_score?: number | null
  created_at: string
}

export interface AdminContactListMeta {
  page: number
  page_size: number
  total_items: number
  total_pages: number
}

export interface AdminContactListResponse {
  items: AdminContactMessage[]
  meta: AdminContactListMeta
}

export interface AdminContactListParams {
  page?: number
  pageSize?: number
  status?: AdminContactStatus
  q?: string
}

export interface AdminContactStatusUpdateRequest {
  id: number | string
  status: AdminContactStatus
}

export interface AdminContactDeleteRequest {
  id: number | string
}
