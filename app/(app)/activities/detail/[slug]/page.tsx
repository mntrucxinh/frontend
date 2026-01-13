'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Loader2, Calendar } from 'lucide-react';
import { useNewsDetail } from '@/hook/news/use-news-detail';
import { useNewsList } from '@/hook/news/use-news-list';
import { formatVietnameseDate, getNewsDate } from '@/utils/date';
import { buildAssetUrl } from '@/utils/api-url';

const Breadcrumb = ({newsTitle} : {newsTitle : string}) => {
    return (
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto p-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-emerald-600 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>
              <ChevronRight className="size-4" />
            </li>
            <li>
              <Link href="/news" className="hover:text-emerald-600 transition-colors">
                Tin tức
              </Link>
            </li>
            <li>
              <ChevronRight className="size-4" />
            </li>
            <li className="text-gray-900 truncate max-w-xs lg:max-w-md" title={newsTitle}>
              {newsTitle}
            </li>
          </ol>
        </div>
      </nav>
    );
};

const NewsDetailPage = () => {
    const params = useParams();
    const { slug } = params as { slug: string };

    const { data: newsItem, isLoading, error } = useNewsDetail({ slug });
    const { data: newsListData } = useNewsList({ page: 1, pageSize: 10 });

    // Get latest news excluding the current one (filter by both slug and id to be safe)
    const latestNews = React.useMemo(() => {
        if (!newsListData?.items || !newsItem) return [];
        
        const currentId = newsItem.id || newsItem.public_id;
        const currentSlug = newsItem.slug;
        
        return newsListData.items
            .filter(item => {
                // Exclude current article by slug and id/public_id
                const itemId = item.id || item.public_id;
                const isCurrentArticle = 
                    item.slug === slug || 
                    item.slug === currentSlug ||
                    itemId === currentId;
                return !isCurrentArticle;
            })
            .slice(0, 5);
    }, [newsListData?.items, newsItem, slug]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <Loader2 className="size-8 animate-spin text-green-500 mx-auto" />
                <p className="mt-4 text-gray-500">Đang tải tin tức...</p>
            </div>
        );
    }

    if (error || !newsItem) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-red-500 text-lg">Tin tức không tồn tại.</p>
                <Link href="/news" className="text-blue-500 hover:underline mt-4 inline-block">
                    <ChevronLeft className="size-4 inline-block" />
                     Quay lại trang tin tức
                </Link>
            </div>
        );
    }

    const { title } = newsItem;

    // Get content from content_html field (API response structure)
    const content = newsItem.content_html || 
                    newsItem.content || 
                    (newsItem as any).body || 
                    (newsItem as any).description || 
                    (newsItem as any).text || 
                    (newsItem as any).html || 
                    '';

    // Get content_assets
    const contentAssets = newsItem.content_assets || [];
    
    // Find video in content_assets (check mime_type for video)
    const videoAsset = contentAssets.find(
        (asset: any) => asset.asset?.mime_type?.startsWith('video/')
    );
    
    // Get all images from content_assets, sorted by position
    const imageAssets = contentAssets
        .filter((asset: any) => asset.asset?.mime_type?.startsWith('image/'))
        .sort((a: any, b: any) => (a.position || 0) - (b.position || 0));
    
    // Get thumbnail from content_assets (first image) or thumbnail field
    const thumbnail = newsItem.thumbnail || 
                      (imageAssets.length > 0 ? imageAssets[0].asset.url : '');

    // Debug: log to see what fields are available
    console.log('News item data:', newsItem);
    console.log('Content value:', content);
    console.log('Content assets:', contentAssets);
    console.log('Video asset:', videoAsset);
    console.log('Image assets:', imageAssets);
    console.log('Thumbnail value:', thumbnail);

    // Get date from various possible fields and format it
    const displayDate = getNewsDate(newsItem);
    const formattedDate = formatVietnameseDate(displayDate);

    return (
        <div className="bg-white min-h-screen">
            <Breadcrumb newsTitle={title} />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <article className="bg-white">
                            {/* Header */}
                            <header className="mb-6">
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                    {title}
                                </h1>
                                {formattedDate && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="size-4 text-gray-400" />
                                        <span>Ngày đăng: {formattedDate}</span>
                                    </div>
                                )}
                            </header>

                            {/* Content - hiển thị trước ảnh */}
                            {content && (
                                <div className="mb-8 prose prose-lg md:prose-xl max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg md:prose-p:text-xl prose-p:mb-4 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal prose-li:my-2">
                                    <div 
                                        className="news-content"
                                        dangerouslySetInnerHTML={{ __html: content }} 
                                    />
                                </div>
                            )}

                            {/* Video hoặc Images - hiển thị sau content */}
                            {videoAsset ? (
                                <div className="mb-8 max-w-4xl mx-auto">
                                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
                                        <video 
                                            src={buildAssetUrl(videoAsset.asset.url)}
                                            controls
                                            className="size-full object-contain"
                                        >
                                            Trình duyệt của bạn không hỗ trợ video.
                                        </video>
                                    </div>
                                    {videoAsset.caption && (
                                        <p className="text-sm text-gray-600 mt-3 text-center italic">
                                            {videoAsset.caption}
                                        </p>
                                    )}
                                </div>
                            ) : imageAssets.length > 0 ? (
                                <div className="mb-8 max-w-4xl mx-auto">
                                    {imageAssets.length === 1 ? (
                                        // Single image - full width
                                        <div className="w-full">
                                            <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-gray-100">
                                                <Image 
                                                    src={buildAssetUrl(imageAssets[0].asset.url)}
                                                    alt={imageAssets[0].caption || `${title} - Hình 1`} 
                                                    width={1200} 
                                                    height={800} 
                                                    className="w-full h-auto object-contain"
                                                    unoptimized
                                                />
                                            </div>
                                            {imageAssets[0].caption && (
                                                <p className="text-sm text-gray-600 mt-3 text-center italic">
                                                    {imageAssets[0].caption}
                                                </p>
                                            )}
                                        </div>
                                    ) : imageAssets.length === 2 ? (
                                        // Two images - side by side
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {imageAssets.map((imageAsset: any, index: number) => (
                                                <div key={imageAsset.asset?.public_id || index} className="w-full">
                                                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-gray-100 aspect-[4/3]">
                                                        <Image 
                                                            src={buildAssetUrl(imageAsset.asset.url)}
                                                            alt={imageAsset.caption || `${title} - Hình ${index + 1}`} 
                                                            width={800} 
                                                            height={600} 
                                                            className="size-full object-cover"
                                                            unoptimized
                                                        />
                                                    </div>
                                                    {imageAsset.caption && (
                                                        <p className="text-xs text-gray-600 mt-2 text-center italic">
                                                            {imageAsset.caption}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : imageAssets.length === 3 ? (
                                        // Three images - first large, two below
                                        <div className="space-y-4">
                                            <div className="w-full">
                                                <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-gray-100">
                                                    <Image 
                                                        src={buildAssetUrl(imageAssets[0].asset.url)}
                                                        alt={imageAssets[0].caption || `${title} - Hình 1`} 
                                                        width={1200} 
                                                        height={600} 
                                                        className="w-full h-auto object-contain"
                                                        unoptimized
                                                    />
                                                </div>
                                                {imageAssets[0].caption && (
                                                    <p className="text-sm text-gray-600 mt-2 text-center italic">
                                                        {imageAssets[0].caption}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {imageAssets.slice(1).map((imageAsset: any, index: number) => (
                                                    <div key={imageAsset.asset?.public_id || index + 1} className="w-full">
                                                        <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-gray-100 aspect-[4/3]">
                                                            <Image 
                                                                src={buildAssetUrl(imageAsset.asset.url)}
                                                                alt={imageAsset.caption || `${title} - Hình ${index + 2}`} 
                                                                width={800} 
                                                                height={600} 
                                                                className="size-full object-cover"
                                                                unoptimized
                                                            />
                                                        </div>
                                                        {imageAsset.caption && (
                                                            <p className="text-xs text-gray-600 mt-2 text-center italic">
                                                                {imageAsset.caption}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        // Four or more images - grid layout
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {imageAssets.map((imageAsset: any, index: number) => (
                                                <div key={imageAsset.asset?.public_id || index} className="w-full group">
                                                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-gray-100 aspect-[4/3] transition-transform duration-300 group-hover:shadow-xl">
                                                        <Image 
                                                            src={buildAssetUrl(imageAsset.asset.url)}
                                                            alt={imageAsset.caption || `${title} - Hình ${index + 1}`} 
                                                            width={800} 
                                                            height={600} 
                                                            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                            unoptimized
                                                        />
                                                    </div>
                                                    {imageAsset.caption && (
                                                        <p className="text-xs text-gray-600 mt-2 text-center italic">
                                                            {imageAsset.caption}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : thumbnail ? (
                                <div className="mb-8 max-w-4xl mx-auto">
                                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-gray-100">
                                        <Image 
                                            src={buildAssetUrl(thumbnail)}
                                            alt={title} 
                                            width={1200} 
                                            height={600} 
                                            className="w-full h-auto object-contain"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            ) : null}

                            {!content && (
                                <div className="text-gray-500 italic py-8">
                                    Nội dung đang được cập nhật...
                                </div>
                            )}
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white border border-gray-200 rounded-lg">
                            {/* Sidebar Header */}
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Tin tức mới nhất
                                </h3>
                            </div>
                            
                            {/* Sidebar Content */}
                            <div className="p-6">
                                {latestNews.length > 0 ? (
                                    <ul className="space-y-4">
                                        {latestNews.map((item) => {
                                            const itemDate = getNewsDate(item);
                                            const formattedItemDate = formatVietnameseDate(itemDate);
                                            
                                            // Get content_assets for sidebar item
                                            const itemContentAssets = item.content_assets || [];
                                            
                                            // Find video in content_assets
                                            const itemVideoAsset = itemContentAssets.find(
                                                (asset: any) => asset.asset?.mime_type?.startsWith('video/')
                                            );
                                            
                                            // Find image in content_assets
                                            const itemImageAsset = itemContentAssets.find(
                                                (asset: any) => asset.asset?.mime_type?.startsWith('image/')
                                            );
                                            
                                            // Get thumbnail from content_assets (image) or thumbnail field
                                            const itemThumbnail = item.thumbnail || 
                                                                  (itemImageAsset ? itemImageAsset.asset.url : '');
                                            const itemThumbnailUrl = itemThumbnail 
                                              ? buildAssetUrl(itemThumbnail)
                                              : '/assets/images/ex1.jpg';
                                            
                                            // Get video URL if exists
                                            const itemVideoUrl = itemVideoAsset?.asset?.url
                                              ? buildAssetUrl(itemVideoAsset.asset.url)
                                              : null;
                                            
                                            return (
                                                <li key={item.id || item.public_id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                                                    <Link href={`/news/detail/${item.slug}`}>
                                                        <div className="group flex items-start gap-3 hover:opacity-80 transition-opacity">
                                                            <div className="shrink-0 size-20 rounded-lg overflow-hidden bg-black relative">
                                                                {itemVideoUrl ? (
                                                                    <>
                                                                        <video
                                                                            src={itemVideoUrl}
                                                                            className="size-full object-cover"
                                                                            muted
                                                                            playsInline
                                                                        />
                                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                                            <div className="size-6 rounded-full bg-white/90 flex items-center justify-center">
                                                                                <svg className="size-3 text-emerald-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                                                    <path d="M8 5v14l11-7z"/>
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <Image 
                                                                        src={itemThumbnailUrl} 
                                                                        alt={item.title} 
                                                                        width={80} 
                                                                        height={80} 
                                                                        className="size-full object-cover"
                                                                        unoptimized
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-1">
                                                                    {item.title}
                                                                </h4>
                                                                {formattedItemDate && (
                                                                    <p className="text-xs text-gray-500">
                                                                        {formattedItemDate}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-4">Chưa có tin tức khác</p>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailPage;