'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Heart, MapPin, Users } from 'lucide-react'
import Image from 'next/image'

import History from './_components/sections/History'
import Location from './_components/sections/Location'
import StaffTeam from './_components/sections/StaffTeam'

const GeneralPage = () => {
  return (
    <div className='bg-white text-gray-800'>
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
              className='mb-6'
            >
              <h1 className='mb-4 text-4xl font-black leading-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl'>
                <span className='block'>Giới thiệu</span>
                <span className='block text-[#F78F1E] drop-shadow-lg'>Trường Mầm non Trúc Xinh</span>
              </h1>
              <p className='mx-auto max-w-2xl text-lg leading-relaxed text-white/95 md:text-xl'>
                Nơi nuôi dưỡng tài năng, chắp cánh ước mơ và xây dựng nền tảng vững chắc cho tương lai
                của trẻ
              </p>
            </motion.div>

            {/* Feature Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='mt-12 grid grid-cols-2 gap-6 md:grid-cols-4'
            >
              {[
                { icon: Building2, label: 'Gần 20 năm', sublabel: 'Hình thành & phát triển' },
                { icon: Heart, label: 'Chăm sóc', sublabel: 'Như chính con mình' },
                { icon: MapPin, label: 'Khuôn viên', sublabel: 'Thoáng mát & đẹp' },
                { icon: Users, label: 'Đội ngũ', sublabel: 'Tâm huyết & chuyên nghiệp' },
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
                    <div className='flex flex-col items-center rounded-2xl bg-white/10 p-6 backdrop-blur-sm ring-2 ring-white/20 transition-all duration-300 hover:bg-white/20 hover:ring-white/40'>
                      <div className='mb-3 flex size-14 items-center justify-center rounded-2xl bg-white/20 ring-2 ring-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30'>
                        <Icon className='size-7 text-white' />
                      </div>
                      <p className='text-lg font-black text-white'>{item.label}</p>
                      <p className='mt-1 text-sm text-white/80'>{item.sublabel}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <History />
      <StaffTeam />
      <Location />
    </div>
  )
}

export default GeneralPage
