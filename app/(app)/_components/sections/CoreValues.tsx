'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Icon component để hiển thị icon từ public folder
const IconImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  return (
    <div className={`relative ${className || 'size-6'}`}>
      <Image src={src} alt={alt} fill className='object-contain' />
    </div>
  )
}

const coreValues = [
  {
    title: 'ĐẠO ĐỨC',
    description: 'Sống tử tế, biết yêu thương, có trách nhiệm với bản thân, gia đình, cộng đồng.',
    icon: '/assets/icons/Moral.gif',
    bgColor: 'bg-red-600',
    cardColor: 'bg-red-600',
  },
  {
    title: 'TRÍ TUỆ',
    description: 'Học để hiểu sâu, tư duy độc lập, sáng tạo và biết giải quyết vấn đề.',
    icon: '/assets/icons/Knowledge.gif',
    bgColor: 'bg-orange-500',
    cardColor: 'bg-orange-500',
  },
  {
    title: 'NGHỊ LỰC',
    description: 'Bền bỉ, tự lập, kiên trì theo đuổi mục tiêu và dám vượt qua thử thách.',
    icon: '/assets/icons/Motivation.gif',
    bgColor: 'bg-yellow-500',
    cardColor: 'bg-yellow-500',
  },
  {
    title: 'HÀI HOÀ',
    description: 'Sống hài hòa với thiên nhiên, thân thiện với môi trường, hành động vì tương lai bền vững.',
    icon: '/assets/icons/Nature.gif',
    bgColor: 'bg-green-600',
    cardColor: 'bg-green-600',
  },
  {
    title: 'HỘI NHẬP',
    description: 'Tự tin hội nhập, làm chủ công nghệ và năng lực số trong thời đại mới.',
    icon: '/assets/icons/Innovation.gif',
    bgColor: 'bg-blue-600',
    cardColor: 'bg-blue-600',
  },
]

export default function CoreValues() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className='relative overflow-hidden pb-24 pt-24 md:pb-32 md:pt-32'
    >
      {/* Gradient background - full section */}
      <div className='absolute inset-0 bg-gradient-to-br from-[#E8F5E9] via-white to-[#FFF3E0]' />

      {/* Top wave - above background (inverted bottom wave) */}
      <div className='pointer-events-none absolute inset-x-0 -top-12 z-30 h-32 w-full sm:-top-14 sm:h-36 md:-top-20 md:h-40'>
        <svg viewBox='0 0 1440 160' className='absolute top-0 size-full' preserveAspectRatio='none'>
          <motion.path
            fill='#E8F5E9'
            d='M0,120 C90,80 180,80 270,120 C360,160 450,160 540,120 C630,80 720,80 810,120 C900,160 990,160 1080,120 C1170,80 1260,80 1350,120 C1400,140 1420,150 1440,160 L1440,0 L0,0 L0,120 Z'
            animate={{ x: [0, -15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Animated background with multiple layers */}
      <div className='pointer-events-none absolute inset-0 z-0'>
        {/* Floating orbs */}
        <motion.div
          className='absolute right-[10%] top-[20%] hidden size-96 rounded-full bg-gradient-to-br from-[#33B54A]/20 to-[#33B54A]/5 blur-3xl md:block'
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute bottom-[15%] left-[10%] hidden size-96 rounded-full bg-gradient-to-br from-[#F78F1E]/20 to-[#F78F1E]/5 blur-3xl md:block'
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#33B54A]/10 to-[#F78F1E]/10 blur-3xl sm:size-[500px]'
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute size-2 rounded-full bg-[#33B54A]/30'
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Background image - nằm đè lên gradient */}
      <div className='pointer-events-none absolute inset-0 z-[1] overflow-hidden'>
        <Image
          src='/assets/images/corevalue.webp'
          alt='Core Values Background'
          fill
          className='object-cover object-bottom'
          priority
          sizes='100vw'
          quality={90}
          style={{ objectPosition: 'center bottom' }}
        />
        {/* Overlay for better text readability */}
        <div className='absolute inset-0 bg-black/20' />
      </div>

      {/* Bottom wave - seamless transition to Schedule */}
      <div className='pointer-events-none absolute inset-x-0 bottom-0 z-[10] h-32 w-full sm:h-36 md:h-40'>
        <svg viewBox='0 0 1440 160' className='absolute bottom-0 size-full' preserveAspectRatio='none'>
          <motion.path
            fill='#33B54A'
            d='M0,120 C90,80 180,80 270,120 C360,160 450,160 540,120 C630,80 720,80 810,120 C900,160 990,160 1080,120 C1170,80 1260,80 1350,120 C1400,140 1420,150 1440,160 L1440,160 L0,160 L0,120 Z'
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className='container relative z-10 mx-auto px-4'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: 0.1,
          }}
          className='mx-auto mb-16 max-w-3xl text-center'
        >
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 20,
              delay: 0.2,
            }}
            className='text-4xl font-black tracking-tight md:text-6xl'
          >
            <span className='text-[#33B54A]'>Giá trị </span>
            <span className='text-[#F78F1E]'>cốt lõi</span>
          </motion.h2>
        </motion.div>

        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-4 md:gap-6 md:grid-cols-5'>
          {coreValues.map((value, index) => {
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  mass: 0.8,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                  },
                }}
                className={`group relative overflow-hidden rounded-3xl ${value.cardColor} p-6 md:p-8 shadow-2xl flex flex-col`}
              >
                {/* Icon */}
                <div className='mb-4 flex justify-center'>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 5,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      y: {
                        duration: 3.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: [0.4, 0, 0.6, 1],
                        delay: index * 0.15,
                      },
                      type: 'spring',
                      stiffness: 150,
                      damping: 18,
                      delay: index * 0.1 + 0.2,
                    }}
                    className='flex items-center justify-center'
                  >
                    <IconImage src={value.icon} alt={value.title} className='size-16 md:size-20' />
                  </motion.div>
                </div>

                {/* Content */}
                <div className='relative z-10 flex-1 flex flex-col'>
                  <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 20,
                      delay: index * 0.1 + 0.35,
                    }}
                    className='mb-3 text-center text-lg md:text-xl font-black text-white'
                  >
                    {value.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 20,
                      delay: index * 0.1 + 0.45,
                    }}
                    className='text-center text-sm leading-relaxed text-white/90'
                  >
                    {value.description}
                  </motion.p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
