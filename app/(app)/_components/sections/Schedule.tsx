'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock } from 'lucide-react'

type AgeKey = '18-30' | '3-4' | '4-5' | '5-6'

type Program = {
  key: AgeKey
  label: string
  badge: string
  img: string
  activities: string[]
  schedule: { time: string; text: string }[]
}

export default function ActivitiesAtSchool() {
  const programs: Program[] = useMemo(
    () => [
      {
        key: '18-30',
        label: '18-30 tháng',
        badge: 'Lớp Bee (18-30 tháng)',
        img: '/assets/images/activities-23.jpg',
        activities: [
          'Lễ giáo',
          'Chương trình mầm non',
          'STEAM',
          'Kỹ năng sống',
          'Hoạt động góc',
          'Chơi ngoài trời',
          'Phòng chơi trí tuệ',
          'Sinh hoạt vòng tròn',
        ],
        schedule: [
          { time: '06h15–08h00', text: 'Đón trẻ, ăn sáng, thể dục sáng' },
          { time: '08h00–08h30', text: 'Uống sữa' },
          { time: '08h30–09h00', text: 'Hoạt động học sáng: Chương trình mầm non, STEAM, kỹ năng' },
          { time: '09h00–09h20', text: 'Chuyển tiếp, uống nước trái cây, vệ sinh' },
          { time: '09h20–10h00', text: 'Hoạt động góc, chơi ngoài trời, phòng chơi trí tuệ đa năng' },
          { time: '10h00–10h15', text: 'Vệ sinh, chuẩn bị ăn trưa' },
          { time: '10h15–11h15', text: 'Ăn trưa, vệ sinh' },
          { time: '11h15–14h00', text: 'Ngủ trưa' },
          { time: '14h00–15h15', text: 'Vệ sinh, ăn xế, uống sữa' },
          { time: '15h15–16h00', text: 'Sinh hoạt vòng tròn' },
          { time: '16h00–17h30', text: 'Chơi tự do, ăn tối, trả trẻ' },
        ],
      },
      {
        key: '3-4',
        label: '3-4 tuổi',
        badge: 'Lớp Mouse (3-4 tuổi)',
        img: '/assets/images/activities-34.jpg',
        activities: [
          'Lễ giáo',
          'Chương trình mầm non',
          'STEAM',
          'Học năng khiếu',
          'Hoạt động kỹ năng',
          'Hoạt động góc',
          'Chơi ngoài trời',
          'Phòng chơi trí tuệ',
          'Sinh hoạt vòng tròn',
        ],
        schedule: [
          { time: '06h15–08h00', text: 'Đón trẻ, ăn sáng, thể dục sáng' },
          { time: '08h00–08h15', text: 'Uống sữa' },
          { time: '08h15–09h00', text: 'Hoạt động học sáng: Chương trình mầm non, STEAM, năng khiếu, kỹ năng' },
          { time: '09h00–09h10', text: 'Chuyển tiếp, uống nước trái cây, vệ sinh' },
          { time: '09h10–10h20', text: 'Hoạt động góc, chơi ngoài trời, phòng chơi trí tuệ đa năng' },
          { time: '10h20–10h30', text: 'Vệ sinh, chuẩn bị ăn trưa' },
          { time: '10h30–11h30', text: 'Ăn trưa, vệ sinh' },
          { time: '11h30–14h00', text: 'Ngủ trưa' },
          { time: '14h00–15h15', text: 'Vệ sinh, ăn xế, uống sữa' },
          { time: '15h15–16h00', text: 'Sinh hoạt vòng tròn' },
          { time: '16h00–17h30', text: 'Chơi tự do, ăn tối, trả trẻ' },
        ],
      },
      {
        key: '4-5',
        label: '4-5 tuổi',
        badge: 'Lớp Bear (4-5 tuổi)',
        img: '/assets/images/activities-45.jpg',
        activities: [
          'Lễ giáo',
          'Chương trình mầm non',
          'STEAM',
          'Học năng khiếu',
          'Hoạt động kỹ năng',
          'Hoạt động góc',
          'Chơi ngoài trời',
          'Phòng chơi trí tuệ',
          'Học Toán',
          'Làm quen chữ cái',
        ],
        schedule: [
          { time: '06h15–08h00', text: 'Đón trẻ, ăn sáng, thể dục sáng' },
          { time: '08h00–08h15', text: 'Uống sữa' },
          { time: '08h15–09h00', text: 'Hoạt động học sáng: Chương trình mầm non, STEAM, năng khiếu, kỹ năng' },
          { time: '09h00–09h10', text: 'Chuyển tiếp, uống nước trái cây, vệ sinh' },
          { time: '09h10–10h20', text: 'Hoạt động góc, chơi ngoài trời, phòng chơi trí tuệ đa năng' },
          { time: '10h20–10h30', text: 'Vệ sinh, chuẩn bị ăn trưa' },
          { time: '10h30–11h30', text: 'Ăn trưa, vệ sinh' },
          { time: '11h30–14h00', text: 'Ngủ trưa' },
          { time: '14h00–15h00', text: 'Vệ sinh, ăn xế, uống sữa' },
          { time: '15h00–16h00', text: 'Ôn chương trình mầm non và Toán, làm quen chữ cái' },
          { time: '16h00–17h30', text: 'Chơi tự do, ăn tối, trả trẻ' },
        ],
      },
      {
        key: '5-6',
        label: '5-6 tuổi',
        badge: 'Lớp Dolphin (5-6 tuổi)',
        img: '/assets/images/activities-56.jpg',
        activities: [
          'Lễ giáo',
          'STEAM',
          'Học năng khiếu',
          'Kỹ năng sống',
          'Học Toán',
          'Làm quen chữ cái',
          'Hoạt động góc',
          'Chơi ngoài trời',
        ],
        schedule: [
          { time: '06h15–08h00', text: 'Đón trẻ, ăn sáng, thể dục sáng' },
          { time: '08h00–08h15', text: 'Uống sữa' },
          { time: '08h15–09h00', text: 'Hoạt động học sáng: STEAM, năng khiếu, kỹ năng' },
          { time: '09h00–09h10', text: 'Chuyển tiếp, uống nước trái cây, vệ sinh' },
          { time: '09h10–10h20', text: 'Học Toán, làm quen chữ cái' },
          { time: '10h20–10h30', text: 'Vệ sinh, chuẩn bị ăn trưa' },
          { time: '10h30–11h30', text: 'Ăn trưa, vệ sinh' },
          { time: '11h30–14h00', text: 'Ngủ trưa' },
          { time: '14h00–15h00', text: 'Vệ sinh, ăn xế, uống sữa' },
          { time: '15h00–16h00', text: 'Học Toán, làm quen chữ cái' },
          { time: '16h00–17h30', text: 'Chơi tự do, ăn tối, trả trẻ' },
        ],
      },
    ],
    []
  )

  const [activeKey, setActiveKey] = useState<AgeKey>('3-4')
  const current = programs.find((p) => p.key === activeKey) ?? programs[0]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      }}
      className='relative -mt-12 overflow-hidden bg-gradient-to-b from-[#33B54A] via-[#2EA043] to-[#33B54A] py-20 text-white md:-mt-20 md:pt-24 md:pb-28'
    >
      {/* Smooth top wave - continues seamlessly from Method section */}
      <div className='pointer-events-none absolute inset-x-0 -top-12 h-32 w-screen sm:-top-14 sm:h-36 md:-top-20 md:h-40'>
        {/* Multi-layer gradient overlay for seamless blend - eliminates hard edge */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#33B54A]/50 to-[#33B54A]' />
        <div className='absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-60' />
        
        {/* Main wave - starts from very top to eliminate hard line */}
        <svg viewBox='0 0 1440 160' className='absolute top-0 size-full' preserveAspectRatio='none'>
          <defs>
            <linearGradient id='waveGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
              <stop offset='0%' stopColor='#33B54A' stopOpacity='0' />
              <stop offset='30%' stopColor='#33B54A' stopOpacity='0.3' />
              <stop offset='70%' stopColor='#33B54A' stopOpacity='0.7' />
              <stop offset='100%' stopColor='#33B54A' stopOpacity='1' />
            </linearGradient>
          </defs>
          <motion.path
            fill='url(#waveGradient)'
            d='M0,120 C90,80 180,80 270,120 C360,160 450,160 540,120 C630,80 720,80 810,120 C900,160 990,160 1080,120 C1170,80 1260,80 1350,120 C1400,140 1420,150 1440,160 L1440,160 L0,160 L0,0 Z'
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* Subtle back wave for depth */}
        <svg viewBox='0 0 1440 160' className='absolute top-0 size-full' preserveAspectRatio='none'>
          <motion.path
            fill='#33B54A'
            fillOpacity='0.25'
            d='M0,110 C80,70 160,70 240,110 C320,150 400,150 480,110 C560,70 640,70 720,110 C800,150 880,150 960,110 C1040,70 1120,70 1200,110 C1280,150 1360,150 1440,110 L1440,160 L0,160 L0,0 Z'
            animate={{ x: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Subtle background */}
      <div className='pointer-events-none absolute inset-0'>
        <motion.div
          className='absolute right-[5%] top-[10%] size-[400px] rounded-full bg-white/6 blur-3xl'
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute bottom-[10%] left-[5%] size-[400px] rounded-full bg-[#F78F1E]/8 blur-3xl'
          animate={{
            scale: [1, 1.25, 1],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className='container relative z-10 mx-auto px-4'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
          }}
          className='mx-auto mb-14 max-w-3xl text-center'
        >
          <h2 className='mb-5 text-4xl font-black tracking-tight md:text-6xl'>
            Hoạt động của bé tại trường
          </h2>
          <p className='text-lg text-white/90 md:text-xl'>
            Các hoạt động, giờ giấc đa dạng, phù hợp với độ tuổi và bám sát theo sự phát triển toàn
            diện của trẻ.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='mb-12 flex flex-wrap items-center justify-center gap-3'
        >
          {programs.map((p, index) => {
            const isActive = p.key === activeKey
            return (
              <motion.button
                key={p.key}
                type='button'
                onClick={() => setActiveKey(p.key)}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  delay: 0.3 + index * 0.08,
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                }}
                className={`relative overflow-hidden rounded-full border-2 px-7 py-3 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'border-white bg-white text-[#33B54A] shadow-lg'
                    : 'border-white/50 bg-white/5 text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/10'
                }`}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.div
                    layoutId='activeTabSchedule'
                    className='absolute inset-0 bg-white'
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className='relative z-10'>{p.label}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Main Card */}
        <div className='mx-auto max-w-6xl'>
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
            className='overflow-hidden rounded-3xl bg-white text-gray-900 shadow-2xl ring-1 ring-gray-100 gpu-accelerate md:rounded-[40px]'
          >
            {/* Image Section - Top */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className='relative h-[320px] overflow-hidden bg-gradient-to-br from-[#33B54A]/10 to-[#F78F1E]/10 md:h-[420px]'
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, scale: 1.15, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className='absolute inset-0'
                >
                  <Image
                    src={current.img}
                    alt={current.badge}
                    fill
                    className='object-cover'
                    priority
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent' />
                </motion.div>
              </AnimatePresence>

              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
                className='absolute left-8 top-8 z-10'
              >
                <motion.span
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  className='inline-flex items-center rounded-full bg-[#F78F1E] px-7 py-3 text-sm font-bold text-white shadow-xl'
                >
                  {current.badge}
                </motion.span>
              </motion.div>

              {/* Decorative wave */}
              <div className='absolute inset-x-0 bottom-0'>
                <svg viewBox='0 0 1440 120' className='h-16 w-full' preserveAspectRatio='none'>
                  <motion.path
                    fill='#ffffff'
                    d='M0,96L60,85.3C120,75,240,53,360,58.7C480,64,600,96,720,106.7C840,117,960,107,1080,96C1200,85,1320,75,1380,69.3L1440,64L1440,120L0,120Z'
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Content Section - Bottom */}
            <div className='px-8 pb-12 pt-10 sm:px-12'>
              <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
                {/* Activities */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className='rounded-2xl bg-gradient-to-br from-[#F78F1E]/10 to-[#33B54A]/10 p-8 ring-1 ring-[#F78F1E]/15'
                >
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className='mb-8 flex items-center gap-3 text-2xl font-bold text-[#F78F1E] min-h-[32px]'
                  >
                    <motion.span
                      className='h-1.5 w-12 rounded-full bg-[#33B54A] shrink-0'
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    />
                    Hoạt động
                  </motion.h3>
                  <ul className='space-y-2.5'>
                    {current.activities.map((it, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                        whileHover={{ x: 4 }}
                        className='group flex items-start gap-3'
                      >
                        <motion.span
                          className='mt-1.5 size-2 shrink-0 rounded-full bg-[#33B54A]'
                          whileHover={{ scale: 1.4 }}
                        />
                        <span className='text-sm leading-relaxed text-gray-700 transition-colors group-hover:text-gray-900 md:text-base'>
                          {it}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Schedule */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className='rounded-2xl bg-gradient-to-br from-[#33B54A]/10 to-[#F78F1E]/10 p-8 ring-1 ring-[#33B54A]/15'
                >
                  <motion.h3
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className='mb-8 flex items-center gap-3 text-2xl font-bold text-[#33B54A] min-h-[32px]'
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className='shrink-0'
                    >
                      <Clock className='size-6 text-[#F78F1E]' />
                    </motion.div>
                    Thời gian biểu
                  </motion.h3>
                  <ul className='space-y-2.5'>
                    {current.schedule.map((it, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                        whileHover={{ x: -4 }}
                        className='group flex gap-3'
                      >
                        <motion.span
                          className='mt-1.5 size-2 shrink-0 rounded-full bg-[#F78F1E]'
                          whileHover={{ scale: 1.4 }}
                        />
                        <div className='text-sm leading-relaxed text-gray-700 md:text-base'>
                          <span className='font-bold text-gray-900'>{it.time}:</span>{' '}
                          <span className='transition-colors group-hover:text-gray-900'>
                            {it.text}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className='pointer-events-none absolute inset-x-0 bottom-0'>
        <svg viewBox='0 0 1440 120' className='h-24 w-full' preserveAspectRatio='none'>
          <motion.path
            fill='#ffffff'
            d='M0,96L60,85.3C120,75,240,53,360,58.7C480,64,600,96,720,106.7C840,117,960,107,1080,96C1200,85,1320,75,1380,69.3L1440,64L1440,120L0,120Z'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </motion.section>
  )
}
