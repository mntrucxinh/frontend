export type NewsStatus = 'draft' | 'published' | 'archived'

export type NewsItem = {
  id: string
  title: string
  excerpt: string | null
  content_html: string
  status: NewsStatus
  files: string[] | null
  meta_title: string | null
  meta_description: string | null
}

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n_001',
    title: 'Khai trương bộ sưu tập Tết 2026',
    excerpt: 'Bộ sưu tập mới với chất liệu nhẹ, phù hợp không khí lễ hội đầu năm.',
    content_html:
      '<h2>Khai trương bộ sưu tập</h2><p>Chào Tết 2026 với các thiết kế mới. Ưu đãi giới hạn trong 7 ngày.</p>',
    status: 'published',
    files: [
      'https://images.unsplash.com/photo-1520975682031-a0f9b1d0d1cc?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1520975682031-a0f9b1d0d1cc?auto=format&fit=crop&w=1200&q=60',
    ],
    meta_title: 'Bộ sưu tập Tết 2026 | Trúc Xinh',
    meta_description: 'Khám phá BST Tết 2026 với thiết kế thanh lịch, ưu đãi hấp dẫn.',
  },
  {
    id: 'n_002',
    title: 'Thông báo lịch nghỉ lễ & thời gian xử lý đơn',
    excerpt: 'Cập nhật lịch nghỉ và thời gian xử lý đơn hàng trong dịp lễ.',
    content_html:
      '<p><strong>Lịch nghỉ:</strong> 28/01 - 02/02</p><p>Đơn hàng đặt trong thời gian nghỉ sẽ được xử lý sau lễ.</p>',
    status: 'published',
    files: null,
    meta_title: 'Lịch nghỉ lễ | Trúc Xinh',
    meta_description: 'Thông báo lịch nghỉ lễ và thời gian xử lý đơn hàng.',
  },
  {
    id: 'n_003',
    title: 'Gợi ý phối đồ công sở tối giản',
    excerpt: '3 công thức phối đồ giúp bạn gọn gàng, thanh lịch mỗi ngày.',
    content_html:
      '<ul><li>Áo sơ mi + quần ống đứng</li><li>Blazer + váy midi</li><li>Cardigan + jeans</li></ul>',
    status: 'draft',
    files: [
      'https://images.unsplash.com/photo-1520975682031-a0f9b1d0d1cc?auto=format&fit=crop&w=1200&q=60',
    ],
    meta_title: null,
    meta_description: null,
  },
  {
    id: 'n_004',
    title: 'Hướng dẫn bảo quản vải linen đúng cách',
    excerpt: null,
    content_html:
      '<p>Linen nên giặt tay hoặc giặt nhẹ, phơi nơi thoáng mát, tránh ánh nắng gắt để giữ form.</p>',
    status: 'published',
    files: null,
    meta_title: 'Bảo quản vải linen',
    meta_description: 'Cách giặt, phơi và ủi linen giúp bền màu và giữ form đẹp.',
  },
  {
    id: 'n_005',
    title: 'Chương trình ưu đãi cuối tuần',
    excerpt: 'Giảm 10% cho đơn từ 499k và freeship nội thành.',
    content_html:
      '<p>Áp dụng từ <strong>Thứ 6 - Chủ nhật</strong>. Không áp dụng đồng thời với mã khác.</p>',
    status: 'published',
    files: [
      'https://images.unsplash.com/photo-1520975682031-a0f9b1d0d1cc?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1520975682031-a0f9b1d0d1cc?auto=format&fit=crop&w=1200&q=60',
      'https://images.unsplash.com/photo-1520975682031-a0f9b1d0d1cc?auto=format&fit=crop&w=1200&q=60',
    ],
    meta_title: 'Ưu đãi cuối tuần',
    meta_description: 'Khuyến mãi cuối tuần: giảm giá & freeship hấp dẫn.',
  },
  {
    id: 'n_006',
    title: 'Ra mắt phiên bản website mới',
    excerpt: 'Giao diện mới, tốc độ nhanh hơn và trải nghiệm mượt hơn.',
    content_html:
      '<p>Chúng mình đã cập nhật giao diện và cải thiện tốc độ tải trang. Cảm ơn bạn đã đồng hành!</p>',
    status: 'archived',
    files: null,
    meta_title: 'Website mới | Trúc Xinh',
    meta_description: 'Cập nhật giao diện website mới và tối ưu trải nghiệm người dùng.',
  },
  {
    id: 'n_007',
    title: 'Tuyển CTV bán hàng online',
    excerpt: 'Làm việc linh hoạt, hoa hồng hấp dẫn, hỗ trợ nội dung marketing.',
    content_html:
      '<p><strong>Yêu cầu:</strong> chăm chỉ, phản hồi nhanh.</p><p><strong>Quyền lợi:</strong> hoa hồng + thưởng.</p>',
    status: 'draft',
    files: null,
    meta_title: null,
    meta_description: null,
  },
  {
    id: 'n_008',
    title: 'Cập nhật chính sách đổi trả',
    excerpt: 'Chính sách đổi trả minh bạch hơn, hỗ trợ khách hàng tốt hơn.',
    content_html:
      '<p>Thời gian đổi trả trong vòng <strong>7 ngày</strong>. Sản phẩm còn tag và chưa qua sử dụng.</p>',
    status: 'published',
    files: null,
    meta_title: 'Chính sách đổi trả | Trúc Xinh',
    meta_description: 'Cập nhật chính sách đổi trả mới, rõ ràng và tiện lợi.',
  },
  {
    id: 'n_009',
    title: 'Mini game nhận quà đầu tháng',
    excerpt: 'Tham gia mini game để nhận voucher và quà tặng hấp dẫn.',
    content_html:
      '<p>Bước 1: Like page</p><p>Bước 2: Comment số may mắn</p><p>Bước 3: Share bài viết</p>',
    status: 'archived',
    files: [
      'https://images.unsplash.com/photo-1520975682031-a0f9b1d0d1cc?auto=format&fit=crop&w=1200&q=60',
    ],
    meta_title: 'Mini game nhận quà',
    meta_description: 'Mini game đầu tháng: nhận voucher và quà tặng.',
  },
  {
    id: 'n_010',
    title: 'Gợi ý quà tặng cho người thương',
    excerpt: 'Danh sách quà tặng tinh tế, dễ chọn, phù hợp nhiều dịp.',
    content_html:
      '<p>Gợi ý: khăn lụa, áo sơ mi basic, set phụ kiện…</p><p>Inbox để được tư vấn nhanh.</p>',
    status: 'published',
    files: null,
    meta_title: 'Gợi ý quà tặng | Trúc Xinh',
    meta_description: 'Những gợi ý quà tặng tinh tế dành cho người thương.',
  },
]
