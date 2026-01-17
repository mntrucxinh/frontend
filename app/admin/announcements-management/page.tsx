import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import AdminListSkeleton from '@/components/AdminListSkeleton'

export const metadata: Metadata = {
  title: 'Quản lý thông báo',
}

const AnnouncementManagement = dynamic(() => import('./_components/AnnouncementManagement'), {
  ssr: false,
  loading: () => (
    <AdminListSkeleton rows={6} columns={5} showHeader headerLineCount={2} />
  ),
})

export default function AnnouncementsManagementPage() {
  return (
    <section>
      <AnnouncementManagement />
    </section>
  )
}
