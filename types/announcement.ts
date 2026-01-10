export interface Announcement {
  public_id: string
  title: string
  slug: string
  excerpt?: string | null
  content_html?: string
  meta_title?: string | null
  meta_description?: string | null
  block_code: string
  block_name: string
  published_at?: string | null
  created_at?: string | null
  updated_at?: string | null
}

export interface AnnouncementListMeta {
  page: number
  page_size: number
  total_items: number
  total_pages: number
}

export interface AnnouncementListResponse {
  items: Announcement[]
  meta: AnnouncementListMeta
}

export interface PushAnnouncementResponse {
  status: string
  sent: number
  failed: number
  removed: number
}
