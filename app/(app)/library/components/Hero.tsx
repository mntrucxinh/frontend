
'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Asset } from '@/types/interface/library'

// --- Animated background component ---
const MotionImage = ({ src, initial, animate }: { src: string; initial: any; animate: any }) => (
    <motion.div
        className="absolute h-40 w-60 rounded-2xl"
        initial={initial}
        animate={animate}
        transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
        }}
    >
        <Image
            src={src}
            alt=""
            fill
            className="object-cover opacity-20 blur-sm brightness-110 saturate-125"
            priority
        />
    </motion.div>
);

const ImageBackdrop = ({ assets }: { assets: Asset[] }) => {
    const imageStyles = useMemo(() => {
        return assets.slice(0, 6).map(() => {
            const xRange = Math.random() * 60 - 30;
            const yRange = Math.random() * 60 - 30;
            const rotateRange = Math.random() * 15 - 7.5;

            return {
                initial: {
                    top: `${Math.random() * 85}%`,
                    left: `${Math.random() * 85}%`,
                },
                animate: {
                    x: [0, xRange, -xRange, xRange, 0],
                    y: [0, yRange, 0, -yRange, 0],
                    rotate: [0, rotateRange, -rotateRange, 0, rotateRange],
                }
            };
        });
    }, [assets]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {assets.slice(0, 6).map((asset, i) => (
                <MotionImage 
                    key={asset.id} 
                    src={asset.src}
                    initial={imageStyles[i].initial}
                    animate={imageStyles[i].animate} 
                />
            ))}
        </div>
    );
};


// --- Hero Component ---
export const Hero = ({ assets }: { assets: Asset[] }) => {
    return (
        <motion.section
            className='relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#33B54A] via-[#2EA043] to-[#F78F1E] py-28 md:py-40'
        >
            <ImageBackdrop assets={assets} />
            <div className='relative z-10 text-center px-4'>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1]}}
                    className='mb-6 text-4xl font-black leading-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl'
                >
                    <span className='block text-[#F78F1E] drop-shadow-lg'>Thế Giới Tuổi Thơ</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                    className='mx-auto max-w-xl text-lg leading-relaxed text-white/95 md:text-xl'
                >
                    Cùng khám phá những câu chuyện, những nụ cười và những kỷ niệm tuyệt vời được ghi lại mỗi ngày.
                </motion.p>
            </div>
        </motion.section>
    )
}
