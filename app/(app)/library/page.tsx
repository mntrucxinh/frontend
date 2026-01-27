'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion';
import { GalleryHorizontal, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { Pagination } from '@heroui/react'

// Types
import { View } from '@/types/interface/library'
import type { Asset, VideoEmbed, Album } from '@/service/library-service'
import { useLibraryAssets, useLibraryAlbums } from '@/hook/library/use-library-query'

// Static media statistics (placeholder values, matching ContactSection's static nature)
const mediaStats = [
  {
    icon: ImageIcon,
    title: 'Tổng số ảnh',
    content: '1500+', // Placeholder
    color: 'from-[#33B54A] to-[#2EA043]',
  },
  {
    icon: VideoIcon,
    title: 'Tổng số video',
    content: '500+', // Placeholder
    color: 'from-[#F78F1E] to-[#E67E17]',
  },
  {
    icon: GalleryHorizontal,
    title: 'Tổng số album',
    content: '150+', // Placeholder
    color: 'from-[#33B54A] to-[#2EA043]', // Alternating color
  },
];


// Components
import { Hero } from './components/Hero'
import { ViewSwitcher } from './components/ViewSwitcher'
import { MediaGrid } from './components/MediaGrid'
import { ImageCard } from './components/ImageCard'
import { VideoCard } from './components/VideoCard'
import { AlbumCard } from './components/AlbumCard'
import { VideoPlayer } from './components/VideoPlayer'
import { ImageLightbox } from './components/ImageLightbox'
import { AlbumDetailModal } from './components/AlbumDetailModal'

import type { VideoEmbed as LibraryVideoEmbed } from '@/types/interface/library'
type Playlist = { videos: LibraryVideoEmbed[]; startIndex: number };

const LibraryPage = () => {
    // --- STATE MANAGEMENT ---
    const [view, setView] = useState<View>('images');
    
    // Pagination state for each tab
    const [imagesPage, setImagesPage] = useState(1);
    const [videosPage, setVideosPage] = useState(1);
    const [albumsPage, setAlbumsPage] = useState(1);
    const pageSize = 25; // Items per page
    
    // State for top-level lightboxes and players
    const [imageIndex, setImageIndex] = useState(-1);
    const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
    
    // State for the album detail modal
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

    // Ref for the tab switcher area
    const tabSwitcherRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);
    const hasUserInteracted = useRef(false);

    // Ensure page starts at top on initial load
    useEffect(() => {
        // Disable browser scroll restoration for this page
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        
        // Scroll to top on initial mount (even if browser tries to restore)
        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        };
        
        // Immediate scroll
        scrollToTop();
        
        // Also scroll after a short delay to override any browser restoration
        const timeoutId = setTimeout(scrollToTop, 0);
        
        isInitialMount.current = false;
        
        return () => {
            clearTimeout(timeoutId);
            // Re-enable scroll restoration when leaving page
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'auto';
            }
        };
    }, []);

    // Helper function to scroll to tab area
    const scrollToTab = () => {
        // Only scroll if user has interacted (clicked tab or pagination)
        if (!hasUserInteracted.current) return;
        
        setTimeout(() => {
            if (tabSwitcherRef.current) {
                // Get header height dynamically
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 100;
                
                const elementPosition = tabSwitcherRef.current.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // Extra 20px padding
                
                window.scrollTo({
                    top: Math.max(0, offsetPosition), // Ensure not negative
                    behavior: 'smooth'
                });
            }
        }, 100);
    };

    // Reset page when switching tabs and scroll to tab area (but not on initial mount)
    useEffect(() => {
        setImagesPage(1);
        setVideosPage(1);
        setAlbumsPage(1);
        
        // Only scroll if user has interacted
        if (hasUserInteracted.current) {
            scrollToTab();
        }
    }, [view]);

    // Handlers for pagination with scroll
    const handleImagesPageChange = (page: number) => {
        hasUserInteracted.current = true;
        setImagesPage(page);
        scrollToTab();
    };

    const handleVideosPageChange = (page: number) => {
        hasUserInteracted.current = true;
        setVideosPage(page);
        scrollToTab();
    };

    const handleAlbumsPageChange = (page: number) => {
        hasUserInteracted.current = true;
        setAlbumsPage(page);
        scrollToTab();
    };

    // Handle view change from user interaction
    const handleViewChange = (newView: View) => {
        hasUserInteracted.current = true;
        setView(newView);
    };

    // --- API DATA ---
    const { data: imagesData, isLoading: isLoadingImages } = useLibraryAssets({
        mimeType: 'image/',
        page: imagesPage,
        pageSize: pageSize,
    })
    
    const { data: videosData, isLoading: isLoadingVideos } = useLibraryAssets({
        mimeType: 'video/',
        page: videosPage,
        pageSize: pageSize,
    })
    
    const { data: albumsData, isLoading: isLoadingAlbums } = useLibraryAlbums({
        page: albumsPage,
        pageSize: pageSize,
    })

    // Transform API data to component format
    const assets: Asset[] = useMemo(() => imagesData?.items || [], [imagesData])
    const videoEmbeds = useMemo(() => {
        // For now, videos from assets (local videos)
        // External videos (YouTube, Facebook) come from albums
        return videosData?.items.map((asset, index) => ({
            id: asset.id || index,
            provider: 'youtube' as const, // Map local to youtube for display
            url: asset.url,
            title: '',
            thumbnail_url: '',
        })) || []
    }, [videosData])
    
    const sampleAlbums = useMemo(() => albumsData?.items || [], [albumsData])

    // --- MEMOIZED DATA FOR LIGHTBOXES ---
    const allImageSlides = useMemo(() => assets.map(asset => ({ src: asset.url })), [assets]);

    // --- STATISTICS ---
    const mediaStats = useMemo(() => [
        {
            icon: ImageIcon,
            title: 'Tổng số ảnh',
            content: imagesData?.meta.total_items ? `${imagesData.meta.total_items}+` : '0+',
            color: 'from-[#33B54A] to-[#2EA043]',
        },
        {
            icon: VideoIcon,
            title: 'Tổng số video',
            content: videosData?.meta.total_items ? `${videosData.meta.total_items}+` : '0+',
            color: 'from-[#F78F1E] to-[#E67E17]',
        },
        {
            icon: GalleryHorizontal,
            title: 'Tổng số album',
            content: albumsData?.meta.total_items ? `${albumsData.meta.total_items}+` : '0+',
            color: 'from-[#33B54A] to-[#2EA043]',
        },
    ], [imagesData, videosData, albumsData])

    // --- EVENT HANDLERS ---
    const openVideoPlayer = (videos: typeof videoEmbeds, startIndex: number) => {
        setActivePlaylist({ videos: videos as any, startIndex });
    };

    const handleOpenAlbum = (album: Album) => {
        setSelectedAlbum(album);
    };

    const renderContent = () => {
        switch (view) {
            case 'images':
                if (isLoadingImages) {
                    return <div className="text-center py-12">Đang tải ảnh...</div>
                }
                const imagesTotalPages = imagesData?.meta.total_pages || 1;
                return (
                    <>
                        <MediaGrid
                            view="images"
                            items={assets}
                            renderItem={(asset, index) => (
                                <ImageCard 
                                    key={asset.public_id} 
                                    asset={{ id: asset.id, src: asset.url }} 
                                    index={index} 
                                    onClick={() => setImageIndex(index)} 
                                />
                            )}
                        />
                        {imagesTotalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={imagesPage}
                                    total={imagesTotalPages}
                                    onChange={handleImagesPageChange}
                                />
                            </div>
                        )}
                    </>
                );
            case 'videos':
                if (isLoadingVideos) {
                    return <div className="text-center py-12">Đang tải video...</div>
                }
                const videosTotalPages = videosData?.meta.total_pages || 1;
                return (
                    <>
                        <MediaGrid
                            view="videos"
                            items={videoEmbeds}
                            renderItem={(video, index) => (
                               <VideoCard 
                                    key={video.id} 
                                    video={video} 
                                    index={index} 
                                    onClick={() => openVideoPlayer(videoEmbeds, index)} 
                               />
                            )}
                        />
                        {videosTotalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={videosPage}
                                    total={videosTotalPages}
                                    onChange={handleVideosPageChange}
                                />
                            </div>
                        )}
                    </>
                );
            case 'albums':
                if (isLoadingAlbums) {
                    return <div className="text-center py-12">Đang tải album...</div>
                }
                const albumsTotalPages = albumsData?.meta.total_pages || 1;
                return (
                    <>
                        <MediaGrid
                            view="albums"
                            items={sampleAlbums}
                            renderItem={(album) => (
                                <AlbumCard 
                                    key={album.public_id}
                                    album={{
                                        id: Math.abs(album.public_id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 1000000,
                                        public_id: album.public_id,
                                        title: album.title,
                                        slug: album.slug,
                                        description: album.description || '',
                                        cover_asset: album.cover ? { id: album.cover.id || 0, src: album.cover.url } : { id: 0, src: '' },
                                        status: 'published' as const,
                                        items: (album.items || []).map(item => ({
                                            asset: { id: item.asset.id || 0, src: item.asset.url },
                                            position: item.position,
                                            caption: item.caption || '',
                                        })),
                                        videos: (album.videos || []).map((v, idx) => ({
                                            video: {
                                                id: Math.abs(v.video.public_id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 1000000,
                                                provider: (v.video.provider === 'local' ? 'youtube' : v.video.provider) as 'youtube' | 'facebook',
                                                url: v.video.url,
                                                thumbnail_url: v.video.thumbnail_url || '',
                                                title: v.video.title || '',
                                            },
                                            position: v.position,
                                        })),
                                    }}
                                    index={0}
                                    onClick={() => handleOpenAlbum(album)}
                                />
                            )}
                        />
                        {albumsTotalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={albumsPage}
                                    total={albumsTotalPages}
                                    onChange={handleAlbumsPageChange}
                                />
                            </div>
                        )}
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <div className='bg-white text-gray-800 antialiased'>
            <Hero assets={assets.map(a => ({ id: a.id, src: a.url }))} />

            {/* Statistics Section */}
            <section className='relative -mt-16 z-20'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3'>
                        {mediaStats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className='group relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200/50 transition-all hover:shadow-2xl'
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity group-hover:opacity-5`} />
                                    <div className='relative z-10 text-center'>
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className={`mb-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} p-3 shadow-lg`}
                                        >
                                            <IconComponent className='size-6 text-white' />
                                        </motion.div>
                                        <div className='mb-1 text-3xl font-black text-gray-900 md:text-4xl'>
                                            {stat.content}
                                        </div>
                                        <div className='text-xs font-semibold text-gray-600 md:text-sm'>
                                            {stat.title}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <main className='relative bg-white py-20 md:py-28'>
                <div className='container mx-auto px-4'>
                    <div ref={tabSwitcherRef}>
                        <ViewSwitcher view={view} setView={handleViewChange} />
                    </div>
                    {renderContent()}
                </div>
            </main>

            {/* Lightbox and Video Player for the main page (Images and Videos tabs) */}
            <ImageLightbox 
                slides={allImageSlides}
                open={imageIndex > -1}
                close={() => setImageIndex(-1)}
                index={imageIndex}
            />
            <VideoPlayer playlist={activePlaylist as any} onClose={() => setActivePlaylist(null)} />

            {/* The new modal for displaying the contents of a single album */}
            <AlbumDetailModal album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
        </div>
    )
}

export default LibraryPage;