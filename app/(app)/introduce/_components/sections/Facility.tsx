'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Facility() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className='relative overflow-hidden bg-gradient-to-b from-[#FFF3E0] via-white to-[#E8F5E9] py-24 md:py-32'
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
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 20,
            delay: 0.1,
          }}
          className='mb-12 text-center text-4xl font-black tracking-tight md:text-6xl'
        >
          <span className='text-[#33B54A]'>Cơ sở vật chất </span>
          <span className='text-[#F78F1E]'>& trang thiết bị</span>
        </motion.h2>

        {/* Text introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: 0.2,
          }}
          className='mx-auto mb-12 max-w-4xl text-center'
        >
          <p className='text-justify text-base leading-relaxed text-gray-700 md:text-lg'>
            Trường Mầm non Trúc Xinh được đầu tư{' '}
            <span className='font-bold text-[#F78F1E]'>cơ sở vật chất hiện đại</span>, đầy đủ trang
            thiết bị phục vụ tốt cho việc chăm sóc và giáo dục trẻ. Hệ thống{' '}
            <span className='font-bold text-[#F78F1E]'>phòng học</span>,{' '}
            <span className='font-bold text-[#F78F1E]'>phòng chức năng</span>,{' '}
            <span className='font-bold text-[#F78F1E]'>sân chơi</span> và các khu vực khác được
            thiết kế an toàn, thân thiện, tạo môi trường học tập lý tưởng cho trẻ phát triển toàn
            diện.
          </p>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: 0.3,
          }}
          className='mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4'
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: 0.2 + i * 0.05,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className='group relative h-48 overflow-hidden rounded-2xl shadow-xl ring-2 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl md:h-56'
            >
              <Image
                src={`/assets/images/campus-${i}.jpg`}
                alt={`Cơ sở vật chất ${i}`}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

