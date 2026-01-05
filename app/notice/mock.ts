import { News } from "@/../../types/news";

export type Notice = News & {
  type: 'general' | 'bee' | 'mouse' | 'bear' | 'dolphin'
}

export const noticeData: Notice[] = [
  {
    id: '1',
    type: 'general',
    title: 'Thông báo nghỉ lễ 30/4 - 1/5',
    slug: 'thong-bao-nghi-le-30-4-1-5',
    date: 'Thứ 2, 22/04/2024',
    author: 'Trúc Xanh',
    shortDescription: 'Nhà trường thông báo lịch nghỉ lễ 30/4 - 1/5. Học sinh sẽ được nghỉ từ ngày...',
    content: '<p>Chi tiết thông báo nghỉ lễ 30/4 - 1/5. Phụ huynh vui lòng xem lịch chi tiết trong email đã được gửi.</p>',
    thumbnail: '/assets/images/notice-cover.png'
  },
  {
    id: '2',
    type: 'general',
    title: 'Kế hoạch dã ngoại tháng 5',
    slug: 'ke-hoach-da-ngoai-thang-5',
    date: 'Thứ 6, 19/04/2024',
    author: 'Trúc Xanh',
    shortDescription: 'Trường sẽ tổ chức buổi dã ngoại cho các bé tại công viên...',
    content: '<p>Nội dung chi tiết về kế hoạch dã ngoại tháng 5 cho các bé. Bao gồm thời gian, địa điểm, và các vật dụng cần chuẩn bị.</p>',
    thumbnail: '/assets/images/notice-cover.png'
  },
    {
    id: '6',
    type: 'general',
    title: 'Thông báo tuyển sinh năm học 2024-2025',
    slug: 'thong-bao-tuyen-sinh-nam-hoc-2024-2025',
    date: 'Thứ 2, 01/04/2024',
    author: 'Trúc Xanh',
    shortDescription: 'Trường Mầm non Trúc Xinh trân trọng thông báo kế hoạch tuyển sinh năm học 2024 - 2025.',
    content: '<p>Nội dung chi tiết về kế hoạch tuyển sinh năm học 2024-2025. Phụ huynh vui lòng xem chi tiết tại văn phòng nhà trường.</p>',
    thumbnail: '/assets/images/notice-cover.png'
  },
  {
    id: '3',
    type: 'mouse',
    title: 'Thực đơn tuần mới - Khối Mouse (MGB)',
    slug: 'thuc-don-tuan-moi-khoi-mouse',
    date: 'Thứ 7, 27/04/2024',
    author: 'Trúc Xanh',
    shortDescription: 'Thực đơn tuần này của các bé khối mầm...',
    content: '<p>Chi tiết thực đơn tuần mới cho các bé khối mầm, đảm bảo dinh dưỡng và an toàn thực phẩm.</p>',
    thumbnail: '/assets/images/notice-cover.png'
  },
  {
    id: '4',
    type: 'bear',
    title: 'Hoạt động học tập - Khối Bear (MGN)',
    slug: 'hoat-dong-hoc-tap-khoi-bear',
    date: 'Thứ 7, 27/04/2024',
    author: 'Trúc Xanh',
    shortDescription: 'Tuần này các bé khối chồi sẽ học về...',
    content: '<p>Chi tiết về các hoạt động học tập của khối chồi trong tuần, giúp bé phát triển kỹ năng.</p>',
    thumbnail: '/assets/images/notice-cover.png'
  },
  {
    id: '5',
    type: 'dolphin',
    title: 'Chuẩn bị cho bé vào lớp 1 - Khối Dolphin (MGL)',
    slug: 'chuan-bi-cho-be-vao-lop-1-khoi-dolphin',
    date: 'Thứ 5, 25/04/2024',
    author: 'Trúc Xanh',
    shortDescription: 'Phụ huynh khối lá chú ý chương trình chuẩn bị cho bé vào lớp 1...',
    content: '<p>Chương trình "Hành trang vào lớp 1" dành cho các bé khối Lá, giúp các bé tự tin bước vào môi trường mới.</p>',
    thumbnail: '/assets/images/notice-cover.png'
  },
  {
    id: '7',
    type: 'bee',
    title: 'Lịch sinh hoạt tuần - Khối Bee (Nhà trẻ)',
    slug: 'lich-sinh-hoat-tuan-khoi-bee',
    date: 'Thứ 2, 29/04/2024',
    author: 'Trúc Xanh',
    shortDescription: 'Cập nhật lịch sinh hoạt tuần mới cho các bé khối nhà trẻ.',
    content: '<p>Chi tiết lịch sinh hoạt tuần mới cho các bé khối Bee (Nhà trẻ), bao gồm các hoạt động ăn, ngủ, chơi, và học.</p>',
    thumbnail: '/assets/images/notice-cover.png'
  },
  {
    id: '8',
    type: 'general',
    title: 'Kế hoạch nghỉ hè',
    slug: 'ke-hoach-nghi-he',
    date: 'Thứ 6, 19/04/2024',
    author: 'Trúc Xanh',
    shortDescription: 'Thông báo kế hoạch nghỉ hè cho học sinh năm 2024.',
    content: '<p>Nội dung chi tiết về kế hoạch nghỉ hè cho các bé.</p>',
    thumbnail: '/assets/images/notice-cover.png'
  },
]
