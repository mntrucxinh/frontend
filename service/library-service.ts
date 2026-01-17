import { api } from '@/lib/axios'
import { buildAssetUrl } from '@/utils/api-url'

// Types
export interface Asset {
  id: number
  public_id: string
  url: string
  mime_type: string
  byte_size?: number
  width?: number
  height?: number
}

export interface VideoEmbed {
  public_id: string
  provider: 'youtube' | 'facebook' | 'local'
  url: string
  title?: string
  thumbnail_url?: string
}

export interface AlbumItem {
  position: number
  caption?: string
  asset: Asset
}

export interface AlbumVideo {
  position: number
  video: VideoEmbed
}

export interface Album {
  public_id: string
  title: string
  slug: string
  description?: string
  cover?: Asset
  items: AlbumItem[]
  videos: AlbumVideo[]
  item_count?: number
  image_count?: number
  video_count?: number
  created_at?: string
  updated_at?: string
}

export interface AssetListParams {
  page?: number
  pageSize?: number
  mimeType?: 'image/' | 'video/'
  q?: string
}

export interface AssetListResponse {
  items: Asset[]
  meta: {
    page: number
    page_size: number
    total_items: number
    total_pages: number
  }
}

export interface AlbumListParams {
  page?: number
  pageSize?: number
  q?: string
}

export interface AlbumListResponse {
  items: Album[]
  meta: {
    page: number
    page_size: number
    total_items: number
    total_pages: number
  }
}

export interface AlbumDetailResponse extends Album {}

// Service functions
export const libraryService = {
  // Get assets (images or videos)
  getAssets: async (params: AssetListParams = {}): Promise<AssetListResponse> => {
    const res = await api.get<AssetListResponse>('/public/assets', {
      params: {
        page: params.page || 1,
        page_size: params.pageSize || 20,
        mime_type: params.mimeType,
        q: params.q,
      },
    })
    // Transform URLs to full URLs
    return {
      ...res.data,
      items: res.data.items.map((asset) => ({
        ...asset,
        url: buildAssetUrl(asset.url),
      })),
    }
  },

  // Get albums
  getAlbums: async (params: AlbumListParams = {}): Promise<AlbumListResponse> => {
    const res = await api.get<AlbumListResponse>('/public/albums', {
      params: {
        page: params.page || 1,
        page_size: params.pageSize || 20,
        q: params.q,
      },
    })
    // Transform URLs to full URLs
    return {
      ...res.data,
      items: res.data.items.map((album) => ({
        ...album,
        cover: album.cover
          ? {
              ...album.cover,
              url: buildAssetUrl(album.cover.url),
            }
          : undefined,
        items: album.items.map((item) => ({
          ...item,
          asset: {
            ...item.asset,
            url: buildAssetUrl(item.asset.url),
          },
        })),
      })),
    }
  },

  // Get album detail by slug
  getAlbumBySlug: async (slug: string): Promise<AlbumDetailResponse> => {
    const res = await api.get<AlbumDetailResponse>(`/public/albums/${slug}`)
    // Transform URLs to full URLs
    return {
      ...res.data,
      cover: res.data.cover
        ? {
            ...res.data.cover,
            url: buildAssetUrl(res.data.cover.url),
          }
        : undefined,
      items: res.data.items.map((item) => ({
        ...item,
        asset: {
          ...item.asset,
          url: buildAssetUrl(item.asset.url),
        },
      })),
      videos: res.data.videos.map((v) => ({
        ...v,
        video: {
          ...v.video,
          url: v.video.provider === 'local' ? buildAssetUrl(v.video.url) : v.video.url,
          thumbnail_url: v.video.thumbnail_url
            ? buildAssetUrl(v.video.thumbnail_url)
            : undefined,
        },
      })),
    }
  },
}

