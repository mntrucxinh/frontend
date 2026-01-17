export type AdminAlbumStatus = 'draft' | 'published' | 'archived'

export interface AdminAlbumAsset {
  id: number
  public_id: string
  url: string
  mime_type: string
  byte_size?: number | null
  width?: number | null
  height?: number | null
}

export interface AdminAlbumItem {
  position: number
  caption?: string | null
  asset: AdminAlbumAsset
}

export interface AdminAlbumVideo {
  position: number
  video: Record<string, any>
}

export interface AdminAlbumPayload {
  title: string
  description?: string
  status: AdminAlbumStatus
  slug?: string
  cover_asset_public_id?: string | null
}

export interface AdminAlbumResponse {
  id: number
  public_id: string
  title: string
  slug: string
  description?: string | null
  status: AdminAlbumStatus
  cover?: AdminAlbumAsset | null
  items?: AdminAlbumItem[] | null
  videos?: AdminAlbumVideo[] | null
  item_count: number
  image_count: number
  video_count: number
  created_by?: number | null
  created_at: string
  updated_at: string
}

export interface AdminAlbumListMeta {
  page: number
  page_size: number
  total_items: number
  total_pages: number
}

export interface AdminAlbumListResponse {
  items: AdminAlbumResponse[]
  meta: AdminAlbumListMeta
}

export interface AdminAlbumListParams {
  page?: number
  pageSize?: number
  status?: AdminAlbumStatus
  q?: string
}

export interface AdminAlbumCreateRequest {
  payload: AdminAlbumPayload
  coverFile?: File | null
  newFiles?: File[]
  newCaptions?: string[]
  existingAssetPublicIds?: string[]
  existingCaptions?: string[]
  videoPublicIds?: string[]
}

export interface AdminAlbumUpdateRequest {
  id: number | string
  payload: AdminAlbumPayload
}

export interface AdminAlbumDeleteRequest {
  id: number | string
}

export interface SlugCheckResponse {
  is_unique: boolean
  normalized_slug: string
}
