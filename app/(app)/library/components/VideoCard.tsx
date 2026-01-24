
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { PlayCircle, Video as VideoIcon } from 'lucide-react'
import { VideoEmbed } from '@/types/interface/library'
import { buildAssetUrl } from '@/utils/api-url'

interface VideoCardProps {
    video: VideoEmbed;
    index: number;
    onClick: (video: VideoEmbed) => void;
}

export const VideoCard = ({ video, index, onClick }: VideoCardProps) => {
    const hasThumbnail = video.thumbnail_url && video.thumbnail_url.trim() !== ''
    const thumbnailUrl = hasThumbnail ? buildAssetUrl(video.thumbnail_url) : null
    const videoUrl = video.url ? buildAssetUrl(video.url) : null

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative size-full aspect-square overflow-hidden rounded-xl cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => onClick(video)}
        >
            {thumbnailUrl ? (
                <Image
                    src={thumbnailUrl}
                    alt={`Video thumbnail for ${video.title || 'video'}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
            ) : videoUrl ? (
                <video
                    src={videoUrl}
                    className="size-full object-cover"
                    preload="metadata"
                    muted
                />
            ) : (
                <div className="size-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                    <VideoIcon className="size-16 text-gray-400" />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="size-16 text-white/90 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            </div>
            {video.title && (
                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                    <h3 className="font-black leading-tight text-lg drop-shadow-md md:text-xl line-clamp-2">{video.title}</h3>
                </div>
            )}
        </motion.div>
    )
}
