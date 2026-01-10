import type { Metadata } from 'next'

import AnnouncementsManagementTable from './_components/announcements-management-table'

export const metadata: Metadata = {
  title: 'Quan ly thong bao',
}

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
