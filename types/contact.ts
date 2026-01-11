export interface ContactCreateRequest {
  full_name: string
  phone?: string
  email?: string
  subject?: string
  message: string
}

export interface ContactCreateResponse {
  id: number
  status: string
  created_at: string
}
