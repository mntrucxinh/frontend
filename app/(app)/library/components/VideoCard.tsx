
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { PlayCircle } from 'lucide-react'
import { VideoEmbed } from '@/types/interface/library'

interface VideoCardProps {
    video: VideoEmbed;
    index: number;
    onClick: (video: VideoEmbed) => void;
}

export const VideoCard = ({ video, index, onClick }: VideoCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative aspect-video overflow-hidden rounded-xl cursor-pointer bg-card shadow-lg"
            onClick={() => onClick(video)}
        >
            <Image
                src={video.thumbnail_url}
                alt={`Video thumbnail for ${video.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-primary-foreground/70 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                <h3 className="font-black leading-tight text-lg leading-tight drop-shadow-md">{video.title}</h3>
            </div>
        </motion.div>
    )
}
