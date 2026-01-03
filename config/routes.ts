export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: "TRANG CHỦ", href: "/" },
  {
    label: "GIỚI THIỆU",
    href: "#about",
    children: [
      { label: "Giới thiệu chung", href: "/introduce/general" },
      { label: "Sứ mệnh & Tầm nhìn", href: "/introduce/mission-and-vision" },
      { label: "Cơ sở vật chất", href: "/introduce/facility" },
    ],
  },
  { label: "THÔNG BÁO", href: "/notice" },
  { label: "TIN TỨC", href: "/news" },
  {
    label: "THƯ VIỆN",
    href: "#library",
    children: [
      { label: "Hình ảnh", href: "/library/gallery" },
      { label: "Video", href: "/library/video" },
    ],
  },
  { label: "TUYỂN DỤNG", href: "/recruit" },
  { label: "LIÊN HỆ", href: "/contact" },
]

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: {
    INDEX: "/dashboard",
    SERIES: {
      INDEX: "/dashboard/series",
      CREATE: "/dashboard/series/create",
    },
    TOOLS: {
      INDEX: "/dashboard/tools",
      AI_AVATAR: "/dashboard/tools/ai-avatar",
    },
    TUTORIALS: "/dashboard/tutorials",
    BILLING: "/dashboard/billing",
    ACCOUNT: "/dashboard/account",
  },
  PROFILE: "/profile",
}
