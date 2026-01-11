import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Quản lý thông báo',
}

const AnnouncementManagement = dynamic(() => import('./_components/AnnouncementManagement'), {
  ssr: false,
  loading: () => <div>Đang tải dữ liệu...</div>,
})

export default function AnnouncementsManagementPage() {
  return (
    <section>
      <AnnouncementManagement />
    </section>
  )
}
