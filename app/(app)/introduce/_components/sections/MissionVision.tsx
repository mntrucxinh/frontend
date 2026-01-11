'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function MissionVision() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className='relative overflow-hidden bg-gradient-to-b from-white via-[#E8F5E9]/30 to-white py-24 md:py-32'
    >
      <div className='pointer-events-none absolute inset-0'>
        <motion.div
          className='absolute left-0 top-0 size-[500px] rounded-full bg-[#33B54A]/6 blur-3xl'
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className='absolute right-0 bottom-0 size-[500px] rounded-full bg-[#F78F1E]/6 blur-3xl'
          animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className='container relative z-10 mx-auto px-4'>
        {/* Sứ mệnh */}
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
          className='mb-20 md:mb-24'
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
            className='mb-12 text-center text-4xl font-black tracking-tight text-[#33B54A] md:text-6xl'
          >
            Sứ mệnh
          </motion.h2>
          <div className='mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch'>
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
              whileHover={{ y: -8, scale: 1.02 }}
              className='group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#33B54A] to-[#2EA043] shadow-xl ring-1 ring-[#33B54A]/40 transition-all duration-300 hover:shadow-2xl hover:ring-[#33B54A]/60'
            >
              {/* Gradient overlay for depth */}
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-black/10' />
              
              <div className='relative flex flex-1 flex-col p-8'>
                <div className='mb-6 flex items-center gap-3'>
                  <div className='flex size-12 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm shadow-lg ring-2 ring-white/40'>
                    <span className='text-2xl'>🌱</span>
                  </div>
                  <div className='h-1 flex-1 rounded-full bg-gradient-to-r from-white/50 via-white/30 to-transparent' />
                </div>
                
                <p className='mb-6 flex-1 text-justify text-base leading-relaxed text-white/95 md:text-lg'>
                  Xây dựng môi trường giáo dục lấy trẻ làm trung tâm, thực hiện Chương trình Giáo dục Mầm non của Bộ GD&ĐT, tích hợp STEAM, giáo dục trải nghiệm, kỹ năng sống và phát triển năng khiếu phù hợp với từng độ tuổi.
                </p>
                
                <div className='relative h-64 w-full overflow-hidden rounded-2xl shadow-xl ring-2 ring-white/20'>
                  <Image
                    src='/assets/images/mission1.jpg'
                    alt='Hoạt động ngoài trời'
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
                </div>
              </div>
            </motion.div>
            
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
              className='group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#F78F1E] to-[#E67E17] shadow-xl ring-1 ring-[#F78F1E]/40 transition-all duration-300 hover:shadow-2xl hover:ring-[#F78F1E]/60'
            >
              {/* Gradient overlay for depth */}
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-black/10' />
              
              <div className='relative flex flex-1 flex-col p-8'>
                <div className='mb-6 flex items-center gap-3'>
                  <div className='flex size-12 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm shadow-lg ring-2 ring-white/40'>
                    <span className='text-2xl'>🏡</span>
                  </div>
                  <div className='h-1 flex-1 rounded-full bg-gradient-to-r from-white/50 via-white/30 to-transparent' />
                </div>
                
                <p className='mb-6 flex-1 text-justify text-base leading-relaxed text-white/95 md:text-lg'>
                  Nuôi dưỡng tối đa năng lực cá nhân của trẻ thông qua các hoạt động nghệ thuật, biểu diễn sân khấu, trải nghiệm thiên nhiên, rèn luyện kỹ năng xã hội, tư duy khoa học – công nghệ và khả năng hợp tác, giải quyết vấn đề.
                </p>
                
                <div className='relative h-64 w-full overflow-hidden rounded-2xl shadow-xl ring-2 ring-white/20'>
                  <Image
                    src='/assets/images/mission3.jpg'
                    alt='Hoạt động học tập'
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tầm nhìn */}
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
            className='mb-12 text-center text-4xl font-black tracking-tight text-[#F78F1E] md:text-6xl'
          >
            Tầm nhìn
          </motion.h2>
          <div className='mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch'>
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
              whileHover={{ y: -8, scale: 1.02 }}
              className='group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#F78F1E] to-[#E67E17] shadow-xl ring-1 ring-[#F78F1E]/40 transition-all duration-300 hover:shadow-2xl hover:ring-[#F78F1E]/60'
            >
              {/* Gradient overlay for depth */}
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-black/10' />
              
              <div className='relative flex flex-1 flex-col p-8'>
                <div className='mb-6 flex items-center gap-3'>
                  <div className='flex size-12 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm shadow-lg ring-2 ring-white/40'>
                    <span className='text-2xl'>⭐</span>
                  </div>
                  <div className='h-1 flex-1 rounded-full bg-gradient-to-r from-white/50 via-white/30 to-transparent' />
                </div>
                
                <p className='mb-6 flex-1 text-justify text-base leading-relaxed text-white/95 md:text-lg'>
                  Hướng đến trở thành trường mầm non uy tín, bền vững tại Đà Nẵng, được phụ huynh tin chọn bởi chất lượng chăm sóc – giáo dục ổn định, môi trường an toàn, giàu trải nghiệm và khả năng phát hiện – bồi dưỡng năng lực riêng của mỗi trẻ.
                </p>
                
                <div className='relative h-64 w-full overflow-hidden rounded-2xl shadow-xl ring-2 ring-white/20'>
                  <Image
                    src='/assets/images/mission2.jpg'
                    alt='Cộng đồng học sinh'
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
                </div>
              </div>
            </motion.div>
            
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
              className='group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#33B54A] to-[#2EA043] shadow-xl ring-1 ring-[#33B54A]/40 transition-all duration-300 hover:shadow-2xl hover:ring-[#33B54A]/60'
            >
              {/* Gradient overlay for depth */}
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-black/10' />
              
              <div className='relative flex flex-1 flex-col p-8'>
                <div className='mb-6 flex items-center gap-3'>
                  <div className='flex size-12 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm shadow-lg ring-2 ring-white/40'>
                    <span className='text-2xl'>🚀</span>
                  </div>
                  <div className='h-1 flex-1 rounded-full bg-gradient-to-r from-white/50 via-white/30 to-transparent' />
                </div>
                
                <p className='mb-6 flex-1 text-justify text-base leading-relaxed text-white/95 md:text-lg'>
                  Định vị Trúc Xinh là nơi trẻ được phát triển hài hòa giữa trí tuệ – thể chất – cảm xúc – năng khiếu, hình thành sự tự tin, bản lĩnh và nền tảng kỹ năng cần thiết để sẵn sàng bước vào Tiểu học và thích ứng với xã hội hiện đại.
                </p>
                
                <div className='relative h-64 w-full overflow-hidden rounded-2xl shadow-xl ring-2 ring-white/20'>
                  <Image
                    src='/assets/images/mission4.jpg'
                    alt='Hoạt động khoa học'
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
