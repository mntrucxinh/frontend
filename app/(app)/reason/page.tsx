'use client'

import React from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

import { FEATURES, type Feature } from './data'

function FeatureRow({ item, reverse }: { item: Feature; reverse?: boolean }) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const reduceMotion = useReducedMotion()

  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  const fromX = reverse ? 60 : -60

  return (
    <motion.section
      ref={ref}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: fromX }}
      animate={isInView ? { opacity: 1, x: 0 } : undefined}
      // ✅ áp dụng transition bạn yêu cầu
      transition={{ type: 'tween', duration: 2, ease: 'easeInOut' }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-6'
    >
      <div className={cn('grid items-center gap-6 lg:gap-10', 'lg:grid-cols-12')}>
        {/* IMAGE */}
        <div className={cn('lg:col-span-5', reverse ? 'lg:order-2' : 'lg:order-1')}>
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    x: reverse ? 18 : -18,
                    scale: 0.99,
                  }
            }
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : undefined}
            transition={{ type: 'tween', duration: 2, ease: 'easeInOut', delay: 0.15 }}
            className='relative overflow-hidden rounded-lg ring-1 ring-gray-200'
          >
            <div className='relative aspect-[4/3] w-full bg-gray-100'>
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className='object-cover'
                sizes='(min-width: 1024px) 420px, 100vw'
                priority={item.id <= 2}
              />
            </div>

            <div className='absolute inset-x-3 bottom-3 rounded-xl bg-white/90 px-3 py-2 text-xs text-gray-700 backdrop-blur'>
              <span className='font-semibold'>#{String(item.id).padStart(2, '0')}</span> •{' '}
              {item.imageAlt}
            </div>
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className={cn('lg:col-span-7', reverse ? 'lg:order-1' : 'lg:order-2')}>
          <motion.div
            initial={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    x: reverse ? -90 : 90,
                  }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'tween', duration: 2, ease: 'easeInOut' }}
          >
            <div className='flex flex-wrap items-center gap-2'>
              <span className='inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200'>
                Điểm khác biệt {item.id}
              </span>
            </div>

            <h3 className='mt-3 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl'>
              {item.title}
            </h3>

            <p className='mt-3 text-sm leading-relaxed text-gray-600 sm:text-base'>{item.desc}</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default function ReasonPage() {
  return (
    <section className='min-h-screen bg-gray-50'>
      {/* TITLE */}
      <header>
        <div className='mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8'>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'tween', duration: 2, ease: 'easeInOut' }}
            className='mt-4 text-center text-3xl font-bold tracking-tight text-primary sm:text-4xl'
          >
            Những điều đặc biệt ở Trúc Xinh
          </motion.h1>
        </div>
      </header>

      {/* LIST */}
      <main className='mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8'>
        <div className='space-y-5'>
          {FEATURES.map((item, idx) => (
            <FeatureRow key={item.id} item={item} reverse={idx % 2 === 1} />
          ))}
        </div>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45, margin: '0px 0px -10% 0px' }}
          transition={{ type: 'tween', duration: 2, ease: 'easeInOut', delay: 0.15 }}
          className='mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm'
        >
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='min-w-0'>
              <h2 className='text-lg font-bold text-gray-900'>
                Muốn tham quan trường & nhận tư vấn?
              </h2>
              <p className='mt-1 text-sm text-gray-600'>
                Bạn có thể đặt lịch để xem trực tiếp phòng học, khu vui chơi, bếp ăn và hệ thống an
                toàn.
              </p>
            </div>

            <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
              <a
                href='#'
                className='inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.99]'
              >
                Đặt lịch tham quan
              </a>
              <a
                href='#'
                className='inline-flex items-center justify-center rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-200 transition hover:bg-gray-50 active:scale-[0.99]'
              >
                Nhận tư vấn tuyển sinh
              </a>
            </div>
          </div>
        </motion.section>
      </main>
    </section>
  )
}
