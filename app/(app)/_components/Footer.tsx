'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import { CONTACT_INFO } from '@/types/constants/infomations'
import { Icons } from '@/components/icons'

const Footer = () => {
  const router = useRouter()

  const phoneHref = CONTACT_INFO.phone.replace(/\D+/g, '')

  // Google Maps embed (không cần API key)
  const mapAddress = '614 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng, Việt Nam'
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`

  return (
    <footer className='relative bg-[#33B54A] text-white'>
      {/* Top wave */}
      <div className='pointer-events-none absolute inset-x-0 top-0 -translate-y-px'>
        <svg viewBox='0 0 1200 70' className='h-[70px] w-full' preserveAspectRatio='none'>
          <path
            d='M0,30 C120,60 240,0 360,30 C480,60 600,0 720,30 C840,60 960,0 1080,30 C1140,45 1180,55 1200,50 L1200,0 L0,0 Z'
            fill='#E8F5E9'
            opacity='0.9'
          />
          <path
            d='M0,40 C120,70 240,10 360,40 C480,70 600,10 720,40 C840,70 960,10 1080,40 C1140,55 1180,65 1200,60 L1200,0 L0,0 Z'
            fill='#C8E6C9'
            opacity='0.7'
          />
        </svg>
      </div>

      <div className='mx-auto max-w-6xl px-6 pb-16 pt-24'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-14'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className='mb-6 text-2xl font-black text-white'>Trúc Xinh Preschool</h3>
            <ul className='space-y-3 text-lg leading-relaxed text-white/95'>
              <li className='flex items-start gap-3'>
                <span className='mt-0.5 text-[#F78F1E]'>•</span>
                <span>{mapAddress}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='mt-0.5 text-[#F78F1E]'>•</span>
                <a
                  className='transition-colors hover:text-[#F78F1E] hover:underline'
                  href={`tel:${phoneHref}`}
                >
                  Hotline: {CONTACT_INFO.phone}
                </a>
              </li>
              <li className='flex items-start gap-3'>
                <span className='mt-0.5 text-[#F78F1E]'>•</span>
                <a
                  className='transition-colors hover:text-[#F78F1E] hover:underline'
                  href={`mailto:${CONTACT_INFO.email}`}
                >
                  Email: {CONTACT_INFO.email}
                </a>
              </li>
              <li className='flex items-start gap-3'>
                <span className='mt-0.5 text-[#F78F1E]'>•</span>
                <a
                  href='https://trucxinh.edu.vn'
                  target='_blank'
                  rel='noreferrer'
                  className='transition-colors hover:text-[#F78F1E] hover:underline'
                >
                  Website: trucxinh.edu.vn
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className='mb-6 text-2xl font-black text-white'>Liên kết nhanh</h3>
            <div className='grid grid-cols-2 gap-x-10'>
              <ul className='space-y-3 text-lg leading-relaxed text-white/95'>
                <li className='flex items-center gap-2'>
                  <span className='text-[#F78F1E]'>•</span>
                  <button
                    onClick={() => router.push('/')}
                    className='text-left transition-colors hover:text-[#F78F1E] hover:underline'
                  >
                    Trang chủ
                  </button>
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-[#F78F1E]'>•</span>
                  <button
                    onClick={() => router.push('/recruit')}
                    className='text-left transition-colors hover:text-[#F78F1E] hover:underline'
                  >
                    Tuyển dụng
                  </button>
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-[#F78F1E]'>•</span>
                  <button
                    onClick={() => router.push('/introduce/general')}
                    className='text-left transition-colors hover:text-[#F78F1E] hover:underline'
                  >
                    Giới thiệu
                  </button>
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-[#F78F1E]'>•</span>
                  <button
                    onClick={() => router.push('/contact')}
                    className='text-left transition-colors hover:text-[#F78F1E] hover:underline'
                  >
                    Liên hệ
                  </button>
                </li>
              </ul>

              <ul className='space-y-3 text-lg leading-relaxed text-white/95'>
                <li className='flex items-center gap-2'>
                  <span className='text-[#F78F1E]'>•</span>
                  <button
                    onClick={() => router.push('/notice')}
                    className='text-left transition-colors hover:text-[#F78F1E] hover:underline'
                  >
                    Tuyển sinh
                  </button>
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-[#F78F1E]'>•</span>
                  <button
                    onClick={() => router.push('/news')}
                    className='text-left transition-colors hover:text-[#F78F1E] hover:underline'
                  >
                    Tin tức
                  </button>
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-[#F78F1E]'>•</span>
                  <button
                    onClick={() => router.push('/library/gallery')}
                    className='text-left transition-colors hover:text-[#F78F1E] hover:underline'
                  >
                    Thư viện
                  </button>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='flex flex-col gap-6 md:pl-6'
          >
            <h3 className='mb-1 text-2xl font-black text-white'>Bản đồ liên hệ</h3>

            <div className='overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/30'>
              <iframe
                title='Google Map - Trúc Xinh Preschool'
                src={mapSrc}
                loading='lazy'
                className='h-64 w-full border-0'
                referrerPolicy='no-referrer-when-downgrade'
                allowFullScreen
              />
            </div>

            <div className='flex flex-wrap items-center gap-3'>
              <motion.a
                href='#'
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className='group relative flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transition-all hover:shadow-xl hover:from-blue-600 hover:to-blue-700'
                aria-label='Facebook'
              >
                <Icons.facebook className='size-5 transition-transform group-hover:rotate-12' />
                <span className='absolute -top-1 -right-1 flex size-2 rounded-full bg-white/80 ring-2 ring-white' />
              </motion.a>

              <motion.a
                href='#'
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className='group relative flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg transition-all hover:shadow-xl hover:from-red-600 hover:to-red-700'
                aria-label='YouTube'
              >
                <Icons.youtube className='size-5 transition-transform group-hover:rotate-12' />
                <span className='absolute -top-1 -right-1 flex size-2 rounded-full bg-white/80 ring-2 ring-white' />
              </motion.a>

              <motion.a
                href='#'
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className='group relative flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg transition-all hover:shadow-xl hover:from-blue-500 hover:to-blue-600'
                aria-label='Zalo'
              >
                <Icons.zalo className='size-5 transition-transform group-hover:rotate-12' />
                <span className='absolute -top-1 -right-1 flex size-2 rounded-full bg-white/80 ring-2 ring-white' />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className='mt-12 border-t border-white/30' />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='py-6 text-center text-lg font-semibold text-white/90'
        >
          Copyright {new Date().getFullYear()} © Trúc Xinh Preschool
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className='pointer-events-none absolute inset-x-0 bottom-0 translate-y-px'>
        <svg viewBox='0 0 1200 70' className='h-[70px] w-full' preserveAspectRatio='none'>
          <path
            d='M0,40 C120,10 240,70 360,40 C480,10 600,70 720,40 C840,10 960,70 1080,40 C1140,25 1180,15 1200,20 L1200,70 L0,70 Z'
            fill='#E8F5E9'
            opacity='1'
          />
          <path
            d='M0,30 C120,0 240,60 360,30 C480,0 600,60 720,30 C840,0 960,60 1080,30 C1140,15 1180,5 1200,10 L1200,70 L0,70 Z'
            fill='#C8E6C9'
            opacity='0.8'
          />
        </svg>
      </div>
    </footer>
  )
}

export default Footer
