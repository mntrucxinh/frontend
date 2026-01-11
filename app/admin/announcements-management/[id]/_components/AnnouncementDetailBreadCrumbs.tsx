import CustomBreadCrumbs, { Crumb } from '@/components/CustomBreadCrumbs'

type Props = {
  id: string | number
  metaTitle?: string | null
}

export default function AnnouncementDetailBreadCrumbs({ id, metaTitle }: Props) {
  // Đảm bảo có tiêu đề, nếu không thì dùng fallback
  const title = metaTitle || 'Chi tiết thông báo'
  // Rút gọn tiêu đề nếu quá dài
  const truncatedTitle = title.length > 50 ? `${title.substring(0, 50)}...` : title

  const crumbs: Crumb[] = [
    {
      label: 'Quản lý thông báo',
      href: '/admin/announcements-management',
    },
    {
      label: truncatedTitle,
    },
  ]

  return (
    <div>
      <CustomBreadCrumbs crumbs={crumbs} />
    </div>
  )
}

