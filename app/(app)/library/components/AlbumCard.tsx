
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Film, ImageIcon } from 'lucide-react'
import { Album } from '@/types/interface/library'

interface AlbumCardProps {
    album: Album;
    index: number;
    onClick: (album: Album) => void;
}

export const AlbumCard = ({ album, index, onClick }: AlbumCardProps) => {
    const hasImages = album.items.length > 0;
    const hasVideos = album.videos.length > 0;
    const totalItems = album.items.length + album.videos.length;

    // Get cover image - prefer cover_asset, then first image, then first video thumbnail
    const coverImage = album.cover_asset?.src || 
                      (hasImages ? album.items[0]?.asset?.src : null) ||
                      (hasVideos ? album.videos[0]?.video?.thumbnail_url : '/placeholder.png');

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative aspect-video overflow-hidden rounded-xl cursor-pointer bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => onClick(album)}
        >
            <Image
                src={coverImage}
                alt={`Cover for ${album.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6 text-white">
                {/* Top: Media count badge */}
                <div className='flex justify-end'>
                    {totalItems > 0 && (
                        <div className='flex items-center gap-2.5 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 border border-white/30 shadow-lg'>
                            {hasImages && (
                                <div className="flex items-center gap-1.5">
                                    <ImageIcon className="size-4 text-white" />
                                    <span className="text-sm font-semibold">{album.items.length}</span>
                                </div>
                            )}
                            {hasImages && hasVideos && (
                                <div className="w-px h-4 bg-white/50"></div>
                            )}
                            {hasVideos && (
                                <div className="flex items-center gap-1.5">
                                    <Film className="size-4 text-white" />
                                    <span className="text-sm font-semibold">{album.videos.length}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                {/* Bottom: Title and description */}
                <div>
                    <h3 className="font-black leading-tight text-xl drop-shadow-lg md:text-2xl mb-1.5">
                        {album.title}
                    </h3>
                    {album.description && (
                        <p className="font-semibold leading-relaxed text-sm text-white/95 line-clamp-2 md:text-base">
                            {album.description}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
