'use client'

import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { noticeData } from './mock'
import { Calendar, ChevronRight, Search } from 'lucide-react'
import Image from '@/components/Image'

const ITEMS_PER_PAGE = 6;

const NoticePage = () => {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'general'
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Reset to page 1 when type or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [type, searchQuery]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, type, searchQuery]);

  const parseDate = (dateString: string) => {
    const parts = dateString.split(', ')[1].split('/');
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  };

  const filteredNotices = useMemo(() => {
    return noticeData
      .filter((notice) => {
        const typeMatch = notice.type === type;
        if (!searchQuery) return typeMatch;

        const searchMatch = 
          notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notice.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
        
        return typeMatch && searchMatch;
      })
      .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
  }, [type, searchQuery]);

  const totalPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE);

  const paginatedNotices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredNotices.slice(startIndex, endIndex);
  }, [filteredNotices, currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='space-y-8'>

      <div className="w-full max-w-md relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
            type="text"
            placeholder="Tìm kiếm thông báo..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedNotices.map((notice, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Link href={`/notice/${notice.slug}?type=${notice.type}`}>
                <div className="relative h-56">
                  <Image
                    src={notice.thumbnail}
                    alt={notice.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </Link>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  <Link href={`/notice/${notice.slug}?type=${notice.type}`}>
                    {notice.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {notice.shortDescription}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <p className='py-4 text-center text-muted-foreground'>Không tìm thấy thông báo nào.</p>
        )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center pt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300"
          >
            Trang trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300"
          >
            Trang tiếp
          </button>
        </div>
      )}
    </div>
  )
}

export default NoticePage;
