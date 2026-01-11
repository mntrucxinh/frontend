
'use client'

import { useMemo, useState } from 'react'
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

export const AlbumDetailModal = ({ album, onClose }: AlbumDetailModalProps) => {
    const [imageIndex, setImageIndex] = useState(-1);
    const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);

    const images = useMemo(() => album?.items.sort((a, b) => a.position - b.position).map(i => i.asset) ?? [], [album]);
    const videos = useMemo(() => album?.videos.sort((a, b) => a.position - b.position).map(v => v.video) ?? [], [album]);
    
    const imageSlides = useMemo(() => images.map(asset => ({ src: asset.src })), [images]);

    const handleClose = () => {
        setImageIndex(-1);
        setActivePlaylist(null);
        onClose();
    };

    return (
        <AnimatePresence>
            {album && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] flex flex-col bg-secondary" // Changed to lighter green background
                >
                    <header className="flex-shrink-0 bg-primary backdrop-blur-sm border-b border-border shadow-sm p-4 z-10">
                        <div className="container mx-auto flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-black leading-tight text-primary-foreground">{album.title}</h2>
                                <p className="font-black leading-tight text-primary-foreground/90 truncate">{album.description}</p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 rounded-full text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground transition-colors" // Text color and hover for primary background
                                aria-label="Close album detail view"
                            >
                                <X className="w-7 h-7" />
                            </button>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="container mx-auto px-4 py-8 bg-secondary" // Content area uses secondary background
                        >
                            {images.length > 0 && (
                                <section className="mb-12">
                                    <h3 className="flex items-center text-2xl font-semibold text-accent mb-6">
                                        <Camera className="mr-3 text-accent"/>
                                        Hình Ảnh ({images.length})
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                                        {images.map((asset, index) => (
                                            <ImageCard 
                                                key={asset.id} 
                                                asset={asset} 
                                                index={index} 
                                                onClick={() => setImageIndex(index)} 
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {videos.length > 0 && (
                                <section>
                                    <h3 className="flex items-center text-2xl font-semibold text-accent mb-6">
                                        <Video className="mr-3 text-accent"/>
                                        Video ({videos.length})
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                         {videos.map((video, index) => (
                                            <VideoCard 
                                                 key={video.id} 
                                                 video={video} 
                                                 index={index} 
                                                 onClick={() => setActivePlaylist({ videos, startIndex: index })} 
                                            />
                                         ))}
                                    </div>
                                </section>
                            )}
                        </motion.div>
                    </main>

                    {/* These are the players/lightboxes specific to this modal */}
                    <ImageLightbox 
                        slides={imageSlides}
                        open={imageIndex > -1}
                        close={() => setImageIndex(-1)}
                        index={imageIndex}
                    />
                    <VideoPlayer playlist={activePlaylist} onClose={() => setActivePlaylist(null)} />

                </motion.div>
            )}
        </AnimatePresence>
    )
}
