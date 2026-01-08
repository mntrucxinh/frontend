import type { Metadata } from 'next'

import NewsManagementTable from './_components/news-management-table'
import NewsManagementTabs from './_components/news-management-tabs'

export const metadata: Metadata = {
  title: 'Quản lý bài đăng',
}

export default function PostManagementsPage() {
  return (
    <main>
      <NewsManagementTabs />
      <NewsManagementTable />
    </main>
  )
}
