
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

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative aspect-video overflow-hidden rounded-xl cursor-pointer bg-card shadow-lg"
            onClick={() => onClick(album)}
        >
            <Image
                src={album.cover_asset.src || (hasVideos ? album.videos[0].video.thumbnail_url : '/placeholder.png')}
                alt={`Cover for ${album.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-4 text-primary-foreground">
                <div className='flex justify-end'>
                    {(hasImages || hasVideos) && (
                        <div className='flex items-center gap-3 rounded-full bg-foreground/30 backdrop-blur-sm px-3 py-1 text-xs font-medium'>
                            {hasImages && (
                                <div className="flex items-center gap-1">
                                    <ImageIcon className="w-4 h-4" />
                                    <span>{album.items.length}</span>
                                </div>
                            )}
                            {hasImages && hasVideos && <div className="w-px h-3 bg-primary-foreground/40"></div>}
                            {hasVideos && (
                                <div className="flex items-center gap-1">
                                    <Film className="w-4 h-4" />
                                    <span>{album.videos.length}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="font-black leading-tight text-xl leading-tight drop-shadow-md">{album.title}</h3>
                    <p className="font-black leading-tight text-sm text-primary-foreground/80 mt-1 truncate">{album.description}</p>
                </div>
            </div>
        </motion.div>
    )
}
