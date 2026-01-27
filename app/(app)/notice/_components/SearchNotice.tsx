'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Calendar, ChevronRight, Search } from 'lucide-react'

import { noticeData } from '../mock'

const ITEMS_PER_PAGE = 9

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    general: 'Thông báo chung',
    bee: 'Khối Bee (Nhà trẻ)',
    mouse: 'Khối Mouse (Mầm)',
    bear: 'Khối Bear (Chồi)',
    dolphin: 'Khối Dolphin (Lá)',
  }
  return labels[type] || 'Thông báo'
}

export default function SearchNotice() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'general'
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setCurrentPage(1)
  }, [type, searchQuery])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage, type, searchQuery])

  const parseDate = (dateString: string | undefined) => {
    if (!dateString) return new Date(0)
    const parts = dateString.split(', ')[1]?.split('/') || []
    if (parts.length !== 3) return new Date(0)
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
  }

  const filteredNotices = useMemo(() => {
    return noticeData
      .filter((notice) => {
        const typeMatch = notice.type === type
        if (!searchQuery) return typeMatch

        const searchMatch =
          notice.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notice.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())

        return typeMatch && searchMatch
      })
      .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
  }, [type, searchQuery])

  const totalPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE)

  const paginatedNotices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredNotices.slice(startIndex, endIndex)
  }, [filteredNotices, currentPage])

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className='space-y-8'>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'
      >
        <div>
          <h1 className='text-4xl font-black tracking-tight md:text-5xl'>
            <span className='text-[#33B54A]'>{getTypeLabel(type)}</span>
          </h1>
          <p className='mt-2 text-gray-600'>{filteredNotices.length} thông báo</p>
        </div>

        {/* Search Bar */}
        <div className='relative w-full md:max-w-md'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
            <Search className='size-5 text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Tìm kiếm thông báo...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 shadow-sm transition-all duration-300 hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#33B54A]'
          />
        </div>
      </motion.div>

      {/* Notice Cards Grid */}
      <AnimatePresence mode='wait'>
        {paginatedNotices.length > 0 ? (
          <motion.div
            key={`${type}-${currentPage}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3'
          >
            {paginatedNotices.map((notice, index) => (
              <motion.div
                key={notice.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className='group relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl'
              >
                <Link href={`/notice/${notice.slug}`}>
                  <div className='relative h-48 overflow-hidden bg-gray-100'>
                    {notice.thumbnail ? (
                      <Image
                        src={notice.thumbnail}
                        alt={notice.title || 'Thông báo'}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-110'
                      />
                    ) : (
                      <div className='flex h-full items-center justify-center bg-gradient-to-br from-[#33B54A]/10 to-[#F78F1E]/10'>
                        <Bell className='size-12 text-gray-300' />
                      </div>
                    )}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

                    {/* Date Badge */}
                    {notice.date && (
                      <div className='absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm'>
                        <Calendar className='size-4 text-[#33B54A]' />
                        <span className='text-xs font-semibold text-gray-700'>
                          {notice.date.split(', ')[0]}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                <div className='flex flex-1 flex-col p-6'>
                  <h2 className='mb-2 line-clamp-2 min-h-[56px] text-lg font-black text-gray-900 transition-colors duration-300 group-hover:text-[#33B54A]'>
                    <Link href={`/notice/${notice.slug}`}>{notice.title || 'Thông báo'}</Link>
                  </h2>
                  <div className='mb-4 min-h-[48px]'>
                    {notice.shortDescription && (
                      <p className='line-clamp-2 text-sm leading-relaxed text-gray-600'>
                        {notice.shortDescription}
                      </p>
                    )}
                  </div>

                  <div className='mt-auto'>
                    <Link
                      href={`/notice/${notice.slug}`}
                      className='inline-flex items-center gap-2 text-sm font-bold text-[#33B54A] transition-colors duration-300 hover:text-[#F78F1E]'
                    >
                      Xem chi tiết
                      <ChevronRight className='size-4 transition-transform group-hover:translate-x-1' />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className='py-20 text-center'
          >
            <div className='mb-4 inline-flex size-20 items-center justify-center rounded-full bg-gray-100'>
              <Search className='size-10 text-gray-400' />
            </div>
            <p className='mb-2 text-xl font-semibold text-gray-700'>Không tìm thấy thông báo nào</p>
            <p className='text-sm text-gray-500'>
              Vui lòng thử lại với từ khóa khác hoặc chọn danh mục khác
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className='flex items-center justify-center gap-2 pt-8'
        >
          <motion.button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
            whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
            className='rounded-xl border-2 border-gray-200 bg-white px-4 py-2 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-[#33B54A] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Trước
          </motion.button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.button
              key={page}
              onClick={() => handlePageChange(page)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-xl px-4 py-2 font-semibold shadow-sm transition-all duration-300 ${
                currentPage === page
                  ? 'bg-[#33B54A] text-white shadow-lg'
                  : 'border-2 border-gray-200 bg-white text-gray-700 hover:border-[#33B54A] hover:bg-gray-50'
              }`}
            >
              {page}
            </motion.button>
          ))}

          <motion.button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
            whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
            className='rounded-xl border-2 border-gray-200 bg-white px-4 py-2 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-[#33B54A] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Sau
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
