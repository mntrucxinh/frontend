import type { Metadata } from 'next'

import HeaderAdmin from '../_components/HeaderAdmin'
import AsideBar from '../_components/SideBar'

export const metadata: Metadata = {
  title: 'Quản lý bài đăng',
}

export default function PostManagementsPage() {
  return (
    <section>
      <div>Content Page under Post Management</div>
    </section>
  )
}
