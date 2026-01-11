'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, X, Calendar } from 'lucide-react'

type VideoItem = {
  id: string
  title: string
  dateText: string
  thumbnail: string
  youtubeId: string
}

function VideoModal({
  open,
  onClose,
  youtubeId,
  title,
}: {
  open: boolean
  onClose: () => void
  youtubeId: string
  title: string
}) {
  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm'
        onClick={onClose}
        role='dialog'
        aria-modal='true'
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex items-center justify-between border-b bg-gradient-to-r from-[#33B54A]/5 to-[#F78F1E]/5 px-6 py-4'>
            <div className='line-clamp-1 text-lg font-black text-gray-900'>{title}</div>
            <motion.button
              type='button'
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className='flex size-10 items-center justify-center rounded-full transition-colors hover:bg-gray-200'
              aria-label='Close'
            >
              <X className='size-5' />
            </motion.button>
          </div>

          <div className='aspect-video w-full bg-black'>
            <iframe
              className='size-full'
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              title={title}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function FeaturedActivities() {
  const videos: VideoItem[] = useMemo(
    () => [
      {
        id: '1',
        title: 'Cùng bé khám phá Lễ hội Trăng Rằm',
        dateText: 'Thứ 3, 28/10/25 lúc 08:44',
        thumbnail: '/assets/images/ex1.jpg',
        youtubeId: 'jNPglNNlw88',
      },
      {
        id: '2',
        title: 'TRÚC XINH "NHỮNG NỐT NHẠC VUI"',
        dateText: 'Thứ 5, 11/09/25 lúc 14:05',
        thumbnail: '/assets/images/ex2.jpg',
        youtubeId: 'jNPglNNlw88',
      },
      {
        id: '3',
        title: 'Lễ khai giảng năm học mới 2025 - 2026',
        dateText: 'Thứ 2, 08/09/25 lúc 14:29',
        thumbnail: '/assets/images/ex3.jpg',
        youtubeId: 'jNPglNNlw88',
      },
      {
        id: '4',
        title: 'Bé vui ngày hội - Hoạt động trải nghiệm',
        dateText: 'Thứ 6, 15/11/25 lúc 09:10',
        thumbnail: '/assets/images/activities-23.jpg',
        youtubeId: 'jNPglNNlw88',
      },
      {
        id: '5',
        title: 'Một ngày ở Trúc Xinh: Chơi mà học',
        dateText: 'Thứ 7, 23/11/25 lúc 10:20',
        thumbnail: '/assets/images/activities-34.jpg',
        youtubeId: 'jNPglNNlw88',
      },
      {
        id: '6',
        title: 'Góc nghệ thuật: Sắc màu tuổi thơ',
        dateText: 'Chủ nhật, 01/12/25 lúc 16:00',
        thumbnail: '/assets/images/activities-45.jpg',
        youtubeId: 'jNPglNNlw88',
      },
    ],
    []
  )

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<VideoItem | null>(null)

  const onOpen = (v: VideoItem) => {
    setActive(v)
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
    setActive(null)
  }

  return (
    <>
      <motion.section
        id='featured'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
        }}
        className='relative overflow-hidden bg-gradient-to-b from-white via-[#E8F5E9]/30 to-white py-24 md:py-32'
      >
        {/* Subtle decorative background */}
        <div className='pointer-events-none absolute inset-0'>
          <motion.div
            className='absolute left-0 top-0 size-[500px] rounded-full bg-[#33B54A]/6 blur-3xl'
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className='absolute right-0 bottom-0 size-[500px] rounded-full bg-[#F78F1E]/6 blur-3xl'
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
              scale: [1, 1.3, 1],
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
              <span className='text-[#33B54A]'>Hoạt động </span>
              <span className='text-[#F78F1E]'>
                nổi bật
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='mt-5 text-lg leading-relaxed text-gray-600 md:text-xl'
            >
              Những khoảnh khắc hoạt động của bé, kỷ ức về tuổi thơ tại trường Trúc Xinh
            </motion.p>
          </motion.div>

          {/* Video Grid */}
          <div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <AnimatePresence mode='popLayout'>
              {videos.map((v, index) => (
                <motion.article
                  key={v.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className='group relative overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-gray-100/50 transition-all duration-300 hover:shadow-xl hover:ring-[#33B54A]/30 gpu-accelerate'
                >
                  {/* Thumbnail */}
                  <button
                    type='button'
                    onClick={() => onOpen(v)}
                    className='relative block h-[240px] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 md:h-[260px]'
                    aria-label={`Play ${v.title}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      className='relative size-full'
                    >
                      <Image
                        width={400}
                        height={260}
                        src={v.thumbnail}
                        alt={v.title}
                        className='size-full object-cover'
                      />
                    </motion.div>

                    {/* Gradient overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent' />

                    {/* Date badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className='absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800 backdrop-blur-md shadow-lg'
                    >
                      <Calendar className='size-3 text-[#33B54A]' />
                      <span>{v.dateText.split(' lúc')[0]}</span>
                    </motion.div>

                    {/* Play button */}
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex size-20 items-center justify-center rounded-full bg-white/95 shadow-2xl backdrop-blur-md transition-all group-hover:bg-white md:size-24'
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <Play className='ml-1 size-8 fill-[#33B54A] text-[#33B54A] md:size-10' />
                        </motion.div>
                      </motion.div>
                    </div>
                  </button>

                  {/* Content */}
                  <div className='p-5 md:p-6'>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className='line-clamp-2 text-base font-black leading-snug text-gray-900 transition-colors group-hover:text-[#33B54A] md:text-lg'
                    >
                      {v.title}
                    </motion.h3>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      <VideoModal
        open={open}
        onClose={onClose}
        youtubeId={active?.youtubeId ?? ''}
        title={active?.title ?? ''}
      />
    </>
  )
}
