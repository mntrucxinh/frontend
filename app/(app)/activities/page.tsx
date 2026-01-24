'use client'

import Image from "@/components/Image";
import Link from "next/link";
import { useState, useMemo, useRef } from "react";
import { Search, Loader2, Calendar, Activity } from "lucide-react";
import { useNewsList } from "@/hook/news/use-news-list";
import { buildAssetUrl } from "@/utils/api-url";
import { motion } from "framer-motion";
import { Pagination } from "@heroui/react";

const ITEMS_PER_PAGE = 12;

// Hero Component với animated images và decorative elements
const ActivitiesHero = ({ featuredImages, totalItems }: { featuredImages: string[]; totalItems: number }) => {
  const imageStyles = useMemo(() => {
    return featuredImages.slice(0, 6).map(() => {
      const xRange = Math.random() * 60 - 30;
      const yRange = Math.random() * 60 - 30;
      const rotateRange = Math.random() * 15 - 7.5;

      return {
        initial: {
          top: `${Math.random() * 85}%`,
          left: `${Math.random() * 85}%`,
        },
        animate: {
          x: [0, xRange, -xRange, xRange, 0],
          y: [0, yRange, 0, -yRange, 0],
          rotate: [0, rotateRange, -rotateRange, 0, rotateRange],
        }
      };
    });
  }, [featuredImages]);

  const MotionImage = ({ src, initial, animate }: { src: string; initial: any; animate: any }) => (
    <motion.div
      className="absolute h-40 w-60 rounded-2xl overflow-hidden shadow-2xl"
      initial={initial}
      animate={animate}
      transition={{
        duration: Math.random() * 15 + 20,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover opacity-25 blur-sm brightness-110 saturate-125"
        unoptimized
      />
    </motion.div>
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#33B54A] via-[#2EA043] to-[#F78F1E] py-36 md:py-52'
    >
      {/* Animated Images Backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        {featuredImages.slice(0, 6).map((src, i) => (
          <MotionImage 
            key={i} 
            src={src}
            initial={imageStyles[i].initial}
            animate={imageStyles[i].animate} 
          />
        ))}
      </div>

      {/* Decorative geometric shapes */}
      <div className='pointer-events-none absolute inset-0'>
        {/* Floating circles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-white/20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Background blur orbs */}
        <motion.div
          className='absolute left-0 top-0 size-96 rounded-full bg-white/10 blur-3xl'
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute right-0 bottom-0 size-96 rounded-full bg-white/10 blur-3xl'
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className='relative z-10 text-center px-4 max-w-5xl mx-auto'>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className='mb-6 text-5xl font-black leading-tight text-white drop-shadow-2xl md:text-6xl lg:text-7xl'
        >
          <span className='block text-[#F78F1E] drop-shadow-lg'>Hoạt Động</span>
          <span className='block text-white mt-2 drop-shadow-lg'>Trúc Xanh</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className='mx-auto max-w-2xl text-lg leading-relaxed text-white/95 md:text-xl mb-8'
        >
          Cùng khám phá những câu chuyện, những nụ cười và những kỷ niệm tuyệt vời được ghi lại mỗi ngày
        </motion.p>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center gap-3 mt-8"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="size-2 rounded-full bg-white/60"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom curved edge */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 200"
          className="h-20 w-full md:h-24"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            d="M0,0 Q720,150 1440,0 L1440,200 L0,200 Z"
          />
        </svg>
      </div>
    </motion.section>
  );
};


// Beautiful Search Bar - Compact và đẹp
const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  sortOrder, 
  onSortChange 
}: {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Search Input - Compact và đẹp */}
        <div className="w-full max-w-lg relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="size-5 text-[#33B54A]" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm hoạt động..."
            value={searchQuery}
            onChange={onSearchChange}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33B54A]/30 focus:border-[#33B54A] transition-all bg-white shadow-sm hover:shadow-md"
          />
        </div>

        {/* Sort Buttons - Compact */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSortChange('newest')}
            className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
              sortOrder === 'newest' 
                ? 'bg-gradient-to-r from-[#33B54A] to-[#2EA043] text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Mới nhất
          </button>
          <button
            onClick={() => onSortChange('oldest')}
            className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
              sortOrder === 'oldest' 
                ? 'bg-gradient-to-r from-[#33B54A] to-[#2EA043] text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cũ nhất
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Activity Card - Đẹp và hiện đại
const ActivityCard = ({ 
  newsItem, 
  index,
  isFeatured = false
}: { 
  newsItem: any; 
  index: number;
  isFeatured?: boolean;
}) => {
  const contentAssets = newsItem.content_assets || [];
  const videoAsset = contentAssets.find((asset: any) => asset.asset?.mime_type?.startsWith('video/'));
  const imageAsset = contentAssets.find((asset: any) => asset.asset?.mime_type?.startsWith('image/'));
  const thumbnail = newsItem.thumbnail || (imageAsset ? imageAsset.asset.url : '');
  const thumbnailUrl = thumbnail ? buildAssetUrl(thumbnail) : '/assets/images/ex1.jpg';
  const videoUrl = videoAsset?.asset?.url ? buildAssetUrl(videoAsset.asset.url) : null;
  const description = newsItem.excerpt || newsItem.shortDescription || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: index * 0.05 
      }}
      whileHover={{ 
        y: -12,
        scale: 1.02,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        }
      }}
      className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl border border-gray-100 ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#33B54A]/0 via-[#33B54A]/0 to-[#F78F1E]/0 group-hover:from-[#33B54A]/5 group-hover:via-[#33B54A]/0 group-hover:to-[#F78F1E]/5 transition-all duration-500 rounded-2xl z-10 pointer-events-none" />
      
      <Link href={`/activities/detail/${newsItem.slug}`}>
        <div className={`relative ${isFeatured ? 'h-80' : 'h-64'} bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden`}>
          {videoUrl ? (
            <>
              <video
                src={videoUrl}
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                muted
                playsInline
                loop
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="size-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl border-4 border-white/50"
                >
                  <svg className="size-10 text-[#33B54A] ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </motion.div>
              </div>
            </>
          ) : (
            <>
              <Image
                src={thumbnailUrl}
                alt={newsItem.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </>
          )}
          
          {/* Featured badge */}
          {isFeatured && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="absolute top-4 left-4 z-20"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#33B54A] to-[#2EA043] text-white shadow-xl backdrop-blur-sm border border-white/20">
                <Activity className="size-3.5 mr-1.5" />
                Mới nhất
              </span>
            </motion.div>
          )}

          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </div>
      </Link>
      
      <div className="relative z-10 p-6 bg-white">
        <h2 className={`${isFeatured ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#33B54A] transition-colors duration-300`}>
          <Link href={`/activities/detail/${newsItem.slug}`} className="hover:underline">
            {newsItem.title}
          </Link>
        </h2>
        {description && (
          <p className={`text-gray-600 mb-4 ${isFeatured ? 'line-clamp-4' : 'line-clamp-3'} text-sm leading-relaxed`}>
            {description}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
          <Calendar className="size-4 text-[#33B54A]" />
          <span className="font-medium">Hoạt động mới</span>
        </div>
      </div>
    </motion.div>
  );
};

const ActivitiesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('newest');
  const searchInputRef = useRef<HTMLDivElement>(null);

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

    if (sortOrder === 'oldest') {
      filtered = [...filtered].reverse()
    }

    return filtered;
  }, [data?.items, searchQuery, sortOrder]);

  // Get featured images for hero
  const featuredImages = useMemo(() => {
    if (!data?.items) return ['/assets/images/ex1.jpg', '/assets/images/ex2.jpg', '/assets/images/ex3.jpg'];
    
    const images: string[] = [];
    data.items.forEach((item) => {
      const contentAssets = item.content_assets || [];
      const imageAsset = contentAssets.find((asset: any) => asset.asset?.mime_type?.startsWith('image/'));
      const thumbnail = item.thumbnail || (imageAsset ? imageAsset.asset.url : '');
      if (thumbnail) {
        images.push(buildAssetUrl(thumbnail));
      }
    });
    
    // Fallback to default images if not enough
    while (images.length < 6) {
      images.push('/assets/images/ex1.jpg', '/assets/images/ex2.jpg', '/assets/images/ex3.jpg');
    }
    
    return images.slice(0, 6);
  }, [data?.items]);

  const totalPages = data?.total_pages || 1;
  const totalItems = data?.total || 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      if (searchInputRef.current) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 100;
        const elementPosition = searchInputRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="bg-white text-gray-800 antialiased">
      <ActivitiesHero featuredImages={featuredImages} totalItems={totalItems} />

      <main className='relative bg-white pt-4 md:pt-6 pb-20 md:pb-28'>
        <div className='container mx-auto px-4'>
          <div ref={searchInputRef}>
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="size-10 animate-spin text-[#33B54A]" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg">Đã xảy ra lỗi khi tải hoạt động. Vui lòng thử lại sau.</p>
            </div>
          )}

          {/* Grid Layout - Cân đối và đẹp */}
          {!isLoading && !error && (
            <>
              {filteredNews.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredNews.map((newsItem, index) => (
                      <ActivityCard 
                        key={newsItem.id || newsItem.public_id || index} 
                        newsItem={newsItem}
                        index={index}
                        isFeatured={index === 0}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={currentPage}
                        total={totalPages}
                        onChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">Không tìm thấy hoạt động nào.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default ActivitiesPage;
