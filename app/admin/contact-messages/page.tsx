import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import AdminListSkeleton from '@/components/AdminListSkeleton'

export const metadata: Metadata = {
  title: 'Quản lý liên hệ',
}

const ContactMessagesManagement = dynamic(
  () => import('./_components/ContactMessagesManagement'),
  {
    ssr: false,
    loading: () => (
      <AdminListSkeleton
        rows={6}
        columns={7}
        showSearch
        showTabs
        showTabsAction
      />
    ),
  }
)

export default function ContactMessagesPage() {
  return (
    <section>
      <ContactMessagesManagement />
    </section>
  )
}
