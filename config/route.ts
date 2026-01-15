export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'TRANG CHỦ', href: '/' },
  {
    label: 'GIỚI THIỆU',
    href: '/introduce',
    children: [
      { label: 'GIỚI THIỆU CHUNG', href: '/introduce' },
      { label: 'TẦM NHÌN - SỨ MỆNH', href: '/introduce/vision-mission' },
      { label: 'CƠ SỞ VẬT CHẤT', href: '/introduce/infrastructure' },
    ],
  },
  { label: 'CHƯƠNG TRÌNH HỌC', href: '/program' },
  { label: 'HOẠT ĐỘNG', href: '/activities' },
  { label: 'THƯ VIỆN', href: '/library' },
  { label: 'ZONE-KID', href: '/play-cafe' },
  { label: 'LIÊN HỆ', href: '/contact' },
  { label: 'VÌ SAO CHỌN TRÚC XINH', href: '/reason' },
]
