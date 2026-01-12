export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'TRANG CHỦ', href: '/' },
  { label: 'GIỚI THIỆU', href: '/introduce' },
  { label: 'CHƯƠNG TRÌNH HỌC', href: '/program' },
  { label: 'THÔNG BÁO', href: '/notice' },
  { label: 'TIN TỨC', href: '/news' },
  { label: 'THƯ VIỆN', href: '/library' },
  { label: 'TRUC XINH CAFE', href: '/cafe' },
  { label: 'LIÊN HỆ', href: '/contact' },
]
