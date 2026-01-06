'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, ChevronRight, Sparkles } from 'lucide-react'

type Post = {
  id: string
  type: 'notice' | 'news'
  title: string
  excerpt: string
  dateText: string
  image: string
  href: string
}

export default function NoticeNewsGreen() {
  const router = useRouter()
  const [tab, setTab] = useState<'notice' | 'news'>('notice')

  const posts: Post[] = useMemo(
    () => [
      {
        id: '1',
        type: 'notice',
        title: 'Thông báo các khoản thu đầu năm học 2025-2026',
        excerpt:
          'Để chuẩn bị tốt cho năm học 2025-2026, nhà trường xin kính báo đến các bậc phụ huynh...',
        dateText: 'Thứ 5, 26/09/24 lúc 07:47',
        image: '/assets/images/notice-cover.png',
        href: '/notice/thong-bao-cac-khoan-thu-dau-nam-hoc-2025-2026',
      },
      {
        id: '2',
        type: 'notice',
        title: 'Thông báo tuyển sinh năm học 2025-2026',
        excerpt:
          'Căn cứ kế hoạch phát triển Giáo dục năm học 2025-2026 của Phòng Giáo dục-Đào tạo...',
        dateText: 'Thứ 5, 26/09/24 lúc 07:11',
        image: '/assets/images/notice-cover.png',
        href: '/notice/thong-bao-tuyen-sinh-nam-hoc-2025-2026',
      },
      {
        id: '3',
        type: 'news',
        title: 'Bí quyết giúp bé tự tin khi đến lớp',
        excerpt:
          'Một vài mẹo nhỏ giúp con thích nghi môi trường mới, kết nối bạn bè và vui học mỗi ngày...',
        dateText: 'Thứ 3, 10/10/24 lúc 09:20',
        image: '/assets/images/ex1.jpg',
        href: '/news/detail/bi-quyet-giup-be-tu-tin-khi-den-lop',
      },
      {
        id: '4',
        type: 'news',
        title: 'Gợi ý thực đơn dinh dưỡng cho bé mầm non',
        excerpt:
          'Dinh dưỡng cân bằng là nền tảng để bé phát triển khỏe mạnh, vui vẻ và tràn đầy năng lượng...',
        dateText: 'Thứ 7, 12/10/24 lúc 08:05',
        image: '/assets/images/ex2.jpg',
        href: '/news/detail/goi-y-thuc-don-dinh-duong-cho-be-mam-non',
      },
    ],
    []
  )

  const filtered = posts.filter((p) => p.type === tab)

  return (
    <motion.section
      id='notice'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        type: 'tween',
      }}
      className='relative overflow-hidden bg-gradient-to-b from-[#E8F5E9] via-white to-[#FFF3E0] py-20 md:py-28'
    >
      {/* Top wave */}
      <div className='pointer-events-none absolute inset-x-0 top-0'>
        <svg viewBox='0 0 1440 120' className='h-24 w-full' preserveAspectRatio='none'>
          <motion.path
            fill='#ffffff'
            d='M0,96L60,85.3C120,75,240,53,360,58.7C480,64,600,96,720,106.7C840,117,960,107,1080,96C1200,85,1320,75,1380,69.3L1440,64L1440,0L0,0Z'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Subtle decorative elements */}
      <div className='pointer-events-none absolute inset-0'>
        <motion.div
          className='absolute left-0 top-20 h-96 w-96 rounded-full bg-[#33B54A]/6 blur-3xl'
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute right-0 bottom-20 h-96 w-96 rounded-full bg-[#F78F1E]/6 blur-3xl'
          animate={{
            scale: [1, 1.35, 1],
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className='container relative z-10 mx-auto px-4'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
            type: 'tween',
          }}
          className='mx-auto mb-16 max-w-3xl text-center'
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-4xl font-black tracking-tight md:text-6xl'
          >
            <span className='text-[#33B54A]'>Thông báo </span>
            <span className='text-[#F78F1E]'>
              - Tin tức
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mt-5 text-lg leading-relaxed text-gray-600 md:text-xl'
          >
            Thông báo của nhà trường, tin tức tổng hợp về giáo dục, y tế học đường và các phương
            pháp nuôi dạy trẻ.
          </motion.p>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='relative mt-12 flex items-center justify-center gap-4'
          >
            <motion.button
              type='button'
              onClick={() => setTab('notice')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
              className={`relative overflow-hidden rounded-full px-8 py-3.5 text-base font-black transition-all duration-300 ease-out ${
                tab === 'notice'
                  ? 'shadow-lg'
                  : 'border-2 border-gray-200 bg-white hover:border-[#33B54A]/50 hover:bg-[#33B54A]/5'
              }`}
            >
              {tab === 'notice' && (
                <motion.div
                  layoutId='activeTab'
                  className='absolute inset-0 rounded-full bg-[#33B54A] shadow-lg'
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              <span className={`relative z-10 ${tab === 'notice' ? 'text-white' : 'text-gray-700'}`}>
                Thông báo
              </span>
            </motion.button>

            <motion.button
              type='button'
              onClick={() => setTab('news')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
              className={`relative overflow-hidden rounded-full px-8 py-3.5 text-base font-black transition-all duration-300 ease-out ${
                tab === 'news'
                  ? 'shadow-lg'
                  : 'border-2 border-gray-200 bg-white hover:border-[#F78F1E]/50 hover:bg-[#F78F1E]/5'
              }`}
            >
              {tab === 'news' && (
                <motion.div
                  layoutId='activeTab'
                  className='absolute inset-0 rounded-full bg-[#F78F1E] shadow-lg'
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              <span className={`relative z-10 ${tab === 'news' ? 'text-white' : 'text-gray-700'}`}>
                Tin tức
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 items-stretch'>
          <AnimatePresence mode='popLayout'>
            {filtered.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                  type: 'tween',
                }}
                whileHover={{ y: -8, scale: 1.01 }}
                className='group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-gray-100/50 transition-all duration-300 ease-out hover:shadow-xl hover:ring-[#33B54A]/30 gpu-accelerate'
              >
                {/* Image */}
                <button
                  onClick={() => router.push(post.href)}
                  className='relative block h-[260px] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 md:h-[280px]'
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className='relative h-full w-full'
                  >
                    <Image
                      width={600}
                      height={280}
                      src={post.image}
                      alt={post.title}
                      className='size-full object-cover'
                      priority={index < 2}
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />

                  {/* Type badge */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                      type: 'spring',
                      stiffness: 300,
                    }}
                    className={`absolute left-5 top-5 z-10 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-md ${
                      post.type === 'notice'
                        ? 'bg-[#33B54A]'
                        : 'bg-[#F78F1E]'
                    }`}
                  >
                    <span className='flex items-center gap-1.5'>
                      <Sparkles className='size-3' />
                      {post.type === 'notice' ? 'Thông báo' : 'Tin tức'}
                    </span>
                  </motion.div>
                </button>

                {/* Content */}
                <div className='relative flex flex-1 flex-col p-6 md:p-7'>
                  {/* Date */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className='mb-4 flex items-center gap-2 text-xs text-gray-500 md:text-sm'
                  >
                    <CalendarDays className={`size-3.5 md:size-4 ${
                      post.type === 'news' ? 'text-[#F78F1E]' : 'text-[#33B54A]'
                    }`} />
                    <span className='font-medium'>{post.dateText}</span>
                  </motion.div>

                  {/* Title */}
                  <button
                    onClick={() => router.push(post.href)}
                    className='text-left w-full'
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className={`mb-3 line-clamp-2 text-lg font-black leading-snug text-gray-900 transition-colors duration-300 md:text-xl ${
                        post.type === 'news' ? 'group-hover:text-[#F78F1E]' : 'group-hover:text-[#33B54A]'
                      }`}
                    >
                      {post.title}
                    </motion.h3>
                  </button>

                  {/* Excerpt */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                    className='mb-5 line-clamp-2 text-sm leading-relaxed text-gray-600 md:text-base'
                  >
                    {post.excerpt}
                  </motion.p>

                  {/* CTA Link */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.7 }}
                    className='mt-auto'
                  >
                    <button
                      onClick={() => router.push(post.href)}
                      className={`group/link inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-300 md:text-base md:font-black ${
                        post.type === 'news'
                          ? 'text-[#F78F1E] hover:text-[#33B54A]'
                          : 'text-[#33B54A] hover:text-[#F78F1E]'
                      }`}
                    >
                      <span>Xem chi tiết</span>
                      <ChevronRight className='size-4 transition-transform group-hover/link:translate-x-1' />
                    </button>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mt-12 flex justify-center md:mt-16'
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => router.push(tab === 'notice' ? '/notice' : '/news')}
              className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-base font-black text-white shadow-lg transition-all duration-300 hover:shadow-xl md:px-10 md:py-4 ${
                tab === 'news'
                  ? 'bg-[#F78F1E] hover:bg-[#E67E17] hover:shadow-[#F78F1E]/30'
                  : 'bg-[#33B54A] hover:bg-[#2EA043] hover:shadow-[#33B54A]/30'
              }`}
            >
              <span>Xem tất cả</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ChevronRight className='size-5' />
              </motion.div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
