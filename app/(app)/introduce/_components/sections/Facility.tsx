'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Facility() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className='relative overflow-hidden bg-gradient-to-b from-[#FFF3E0] via-white to-[#E8F5E9] py-24 md:py-32'
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
          className='absolute left-0 top-20 size-96 rounded-full bg-[#33B54A]/6 blur-3xl'
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
          className='absolute right-0 bottom-20 size-96 rounded-full bg-[#F78F1E]/6 blur-3xl'
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
          className='mb-12 text-center text-4xl font-black tracking-tight md:text-6xl'
        >
          <span className='text-[#33B54A]'>Cơ sở vật chất </span>
          <span className='text-[#F78F1E]'>& trang thiết bị</span>
        </motion.h2>

        {/* Facilities List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: 0.2,
          }}
          className='mx-auto mb-12 max-w-5xl'
        >
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8'>
            {/* Không gian học tập */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className='group relative overflow-hidden rounded-2xl bg-white/90 p-6 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:ring-[#33B54A]/30'
            >
              <div className='absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#33B54A] to-[#2EA043] opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <h3 className='mb-3 text-xl font-black text-[#33B54A] transition-colors duration-300 group-hover:text-[#2EA043]'>
                Không gian học tập
              </h3>
              <p className='text-justify text-sm leading-relaxed text-gray-700 md:text-base'>
                Trúc Xinh có khuôn viên rộng rãi, thoáng mát, nhiều cây xanh, tận dụng tối đa ánh
                sáng và gió tự nhiên, tạo môi trường học tập an toàn, thân thiện và phù hợp với
                đặc thù giáo dục mầm non.
              </p>
            </motion.div>

            {/* Lớp học */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className='group relative overflow-hidden rounded-2xl bg-white/90 p-6 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:ring-[#F78F1E]/30'
            >
              <div className='absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#F78F1E] to-[#E67E17] opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <h3 className='mb-3 text-xl font-black text-[#F78F1E] transition-colors duration-300 group-hover:text-[#E67E17]'>
                Lớp học
              </h3>
              <p className='text-justify text-sm leading-relaxed text-gray-700 md:text-base'>
                Các lớp học được bố trí khoa học theo từng độ tuổi, diện tích phù hợp, đầy đủ trang
                thiết bị dạy học, đồ dùng – đồ chơi đạt chuẩn an toàn, đảm bảo nhu cầu học tập, vui
                chơi và sinh hoạt hằng ngày của trẻ.
              </p>
            </motion.div>

            {/* Hệ thống phòng chức năng */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className='group relative overflow-hidden rounded-2xl bg-white/90 p-6 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:ring-[#33B54A]/30'
            >
              <div className='absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#33B54A] to-[#2EA043] opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <h3 className='mb-3 text-xl font-black text-[#33B54A] transition-colors duration-300 group-hover:text-[#2EA043]'>
                Hệ thống phòng chức năng
              </h3>
              <p className='text-justify text-sm leading-relaxed text-gray-700 md:text-base'>
                Nhà trường có các phòng chức năng phục vụ hoạt động giáo dục và phát triển năng lực
                cho trẻ như: phòng STEAM LAB, phòng năng khiếu, phòng chơi trí tuệ, tạo điều kiện
                để trẻ được trải nghiệm, khám phá và phát triển toàn diện.
              </p>
            </motion.div>

            {/* Sân chơi & khu vận động ngoài trời */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className='group relative overflow-hidden rounded-2xl bg-white/90 p-6 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:ring-[#F78F1E]/30'
            >
              <div className='absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#F78F1E] to-[#E67E17] opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <h3 className='mb-3 text-xl font-black text-[#F78F1E] transition-colors duration-300 group-hover:text-[#E67E17]'>
                Sân chơi & khu vận động ngoài trời
              </h3>
              <p className='text-justify text-sm leading-relaxed text-gray-700 md:text-base'>
                Sân chơi ngoài trời rộng rãi, thoáng mát, được trang bị đa dạng thiết bị vận động,
                giúp trẻ phát triển thể chất, rèn luyện sức bền, sự linh hoạt và hình thành thói
                quen vận động tích cực.
              </p>
            </motion.div>

            {/* Sân khấu & không gian biểu diễn */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className='group relative overflow-hidden rounded-2xl bg-white/90 p-6 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:ring-[#33B54A]/30'
            >
              <div className='absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#33B54A] to-[#2EA043] opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <h3 className='mb-3 text-xl font-black text-[#33B54A] transition-colors duration-300 group-hover:text-[#2EA043]'>
                Sân khấu & không gian biểu diễn
              </h3>
              <p className='text-justify text-sm leading-relaxed text-gray-700 md:text-base'>
                Nhà trường có sân khấu lớn, hiện đại, là nơi tổ chức các hoạt động văn nghệ, lễ hội,
                sinh hoạt tập thể và biểu diễn năng khiếu, giúp trẻ mạnh dạn, tự tin và phát triển
                kỹ năng giao tiếp trước đám đông.
              </p>
            </motion.div>

            {/* Khu trải nghiệm thiên nhiên */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className='group relative overflow-hidden rounded-2xl bg-white/90 p-6 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:ring-[#F78F1E]/30'
            >
              <div className='absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#F78F1E] to-[#E67E17] opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <h3 className='mb-3 text-xl font-black text-[#F78F1E] transition-colors duration-300 group-hover:text-[#E67E17]'>
                Khu trải nghiệm thiên nhiên
              </h3>
              <p className='text-justify text-sm leading-relaxed text-gray-700 md:text-base'>
                Trúc Xinh xây dựng khu nuôi động vật và vườn rau trải nghiệm, tạo điều kiện cho trẻ
                tham gia các hoạt động chăm sóc cây trồng, vật nuôi, qua đó hình thành kỹ năng
                sống, tình yêu thiên nhiên và ý thức bảo vệ môi trường.
              </p>
            </motion.div>

            {/* Khu chăm sóc & sinh hoạt */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className='group relative overflow-hidden rounded-2xl bg-white/90 p-6 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:ring-[#33B54A]/30 md:col-span-2'
            >
              <div className='absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#33B54A] to-[#2EA043] opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <h3 className='mb-3 text-xl font-black text-[#33B54A] transition-colors duration-300 group-hover:text-[#2EA043]'>
                Khu chăm sóc & sinh hoạt
              </h3>
              <p className='text-justify text-sm leading-relaxed text-gray-700 md:text-base'>
                Nhà trường bố trí phòng ngủ riêng cho trẻ nam và trẻ nữ theo từng độ tuổi, đảm bảo
                không gian nghỉ ngơi yên tĩnh, thoáng mát. Ngoài ra, trường có bể bơi an toàn, hiện
                đại, hệ thống camera giám sát toàn trường, góp phần đảm bảo an toàn và chất lượng
                chăm sóc trẻ.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: 0.3,
          }}
          className='mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4'
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: 0.2 + i * 0.05,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className='group relative h-48 overflow-hidden rounded-2xl shadow-xl ring-2 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl md:h-56'
            >
              <Image
                src={`/assets/images/campus-${i}.jpg`}
                alt={`Cơ sở vật chất ${i}`}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

