'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'

const IMAGES = ['/assets/images/ex1.jpg', '/assets/images/ex2.jpg', '/assets/images/ex3.jpg']

export default function ImageInstruction() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [isInitial, setIsInitial] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const img = new window.Image()
    img.src = IMAGES[0]
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => {
        const nextIndex = (prev + 1) % IMAGES.length
        if (isInitial) {
          setIsInitial(false)
        }
        return nextIndex
      })
    }, 5000)

    return () => clearInterval(id)
  }, [isInitial])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Chỉ áp dụng parallax trên màn hình lớn để tránh giật trên mobile
      if (window.innerWidth < 1024) return
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-white to-[#FFF3E0] pb-20'>
      {/* Animated background with multiple layers */}
      <div className='pointer-events-none absolute inset-0'>
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

      <div className='relative z-10 mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20'>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20'>
          {/* Left: Content with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.4, 0, 0.2, 1],
            }}
            className='space-y-8 text-center lg:text-left'
          >
            {/* Title with staggered animation */}
            <div className='space-y-3'>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className='font-black leading-[1.05] tracking-tight text-gray-900 text-[clamp(3rem,4.2vw,3.75rem)]'
              >
                Trường Mầm Non
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className='font-black leading-[1.05] tracking-tight text-[#33B54A] text-[clamp(3rem,4.2vw,3.75rem)]'
              >
                Trúc Xinh
              </motion.h1>
            </div>

            {/* Description with word-by-word animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className='leading-relaxed text-gray-600 text-[clamp(1rem,1.2vw+0.6rem,1.25rem)]'
            >
              Môi trường học tập an toàn, thân thiện, giúp bé phát triển toàn diện về{' '}
              <motion.span
                className='font-bold text-[#F78F1E]'
                whileHover={{ scale: 1.1, display: 'inline-block' }}
              >
                thể chất
              </motion.span>
              ,{' '}
              <motion.span
                className='font-bold text-[#33B54A]'
                whileHover={{ scale: 1.1, display: 'inline-block' }}
              >
                trí tuệ
              </motion.span>{' '}
              và{' '}
              <motion.span
                className='font-bold text-[#F78F1E]'
                whileHover={{ scale: 1.1, display: 'inline-block' }}
              >
                kỹ năng sống
              </motion.span>{' '}
              thông qua những hoạt động trải nghiệm phong phú mỗi ngày.
            </motion.p>

            {/* Enhanced CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className='flex flex-col items-center justify-center gap-3 pt-3 sm:flex-row sm:gap-4 lg:justify-start'
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='w-full sm:w-auto'
              >
                <button
                  onClick={() => router.push('/introduce')}
                  className='group relative inline-flex w-full items-center justify-center gap-2
                             overflow-hidden rounded-full bg-[#F78F1E]
                             text-white font-bold shadow-xl shadow-[#F78F1E]/30 transition-all duration-300 hover:shadow-2xl
                             px-[clamp(1.25rem,2vw,2.25rem)] py-[clamp(0.95rem,1.2vw,1.25rem)]
                             text-[clamp(0.95rem,0.7vw+0.65rem,1.125rem)]
                             sm:w-auto'
                >
                  <span className='relative z-10 flex items-center gap-2 whitespace-nowrap'>
                    Tìm hiểu về trường
                    <ChevronRight className='size-5 transition-transform group-hover:translate-x-1 sm:size-6' />
                  </span>
                </button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='w-full sm:w-auto'
              >
                <button
                  onClick={() => router.push('/notice')}
                  className='group relative inline-flex w-full items-center justify-center gap-2
                             overflow-hidden rounded-full bg-[#33B54A]
                             text-white font-bold shadow-xl shadow-[#33B54A]/30 transition-all duration-300 hover:shadow-2xl
                             px-[clamp(1.25rem,2vw,2.25rem)] py-[clamp(0.95rem,1.2vw,1.25rem)]
                             text-[clamp(0.95rem,0.7vw+0.65rem,1.125rem)]
                             sm:w-auto'
                >
                  <span className='relative z-10 flex items-center gap-2 whitespace-nowrap'>
                    Thông báo tuyển sinh
                    <ChevronRight className='size-5 transition-transform group-hover:translate-x-1 sm:size-6' />
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Advanced Image Slider with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.4, 0, 0.2, 1],
            }}
            className='relative mx-auto w-full max-w-4xl lg:mx-0 lg:max-w-[700px] xl:max-w-[820px] 2xl:max-w-[900px]'
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          >
            {/* Main slider with glassmorphism effect */}
            <div className='relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-white/50 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl'>
              <AnimatePresence mode='wait' initial={false}>
                <motion.div
                  key={IMAGES[index]}
                  initial={isInitial ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className='absolute inset-0'
                >
                  <Image
                    src={IMAGES[index]}
                    alt={`Slide ${index + 1}`}
                    fill
                    className='object-cover'
                    priority={index === 0}
                  />

                  {/* Dynamic gradient overlay */}
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent'
                    animate={{
                      opacity: [0.3, 0.4, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Animated dots indicator */}
              <div className='absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2.5'>
                {IMAGES.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => {
                      setIndex(i)
                      setIsInitial(false)
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`rounded-full transition-all duration-300 ${
                      i === index
                        ? 'h-3 w-10 bg-white shadow-xl'
                        : 'size-3 bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Multiple decorative layers with animations */}
            <motion.div
              className='absolute -right-6 -top-6 -z-10 size-full rounded-3xl bg-gradient-to-br from-[#33B54A]/15 to-[#F78F1E]/15 blur-3xl'
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className='absolute -right-3 -top-3 -z-10 size-full rounded-3xl bg-gradient-to-br from-[#33B54A]/10 to-[#F78F1E]/10 blur-2xl'
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Animated bottom wave */}
      <div className='absolute inset-x-0 bottom-0 h-56 overflow-hidden'>
        <svg viewBox='0 0 1440 160' className='size-full' preserveAspectRatio='none' fill='none'>
          <motion.path
            d='M0,80 C240,40 480,120 720,80 C960,40 1200,120 1440,80 L1440,160 L0,160 Z'
            fill='#E8F5E9'
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <motion.path
            d='M0,100 C240,60 480,140 720,100 C960,60 1200,140 1440,100 L1440,160 L0,160 Z'
            fill='#C8E6C9'
            fillOpacity='0.6'
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.2, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </section>
  )
}
