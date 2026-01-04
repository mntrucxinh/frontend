'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

const IMAGES = ['/assets/images/ex1.jpg', '/assets/images/ex2.jpg', '/assets/images/ex3.jpg']

const sway = (delay = 0) => ({
  initial: { rotate: -2, y: 0 },
  animate: {
    rotate: [-2, 2, -2],
    y: [0, -6, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay },
  },
})

const floaty = (delay = 0) => ({
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay },
  },
})

export default function ImageInstruction() {
  const [index, setIndex] = useState(0)
  const [isInitial, setIsInitial] = useState(true)

  // Preload first image
  useEffect(() => {
    const img = new window.Image()
    img.src = IMAGES[0]
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((p) => {
        const nextIndex = (p + 1) % IMAGES.length
        if (isInitial) {
          setIsInitial(false)
        }
        return nextIndex
      })
    }, 5000)
    return () => clearInterval(id)
  }, [isInitial])

  return (
    <section className='relative flex w-full justify-center overflow-hidden bg-gradient-to-b from-white to-secondary px-6 py-10'>
      {/* image box */}
      <div className='relative z-10 h-[320px] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl ring-4 ring-emerald-500/70 sm:h-[380px] md:h-[450px]'>
        <AnimatePresence mode='sync' initial={false}>
          <motion.img
            key={IMAGES[index]}
            src={IMAGES[index]}
            alt={`Slide ${index + 1}`}
            className='absolute inset-0 size-full object-cover'
            initial={isInitial ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      {/* grass background */}
      <div className='absolute bottom-0 left-0 z-0 h-[200px] w-full sm:h-[230px] md:h-[260px]'>
        <Image
          width={2000}
          height={2000}
          src='/assets/images/grass.png'
          alt=''
          className='h-full w-full object-cover object-bottom'
        />
      </div>
    </section>
  )
}
