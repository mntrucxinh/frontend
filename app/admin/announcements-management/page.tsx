import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Quan ly thong bao',
}

const AnnouncementsManagementTable = dynamic(
  () => import('./_components/announcements-management-table'),
  {
    ssr: false,
    loading: () => <div>Đang tải dữ liệu...</div>,
  }
)

export default function AnnouncementsManagementPage() {
  return (
    <main className='space-y-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold text-foreground'>Quan ly thong bao</h1>
        <p className='text-sm text-foreground/70'>
          Gui thong bao thu cong qua Web Push cho cac thong bao da public.
        </p>
      </div>
      <AnnouncementsManagementTable />
    </main>
  )
}
