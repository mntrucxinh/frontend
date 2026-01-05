export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'TRANG CHỦ', href: '/' },
  { label: 'GIỚI THIỆU', href: '/introduce' },
  { label: 'THÔNG BÁO', href: '/notice' },
  { label: 'TIN TỨC', href: '/news' },
  {
    label: 'THƯ VIỆN',
    href: '#library',
    children: [
      { label: 'Hình ảnh', href: '/library/gallery' },
      { label: 'Video', href: '/library/video' },
    ],
  },
  { label: 'TUYỂN DỤNG', href: '/recruit' },
  { label: 'LIÊN HỆ', href: '/contact' },
]
