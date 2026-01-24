
'use client'

import { useMemo, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Camera, Video } from 'lucide-react'

import type { Album, Asset, VideoEmbed } from '@/service/library-service'
import type { VideoEmbed as LibraryVideoEmbed } from '@/types/interface/library'
import { useLibraryAlbum } from '@/hook/library/use-library-query'
import { ImageCard } from './ImageCard'
import { VideoCard } from './VideoCard'
import { ImageLightbox } from './ImageLightbox'
import { VideoPlayer } from './VideoPlayer'

type Playlist = { videos: LibraryVideoEmbed[]; startIndex: number };

interface AlbumDetailModalProps {
    album: Album | null;
    onClose: () => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            mass: 0.8,
        },
    },
}

type MediaItem = 
    | { type: 'image'; asset: Asset; position: number; index: number }
    | { type: 'video'; video: VideoEmbed; position: number; index: number };

export const AlbumDetailModal = ({ album, onClose }: AlbumDetailModalProps) => {
    const [imageIndex, setImageIndex] = useState(-1);
    const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);
    
    // Fetch album detail if we only have slug
    const albumSlug = album?.slug
    const { data: albumDetail, isLoading: isLoadingAlbum } = useLibraryAlbum(albumSlug || '')
    const finalAlbum = albumDetail || album

    // Combine images and videos, sorted by position
    const mediaItems = useMemo<MediaItem[]>(() => {
        if (!finalAlbum) return [];
        
        const imageItems: MediaItem[] = (finalAlbum.items || [])
            .sort((a, b) => a.position - b.position)
            .map((item, index) => ({
                type: 'image' as const,
                asset: item.asset,
                position: item.position,
                index: index,
            }));
        
        const videoItems: MediaItem[] = (finalAlbum.videos || [])
            .sort((a, b) => a.position - b.position)
            .map((item, index) => ({
                type: 'video' as const,
                video: item.video,
                position: item.position,
                index: index,
            }));
        
        // Combine and sort by position
        return [...imageItems, ...videoItems].sort((a, b) => a.position - b.position);
    }, [finalAlbum]);

    const images = useMemo(() => mediaItems.filter(item => item.type === 'image').map(item => item.asset), [mediaItems]);
    const videos = useMemo(() => mediaItems.filter(item => item.type === 'video').map(item => item.video), [mediaItems]);
    
    const imageSlides = useMemo(() => images.map(asset => ({ src: asset.url })), [images]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (album) {
            // Save current scroll position
            const scrollY = window.scrollY;
            // Lock scroll
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            return () => {
                // Restore scroll
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [album]);

    const handleClose = () => {
        setImageIndex(-1);
        setActivePlaylist(null);
        onClose();
    };

    if (!album) return null

    // Show loading state if fetching album detail
    if (albumSlug && !finalAlbum && isLoadingAlbum) {
        return (
            <AnimatePresence>
                {album && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md"
                        />
                        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full max-w-7xl h-[90vh] flex items-center justify-center bg-white rounded-3xl shadow-2xl"
                            >
                                <div className="text-center">
                                    <div className="text-lg font-semibold text-gray-600">Đang tải album...</div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        )
    }

    if (!finalAlbum) return null

    return (
        <AnimatePresence>
            {(
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="w-full max-w-7xl h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
                        >
                            {/* Header */}
                            <motion.header
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="shrink-0 flex items-center justify-between border-b bg-gradient-to-r from-[#33B54A]/5 via-white to-[#F78F1E]/5 p-6"
                            >
                                <div className="flex-1 min-w-0 pr-6">
                                    <h2 className="text-2xl font-black text-gray-900 md:text-3xl line-clamp-1 mb-2">
                                        <span className="text-[#F78F1E]">{finalAlbum?.title || 'Đang tải...'}</span>
                                    </h2>
                                    {finalAlbum?.description && (
                                        <p className="text-sm text-gray-600 md:text-base line-clamp-1">
                                            {finalAlbum.description}
                                        </p>
                                    )}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleClose}
                                    className="shrink-0 flex size-10 items-center justify-center rounded-full transition-colors hover:bg-gray-200"
                                    aria-label="Close album detail view"
                                >
                                    <X className="size-5 text-gray-600" />
                                </motion.button>
                            </motion.header>

                            {/* Main Content */}
                            <main className="flex-1 overflow-y-auto bg-white">
                                <div className="p-6 md:p-8">
                                    {mediaItems.length > 0 && (
                                        <section>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="mb-6 md:mb-8"
                                            >
                                                <h3 className="flex items-center gap-2.5 text-xl font-black text-gray-900 md:text-2xl">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center justify-center size-9 rounded-lg bg-[#33B54A]/10">
                                                            <Camera className="text-[#33B54A] size-4.5 md:size-5"/>
                                                        </div>
                                                        <div className="flex items-center justify-center size-9 rounded-lg bg-[#F78F1E]/10">
                                                            <Video className="text-[#F78F1E] size-4.5 md:size-5"/>
                                                        </div>
                                                    </div>
                                                    <span className="text-gray-900">Nội dung Album</span>
                                                    <span className="text-gray-500 text-lg md:text-xl font-semibold">
                                                        ({images.length} ảnh, {videos.length} video)
                                                    </span>
                                                </h3>
                                            </motion.div>
                                            <motion.div
                                                variants={containerVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5"
                                            >
                                                {mediaItems.map((item, globalIndex) => {
                                                    if (item.type === 'image') {
                                                        const imageIndexInImages = images.findIndex(img => img.public_id === item.asset.public_id);
                                                        return (
                                                            <motion.div
                                                                key={`image-${item.asset.public_id}`}
                                                                variants={itemVariants}
                                                                className="w-full"
                                                            >
                                                                <ImageCard 
                                                                    asset={{ id: item.asset.id || 0, src: item.asset.url }} 
                                                                    index={imageIndexInImages >= 0 ? imageIndexInImages : 0} 
                                                                    onClick={() => setImageIndex(imageIndexInImages >= 0 ? imageIndexInImages : 0)} 
                                                                />
                                                            </motion.div>
                                                        );
                                                    } else {
                                                        const videoIndexInVideos = videos.findIndex(vid => vid.public_id === item.video.public_id);
                                                        return (
                                                            <motion.div
                                                                key={`video-${item.video.public_id}`}
                                                                variants={itemVariants}
                                                                className="w-full"
                                                            >
                                                                <VideoCard 
                                                                    video={{ 
                                                                        id: Math.abs(item.video.public_id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 1000000, 
                                                                        provider: (item.video.provider === 'local' ? 'youtube' : item.video.provider) as 'youtube' | 'facebook', 
                                                                        url: item.video.url, 
                                                                        thumbnail_url: item.video.thumbnail_url || '', 
                                                                        title: item.video.title || '' 
                                                                    }} 
                                                                    index={videoIndexInVideos >= 0 ? videoIndexInVideos : 0} 
                                                                    onClick={() => {
                                                                        const mappedVideos = videos.map(v => ({ 
                                                                            id: Math.abs(v.public_id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 1000000, 
                                                                            provider: (v.provider === 'local' ? 'youtube' : v.provider) as 'youtube' | 'facebook', 
                                                                            url: v.url, 
                                                                            thumbnail_url: v.thumbnail_url || '', 
                                                                            title: v.title || '' 
                                                                        }))
                                                                        setActivePlaylist({ videos: mappedVideos, startIndex: videoIndexInVideos >= 0 ? videoIndexInVideos : 0 })
                                                                    }} 
                                                                />
                                                            </motion.div>
                                                        );
                                                    }
                                                })}
                                            </motion.div>
                                        </section>
                                    )}
                                </div>
                            </main>
                        </motion.div>
                    </div>

                    {/* Lightboxes */}
                    <ImageLightbox 
                        slides={imageSlides}
                        open={imageIndex > -1}
                        close={() => setImageIndex(-1)}
                        index={imageIndex}
                    />
                    <VideoPlayer playlist={activePlaylist} onClose={() => setActivePlaylist(null)} />
                </>
            )}
        </AnimatePresence>
    )
}
