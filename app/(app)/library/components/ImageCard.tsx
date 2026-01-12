
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
            className="group relative aspect-square overflow-hidden rounded-xl bg-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => onClick(index)}
        >
            <Image
                src={asset.src}
                alt={`Library image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm p-4"
                >
                    <Camera className="w-8 h-8 text-white transform transition-transform" />
                </motion.div>
            </div>
        </motion.div>
    )
}
