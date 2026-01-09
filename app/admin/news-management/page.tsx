import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Quản lý bài đăng',
}

const NewsManagementPage = dynamic (()=> import('./_components/NewsManagement'),   {
  ssr: false,
  loading: () => <div>Đang tải dữ liệu...</div>
})

export default function PostManagementsPage() {
  return (
    <section>
      <NewsManagementPage />
    </section>
  )
}
