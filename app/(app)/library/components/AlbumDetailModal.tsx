
'use client'

import { useMemo, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Camera, Video } from 'lucide-react'

import { Album, Asset, VideoEmbed } from '@/types/interface/library'
import { ImageCard } from './ImageCard'
import { VideoCard } from './VideoCard'
import { ImageLightbox } from './ImageLightbox'
import { VideoPlayer } from './VideoPlayer'

type Playlist = { videos: VideoEmbed[]; startIndex: number };

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

    // Combine images and videos, sorted by position
    const mediaItems = useMemo<MediaItem[]>(() => {
        if (!album) return [];
        
        const imageItems: MediaItem[] = album.items
            .sort((a, b) => a.position - b.position)
            .map((item, index) => ({
                type: 'image' as const,
                asset: item.asset,
                position: item.position,
                index: index,
            }));
        
        const videoItems: MediaItem[] = album.videos
            .sort((a, b) => a.position - b.position)
            .map((item, index) => ({
                type: 'video' as const,
                video: item.video,
                position: item.position,
                index: index,
            }));
        
        // Combine and sort by position
        return [...imageItems, ...videoItems].sort((a, b) => a.position - b.position);
    }, [album]);

    const images = useMemo(() => mediaItems.filter(item => item.type === 'image').map(item => item.asset), [mediaItems]);
    const videos = useMemo(() => mediaItems.filter(item => item.type === 'video').map(item => item.video), [mediaItems]);
    
    const imageSlides = useMemo(() => images.map(asset => ({ src: asset.src })), [images]);

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

    return (
        <AnimatePresence>
            {album && (
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
                                className="flex-shrink-0 flex items-center justify-between border-b bg-gradient-to-r from-[#33B54A]/5 via-white to-[#F78F1E]/5 px-6 py-5"
                            >
                                <div className="flex-1 min-w-0 pr-4">
                                    <h2 className="text-2xl font-black text-gray-900 md:text-3xl line-clamp-1 mb-1">
                                        <span className="text-[#F78F1E]">{album.title}</span>
                                    </h2>
                                    {album.description && (
                                        <p className="text-sm text-gray-600 md:text-base line-clamp-1">
                                            {album.description}
                                        </p>
                                    )}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleClose}
                                    className="flex-shrink-0 flex size-10 items-center justify-center rounded-full transition-colors hover:bg-gray-200"
                                    aria-label="Close album detail view"
                                >
                                    <X className="size-5 text-gray-600" />
                                </motion.button>
                            </motion.header>

                            {/* Main Content */}
                            <main className="flex-1 overflow-y-auto bg-white">
                                <div className="px-6 py-8 md:px-8 md:py-10">
                                    {mediaItems.length > 0 && (
                                        <section>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="mb-6"
                                            >
                                                <h3 className="flex items-center gap-2.5 text-xl font-black text-gray-900 md:text-2xl">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#33B54A]/10">
                                                            <Camera className="text-[#33B54A] size-4.5 md:size-5"/>
                                                        </div>
                                                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#F78F1E]/10">
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
                                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"
                                            >
                                                {mediaItems.map((item, globalIndex) => {
                                                    if (item.type === 'image') {
                                                        const imageIndexInImages = images.findIndex(img => img.id === item.asset.id);
                                                        return (
                                                            <motion.div
                                                                key={`image-${item.asset.id}`}
                                                                variants={itemVariants}
                                                            >
                                                                <ImageCard 
                                                                    asset={item.asset} 
                                                                    index={imageIndexInImages >= 0 ? imageIndexInImages : 0} 
                                                                    onClick={() => setImageIndex(imageIndexInImages >= 0 ? imageIndexInImages : 0)} 
                                                                />
                                                            </motion.div>
                                                        );
                                                    } else {
                                                        const videoIndexInVideos = videos.findIndex(vid => vid.id === item.video.id);
                                                        return (
                                                            <motion.div
                                                                key={`video-${item.video.id}`}
                                                                variants={itemVariants}
                                                                className="col-span-2 sm:col-span-1"
                                                            >
                                                                <VideoCard 
                                                                    video={item.video} 
                                                                    index={videoIndexInVideos >= 0 ? videoIndexInVideos : 0} 
                                                                    onClick={() => setActivePlaylist({ videos, startIndex: videoIndexInVideos >= 0 ? videoIndexInVideos : 0 })} 
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
