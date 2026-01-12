
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
        subtitle: "Mỗi album có thể chứa cả hình ảnh và video, kể lại những câu chuyện độc đáo."
    }
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            mass: 0.8,
        },
    },
}

export function MediaGrid<T>({ items, renderItem, view }: MediaGridProps<T>) {
    const { title, subtitle } = titles[view];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={view}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-full"
            >
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 120,
                        damping: 20,
                        delay: 0.1,
                    }}
                    className="mb-12 md:mb-16 text-center"
                >
                    <motion.h2
                        className="mb-4 text-4xl font-black tracking-tight md:text-5xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
                    >
                        {view === 'images' ? (
                            <>
                                <span className="text-[#33B54A]">Thư viện </span>
                                <span className="text-[#F78F1E]">hình ảnh</span>
                            </>
                        ) : view === 'videos' ? (
                            <>
                                <span className="text-[#33B54A]">Thư viện </span>
                                <span className="text-[#F78F1E]">video</span>
                            </>
                        ) : (
                            <>
                                <span className="text-[#33B54A]">Khám phá </span>
                                <span className="text-[#F78F1E]">theo Album</span>
                            </>
                        )}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mx-auto max-w-3xl text-base leading-relaxed text-gray-700 md:text-lg"
                    >
                        {subtitle}
                    </motion.p>
                </motion.div>

                {/* Grid Section with Stagger Animation */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={`grid ${gridStyles[view]} mx-auto max-w-7xl`}
                >
                    {items.map((item, index) => {
                        const renderedItem = renderItem(item, index);
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="w-full"
                            >
                                {renderedItem}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
