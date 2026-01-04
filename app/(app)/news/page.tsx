"use client";

import Image from "@/components/Image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { ChevronRight, Search, Loader2 } from "lucide-react"
import { useNewsList } from "@/hook/news/use-news-list";
import { buildAssetUrl } from "@/utils/api-url";

const ITEMS_PER_PAGE = 20;

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
          {/* Assuming a parent page exists, otherwise this can be text */}
          <span className="font-medium text-gray-500">Tin tức</span>
        </li>
      </ol>
    </nav>
  )
}

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('newest');

  const { data, isLoading, error } = useNewsList({
    page: currentPage,
    pageSize: ITEMS_PER_PAGE,
  });

  const filteredNews = useMemo(() => {
    if (!data?.items) return [];

    let filtered = data.items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort by date if needed (assuming API returns sorted data, but we can sort client-side)
    if (sortOrder === 'oldest') {
      filtered = [...filtered].reverse();
    }

    return filtered;
  }, [data?.items, searchQuery, sortOrder]);

  const totalPages = data?.total_pages || 1;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white">
      <Breadcrumb />
      {/* Hero Section */}
      <section className="flex-1 bg-green-50 pt-12 pb-20">
        <div className="container mx-auto px-4 py-8">
        
        <div className="flex justify-between items-center mb-8">
          <div className="w-full max-w-md relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm tin tức..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setSortOrder('newest')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${sortOrder === 'newest' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Mới nhất
            </button>
            <button 
              onClick={() => setSortOrder('oldest')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${sortOrder === 'oldest' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Cũ nhất
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-green-500" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">Đã xảy ra lỗi khi tải tin tức. Vui lòng thử lại sau.</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((newsItem, index) => {
                // Get content_assets
                const contentAssets = newsItem.content_assets || [];
                
                // Find video in content_assets
                const videoAsset = contentAssets.find(
                    (asset: any) => asset.asset?.mime_type?.startsWith('video/')
                );
                
                // Find image in content_assets
                const imageAsset = contentAssets.find(
                    (asset: any) => asset.asset?.mime_type?.startsWith('image/')
                );
                
                // Get thumbnail from content_assets (image) or thumbnail field
                const thumbnail = newsItem.thumbnail || 
                                  (imageAsset ? imageAsset.asset.url : '');
                const thumbnailUrl = thumbnail 
                  ? buildAssetUrl(thumbnail)
                  : '/assets/images/ex1.jpg'; // fallback image
                
                // Get video URL if exists
                const videoUrl = videoAsset?.asset?.url
                  ? buildAssetUrl(videoAsset.asset.url)
                  : null;
                
                // Get description from excerpt or shortDescription
                const description = newsItem.excerpt || newsItem.shortDescription || '';

                return (
                  <div key={newsItem.id || newsItem.public_id || index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <Link href={`/news/detail/${newsItem.slug}`}>
                      <div className="relative h-56 bg-black">
                        {videoUrl ? (
                          <video
                            src={videoUrl}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                          />
                        ) : (
                          <Image
                            src={thumbnailUrl}
                            alt={newsItem.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        )}
                        {videoUrl && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                              <svg className="w-8 h-8 text-emerald-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                        <Link href={`/news/detail/${newsItem.slug}`}>
                          {newsItem.title}
                        </Link>
                      </h2>
                      {description && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredNews.length === 0 && !isLoading && (
              <p className="text-center text-gray-500 mt-8">Không tìm thấy tin tức nào.</p>
            )}
          </>
        )}

        {!isLoading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Trang trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Trang tiếp
            </button>
          </div>
        )}
      </div>
      </section>
      
    </div>
  );
};

export default NewsPage;