import Header from '@/app/(app)/_components/Header'
import { SidebarNav } from './_components/SidebarNav'
import Footer from '@/app/(app)/_components/Footer'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface NoticeLayoutProps {
  children: React.ReactNode
}

const Breadcrumb = () => {
  return (
    <nav className="container mx-auto px-4 py-5 bg-white">
      <ol className="flex items-center space-x-2 text-base text-gray-500">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4" />
        </li>
        <li>
          <span className="font-medium text-gray-500">Thông báo</span>
        </li>
      </ol>
    </nav>
  )
}

export default function NoticeLayout({ children }: NoticeLayoutProps) {
  return (
    <div className="bg-white">
      <Header />
      <Breadcrumb />
      <main className="flex-1 bg-green-50 pt-12 pb-20">
        <div className='container mx-auto px-4'>
            <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <aside className='lg:w-1/4 xl:w-1/5'>
                    <div className=''>
                        <SidebarNav />
                    </div>
                </aside>
                <div className='flex-1'>{children}</div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
