import React from 'react'

import HeaderAdmin from './_components/HeaderAdmin'
import SideBar from './_components/SideBar'
import GoogleBackendBridge from '@/components/GoogleBackendBridge'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex h-screen flex-col bg-background'>
      <GoogleBackendBridge />
      <HeaderAdmin />
      <div className='flex min-h-0 flex-1 overflow-hidden'>
        <SideBar />
        <main className='min-h-0 flex-1 overflow-y-auto bg-default-50 p-10'>{children}</main>
      </div>
    </section>
  )
}
