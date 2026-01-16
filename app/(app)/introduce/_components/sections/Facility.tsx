'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  BookOpen,
  FlaskConical,
  Gamepad2,
  Music,
  TreePine,
  Bed,
  Building2,
} from 'lucide-react'

export default function Facility() {
  const facilities = [
    {
      icon: GraduationCap,
      title: 'Không gian học tập',
      description:
        'Trúc Xinh có khuôn viên rộng rãi, thoáng mát, nhiều cây xanh, tận dụng tối đa ánh sáng và gió tự nhiên, tạo môi trường học tập an toàn, thân thiện và phù hợp với đặc thù giáo dục mầm non.',
      color: 'from-[#33B54A] to-[#2EA043]',
      ringColor: 'ring-[#33B54A]/30',
    },
    {
      icon: BookOpen,
      title: 'Lớp học',
      description:
        'Các lớp học được bố trí khoa học theo từng độ tuổi, diện tích phù hợp, đầy đủ trang thiết bị dạy học, đồ dùng – đồ chơi đạt chuẩn an toàn, đảm bảo nhu cầu học tập, vui chơi và sinh hoạt hằng ngày của trẻ.',
      color: 'from-[#F78F1E] to-[#E67E17]',
      ringColor: 'ring-[#F78F1E]/30',
    },
    {
      icon: FlaskConical,
      title: 'Hệ thống phòng chức năng',
      description:
        'Nhà trường có các phòng chức năng phục vụ hoạt động giáo dục và phát triển năng lực cho trẻ như: phòng STEAM LAB, phòng năng khiếu, phòng chơi trí tuệ, tạo điều kiện để trẻ được trải nghiệm, khám phá và phát triển toàn diện.',
      color: 'from-[#33B54A] to-[#2EA043]',
      ringColor: 'ring-[#33B54A]/30',
    },
    {
      icon: Gamepad2,
      title: 'Sân chơi & khu vận động ngoài trời',
      description:
        'Sân chơi ngoài trời rộng rãi, thoáng mát, được trang bị đa dạng thiết bị vận động, giúp trẻ phát triển thể chất, rèn luyện sức bền, sự linh hoạt và hình thành thói quen vận động tích cực.',
      color: 'from-[#F78F1E] to-[#E67E17]',
      ringColor: 'ring-[#F78F1E]/30',
    },
    {
      icon: Music,
      title: 'Sân khấu & không gian biểu diễn',
      description:
        'Nhà trường có sân khấu lớn, hiện đại, là nơi tổ chức các hoạt động văn nghệ, lễ hội, sinh hoạt tập thể và biểu diễn năng khiếu, giúp trẻ mạnh dạn, tự tin và phát triển kỹ năng giao tiếp trước đám đông.',
      color: 'from-[#33B54A] to-[#2EA043]',
      ringColor: 'ring-[#33B54A]/30',
    },
    {
      icon: TreePine,
      title: 'Khu trải nghiệm thiên nhiên',
      description:
        'Trúc Xinh xây dựng khu nuôi động vật và vườn rau trải nghiệm, tạo điều kiện cho trẻ tham gia các hoạt động chăm sóc cây trồng, vật nuôi, qua đó hình thành kỹ năng sống, tình yêu thiên nhiên và ý thức bảo vệ môi trường.',
      color: 'from-[#F78F1E] to-[#E67E17]',
      ringColor: 'ring-[#F78F1E]/30',
    },
    {
      icon: Bed,
      title: 'Khu chăm sóc & sinh hoạt',
      description:
        'Nhà trường bố trí phòng ngủ riêng cho trẻ nam và trẻ nữ theo từng độ tuổi, đảm bảo không gian nghỉ ngơi yên tĩnh, thoáng mát. Ngoài ra, trường có bể bơi an toàn, hiện đại, hệ thống camera giám sát toàn trường, góp phần đảm bảo an toàn và chất lượng chăm sóc trẻ.',
      color: 'from-[#33B54A] to-[#2EA043]',
      ringColor: 'ring-[#33B54A]/30',
      fullWidth: true,
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className='relative overflow-hidden bg-gradient-to-b from-white via-[#E8F5E9]/20 to-white py-16 md:py-20'
    >

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
        {/* Facilities Grid */}
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
          className='mx-auto mb-12 max-w-7xl'
        >
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8'>
            {facilities.map((facility, index) => {
              const Icon = facility.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:${facility.ringColor} md:p-8 ${
                    facility.fullWidth ? 'md:col-span-2' : ''
                  }`}
                >
                  {/* Gradient accent bar */}
                  <div
                    className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${facility.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  
                  {/* Icon */}
                  <div className='mb-4 flex items-center gap-4'>
                    <div
                      className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${facility.color} shadow-lg ring-2 ring-white/50 transition-all duration-300 group-hover:scale-110`}
                    >
                      <Icon className='size-7 text-white' />
                    </div>
                    <div className='h-1 flex-1 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-transparent' />
                  </div>

                  <h3
                    className={`mb-3 text-xl font-black transition-colors duration-300 md:text-2xl ${
                      facility.color.includes('33B54A')
                        ? 'text-[#33B54A] group-hover:text-[#2EA043]'
                        : 'text-[#F78F1E] group-hover:text-[#E67E17]'
                    }`}
                  >
                    {facility.title}
                  </h3>
                  <p className='text-justify text-sm leading-relaxed text-gray-700 md:text-base'>
                    {facility.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Image Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: 0.5,
          }}
          className='mx-auto max-w-7xl'
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='mb-8 text-center text-3xl font-black tracking-tight md:text-4xl'
          >
            <span className='text-[#33B54A]'>Hình ảnh </span>
            <span className='text-[#F78F1E]'>cơ sở vật chất</span>
          </motion.h3>

          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
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
                  delay: 0.7 + i * 0.05,
                }}
                whileHover={{ y: -8, scale: 1.05 }}
                className='group relative h-48 overflow-hidden rounded-3xl shadow-xl ring-2 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:ring-[#33B54A]/30 md:h-56'
              >
                <Image
                  src={`/assets/images/campus-${i}.jpg`}
                  alt={`Cơ sở vật chất ${i}`}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

