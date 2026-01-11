import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const AlbumManagementForm = dynamic(() => import('./_components/AlbumManagementForm'), {
  ssr: false,
  loading: () => <div>Đang tải dữ liệu...</div>,
})

export const metadata: Metadata = {
  title: 'Quản lý Album',
}

export default function AlbumManagementPage() {
  return <AlbumManagementForm />
}
