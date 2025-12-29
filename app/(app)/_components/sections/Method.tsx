'use client'

import React from 'react'
import Image from 'next/image'
import { METHODS } from '@/constants/methods'
import CurvedDashedLine from '@icons/curved-dashed-line.svg'
import WaveHeader from '@icons/wave-header.svg'
import { motion } from 'framer-motion'

export default function TeachingMethodsSection() {
  return (
    <section>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='relative w-full overflow-hidden bg-white'
      >
        {/* TOP scallop (full width) */}
        <div className='absolute top-0 h-16 w-screen'>
          <WaveHeader className='block h-full w-screen' />
        </div>

        {/* CONTENT */}
        <div className='relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-20'>
          {/* Title */}
          <div className='relative mb-12 flex items-center justify-center gap-5'>
            <h2 className='text-3xl font-extrabold text-emerald-700 md:text-5xl'>
              Phương pháp dạy học
            </h2>

            <CurvedDashedLine className='h-16 w-40' />
          </div>

          {/* Cards */}
          <div className='grid grid-cols-1 place-items-center gap-10 sm:grid-cols-2 lg:grid-cols-4'>
            {METHODS.map((m, i) => (
              <motion.div
                key={m.name}
                className='flex w-full flex-col items-center text-center'
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.55,
                  ease: 'easeOut',
                  delay: i * 0.05,
                }}
              >
                <motion.div
                  className='w-[240px] rounded-[28px] border border-emerald-200 bg-white px-6 pb-5 pt-6 shadow-xl'
                  style={{ boxShadow: '0 14px 35px rgba(0,0,0,0.12)' }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3.4 + i * 0.25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? -0.5 : 0.5 }}
                >
                  {/* illustration */}
                  <div
                    className='mx-auto h-[140px] rounded-2xl bg-emerald-50 shadow-md ring-2'
                    style={{ borderColor: m.accent }}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={m.img}
                      alt={m.name}
                      className='size-full object-contain p-2'
                    />
                  </div>

                  {/* name */}
                  <div className='mt-4 text-2xl font-extrabold text-emerald-700'>{m.name}</div>

                  {/* quote */}
                  <p className='mt-2 whitespace-pre-line leading-snug text-gray-700'>{m.quote}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM WAVES (FULL WEB + ANIM) */}
        <div className='pointer-events-none absolute inset-x-0 bottom-0 w-screen'>
          {/* Back wave (light green) - subtle horizontal drift */}
          <svg
            viewBox='0 0 1440 120'
            preserveAspectRatio='none'
            className='block h-16 w-screen overflow-hidden sm:h-20'
          >
            <motion.path
              d='M0,60 C80,20 160,20 240,60 C320,100 400,100 480,60 C560,20 640,20 720,60 C800,100 880,100 960,60 C1040,20 1120,20 1200,60 C1280,100 1360,100 1440,60 L1440,120 L0,120 Z'
              fill='#A7F3D0'
              opacity='0.9'
              initial={{ scaleX: 1.03 }}
              animate={{ x: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>

          {/* Front wave (dark green) - opposite drift */}
          <svg
            viewBox='0 0 1440 120'
            preserveAspectRatio='none'
            className='-mt-10 block h-16 w-screen overflow-hidden sm:h-20'
          >
            <motion.path
              d='M0,70 C90,30 180,30 270,70 C360,110 450,110 540,70 C630,30 720,30 810,70 C900,110 990,110 1080,70 C1170,30 1260,30 1350,70 C1400,92 1420,98 1440,100 L1440,120 L0,120 Z'
              fill='#16A34A'
              initial={{ scaleX: 1.03 }}
              animate={{ x: [0, 18, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </motion.section>
    </section>
  )
}
