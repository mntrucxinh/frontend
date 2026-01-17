'use client';

import React from 'react';
import Link from 'next/link';
import Image from '@/components/Image';
import { useParams } from 'next/navigation';
import { Loader2, Calendar, ArrowLeft, Activity } from 'lucide-react';
import { useNewsDetail } from '@/hook/news/use-news-detail';
import { useNewsList } from '@/hook/news/use-news-list';
import { formatVietnameseDate, getNewsDate } from '@/utils/date';
import { buildAssetUrl } from '@/utils/api-url';
import { motion } from 'framer-motion';

const NewsDetailPage = () => {
    const params = useParams();
    const { slug } = params as { slug: string };

    const { data: newsItem, isLoading, error } = useNewsDetail({ slug });
    const { data: newsListData } = useNewsList({ page: 1, pageSize: 10 });

    const latestNews = React.useMemo(() => {
        if (!newsListData?.items || !newsItem) return [];
        
        const currentId = newsItem.id || newsItem.public_id;
        const currentSlug = newsItem.slug;
        
        return newsListData.items
            .filter(item => {
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="size-12 animate-spin text-[#33B54A] mx-auto mb-4" />
                    <p className="text-gray-600">Đang tải hoạt động...</p>
                </div>
            </div>
        );
    }

    if (error || !newsItem) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-500 text-xl mb-4">Hoạt động không tồn tại.</p>
                    <Link 
                        href="/activities" 
                        className="inline-flex items-center gap-2 text-[#33B54A] hover:text-[#2EA043] transition-colors font-semibold"
                    >
                        <ArrowLeft className="size-5" />
                        Quay lại trang hoạt động
                    </Link>
                </div>
            </div>
        );
    }

    const { title } = newsItem;

    const content = newsItem.content_html || 
                    newsItem.content || 
                    (newsItem as any).body || 
                    (newsItem as any).description || 
                    (newsItem as any).text || 
                    (newsItem as any).html || 
                    '';

    const contentAssets = newsItem.content_assets || [];
    
    const videoAsset = contentAssets.find(
        (asset: any) => asset.asset?.mime_type?.startsWith('video/')
    );
    
    const imageAssets = contentAssets
        .filter((asset: any) => asset.asset?.mime_type?.startsWith('image/'))
        .sort((a: any, b: any) => (a.position || 0) - (b.position || 0));
    
    const thumbnail = newsItem.thumbnail || 
                      (imageAssets.length > 0 ? imageAssets[0].asset.url : '');

    const displayDate = getNewsDate(newsItem);
    const formattedDate = formatVietnameseDate(displayDate);

    const thumbnailUrl = thumbnail ? buildAssetUrl(thumbnail) : '/assets/images/ex1.jpg';

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            <div className="p-6 md:p-8">
                                {/* Title */}
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
                                    {title}
                                </h1>

                                {/* Date */}
                                {formattedDate && (
                                    <div className="flex items-center gap-2 mb-8">
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#33B54A]/10 to-[#33B54A]/5 border border-[#33B54A]/20">
                                            <Calendar className="size-4 text-[#33B54A]" />
                                            <span className="text-sm font-semibold text-gray-700">{formattedDate}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Content */}
                                {content && (
                                    <div className="prose prose-lg md:prose-xl max-w-none
                                        prose-headings:text-gray-900 prose-headings:font-black prose-headings:mt-8 prose-headings:mb-4
                                        prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                                        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg prose-p:mb-4
                                        prose-a:text-[#33B54A] prose-a:no-underline prose-a:font-semibold hover:prose-a:underline hover:prose-a:text-[#F78F1E] prose-a:transition-all
                                        prose-strong:text-gray-900 prose-strong:font-bold
                                        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6 prose-ul:space-y-1
                                        prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6 prose-ol:space-y-1
                                        prose-li:my-1 prose-li:leading-relaxed
                                        prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:w-full
                                        prose-blockquote:border-l-4 prose-blockquote:border-[#33B54A] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50 prose-blockquote:py-3 prose-blockquote:rounded-r-lg prose-blockquote:my-6">
                                        <div dangerouslySetInnerHTML={{ __html: content }} />
                                    </div>
                                )}

                                {/* Additional Images */}
                                {imageAssets.length > 1 && (
                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {imageAssets.slice(1).map((imageAsset: any, index: number) => (
                                            <div key={imageAsset.asset?.public_id || index} className="rounded-xl overflow-hidden shadow-md">
                                                <div className="relative w-full aspect-[4/3] bg-gray-100">
                                                    <Image 
                                                        src={buildAssetUrl(imageAsset.asset.url)}
                                                        alt={imageAsset.caption || `${title} - Hình ${index + 2}`} 
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                                {imageAsset.caption && (
                                                    <p className="text-xs text-gray-600 mt-2 px-2 text-center italic">
                                                        {imageAsset.caption}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {!content && (
                                    <div className="text-gray-500 italic py-12 text-center text-lg">
                                        Nội dung đang được cập nhật...
                                    </div>
                                )}

                                {/* Featured Image/Video - Hiển thị ở cuối */}
                                {(videoAsset || imageAssets.length > 0 || thumbnail) && (
                                    <div className="mt-8 relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden">
                                        {videoAsset ? (
                                            <video 
                                                src={buildAssetUrl(videoAsset.asset.url)}
                                                controls
                                                className="size-full object-contain"
                                            />
                                        ) : imageAssets.length > 0 ? (
                                            <Image 
                                                src={buildAssetUrl(imageAssets[0].asset.url)}
                                                alt={title}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <Image 
                                                src={thumbnailUrl}
                                                alt={title}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="sticky top-4 self-start"
                        >
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                                {/* Sidebar Header */}
                                <div className="px-6 py-4 bg-gradient-to-r from-[#33B54A] to-[#2EA043]">
                                    <div className="flex items-center gap-2">
                                        <Activity className="size-5 text-white" />
                                        <h3 className="text-lg font-bold text-white">
                                            Hoạt động khác
                                        </h3>
                                    </div>
                                </div>
                                
                                {/* Sidebar Content */}
                                <div className="p-6">
                                    {latestNews.length > 0 ? (
                                        <ul className="space-y-4">
                                            {latestNews.map((item, index) => {
                                                const itemDate = getNewsDate(item);
                                                const formattedItemDate = formatVietnameseDate(itemDate);
                                                
                                                const itemContentAssets = item.content_assets || [];
                                                
                                                const itemVideoAsset = itemContentAssets.find(
                                                    (asset: any) => asset.asset?.mime_type?.startsWith('video/')
                                                );
                                                
                                                const itemImageAsset = itemContentAssets.find(
                                                    (asset: any) => asset.asset?.mime_type?.startsWith('image/')
                                                );
                                                
                                                const itemThumbnail = item.thumbnail || 
                                                                      (itemImageAsset ? itemImageAsset.asset.url : '');
                                                const itemThumbnailUrl = itemThumbnail 
                                                  ? buildAssetUrl(itemThumbnail)
                                                  : '/assets/images/ex1.jpg';
                                                
                                                const itemVideoUrl = itemVideoAsset?.asset?.url
                                                  ? buildAssetUrl(itemVideoAsset.asset.url)
                                                  : null;
                                                
                                                return (
                                                    <li key={item.id || item.public_id} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                                        <Link href={`/activities/detail/${item.slug}`}>
                                                            <div className="group flex items-start gap-3 hover:opacity-90 transition-opacity">
                                                                <div className="shrink-0 size-20 rounded-lg overflow-hidden bg-gray-100 relative shadow-sm">
                                                                    {itemVideoUrl ? (
                                                                        <>
                                                                            <video
                                                                                src={itemVideoUrl}
                                                                                className="size-full object-cover"
                                                                                muted
                                                                                playsInline
                                                                            />
                                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                                                <div className="size-6 rounded-full bg-white/95 flex items-center justify-center">
                                                                                    <svg className="size-3 text-[#33B54A] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                                                        <path d="M8 5v14l11-7z"/>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <Image 
                                                                            src={itemThumbnailUrl} 
                                                                            alt={item.title} 
                                                                            fill
                                                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                                            unoptimized
                                                                        />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#33B54A] transition-colors line-clamp-2 mb-1 leading-snug">
                                                                        {item.title}
                                                                    </h4>
                                                                    {formattedItemDate && (
                                                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                            <Calendar className="size-3" />
                                                                            <span>{formattedItemDate}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-8">Chưa có hoạt động khác</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailPage;
