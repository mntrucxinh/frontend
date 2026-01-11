export type Asset = {
  id: number
  public_id: string
  url: string
  mime_type: string
  byte_size: number
  width: number
  height: number
}

export type AlbumItemAsset = {
  position: number
  caption: string
  asset: Asset
}

export type AlbumVideo = {
  position: number
  video: Record<string, any>
}

export type AlbumStatus = 'draft' | 'published' | 'archived'

export type AlbumDetail = {
  id: number
  public_id: string
  title: string
  slug: string
  description: string
  status: AlbumStatus
  cover: Asset
  items: AlbumItemAsset[]
  videos: AlbumVideo[]
  item_count: number
  image_count: number
  video_count: number
  created_by: number
  created_at: string
  updated_at: string
}

const img = (seed: number, w = 1600, h = 900): Asset => ({
  id: seed,
  public_id: `asset_${seed.toString().padStart(4, '0')}`,
  url: `https://picsum.photos/seed/album_detail_${seed}/${w}/${h}`,
  mime_type: 'image/jpeg',
  byte_size: 120_000 + seed * 777,
  width: w,
  height: h,
})

const nowISO = (offsetMinutes = 0) => new Date(Date.now() + offsetMinutes * 60_000).toISOString()

export const mockAlbumDetail: AlbumDetail = {
  id: 101,
  public_id: 'alb_0101_3fa85f64-5717-4562-b3fc-2c963f66afa6',
  title: 'Trung thu 2026 - Đêm hội trăng rằm',
  slug: 'trung-thu-2026-dem-hoi-trang-ram',
  description:
    'Album tổng hợp hoạt động rước đèn, văn nghệ và làm lồng đèn của các bé. Bao gồm ảnh và một số video highlights.',
  status: 'published',

  cover: img(9001, 1920, 1080),

  items: [
    { position: 1, caption: 'Cổng chào Trung thu', asset: img(9101) },
    { position: 2, caption: 'Bé nhận lồng đèn', asset: img(9102) },
    { position: 3, caption: 'Rước đèn quanh sân', asset: img(9103) },
    { position: 4, caption: 'Tiết mục múa tập thể', asset: img(9104) },
    { position: 5, caption: 'Gian hàng trò chơi', asset: img(9105) },
    { position: 6, caption: 'Làm lồng đèn thủ công', asset: img(9106) },
    { position: 7, caption: 'Chụp ảnh lớp', asset: img(9107) },
    { position: 8, caption: 'Khoảnh khắc trao quà', asset: img(9108) },
    { position: 9, caption: 'Trang trí mâm cỗ', asset: img(9109) },
    { position: 10, caption: 'Cả trường chụp ảnh kỷ niệm', asset: img(9110, 1920, 1080) },
  ],

  videos: [
    {
      position: 1,
      video: {
        id: 'vid_0101_a',
        public_id: 'video_0101_a',
        url: 'https://example.com/videos/midautumn-2026-highlight.mp4',
        mime_type: 'video/mp4',
        byte_size: 24_500_000,
        width: 1920,
        height: 1080,
        duration: 58,
        poster: img(9201, 1280, 720).url,
      },
    },
    {
      position: 2,
      video: {
        id: 'vid_0101_b',
        public_id: 'video_0101_b',
        url: 'https://example.com/videos/midautumn-2026-performance.mp4',
        mime_type: 'video/mp4',
        byte_size: 41_200_000,
        width: 1920,
        height: 1080,
        duration: 96,
        poster: img(9202, 1280, 720).url,
      },
    },
  ],

  image_count: 10,
  video_count: 2,
  item_count: 12,

  created_by: 12,
  created_at: nowISO(-60 * 24 * 20),
  updated_at: nowISO(-60 * 24 * 2),
}
