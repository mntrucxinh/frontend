'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Users, Heart, Sparkles, Shield } from 'lucide-react'

export default function StaffTeam() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className='relative overflow-hidden bg-gradient-to-b from-[#E8F5E9] via-white to-[#FFF3E0] py-24 md:py-32'
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
          className='mb-16 text-center text-4xl font-black tracking-tight md:text-6xl'
        >
          <span className='text-[#33B54A]'>Đội ngũ cán bộ </span>
          <span className='text-[#F78F1E]'>nhà trường</span>
        </motion.h2>

        <div className='mx-auto max-w-6xl'>
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: 0.2,
            }}
            className='group mb-16 overflow-hidden rounded-3xl shadow-2xl ring-2 ring-gray-200/50'
          >
            <div className='relative h-96 md:h-[500px]'>
              <Image
                src='/assets/images/staff-team.jpg'
                alt='Đội ngũ cán bộ nhà trường'
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent' />
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch'>
            {/* Đội ngũ giáo viên */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: 0.3,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className='group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#33B54A] to-[#2EA043] p-8 shadow-xl ring-1 ring-[#33B54A]/40 transition-all duration-300 hover:shadow-2xl hover:ring-[#33B54A]/60'
            >
              {/* Gradient overlay */}
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-black/10' />
              
              <div className='relative flex flex-1 flex-col'>
                <div className='mb-6 flex items-center gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm shadow-lg ring-2 ring-white/40'>
                    <Users className='size-6 text-white' />
                  </div>
                  <div className='h-1 flex-1 rounded-full bg-gradient-to-r from-white/50 via-white/30 to-transparent' />
                </div>
                
                <h3 className='mb-6 text-2xl font-black text-white md:text-3xl'>Đội ngũ giáo viên</h3>
                
                <ul className='flex-1 space-y-4 text-white/95'>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className='flex items-start gap-3'
                  >
                    <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                    <span className='text-justify leading-relaxed'>
                      Có chuyên môn cao, giàu kinh nghiệm, luôn cập nhật phương pháp giáo dục hiện đại.
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className='flex items-start gap-3'
                  >
                    <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                    <span className='text-justify leading-relaxed'>
                      Tâm huyết, hết lòng vì sự phát triển toàn diện của học sinh.
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className='flex items-start gap-3'
                  >
                    <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                    <span className='text-justify leading-relaxed'>
                      Luôn đổi mới sáng tạo để nâng cao chất lượng giảng dạy.
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className='flex items-start gap-3'
                  >
                    <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                    <span className='text-justify leading-relaxed'>
                      Lắng nghe và thấu hiểu, phối hợp chặt chẽ với phụ huynh, hỗ trợ tốt nhất cho học
                      sinh.
                    </span>
                  </motion.li>
                </ul>
              </div>
            </motion.div>

            {/* Đội ngũ nhân viên */}
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
              whileHover={{ y: -8, scale: 1.02 }}
              className='group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#F78F1E] to-[#E67E17] p-8 shadow-xl ring-1 ring-[#F78F1E]/40 transition-all duration-300 hover:shadow-2xl hover:ring-[#F78F1E]/60'
            >
              {/* Gradient overlay */}
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-black/10' />
              
              <div className='relative flex flex-1 flex-col'>
                <div className='mb-6 flex items-center gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm shadow-lg ring-2 ring-white/40'>
                    <Shield className='size-6 text-white' />
                  </div>
                  <div className='h-1 flex-1 rounded-full bg-gradient-to-r from-white/50 via-white/30 to-transparent' />
                </div>
                
                <h3 className='mb-6 text-2xl font-black text-white md:text-3xl'>Đội ngũ nhân viên</h3>
                
                <ul className='flex-1 space-y-4 text-white/95'>
                  <motion.li
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className='flex items-start gap-3'
                  >
                    <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                    <span className='text-justify leading-relaxed'>
                      Trách nhiệm, tận tình, luôn đảm bảo môi trường học tập thân thiện, an toàn, chăm
                      sóc và nuôi dưỡng chu đáo.
                    </span>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          </div>
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

