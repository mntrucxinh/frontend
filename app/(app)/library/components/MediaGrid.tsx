
'use client'

import { AnimatePresence, motion } from 'framer-motion'

interface MediaGridProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    view: 'images' | 'videos' | 'albums';
    gridCols?: string;
}

const gridStyles = {
    images: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4",
    videos: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
    albums: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
}

const titles = {
    images: {
        title: "Thư viện hình ảnh",
        subtitle: "Tất cả khoảnh khắc được lưu giữ."
    },
    videos: {
        title: "Thư viện video",
        subtitle: "Những thước phim sống động và ý nghĩa."
    },
    albums: {
        title: "Khám phá theo Album",
        subtitle: "Mỗi album là một câu chuyện độc đáo."
    }
}

export function MediaGrid<T>({ items, renderItem, view }: MediaGridProps<T>) {
    const { title, subtitle } = titles[view];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={view}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
            >
                <div className="mb-12 text-center">
                    <h2 className="mb-2 text-3xl font-black md:text-4xl bg-gradient-to-r from-[#33B54A] from-10% via-[#2EA043] via-30% to-[#F78F1E] to-90% bg-clip-text text-transparent">{title}</h2>
                    <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">{subtitle}</p>
                </div>
                <div className={`grid ${gridStyles[view]}`}>
                    {items.map((item, index) => renderItem(item, index))}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
