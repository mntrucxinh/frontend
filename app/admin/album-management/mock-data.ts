// mock-albums.ts

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

export type Album = {
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

export type AlbumListResponse = {
  items: Album[]
  meta: {
    page: number
    page_size: number
    total_items: number
    total_pages: number
  }
}

const img = (seed: number, w = 1280, h = 720): Asset => ({
  id: seed,
  public_id: `asset_${seed.toString().padStart(4, '0')}`,
  url: `https://picsum.photos/seed/album_${seed}/${w}/${h}`,
  mime_type: 'image/jpeg',
  byte_size: 180000 + seed * 1234,
  width: w,
  height: h,
})

const nowISO = (offsetMinutes = 0) => new Date(Date.now() + offsetMinutes * 60_000).toISOString()

export const mockAlbumListResponse: AlbumListResponse = {
  items: [
    {
      id: 1,
      public_id: 'alb_0001_3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'Trung thu 2026',
      slug: 'trung-thu-2026',
      description: 'Hoạt động rước đèn, văn nghệ và làm lồng đèn của các bé.',
      status: 'published',
      cover: img(101, 1200, 800),
      items: [
        { position: 1, caption: 'Cả lớp chụp hình kỷ niệm', asset: img(1001, 1600, 900) },
        { position: 2, caption: 'Bé biểu diễn văn nghệ', asset: img(1002, 1600, 900) },
        { position: 3, caption: 'Rước đèn quanh sân trường', asset: img(1003, 1600, 900) },
        { position: 4, caption: 'Trang trí gian hàng', asset: img(1004, 1600, 900) },
        { position: 5, caption: 'Làm lồng đèn thủ công', asset: img(1005, 1600, 900) },
      ],
      videos: [{ position: 1, video: { id: 'vid_0001', url: 'https://example.com/videos/midautumn-2026.mp4' } }],
      item_count: 6,
      image_count: 5,
      video_count: 1,
      created_by: 12,
      created_at: nowISO(-60 * 24 * 40),
      updated_at: nowISO(-60 * 24 * 10),
    },
    {
      id: 2,
      public_id: 'alb_0002_3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'Bé vui học chữ',
      slug: 'be-vui-hoc-chu',
      description: 'Hoạt động nhận biết mặt chữ và trò chơi ghép chữ.',
      status: 'published',
      cover: img(102, 1200, 800),
      items: [
        { position: 1, caption: 'Ghép chữ theo nhóm', asset: img(1101, 1600, 900) },
        { position: 2, caption: 'Tập tô chữ', asset: img(1102, 1600, 900) },
        { position: 3, caption: 'Trò chơi tìm chữ', asset: img(1103, 1600, 900) },
        { position: 4, caption: 'Cùng đọc to', asset: img(1104, 1600, 900) },
      ],
      videos: [],
      item_count: 4,
      image_count: 4,
      video_count: 0,
      created_by: 12,
      created_at: nowISO(-60 * 24 * 35),
      updated_at: nowISO(-60 * 24 * 9),
    },
    {
      id: 3,
      public_id: 'alb_0003_3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'Ngày hội thể thao',
      slug: 'ngay-hoi-the-thao',
      description: 'Chạy tiếp sức, nhảy bao bố và các trò vận động ngoài trời.',
      status: 'published',
      cover: img(103, 1200, 800),
      items: [
        { position: 1, caption: 'Chạy tiếp sức', asset: img(1201, 1600, 900) },
        { position: 2, caption: 'Nhảy bao bố', asset: img(1202, 1600, 900) },
        { position: 3, caption: 'Kéo co', asset: img(1203, 1600, 900) },
        { position: 4, caption: 'Trao huy chương', asset: img(1204, 1600, 900) },
        { position: 5, caption: 'Cổ vũ nhiệt tình', asset: img(1205, 1600, 900) },
        { position: 6, caption: 'Khởi động', asset: img(1206, 1600, 900) },
      ],
      videos: [
        { position: 1, video: { id: 'vid_0003a', url: 'https://example.com/videos/sportsday-1.mp4' } },
        { position: 2, video: { id: 'vid_0003b', url: 'https://example.com/videos/sportsday-2.mp4' } },
      ],
      item_count: 8,
      image_count: 6,
      video_count: 2,
      created_by: 7,
      created_at: nowISO(-60 * 24 * 30),
      updated_at: nowISO(-60 * 24 * 7),
    },
    {
      id: 4,
      public_id: 'alb_0004_3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'Bé khéo tay',
      slug: 'be-kheo-tay',
      description: 'Cắt dán, tô màu và làm đồ thủ công theo chủ đề.',
      status: 'draft',
      cover: img(104, 1200, 800),
      items: [
        { position: 1, caption: 'Tô màu tranh', asset: img(1301, 1600, 900) },
        { position: 2, caption: 'Cắt dán hình', asset: img(1302, 1600, 900) },
        { position: 3, caption: 'Làm đồ chơi giấy', asset: img(1303, 1600, 900) },
      ],
      videos: [],
      item_count: 3,
      image_count: 3,
      video_count: 0,
      created_by: 7,
      created_at: nowISO(-60 * 24 * 22),
      updated_at: nowISO(-60 * 24 * 2),
    },
    {
      id: 5,
      public_id: 'alb_0005_3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'Tham quan vườn rau',
      slug: 'tham-quan-vuon-rau',
      description: 'Bé trải nghiệm gieo hạt và chăm sóc cây.',
      status: 'published',
      cover: img(105, 1200, 800),
      items: [
        { position: 1, caption: 'Gieo hạt', asset: img(1401, 1600, 900) },
        { position: 2, caption: 'Tưới cây', asset: img(1402, 1600, 900) },
        { position: 3, caption: 'Thu hoạch rau', asset: img(1403, 1600, 900) },
        { position: 4, caption: 'Quan sát cây con', asset: img(1404, 1600, 900) },
        { position: 5, caption: 'Chụp hình trong vườn', asset: img(1405, 1600, 900) },
      ],
      videos: [{ position: 1, video: { id: 'vid_0005', url: 'https://example.com/videos/garden.mp4' } }],
      item_count: 6,
      image_count: 5,
      video_count: 1,
      created_by: 10,
      created_at: nowISO(-60 * 24 * 20),
      updated_at: nowISO(-60 * 24 * 5),
    },
    {
      id: 6,
      public_id: 'alb_0006_3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'Giáng sinh 2025',
      slug: 'giang-sinh-2025',
      description: 'Trang trí cây thông, nhận quà và chụp ảnh Noel.',
      status: 'archived',
      cover: img(106, 1200, 800),
      items: [
        { position: 1, caption: 'Trang trí cây thông', asset: img(1501, 1600, 900) },
        { position: 2, caption: 'Ông già Noel', asset: img(1502, 1600, 900) },
        { position: 3, caption: 'Nhận quà', asset: img(1503, 1600, 900) },
        { position: 4, caption: 'Chụp ảnh tập thể', asset: img(1504, 1600, 900) },
      ],
      videos: [{ position: 1, video: { id: 'vid_0006', url: 'https://example.com/videos/christmas.mp4' } }],
      item_count: 5,
      image_count: 4,
      video_count: 1,
      created_by: 3,
      created_at: nowISO(-60 * 24 * 120),
      updated_at: nowISO(-60 * 24 * 90),
    },
    {
      id: 7,
      public_id: 'alb_0007_3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'Tết thiếu nhi 1/6',
      slug: 'tet-thieu-nhi-1-6',
      description: 'Vui chơi, nhận quà và hoạt động sân khấu.',
      status: 'published',
      cover: img(107, 1200, 800),
      items: [
        { position: 1, caption: 'Nhận quà 1/6', asset: img(1601, 1600, 900) },
        { position: 2, caption: 'Trò chơi vận động', asset: img(1602, 1600, 900) },
        { position: 3, caption: 'Sân khấu mini', asset: img(1603, 1600, 900) },
        { position: 4, caption: 'Chụp ảnh kỷ niệm', asset: img(1604, 1600, 900) },
        { position: 5, caption: 'Góc trải nghiệm', asset: img(1605, 1600, 900) },
      ],
      videos: [],
      item_count: 5,
      image_count: 5,
      video_count: 0,
      created_by: 8,
      created_at: nowISO(-60 * 24 * 70),
      updated_at: nowISO(-60 * 24 * 60),
    },
    {
      id: 8,
      public_id: 'alb_0008_3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'Bé học nấu ăn',
      slug: 'be-hoc-nau-an',
      description: 'Làm bánh, trang trí và thưởng thức cùng bạn bè.',
      status: 'draft',
      cover: img(108, 1200, 800),
      items: [
        { position: 1, caption: 'Chuẩn bị nguyên liệu', asset: img(1701, 1600, 900) },
        { position: 2, caption: 'Nhào bột', asset: img(1702, 1600, 900) },
        { position: 3, caption: 'Trang trí bánh', asset: img(1703, 1600, 900) },
      ],
      videos: [{ position: 1, video: { id: 'vid_0008', url: 'https://example.com/videos/cooking.mp4' } }],
      item_count: 4,
      image_count: 3,
      video_count: 1,
      created_by: 8,
      created_at: nowISO(-60 * 24 * 18),
      updated_at: nowISO(-60 * 24 * 1),
    },
    {
      id: 9,
      public_id: 'alb_0009_3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'Lễ khai giảng',
      slug: 'le-khai-giang',
      description: 'Buổi lễ chào năm học mới và hoạt động đầu năm.',
      status: 'published',
      cover: img(109, 1200, 800),
      items: [
        { position: 1, caption: 'Chào cờ', asset: img(1801, 1600, 900) },
        { position: 2, caption: 'Tiết mục văn nghệ', asset: img(1802, 1600, 900) },
        { position: 3, caption: 'Chụp ảnh lớp', asset: img(1803, 1600, 900) },
        { position: 4, caption: 'Gặp gỡ giáo viên', asset: img(1804, 1600, 900) },
      ],
      videos: [],
      item_count: 4,
      image_count: 4,
      video_count: 0,
      created_by: 2,
      created_at: nowISO(-60 * 24 * 160),
      updated_at: nowISO(-60 * 24 * 150),
    },
    {
      id: 10,
      public_id: 'alb_0010_3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'Hoạt động STEM',
      slug: 'hoat-dong-stem',
      description: 'Thí nghiệm đơn giản và lắp ráp mô hình.',
      status: 'published',
      cover: img(110, 1200, 800),
      items: [
        { position: 1, caption: 'Thí nghiệm màu sắc', asset: img(1901, 1600, 900) },
        { position: 2, caption: 'Lắp mô hình', asset: img(1902, 1600, 900) },
        { position: 3, caption: 'Trình bày sản phẩm', asset: img(1903, 1600, 900) },
        { position: 4, caption: 'Cùng quan sát', asset: img(1904, 1600, 900) },
        { position: 5, caption: 'Góc khám phá', asset: img(1905, 1600, 900) },
      ],
      videos: [{ position: 1, video: { id: 'vid_0010', url: 'https://example.com/videos/stem.mp4' } }],
      item_count: 6,
      image_count: 5,
      video_count: 1,
      created_by: 5,
      created_at: nowISO(-60 * 24 * 26),
      updated_at: nowISO(-60 * 24 * 3),
    },
    {
      id: 11,
      public_id: 'alb_0011_3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'Văn nghệ cuối tuần',
      slug: 'van-nghe-cuoi-tuan',
      description: 'Các tiết mục múa hát do bé biểu diễn.',
      status: 'draft',
      cover: img(111, 1200, 800),
      items: [
        { position: 1, caption: 'Múa tập thể', asset: img(2001, 1600, 900) },
        { position: 2, caption: 'Hát đơn ca', asset: img(2002, 1600, 900) },
      ],
      videos: [{ position: 1, video: { id: 'vid_0011', url: 'https://example.com/videos/weekend-show.mp4' } }],
      item_count: 3,
      image_count: 2,
      video_count: 1,
      created_by: 5,
      created_at: nowISO(-60 * 24 * 12),
      updated_at: nowISO(-60 * 24 * 2),
    },
    {
      id: 12,
      public_id: 'alb_0012_3fa85f64-5717-4562-b3fc-2c963f66afa6',
      title: 'Ngày hội đọc sách',
      slug: 'ngay-hoi-doc-sach',
      description: 'Bé làm quen sách tranh và kể chuyện theo nhóm.',
      status: 'published',
      cover: img(112, 1200, 800),
      items: [
        { position: 1, caption: 'Góc đọc sách', asset: img(2101, 1600, 900) },
        { position: 2, caption: 'Kể chuyện theo nhóm', asset: img(2102, 1600, 900) },
        { position: 3, caption: 'Đổi sách cùng bạn', asset: img(2103, 1600, 900) },
        { position: 4, caption: 'Chụp ảnh với sách', asset: img(2104, 1600, 900) },
      ],
      videos: [],
      item_count: 4,
      image_count: 4,
      video_count: 0,
      created_by: 9,
      created_at: nowISO(-60 * 24 * 44),
      updated_at: nowISO(-60 * 24 * 6),
    },
  ],
  meta: {
    page: 1,
    page_size: 10,
    total_items: 12,
    total_pages: 2,
  },
}
