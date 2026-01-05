import { notFound } from 'next/navigation'
import Link from 'next/link'
import { noticeData } from '../mock'
import { Calendar, ChevronRight } from 'lucide-react'

interface NoticeDetailPageProps {
  params: {
    slug: string
  },
  searchParams: {
    type?: string
  }
}

const parseDate = (dateString: string) => {
  const parts = dateString.split(', ')[1].split('/');
  return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
};

// This function can be used by Next.js to generate static pages at build time.
export async function generateStaticParams() {
  return noticeData.map((notice) => ({
    slug: notice.slug,
  }))
}

const Breadcrumb = ({ noticeTitle, type }: { noticeTitle:string, type?: string }) => {
    return (
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li>
            <Link href={`/notice?type=${type || 'general'}`} className="hover:text-primary transition-colors">
              Thông báo
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li className="font-medium text-gray-500 truncate" style={{maxWidth: '200px'}}>
            {noticeTitle}
          </li>
        </ol>
      </nav>
    );
};

export default function NoticeDetailPage({ params, searchParams }: NoticeDetailPageProps) {
  const notice = noticeData.find((notice) => notice.slug === params.slug)
  const type = searchParams.type;

  if (!notice) {
    notFound()
  }

  const latestNotices = noticeData
    .filter(item => item.slug !== notice.slug)
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
    .slice(0, 5);

  return (
    <div className='bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200'>
        <Breadcrumb noticeTitle={notice.title} type={type} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <article className='prose prose-lg max-w-none dark:prose-invert'>
                    {/* Article Header */}
                    <header className="not-prose mb-8 border-b pb-4">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{notice.title}</h1>
                        <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{notice.date}</span>
                        </div>
                    </header>
                    
                    {/* Article Content */}
                    <div dangerouslySetInnerHTML={{ __html: notice.content }} />
                </article>
            </div>
            
            {/* Sidebar for Latest Notices */}
            <aside>
                <div className="">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Thông báo mới nhất</h3>
                    <ul className="space-y-6">
                        {latestNotices.map(item => (
                            <li key={item.id}>
                                <Link href={`/notice/${item.slug}?type=${item.type}`} className="group block">
                                    <h4 className="text-base font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    </div>
  )
}
