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

import ReasonSection from './_components/ReasonSection'

export default function ReasonPage() {
  return (
    <div className='bg-white'>
      {/* Hero Section - Creative Design */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className='relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-[#33B54A] via-[#2EA043] to-[#F78F1E] py-20 md:py-32'
      >
        {/* Large "10" Background Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none'
        >
          <span className='text-[20rem] font-black leading-none text-white md:text-[30rem] lg:text-[35rem]'>
            10
          </span>
        </motion.div>

        {/* Animated Background Pattern */}
        <div className='pointer-events-none absolute inset-0'>
          {/* Floating geometric shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute rounded-full bg-white/5'
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Gradient orbs */}
          <motion.div
            className='absolute left-0 top-0 size-96 rounded-full bg-white/10 blur-3xl'
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 80, 0],
              y: [0, 50, 0],
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
              scale: [1, 1.4, 1],
              x: [0, -80, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Floating Icons */}
        <div className='pointer-events-none absolute inset-0'>
          {[
            { icon: Bed, position: 'left-[10%] top-[15%]' },
            { icon: Sun, position: 'right-[15%] top-[20%]' },
            { icon: TreePine, position: 'left-[20%] bottom-[25%]' },
            { icon: Sparkles, position: 'right-[10%] bottom-[20%]' },
            { icon: Shield, position: 'left-[50%] top-[10%]' },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                className={`absolute ${item.position}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1.2, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  delay: index * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className='flex size-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm ring-2 ring-white/20 md:size-20'>
                  <Icon className='size-8 text-white md:size-10' />
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className='container relative z-10 mx-auto px-4'>
          <div className='mx-auto max-w-6xl'>
            {/* Split Layout */}
            <div className='grid gap-12 md:grid-cols-2 md:items-center md:gap-16'>
              {/* Left: Title & Description */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className='text-center md:text-left'
              >
                <h1 className='mb-6 text-4xl font-black leading-tight text-white drop-shadow-2xl md:text-6xl lg:text-7xl'>
                  <span className='block'>Vì sao chọn</span>
                  <span className='block bg-gradient-to-r from-[#F78F1E] to-white bg-clip-text text-transparent drop-shadow-lg'>
                    Trúc Xinh?
                  </span>
                </h1>
                <p className='mb-8 text-lg leading-relaxed text-white/95 md:text-xl'>
                  10 điểm khác biệt chỉ có ở Trúc Xinh - Nơi phụ huynh gửi trọn niềm tin
                </p>

                {/* Stats */}
                <div className='flex flex-wrap justify-center gap-6 md:justify-start'>
                  {[
                    { number: '20+', label: 'Năm kinh nghiệm' },
                    { number: '10', label: 'Điểm khác biệt' },
                    { number: '100%', label: 'Cam kết chất lượng' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                      className='rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-2 ring-white/20'
                    >
                      <div className='text-2xl font-black text-white md:text-3xl'>{stat.number}</div>
                      <div className='text-xs text-white/80 md:text-sm'>{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Feature Icons Grid */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6'
              >
                {[
                  { icon: Bed, label: 'Phòng ngủ riêng', color: 'from-[#F78F1E] to-[#E67E17]' },
                  { icon: Sun, label: 'Không gian xanh', color: 'from-[#33B54A] to-[#2EA043]' },
                  { icon: TreePine, label: 'Gần gũi thiên nhiên', color: 'from-[#F78F1E] to-[#E67E17]' },
                  { icon: Sparkles, label: 'Năng khiếu', color: 'from-[#33B54A] to-[#2EA043]' },
                  { icon: Shield, label: 'An toàn tuyệt đối', color: 'from-[#F78F1E] to-[#E67E17]' },
                  { icon: Heart, label: 'Đồng hành', color: 'from-[#33B54A] to-[#2EA043]' },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      whileHover={{ y: -8, scale: 1.05, rotate: 5 }}
                      className='group'
                    >
                      <div className='flex h-full flex-col items-center rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-2 ring-white/20 transition-all duration-300 hover:bg-white/20 hover:ring-white/40 md:p-6'>
                        <div
                          className={`mb-3 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg ring-2 ring-white/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 md:size-16`}
                        >
                          <Icon className='size-7 text-white md:size-8' />
                        </div>
                        <p className='text-center text-xs font-black text-white md:text-sm'>{item.label}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Reason Content */}
      <ReasonSection />
    </div>
  )
}

