import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Quản lý liên hệ',
}

const ContactMessagesManagement = dynamic(
  () => import('./_components/ContactMessagesManagement'),
  {
    ssr: false,
    loading: () => <div>Đang tải dữ liệu...</div>,
  }
)

export default function ContactMessagesPage() {
  return (
    <section>
      <ContactMessagesManagement />
    </section>
  )
}
