import Header from '@/app/(app)/_components/Header'
import { ConditionalSidebar } from './_components/ConditionalSidebar'
import Footer from '@/app/(app)/_components/Footer'

interface NoticeLayoutProps {
  children: React.ReactNode
}

export default function NoticeLayout({ children }: NoticeLayoutProps) {
  return (
    <div className="bg-white">
      <Header />
      <main className="flex-1 bg-white pt-12 pb-20">
        <div className='container mx-auto px-4'>
            <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 lg:items-start'>
                <ConditionalSidebar />
                <div className='flex-1'>{children}</div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
