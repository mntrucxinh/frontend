'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, ChevronRight } from 'lucide-react'

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
  const [tab, setTab] = useState<'notice' | 'news'>('notice')

  // ✅ thay bằng data thật (API) sau
  const posts: Post[] = useMemo(
    () => [
      {
        id: '1',
        type: 'notice',
        title: 'Thông báo các khoản thu đầu năm học 2025-2026',
        excerpt:
          'Để chuẩn bị tốt cho năm học 2025-2026, nhà trường xin kính báo đến các bậc phụ huynh...',
        dateText: 'Thứ 5, 26/09/24 lúc 07:47',
        image: '/assets/images/notice-cover.jpg',
        href: '/thong-bao/1',
      },
      {
        id: '2',
        type: 'notice',
        title: 'Thông báo tuyển sinh năm học 2025-2026',
        excerpt:
          'Căn cứ kế hoạch phát triển Giáo dục năm học 2025-2026 của Phòng Giáo dục-Đào tạo...',
        dateText: 'Thứ 5, 26/09/24 lúc 07:11',
        image: '/assets/images/notice-cover.jpg',
        href: '/thong-bao/2',
      },
      {
        id: '3',
        type: 'news',
        title: 'Bí quyết giúp bé tự tin khi đến lớp',
        excerpt:
          'Một vài mẹo nhỏ giúp con thích nghi môi trường mới, kết nối bạn bè và vui học mỗi ngày...',
        dateText: 'Thứ 3, 10/10/24 lúc 09:20',
        image: '/assets/images/news-cover.jpg',
        href: '/tin-tuc/3',
      },
      {
        id: '4',
        type: 'news',
        title: 'Gợi ý thực đơn dinh dưỡng cho bé mầm non',
        excerpt:
          'Dinh dưỡng cân bằng là nền tảng để bé phát triển khỏe mạnh, vui vẻ và tràn đầy năng lượng...',
        dateText: 'Thứ 7, 12/10/24 lúc 08:05',
        image: '/assets/images/news-cover.jpg',
        href: '/tin-tuc/4',
      },
    ],
    []
  )

  const filtered = posts.filter((p) => p.type === tab)

  return (
    <motion.section
      id='notice'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      className='relative overflow-hidden bg-[#f4fbf7] py-16 md:py-24'
    >
      {/* Decorative: dotted line */}
      <div className='pointer-events-none absolute left-10 top-20 hidden opacity-60 md:block'>
        <svg width='240' height='90' viewBox='0 0 240 90' fill='none'>
          <path
            d='M12 48 C 44 24, 78 72, 112 48 C 146 24, 180 72, 228 48'
            stroke='#b7c7bf'
            strokeWidth='2'
            strokeDasharray='4 6'
            strokeLinecap='round'
          />
        </svg>
      </div>

      {/* Decorative giraffe corner (optional) */}
      <Image
        width={100}
        height={100}
        src='/assets/images/giraffe.png'
        alt=''
        className='pointer-events-none absolute -top-6 right-6 w-24 opacity-90'
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).style.display = 'none'
        }}
      />

      {/* Bottom clouds */}
      <div className='pointer-events-none absolute inset-x-0 bottom-0'>
        <svg viewBox='0 0 1440 140' className='h-[70px] w-full md:h-[90px]'>
          <path
            fill='#ffffff'
            d='M0,96L60,85.3C120,75,240,53,360,58.7C480,64,600,96,720,106.7C840,117,960,107,1080,96C1200,85,1320,75,1380,69.3L1440,64L1440,140L0,140Z'
          />
        </svg>
      </div>

      <div className='container relative z-10 mx-auto px-4'>
        {/* Header */}
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-4xl font-extrabold tracking-wide text-primary md:text-5xl'>
            Thông báo - Tin tức
          </h2>
          <p className='mt-3 text-slate-600'>
            Thông báo của nhà trường, tin tức tổng hợp về giáo dục, y tế học đường và các phương
            pháp nuôi dạy trẻ.
          </p>

          {/* Tabs */}
          <div className='mt-8 flex items-center justify-center gap-4'>
            <button
              type='button'
              onClick={() => setTab('notice')}
              className={`rounded-xl border px-8 py-3 font-bold transition ${
                tab === 'notice'
                  ? 'border-primary bg-primary text-white shadow-lg'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              } `}
            >
              Thông báo
            </button>

            <button
              type='button'
              onClick={() => setTab('news')}
              className={`rounded-xl border px-8 py-3 font-bold transition ${
                tab === 'news'
                  ? 'border-primary bg-primary text-white shadow-lg'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              } `}
            >
              Tin tức
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className='mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2'>
          <AnimatePresence mode='popLayout'>
            {filtered.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.25 }}
                className='group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl'
              >
                {/* image */}
                <div className='relative h-[240px] overflow-hidden bg-slate-100'>
                  <Image
                    width={100}
                    height={100}
                    src={post.image}
                    alt={post.title}
                    className='size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                  />
                  {/* subtle green overlay */}
                  <div className='absolute inset-0 bg-primary/10 opacity-0 transition group-hover:opacity-100' />
                </div>

                {/* content */}
                <div className='p-6'>
                  <div className='flex items-center gap-2 text-sm text-slate-500'>
                    <CalendarDays className='size-4' />
                    <span>Ngày đăng: {post.dateText}</span>
                  </div>

                  <h3 className='mt-3 line-clamp-2 text-xl font-extrabold leading-snug text-primary'>
                    {post.title}
                  </h3>

                  <p className='mt-3 line-clamp-2 leading-relaxed text-slate-600'>{post.excerpt}</p>

                  <div className='mt-5'>
                    <Link
                      href={post.href}
                      className='inline-flex items-center gap-2 font-semibold text-primary hover:opacity-90'
                    >
                      Xem chi tiết <ChevronRight className='size-4' />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Optional: View all */}
        <div className='mt-10 flex justify-center'>
          <Link
            href={tab === 'notice' ? '/thong-bao' : '/tin-tuc'}
            className='inline-flex items-center justify-center rounded-full border border-primary/30 bg-white px-8 py-3 font-bold text-primary shadow-sm transition hover:bg-primary/5'
          >
            Xem tất cả <ChevronRight className='ml-2 size-4' />
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
