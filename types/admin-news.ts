export type AdminNewsStatus = 'draft' | 'published' | 'archived'

export interface AdminNewsAsset {
  id: number
  public_id: string
  url: string
  mime_type: string
  byte_size?: number | null
  width?: number | null
  height?: number | null
}

export interface AdminNewsContentAsset {
  position: number
  caption?: string | null
  asset: AdminNewsAsset
}

export interface AdminNewsPayload {
  title: string
  excerpt?: string
  content_html: string
  status: AdminNewsStatus
  publish_to_facebook?: boolean
  meta_title?: string
  meta_description?: string
}

export interface AdminNewsResponse {
  id: number
  public_id: string
  title: string
  slug: string
  excerpt?: string | null
  content_html: string
  status: AdminNewsStatus
  meta_title?: string | null
  meta_description?: string | null
  content_assets?: AdminNewsContentAsset[] | null
  published_at?: string | null
  created_at: string
  updated_at: string
}

export interface AdminNewsListMeta {
  page: number
  page_size: number
  total_items: number
  total_pages: number
}

export interface AdminNewsListResponse {
  items: AdminNewsResponse[]
  meta: AdminNewsListMeta
}

export interface AdminNewsListParams {
  page?: number
  pageSize?: number
  status?: AdminNewsStatus
  q?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface AdminNewsCreateRequest {
  payload: AdminNewsPayload
  files?: File[] | FileList
}

export interface AdminNewsUpdateRequest extends AdminNewsCreateRequest {
  id: number | string
}

export interface AdminNewsDeleteRequest {
  id: number | string
}
