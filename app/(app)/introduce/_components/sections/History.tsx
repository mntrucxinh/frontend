'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function History() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className='relative overflow-hidden bg-gradient-to-b from-white via-[#E8F5E9]/30 to-white py-24 md:py-32'
    >
      {/* Subtle decorative background */}
      <div className='pointer-events-none absolute inset-0'>
        <motion.div
          className='absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#33B54A]/6 blur-3xl'
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#F78F1E]/6 blur-3xl'
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className='container relative z-10 mx-auto px-4'>
        <div className='mx-auto max-w-7xl'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: [0.4, 0, 0.2, 1],
            }}
            className='mb-16 text-center'
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='whitespace-nowrap text-3xl font-black tracking-tight md:text-5xl lg:text-6xl'
            >
              <span className='text-[#33B54A]'>Lịch sử hình thành </span>
              <span className='text-[#F78F1E]'>& phát triển</span>
            </motion.h2>
          </motion.div>

          {/* Main Content */}
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16'>
            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className='flex flex-col items-center lg:col-span-4'
            >
              <div className='relative mb-6 size-64 overflow-hidden rounded-full border-4 border-[#33B54A]/30 shadow-2xl ring-4 ring-[#F78F1E]/20 md:size-80'>
                <Image
                  src='/assets/images/founder.jpg'
                  alt='Nhà giáo Ưu tú Lê Thị A'
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#33B54A]/5 to-[#F78F1E]/5' />
              </div>
              <div className='text-center'>
                <h3 className='text-xl font-black text-[#F78F1E] md:text-2xl'>
                  Nhà giáo Ưu tú Lê Thị A
                </h3>
                <p className='mt-2 text-sm font-black text-gray-700 md:text-base'>
                  Hiệu trưởng Nhà trường
                </p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className='flex flex-col justify-center space-y-6 lg:col-span-8'
            >
              <p className='text-justify leading-relaxed text-gray-700 md:text-lg'>
                Trường Mầm non Trúc Xinh được thành lập năm 2007 tại Đà Nẵng, là cơ sở giáo dục mầm non
                tư thục với định hướng xây dựng môi trường học tập an toàn - thân thiện - giàu yêu
                thương, hướng tới sự phát triển toàn diện của trẻ. Nhà trường kiên trì theo đuổi mục
                tiêu giúp trẻ hình thành nền tảng vững chắc về thể chất, nhận thức, ngôn ngữ, tình cảm
                - kỹ năng xã hội và thẩm mỹ, sẵn sàng cho giai đoạn Tiểu học.
              </p>
              <p className='text-justify leading-relaxed text-gray-700 md:text-lg'>
                Với đội ngũ cán bộ quản lý, giáo viên và nhân viên tận tâm, năng động, sáng tạo, thường
                xuyên được bồi dưỡng chuyên môn, Trúc Xinh không ngừng đổi mới phương pháp chăm sóc -
                giáo dục theo hướng lấy trẻ làm trung tâm. Nhà trường chú trọng rèn nề nếp, kỹ năng tự
                lập phù hợp lứa tuổi, tăng cường hoạt động trải nghiệm, giúp trẻ phát huy sự tự tin,
                mạnh dạn, chủ động và phát triển hài hòa trong từng giai đoạn.
              </p>
              <p className='text-justify leading-relaxed text-gray-700 md:text-lg'>
                Qua gần 20 năm xây dựng và phát triển, Trường Mầm non Trúc Xinh ngày càng khẳng định uy
                tín và chất lượng trong công tác nuôi dưỡng, chăm sóc và giáo dục trẻ. Nhà trường tiếp
                tục nâng cao môi trường học tập, tăng cường phối hợp cùng phụ huynh và hoàn thiện chất
                lượng dịch vụ giáo dục, hướng đến trở thành "ngôi nhà thứ hai" ấm áp - nơi trẻ hạnh phúc
                đến trường mỗi ngày.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

