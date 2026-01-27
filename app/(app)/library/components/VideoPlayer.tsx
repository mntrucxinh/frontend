
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { VideoEmbed } from '@/types/interface/library'
import { useEffect, useState, useCallback } from 'react'

interface VideoPlayerProps {
    playlist: {
        videos: VideoEmbed[];
        startIndex: number;
    } | null;
    onClose: () => void;
}

export const VideoPlayer = ({ playlist, onClose }: VideoPlayerProps) => {
    // --- HOOKS (must be called unconditionally at the top) ---
    const [currentIndex, setCurrentIndex] = useState(playlist?.startIndex ?? 0);

    useEffect(() => {
        if (playlist) {
            setCurrentIndex(playlist.startIndex);
        }
    }, [playlist]);

    const goToPrevious = useCallback(() => {
        if (!playlist) return;
        setCurrentIndex(prevIndex => (prevIndex - 1 + playlist.videos.length) % playlist.videos.length);
    }, [playlist]);

    const goToNext = useCallback(() => {
        if (!playlist) return;
        setCurrentIndex(prevIndex => (prevIndex + 1) % playlist.videos.length);
    }, [playlist]);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!playlist) return; // Don't handle keys if the player is not active

            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [playlist, goToNext, goToPrevious, onClose]);


    // --- EARLY RETURN (after all hooks are called) ---
    if (!playlist) {
        return null;
    }


    // --- RENDER LOGIC ---
    const currentVideo = playlist.videos[currentIndex];
    const hasMultipleVideos = playlist.videos.length > 1;

    return (
        <AnimatePresence>
            {playlist && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        aria-label="Close video player"
                    >
                        <X className="size-8 text-white"/>
                    </button>

                    {/* Main Content */}
                    <div className="relative size-full flex items-center justify-center p-4 md:p-8 lg:p-16">
                        {/* Previous Button */}
                        {hasMultipleVideos && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                                className="absolute left-4 md:left-8 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                aria-label="Previous video"
                            >
                                <ChevronLeft className="size-8 text-white"/>
                            </motion.button>
                        )}
                        
                        {/* Video Iframe */}
                        <motion.div
                            key={currentVideo.id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                            className="aspect-video w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl bg-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={currentVideo.url}
                                className="size-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                title={currentVideo.title}
                            ></iframe>
                        </motion.div>

                        {/* Next Button */}
                        {hasMultipleVideos && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                className="absolute right-4 md:right-8 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                aria-label="Next video"
                            >
                                <ChevronRight className="size-8 text-white"/>
                            </motion.button>
                        )}

                        {/* Counter */}
                         {hasMultipleVideos && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                                {currentIndex + 1} / {playlist.videos.length}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
