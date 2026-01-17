import dynamic from 'next/dynamic'
import NoticeSidebarSkeleton from './_components/NoticeSidebarSkeleton'

interface NoticeLayoutProps {
  children: React.ReactNode
}

const ConditionalSidebar = dynamic(()=> import('./_components/ConditionalSidebar'), {
  ssr: false,
  loading: () => <NoticeSidebarSkeleton />
})

async function NoticeLayout({ children }: NoticeLayoutProps) {
  return (
    <div className="bg-white">
      <main className="flex-1 bg-white pt-12 pb-20">
        <div className='container mx-auto px-4'>
            <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 lg:items-start'>
                <ConditionalSidebar />
                <div className='flex-1'>{children}</div>
            </div>
        </div>
      </main>
    </div>
  )
}

export default NoticeLayout
