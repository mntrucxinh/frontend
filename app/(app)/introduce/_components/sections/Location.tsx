'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { MapPin, Building2, Users } from 'lucide-react'

export default function Location() {
  const router = useRouter()
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className='relative overflow-hidden bg-white pt-12 pb-24 md:pt-16 md:pb-32'
    >

      {/* Subtle decorative elements */}
      <div className='pointer-events-none absolute inset-0'>
        <motion.div
          className='absolute left-0 top-20 size-96 rounded-full bg-[#33B54A]/6 blur-3xl'
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
          className='absolute right-0 bottom-20 size-96 rounded-full bg-[#F78F1E]/6 blur-3xl'
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
          className='mb-16 text-center text-4xl font-black tracking-tight md:text-6xl'
        >
          <span className='text-[#33B54A]'>Vị trí </span>
          <span className='text-[#F78F1E]'>& khuôn viên trường</span>
        </motion.h2>

        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center'>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: 0.2,
            }}
            className='flex flex-col justify-center space-y-6'
          >
            <div className='flex items-center gap-3'>
              <div className='flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#33B54A] to-[#2EA043] shadow-lg'>
                <MapPin className='size-6 text-white' />
              </div>
              <div className='h-1 flex-1 rounded-full bg-gradient-to-r from-[#33B54A]/30 via-[#F78F1E]/30 to-transparent' />
            </div>

            <p className='text-justify text-base leading-relaxed text-gray-700 md:text-lg'>
              Trường Mầm non Trúc Xinh tọa lạc tại{' '}
              <span className='font-bold text-[#F78F1E]'>khu dân cư</span>, với không gian{' '}
              <span className='font-bold text-[#F78F1E]'>thoáng mát, yên tĩnh</span>, tạo môi trường
              học tập lý tưởng cho trẻ. Vị trí{' '}
              <span className='font-bold text-[#F78F1E]'>thuận tiện</span> giúp phụ huynh dễ dàng đưa đón mỗi ngày, đồng thời tăng cường sự kết nối và phối hợp chặt chẽ giữa gia đình và nhà trường trong quá trình chăm sóc, giáo dục.
            </p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: 0.4,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/contact')}
              className='rounded-full bg-[#33B54A] px-8 py-3.5 text-base font-black text-white shadow-lg transition-all duration-300 hover:bg-[#F78F1E] hover:shadow-xl'
            >
              Tìm hiểu thêm
            </motion.button>
          </motion.div>

          {/* Image Gallery - Artistic Layout */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: 0.3,
            }}
            className='grid grid-cols-3 gap-3 md:gap-4'
          >
            {/* Small image - top left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: 0.2,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className='group relative h-32 overflow-hidden rounded-2xl shadow-xl ring-2 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl md:h-40'
            >
              <Image
                src='/assets/images/campus-1.jpg'
                alt='Khuôn viên trường 1'
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </motion.div>

            {/* Large image - top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: 0.3,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className='group relative col-span-2 row-span-2 h-64 overflow-hidden rounded-2xl shadow-xl ring-2 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl md:h-80'
            >
              <Image
                src='/assets/images/campus-2.jpg'
                alt='Khuôn viên trường 2'
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </motion.div>

            {/* Medium image - bottom left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: 0.4,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className='group relative col-span-1 row-span-2 h-64 overflow-hidden rounded-2xl shadow-xl ring-2 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl md:h-80'
            >
              <Image
                src='/assets/images/campus-3.jpg'
                alt='Khuôn viên trường 3'
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </motion.div>

            {/* Small image - bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: 0.5,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className='group relative col-span-2 h-32 overflow-hidden rounded-2xl shadow-xl ring-2 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl md:h-40'
            >
              <Image
                src='/assets/images/campus-4.jpg'
                alt='Khuôn viên trường 4'
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </motion.div>
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

