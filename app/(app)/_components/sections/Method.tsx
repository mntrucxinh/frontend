'use client'

import React from 'react'
import Image from 'next/image'
import CurvedDashedLine from '@icons/curved-dashed-line.svg'
import WaveHeader from '@icons/wave-header.svg'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { METHODS } from '@/types/constants/methods'

export default function TeachingMethodsSection() {
  const router = useRouter()
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        type: 'tween',
      }}
      className='relative -mt-10 w-full overflow-hidden bg-white md:-mt-16'
    >
      {/* TOP wave */}
      <div className='absolute top-0 h-20 w-screen'>
        <WaveHeader className='block h-full w-screen' />
      </div>

      {/* CONTENT */}
      <div className='relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-20 md:pt-24'>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
            type: 'tween',
          }}
          className='relative mb-16 flex flex-col items-center justify-center gap-5'
        >
          {/* Title + decorative curve (curve stays on the right) */}
          <div className='flex items-center justify-center gap-4'>
            <h2 className='text-center text-4xl font-black md:text-6xl'>
              <span className='text-[#33B54A]'>Phương pháp </span>
              <span className='text-[#F78F1E]'>
                dạy học
              </span>
            </h2>
            <CurvedDashedLine className='hidden h-10 w-44 md:block' />
          </div>
          <p className='mt-4 max-w-2xl text-center text-lg text-gray-600'>
            Các chương trình giáo dục tiên tiến, được thiết kế đặc biệt để phát triển toàn diện cho
            trẻ mầm non
          </p>
        </motion.div>

        {/* Cards */}
        <div className='mt-8 flex flex-wrap items-stretch justify-center gap-8 md:gap-10'>
          {METHODS.map((m, index) => {
            const gradientClass =
              index === 0 || index === 2
                ? 'from-[#33B54A] to-[#2EA043]'
                : 'from-[#F78F1E] to-[#E67E00]'

            const isGreenCard = index === 0 || index === 2

            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                  delay: index * 0.08,
                  type: 'tween',
                }}
                className='flex w-full max-w-[300px] flex-1 justify-center gpu-accelerate'
              >
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 24,
                    mass: 0.9,
                  }}
                  className={`relative flex h-[400px] w-full flex-col items-center overflow-hidden rounded-[32px] bg-gradient-to-b ${gradientClass} px-8 pt-7 text-center text-white shadow-[0_18px_40px_rgba(0,0,0,0.22)]`}
                >
                  {/* Decorative circles */}
                  <div className='absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-2xl' />
                  <div className='absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-2xl' />

                  {/* Top label */}
                  <div className='relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-white/90'>
                    Chương trình học
                  </div>

                  {/* Title */}
                  <div className='relative z-10 mt-3 text-3xl font-black md:text-4xl'>
                    {m.name}
                  </div>

                  {/* Quote */}
                  <p className='relative z-10 mt-4 line-clamp-3 text-sm leading-relaxed text-white/95'>
                    {m.quote}
                  </p>

                  {/* Image with subtle floating animation */}
                  <div className='relative z-10 mt-4 flex w-full flex-1 items-center justify-center'>
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: index * 0.2,
                      }}
                      className='relative h-[180px] w-full max-w-[180px]'
                    >
                      <Image
                        src={m.img}
                        alt={m.name}
                        fill
                        className='object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.4)]'
                      />
                    </motion.div>
                  </div>

                  {/* Button - fixed at bottom, mặc định trắng, hover đảo màu theo nền card */}
                  <div className='relative z-10 w-full pb-6 pt-2'>
                    <motion.button
                      type='button'
                      onClick={() => router.push('/program')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 20,
                      }}
                      className={`w-full rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-wide shadow-sm transition-all duration-300 ease-out ${
                        isGreenCard
                          ? 'text-[#F78F1E] hover:bg-[#F78F1E] hover:text-white'
                          : 'text-[#33B54A] hover:bg-[#33B54A] hover:text-white'
                      }`}
                    >
                      Xem chi tiết
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* BOTTOM WAVES - Smooth transition to Schedule section */}
      <div className='pointer-events-none absolute inset-x-0 bottom-0 w-screen'>
        {/* Gradient overlay for seamless color blend */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#33B54A]/30 to-[#33B54A]' />
        
        {/* Back wave - subtle depth */}
        <svg
          viewBox='0 0 1440 120'
          preserveAspectRatio='none'
          className='block h-24 w-screen sm:h-28'
        >
          <motion.path
            d='M0,60 C80,20 160,20 240,60 C320,100 400,100 480,60 C560,20 640,20 720,60 C800,100 880,100 960,60 C1040,20 1120,20 1200,60 C1280,100 1360,100 1440,60 L1440,120 L0,120 Z'
            fill='#33B54A'
            fillOpacity='0.2'
            animate={{ x: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>

        {/* Main wave - smooth transition */}
        <svg
          viewBox='0 0 1440 120'
          preserveAspectRatio='none'
          className='-mt-12 block h-24 w-screen sm:h-28'
        >
          <motion.path
            d='M0,70 C90,30 180,30 270,70 C360,110 450,110 540,70 C630,30 720,30 810,70 C900,110 990,110 1080,70 C1170,30 1260,30 1350,70 C1400,92 1420,98 1440,100 L1440,120 L0,120 Z'
            fill='#33B54A'
            fillOpacity='0.5'
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </motion.section>
  )
}
