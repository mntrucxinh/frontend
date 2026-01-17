import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import AdminListSkeleton from '@/components/AdminListSkeleton'

const AlbumManagementForm = dynamic(() => import('./_components/AlbumManagementForm'), {
  ssr: false,
  loading: () => (
    <AdminListSkeleton
      rows={6}
      columns={5}
      showHeader
      headerLineCount={2}
      showSearch
      searchActionCount={1}
    />
  ),
})

export const metadata: Metadata = {
  title: 'Quản lý Album',
}

export default function AlbumManagementPage() {
  return <AlbumManagementForm />
}
