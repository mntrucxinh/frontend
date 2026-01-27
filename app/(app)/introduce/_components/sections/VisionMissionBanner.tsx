'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function VisionMissionBanner() {
  return (
    <section className='relative min-h-[65vh] overflow-hidden py-20 md:py-32'>
      {/* Beautiful gradient background */}
      <div className='absolute inset-0 bg-white'>
        {/* Base gradient - more vibrant with stronger contrast */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='absolute inset-0 bg-gradient-to-br from-[#A8E6C1] via-white to-[#FFD699]'
        />

        {/* Radial gradients for depth - more visible with stronger contrast */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='absolute left-0 top-0 size-[800px] rounded-full bg-gradient-to-br from-[#33B54A]/50 via-[#33B54A]/20 to-transparent blur-3xl'
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='absolute bottom-0 right-0 size-[700px] rounded-full bg-gradient-to-tl from-[#F78F1E]/50 via-[#F78F1E]/20 to-transparent blur-3xl'
        />

        {/* Animated floating orbs - more vibrant with stronger contrast */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.3 },
            x: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          }}
          className='absolute left-[10%] top-[20%] size-[400px] rounded-full bg-gradient-to-br from-[#33B54A]/40 to-transparent blur-3xl'
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.3 },
            x: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
          }}
          className='absolute bottom-1/4 right-[15%] size-[350px] rounded-full bg-gradient-to-tl from-[#F78F1E]/40 to-transparent blur-3xl'
        />

        {/* Additional accent colors - stronger contrast */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#33B54A]/20 via-transparent to-[#F78F1E]/20 blur-3xl'
        />
      </div>

      <div className='container relative z-10 mx-auto px-4'>
        <div className='relative flex min-h-[50vh] items-start justify-between gap-4 pt-12 md:gap-8 md:pt-16 lg:min-h-[60vh]'>
          {/* Left side - Vision (facing right) */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -3 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className='relative min-w-0 flex-1 origin-center'
          >
            {/* Energy aura from Vision */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className='absolute right-0 top-1/2 size-32 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#33B54A]/30 to-transparent blur-2xl'
            />
            {/* Large number badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className='absolute -left-8 top-8 z-0 hidden min-[1450px]:block'
            >
              <div className='flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-[#33B54A] to-[#2EA043] text-4xl font-black text-white shadow-2xl ring-8 ring-white'>
                01
              </div>
            </motion.div>

            <div className='relative z-10 space-y-4 pl-0 lg:pl-20'>
              {/* Large title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className='text-[clamp(28px,4vw,64px)] font-black leading-[1.05] tracking-tight text-[#33B54A]'
              >
                TẦM
                <br />
                <span className='text-gray-900'>NHÌN</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className='max-w-md text-[clamp(13px,1.2vw,18px)] leading-relaxed text-gray-700'
              >
                Định hướng phát triển dài hạn, xây dựng môi trường giáo dục chất lượng cao, nơi mỗi
                trẻ em đều có cơ hội phát triển toàn diện.
              </motion.p>
            </div>
          </motion.div>

          {/* Center - VS Badge with confrontation effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className='relative z-20 shrink-0 px-2 md:px-4'
          >
            {/* Energy lines from left (Vision) */}
            <div className='absolute right-full top-1/2 -translate-y-1/2 pr-4'>
              <motion.div
                animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className='h-1 w-16 bg-gradient-to-r from-transparent via-[#33B54A] to-[#33B54A]'
              />
              <motion.div
                animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className='mt-2 h-1 w-12 bg-gradient-to-r from-transparent via-[#33B54A] to-[#33B54A]'
              />
            </div>

            {/* Energy lines from right (Mission) */}
            <div className='absolute left-full top-1/2 -translate-y-1/2 pl-4'>
              <motion.div
                animate={{ x: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className='h-1 w-16 bg-gradient-to-l from-transparent via-[#F78F1E] to-[#F78F1E]'
              />
              <motion.div
                animate={{ x: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className='mt-2 h-1 w-12 bg-gradient-to-l from-transparent via-[#F78F1E] to-[#F78F1E]'
              />
            </div>

            {/* Energy collision effect in center */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className='absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#33B54A]/20 via-white/50 to-[#F78F1E]/20 blur-2xl'
            />

            <div className='relative flex items-center justify-center'>
              {/* Main text - V green, S orange */}
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className='text-[clamp(24px,3.5vw,64px)] font-black tracking-tight drop-shadow-lg'
              >
                <span className='text-[#33B54A]'>V</span>
                <span className='text-[#F78F1E]'>S</span>
              </motion.span>
            </div>
          </motion.div>

          {/* Right side - Mission (facing left) */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 3 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className='relative min-w-0 flex-1 origin-center'
          >
            {/* Energy aura from Mission */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className='absolute left-0 top-1/2 size-32 -translate-y-1/2 rounded-full bg-gradient-to-l from-[#F78F1E]/30 to-transparent blur-2xl'
            />
            {/* Large number badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              className='absolute -right-8 top-8 z-0 hidden min-[1450px]:block'
            >
              <div className='flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-[#F78F1E] to-[#E67E17] text-4xl font-black text-white shadow-2xl ring-8 ring-white'>
                02
              </div>
            </motion.div>

            <div className='relative z-10 space-y-4 pr-0 text-right lg:pr-20'>
              {/* Large title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className='text-[clamp(28px,4vw,64px)] font-black leading-[1.05] tracking-tight text-[#F78F1E]'
              >
                SỨ
                <br />
                <span className='text-gray-900'>MỆNH</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className='ml-auto max-w-md text-[clamp(13px,1.2vw,18px)] leading-relaxed text-gray-700'
              >
                Cam kết mang đến chương trình giáo dục toàn diện, phát triển kỹ năng sống, tư duy
                sáng tạo và nhân cách cho thế hệ tương lai.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave - arc shape (curved down) */}
      <div className='pointer-events-none absolute inset-x-0 bottom-0'>
        <svg viewBox='0 0 1440 200' className='h-32 w-full md:h-40' preserveAspectRatio='none'>
          <path fill='#ffffff' d='M0,0 Q720,150 1440,0 L1440,200 L0,200 Z' />
        </svg>
      </div>
    </section>
  )
}
