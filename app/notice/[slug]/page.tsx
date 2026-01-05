import { notFound } from 'next/navigation'
import { noticeData } from '../mock'
import NoticeDetailClient from './_components/NoticeDetailClient'

interface NoticeDetailPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    type?: string
  }>
}

// This function can be used by Next.js to generate static pages at build time.
export async function generateStaticParams() {
  return noticeData.map((notice) => ({
    slug: notice.slug,
  }))
}

const parseDate = (dateString: string | undefined) => {
  if (!dateString) return new Date(0)
  const parts = dateString.split(', ')[1]?.split('/') || []
  if (parts.length !== 3) return new Date(0)
  return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { slug } = await params
  const notice = noticeData.find((notice) => notice.slug === slug)

  if (!notice) {
    notFound()
  }

  // Get latest notices excluding current one
  const latestNotices = noticeData
    .filter((item) => item.slug !== notice.slug)
    .sort((a, b) => {
      const dateA = parseDate(a.date)
      const dateB = parseDate(b.date)
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 5)

  return <NoticeDetailClient notice={notice} latestNotices={latestNotices} />
}

