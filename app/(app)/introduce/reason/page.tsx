'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Bed,
  Sun,
  TreePine,
  GraduationCap,
  Sparkles,
  UtensilsCrossed,
  Shield,
  Droplets,
  Gamepad2,
  Heart,
} from 'lucide-react'

import ReasonSection from '../../reason/_components/ReasonSection'

export default function ReasonPage() {
  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className='relative overflow-hidden bg-gradient-to-br from-[#33B54A] via-[#2EA043] to-[#F78F1E] py-20 md:py-32'
      >
        {/* Decorative elements */}
        <div className='pointer-events-none absolute inset-0'>
          <motion.div
            className='absolute left-0 top-0 size-96 rounded-full bg-white/10 blur-3xl'
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className='absolute right-0 bottom-0 size-96 rounded-full bg-white/10 blur-3xl'
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className='container relative z-10 mx-auto px-4'>
          <div className='mx-auto max-w-5xl text-center'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className='mb-8'
            >
              <h1 className='mb-4 text-4xl font-black leading-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl'>
                <span className='block'>Vì sao chọn</span>
                <span className='block text-[#F78F1E] drop-shadow-lg'>Trúc Xinh?</span>
              </h1>
              <p className='mx-auto max-w-2xl text-lg leading-relaxed text-white/95 md:text-xl'>
                10 điểm khác biệt chỉ có ở Trúc Xinh - Nơi phụ huynh gửi trọn niềm tin
              </p>
            </motion.div>

            {/* Feature Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='mt-12 grid grid-cols-2 gap-6 md:grid-cols-5'
            >
              {[
                { icon: Bed, label: 'Phòng ngủ riêng' },
                { icon: Sun, label: 'Không gian xanh' },
                { icon: TreePine, label: 'Gần gũi thiên nhiên' },
                { icon: Sparkles, label: 'Năng khiếu' },
                { icon: Shield, label: 'An toàn tuyệt đối' },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className='group'
                  >
                    <div className='flex flex-col items-center rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-2 ring-white/20 transition-all duration-300 hover:bg-white/20 hover:ring-white/40 md:p-6'>
                      <div className='mb-2 flex size-12 items-center justify-center rounded-2xl bg-white/20 ring-2 ring-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30 md:size-14'>
                        <Icon className='size-6 text-white md:size-7' />
                      </div>
                      <p className='text-center text-sm font-black text-white md:text-base'>{item.label}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Reason Content */}
      <ReasonSection />
    </div>
  )
}

