export type AdminAnnouncementStatus = 'draft' | 'published' | 'archived'

export type BlockCode = 'bee' | 'mouse' | 'bear' | 'dolphin'

export interface AdminAnnouncementAsset {
  id: number
  public_id: string
  url: string
  mime_type: string
  byte_size?: number | null
  width?: number | null
  height?: number | null
}

export interface AdminAnnouncementContentAsset {
  position: number
  caption?: string | null
  asset: AdminAnnouncementAsset
}

export interface AdminAnnouncementPayload {
  title: string
  excerpt?: string
  content_html: string
  status: AdminAnnouncementStatus
  publish_to_facebook?: boolean
  meta_title?: string
  meta_description?: string
  block_code: BlockCode
}

export interface AdminAnnouncementResponse {
  id: number
  public_id: string
  title: string
  slug: string
  excerpt?: string | null
  content_html: string
  status: AdminAnnouncementStatus
  meta_title?: string | null
  meta_description?: string | null
  content_assets?: AdminAnnouncementContentAsset[] | null
  block_code: BlockCode
  block_name?: string | null
  published_at?: string | null
  created_at: string
  updated_at: string
}

export interface AdminAnnouncementListMeta {
  page: number
  page_size: number
  total_items: number
  total_pages: number
}

export interface AdminAnnouncementListResponse {
  items: AdminAnnouncementResponse[]
  meta: AdminAnnouncementListMeta
}

export interface AdminAnnouncementListParams {
  page?: number
  pageSize?: number
  status?: AdminAnnouncementStatus
  grade?: BlockCode
  q?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface AdminAnnouncementCreateRequest {
  payload: AdminAnnouncementPayload
  files?: File[] | FileList
}

export interface AdminAnnouncementUpdateRequest extends AdminAnnouncementCreateRequest {
  id: number | string
}

export interface AdminAnnouncementDeleteRequest {
  id: number | string
  delete_on_facebook?: boolean
}

