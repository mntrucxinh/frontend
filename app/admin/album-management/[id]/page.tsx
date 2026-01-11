import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const DetailAlbumForm = dynamic(() => import('./_components/DetailAlbumForm'), {
  ssr: false,
  loading: () => <p>Đang tải dữ liệu...</p>,
})

const metaData: Metadata = {
  title: 'Chi tiết ảnh & video - Quản trị',
  description: 'Xem chi tiết và quản lý ảnh & video',
}

export default function DetailAlbumPage({ params }: { params: { id: string } }) {
  return <DetailAlbumForm albumId={params.id} />
}
