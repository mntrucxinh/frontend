import React from 'react'

import HeaderAdmin from './_components/HeaderAdmin'
import SideBar from './_components/SideBar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex h-screen flex-col bg-background'>
      <HeaderAdmin />
      <div className='flex min-h-0 flex-1 overflow-hidden'>
        <SideBar />
        <main className='bg-default-50 min-h-0 flex-1 overflow-y-auto p-4'>{children}</main>
      </div>
    </section>
  )
}
