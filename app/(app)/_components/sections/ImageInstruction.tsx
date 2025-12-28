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

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % IMAGES.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className='relative flex w-full justify-center overflow-hidden bg-gradient-to-b from-white to-secondary px-6 py-10'>
      <div className='absolute bottom-[-40px] left-1/2 h-[170px] w-[180%] -translate-x-1/2 sm:h-[200px] sm:w-[200%] md:h-[230px] md:w-[220%]'>
        <Image
          width={2000}
          height={2000}
          src='/assets/images/grass.png'
          alt=''
          className='translate-x-[450px] translate-y-[-250px] object-cover opacity-75'
        />
      </div>

      {/* image box */}
      <div className='relative h-[320px] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl ring-4 ring-emerald-500/70 sm:h-[380px] md:h-[450px]'>
        <AnimatePresence>
          <motion.img
            key={IMAGES[index]}
            src={IMAGES[index]}
            alt={`Slide ${index + 1}`}
            className='absolute inset-0 size-full object-cover'
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.55 }}
          />
        </AnimatePresence>
      </div>
    </section>
  )
}
