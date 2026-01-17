'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useNewsList } from '@/hook/news/use-news-list'
import { buildAssetUrl } from '@/utils/api-url'
import { ChevronRight, Loader2, Search } from 'lucide-react'

import Image from '@/components/Image'

const ITEMS_PER_PAGE = 20

const Breadcrumb = () => {
  return (
    <nav className='container mx-auto bg-white px-4 py-5'>
      <ol className='flex items-center space-x-2 text-base text-gray-500'>
        <li>
          <Link href='/' className='transition-colors hover:text-primary'>
            Trang chủ
          </Link>
        </li>
        <li>
          <ChevronRight className='size-4' />
        </li>
        <li>
          {/* Assuming a parent page exists, otherwise this can be text */}
          <span className='font-medium text-gray-500'>Tin tức</span>
        </li>
      </ol>
    </nav>
  )
}

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState('newest')

  const { data, isLoading, error } = useNewsList({
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
  })

  const filteredNews = useMemo(() => {
    if (!data?.items) return []

    let filtered = data.items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Sort by date if needed (assuming API returns sorted data, but we can sort client-side)
    if (sortOrder === 'oldest') {
      filtered = [...filtered].reverse()
    }

    return filtered
  }, [data?.items, searchQuery, sortOrder])

  const totalPages = data?.total_pages || 1

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className='bg-white'>
      <Breadcrumb />
      {/* Hero Section */}
      <section className='flex-1 bg-green-50 pb-20 pt-12'>
        <div className='container mx-auto px-4 py-8'>
          <div className='mb-8 flex items-center justify-between'>
            <div className='relative w-full max-w-md'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <Search className='size-5 text-gray-400' />
              </div>
              <input
                type='text'
                placeholder='Tìm kiếm tin tức...'
                value={searchQuery}
                onChange={handleSearchChange}
                className='w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500'
              />
            </div>

            <div className='flex items-center space-x-2'>
              <button
                onClick={() => setSortOrder('newest')}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${sortOrder === 'newest' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Mới nhất
              </button>
              <button
                onClick={() => setSortOrder('oldest')}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${sortOrder === 'oldest' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Cũ nhất
              </button>
            </div>
          </div>

          {isLoading && (
            <div className='flex items-center justify-center py-12'>
              <Loader2 className='size-8 animate-spin text-green-500' />
            </div>
          )}

          {error && (
            <div className='py-12 text-center'>
              <p className='text-red-500'>Đã xảy ra lỗi khi tải tin tức. Vui lòng thử lại sau.</p>
            </div>
          )}

          {!isLoading && !error && (
            <>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {filteredNews.map((newsItem, index) => {
                  // Get content_assets
                  const contentAssets = newsItem.content_assets || []

                  // Find video in content_assets
                  const videoAsset = contentAssets.find((asset: any) =>
                    asset.asset?.mime_type?.startsWith('video/')
                  )

                  // Find image in content_assets
                  const imageAsset = contentAssets.find((asset: any) =>
                    asset.asset?.mime_type?.startsWith('image/')
                  )

                  // Get thumbnail from content_assets (image) or thumbnail field
                  const thumbnail = newsItem.thumbnail || (imageAsset ? imageAsset.asset.url : '')
                  const thumbnailUrl = thumbnail
                    ? buildAssetUrl(thumbnail)
                    : '/assets/images/ex1.jpg' // fallback image

                  // Get video URL if exists
                  const videoUrl = videoAsset?.asset?.url
                    ? buildAssetUrl(videoAsset.asset.url)
                    : null

                  // Get description from excerpt or shortDescription
                  const description = newsItem.excerpt || newsItem.shortDescription || ''

                  return (
                    <div
                      key={newsItem.id || newsItem.public_id || index}
                      className='overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'
                    >
                      <Link href={`/activities/detail/${newsItem.slug}`}>
                        <div className='relative h-56 bg-black'>
                          {videoUrl ? (
                            <video
                              src={videoUrl}
                              className='size-full object-cover'
                              muted
                              playsInline
                            />
                          ) : (
                            <Image
                              src={thumbnailUrl}
                              alt={newsItem.title}
                              fill
                              className='object-cover'
                              unoptimized
                            />
                          )}
                          {videoUrl && (
                            <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                              <div className='flex size-16 items-center justify-center rounded-full bg-white/90'>
                                <svg
                                  className='ml-1 size-8 text-emerald-600'
                                  fill='currentColor'
                                  viewBox='0 0 24 24'
                                >
                                  <path d='M8 5v14l11-7z' />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className='p-6'>
                        <h2 className='mb-2 truncate text-xl font-semibold text-gray-800'>
                          <Link href={`/activities/detail/${newsItem.slug}`}>{newsItem.title}</Link>
                        </h2>
                        {description && (
                          <p className='mb-4 line-clamp-3 text-gray-600'>{description}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {filteredNews.length === 0 && !isLoading && (
                <p className='mt-8 text-center text-gray-500'>Không tìm thấy tin tức nào.</p>
              )}
            </>
          )}

          {!isLoading && !error && totalPages > 1 && (
            <div className='mt-8 flex items-center justify-center space-x-2'>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className='rounded-lg bg-gray-200 px-4 py-2 text-gray-700 disabled:opacity-50'
              >
                Trang trước
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-lg px-4 py-2 ${
                    currentPage === page ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='rounded-lg bg-gray-200 px-4 py-2 text-gray-700 disabled:opacity-50'
              >
                Trang tiếp
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default NewsPage
