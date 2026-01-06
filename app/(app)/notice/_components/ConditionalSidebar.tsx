'use client'

import { usePathname } from 'next/navigation'
import SidebarNav from './SidebarNav'

export default function ConditionalSidebar() {
  const pathname = usePathname()
  
  // Không hiển thị SidebarNav cho route detail
  if (pathname?.includes('/notice/') && pathname !== '/notice') {
    return null
  }
  
  return (
    <aside className='lg:w-1/4 xl:w-1/5'>
      <div className='lg:sticky lg:top-6 lg:z-10'>
        <SidebarNav />
      </div>
    </aside>
  )
}

