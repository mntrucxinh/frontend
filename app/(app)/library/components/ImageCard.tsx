
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { Asset } from '@/types/interface/library'

interface ImageCardProps {
    asset: Asset;
    index: number;
    onClick: (index: number) => void;
}

export const ImageCard = ({ asset, index, onClick }: ImageCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="group relative aspect-square overflow-hidden rounded-lg bg-card cursor-pointer shadow-md"
            onClick={() => onClick(index)}
        >
            <Image
                src={asset.src}
                alt={`Library image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-10 h-10 text-white/90 transform scale-75 group-hover:scale-100 transition-transform" />
            </div>
        </motion.div>
    )
}
