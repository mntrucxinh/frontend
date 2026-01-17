import { Album, Mail, Newspaper } from 'lucide-react'

import { APP_ROUTES } from '@/config/routes'

export interface SidebarItem {
  label: string
  icon?: JSX.Element
  path?: string
  role?: string
  items?: { label: string; icon?: JSX.Element; path: string }[]
}

export const MAIN_SIDEBAR_ITEMS: SidebarItem[] = [
  // 1> Quản lý tin tức
  {
    label: 'Quản lý tin tức',
    icon: <Newspaper className='size-5' />,
    path: APP_ROUTES.RESOURCES.NEWS_MANAGEMENT,
  },
  // 2> Quản lý album
  {
    label: 'Quản lý ảnh & video',
    icon: <Album className='size-5' />,
    path: APP_ROUTES.RESOURCES.ALBUM_MANAGEMENT,
  },
  // 3> Quản lý liên hệ
  {
    label: 'Quản lý liên hệ',
    icon: <Mail className='size-5' />,
    path: APP_ROUTES.RESOURCES.CONTACT_MESSAGES,
    role: '3',
  },
]
