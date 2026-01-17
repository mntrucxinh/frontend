import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import AdminListSkeleton from '@/components/AdminListSkeleton'

export const metadata: Metadata = {
  title: 'Quản lý bài đăng',
}

const NewsManagementPage = dynamic(() => import('./_components/NewsManagement'), {
  ssr: false,
  loading: () => (
    <AdminListSkeleton rows={6} columns={5} showTabs showTabsAction />
  ),
})

export default function NewsManagementsPage() {
  return (
    <section>
      <NewsManagementPage />
    </section>
  )
}
