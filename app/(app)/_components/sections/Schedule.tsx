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
        schedule: [
          { time: '06h15–08h00', text: 'Đón trẻ, ăn sáng, thể dục sáng' },
          { time: '08h00–08h30', text: 'Uống sữa' },
          { time: '08h30–09h00', text: 'Hoạt động học sáng: Chương trình mầm non, STEAM, kỹ năng' },
          { time: '09h00–09h20', text: 'Chuyển tiếp, uống nước trái cây, vệ sinh' },
          {
            time: '09h20–10h00',
            text: 'Hoạt động góc, chơi ngoài trời, phòng chơi trí tuệ đa năng',
          },
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
        schedule: [
          { time: '06h15–08h00', text: 'Đón trẻ, ăn sáng, thể dục sáng' },
          { time: '08h00–08h15', text: 'Uống sữa' },
          {
            time: '08h15–09h00',
            text: 'Hoạt động học sáng: Chương trình mầm non, STEAM, năng khiếu, kỹ năng',
          },
          { time: '09h00–09h10', text: 'Chuyển tiếp, uống nước trái cây, vệ sinh' },
          {
            time: '09h10–10h20',
            text: 'Hoạt động góc, chơi ngoài trời, phòng chơi trí tuệ đa năng',
          },
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
        schedule: [
          { time: '06h15–08h00', text: 'Đón trẻ, ăn sáng, thể dục sáng' },
          { time: '08h00–08h15', text: 'Uống sữa' },
          {
            time: '08h15–09h00',
            text: 'Hoạt động học sáng: Chương trình mầm non, STEAM, năng khiếu, kỹ năng',
          },
          { time: '09h00–09h10', text: 'Chuyển tiếp, uống nước trái cây, vệ sinh' },
          {
            time: '09h10–10h20',
            text: 'Hoạt động góc, chơi ngoài trời, phòng chơi trí tuệ đa năng',
          },
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
      className='relative -mt-12 overflow-hidden bg-gradient-to-b from-[#33B54A] via-[#2EA043] to-[#33B54A] py-16 text-white md:-mt-20 md:py-20'
    >
      {/* Smooth top wave - continues seamlessly from CoreValues section */}
      <div className='pointer-events-none absolute inset-x-0 -top-12 h-32 w-screen sm:-top-14 sm:h-36 md:-top-20 md:h-40'>
        {/* Background fill to cover the wave area */}
        <div className='absolute inset-0 bg-[#33B54A]' />

        {/* Main wave - matches CoreValues bottom wave path */}
        <svg viewBox='0 0 1440 160' className='absolute top-0 size-full' preserveAspectRatio='none'>
          <motion.path
            fill='#33B54A'
            d='M0,120 C90,80 180,80 270,120 C360,160 450,160 540,120 C630,80 720,80 810,120 C900,160 990,160 1080,120 C1170,80 1260,80 1350,120 C1400,140 1420,150 1440,160 L1440,160 L0,160 L0,0 Z'
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* Subtle back wave for depth */}
        <svg viewBox='0 0 1440 160' className='absolute top-0 size-full' preserveAspectRatio='none'>
          <motion.path
            fill='#33B54A'
            fillOpacity='0.3'
            d='M0,110 C80,70 160,70 240,110 C320,150 400,150 480,110 C560,70 640,70 720,110 C800,150 880,150 960,110 C1040,70 1120,70 1200,110 C1280,150 1360,150 1440,110 L1440,160 L0,160 L0,0 Z'
            animate={{ x: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Subtle background */}
      <div className='pointer-events-none absolute inset-0'>
        <motion.div
          className='bg-white/6 absolute right-[5%] top-[10%] size-[400px] rounded-full blur-3xl'
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
          className='bg-[#F78F1E]/8 absolute bottom-[10%] left-[5%] size-[400px] rounded-full blur-3xl'
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
          className='mx-auto mb-10 max-w-3xl text-center md:mb-12'
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
          className='mb-8 flex flex-wrap items-center justify-center gap-3 md:mb-10'
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
                className={`relative overflow-hidden rounded-full border-2 px-7 py-3 text-sm font-semibold transition-all duration-300 min-w-[140px] ${
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
        <div className='mx-auto max-w-5xl'>
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
            className='gpu-accelerate overflow-hidden rounded-3xl bg-white text-gray-900 shadow-2xl ring-1 ring-gray-100 md:rounded-[40px]'
          >
            {/* Image Section - Top */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className='relative h-[240px] overflow-hidden bg-gradient-to-br from-[#33B54A]/10 to-[#F78F1E]/10 md:h-[320px]'
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
            <div className='px-6 py-8 sm:px-10 md:py-10'>
              {/* Schedule */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className='rounded-3xl bg-white p-4 shadow-xl ring-1 ring-gray-100 sm:p-6 md:p-8'
              >
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className='mb-6 flex items-center justify-center gap-3 text-xl font-black text-gray-900 md:mb-8 md:text-2xl'
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className='flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#33B54A] to-[#2EA043] shadow-lg'
                  >
                    <Clock className='size-5 text-white' />
                  </motion.div>
                  <span className='bg-gradient-to-r from-[#33B54A] to-[#2EA043] bg-clip-text text-transparent'>
                    Thời gian biểu
                  </span>
                </motion.h3>

                {/* Timeline Container */}
                <div className='relative'>
                  {/* Vertical timeline line - alternating colors */}
                  <div className='absolute left-[13px] top-0 z-0 hidden h-full w-0.5 bg-[#33B54A] md:left-[27px] md:block' />

                  <ul className='space-y-3 md:space-y-4'>
                    {current.schedule.map((it, i) => {
                      const isEven = i % 2 === 0
                      const badgeColor = isEven ? 'bg-[#33B54A]' : 'bg-[#F78F1E]'
                      
                      return (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
                          className='group relative'
                        >
                          <div className='relative flex gap-4 md:gap-6'>
                            {/* Timeline dot */}
                            <div className='relative z-10 flex w-7 shrink-0 flex-col items-center md:w-14'>
                              <motion.div
                                whileHover={{ scale: 1.2 }}
                                className='relative z-20 flex size-3.5 items-center justify-center rounded-full bg-white shadow-lg ring-3 ring-white md:size-4'
                              >
                                <div className='size-1.5 rounded-full bg-[#F78F1E] md:size-2' />
                              </motion.div>
                              {/* Connector line for mobile */}
                              <div className='absolute left-1/2 top-3.5 z-0 h-full w-0.5 -translate-x-1/2 bg-[#F78F1E] opacity-30 md:hidden' />
                            </div>

                            {/* Content Card */}
                            <div className={`flex-1 rounded-xl bg-gradient-to-br from-gray-50 to-white p-3 shadow-md ring-1 ring-gray-100 transition-all duration-300 group-hover:shadow-lg sm:p-4 md:rounded-2xl md:p-4 ${isEven ? 'group-hover:ring-[#33B54A]/20' : 'group-hover:ring-[#F78F1E]/20'}`}>
                              <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4'>
                                {/* Time Badge */}
                                <div className='shrink-0'>
                                  <div className={`inline-flex items-center gap-1.5 rounded-full ${badgeColor} px-3 py-1.5 shadow-sm md:gap-2 md:px-4 md:py-2`}>
                                    <Clock className='size-3 text-white md:size-3.5' />
                                    <span className='font-bold tabular-nums text-xs text-white md:text-sm'>
                                      {it.time}
                                    </span>
                                  </div>
                                </div>

                                {/* Activity Text */}
                                <div className='flex-1'>
                                  <p className='text-sm leading-relaxed text-gray-700 transition-colors group-hover:text-gray-900 md:text-base'>
                                    {it.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      )
                    })}
                  </ul>
                </div>
              </motion.div>
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
