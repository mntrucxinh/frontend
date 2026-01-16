'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Users, Lightbulb } from 'lucide-react'

export default function MissionVision() {
  return (
    <section className='relative overflow-hidden bg-white py-24 md:py-32'>
      {/* Fixed white background to ensure it shows before animation */}
      <div className='absolute inset-0 bg-white' />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className='relative z-10'
      >
      <div className='container relative z-10 mx-auto px-4'>
        {/* Tầm nhìn - Creative Layout */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className='-mt-8 mb-32 md:-mt-12 md:mb-40'
        >
          {/* Large Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-20 text-center'
          >
            <h2 className='text-4xl font-black leading-tight tracking-tight text-[#33B54A] md:text-6xl'>
              TẦM NHÌN
            </h2>
          </motion.div>

          {/* Creative Grid Layout */}
          <div className='mx-auto max-w-7xl'>
            {/* Card 1 - Large with image on right */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='group relative mb-12 overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#F78F1E] to-[#E67E17] shadow-2xl md:mb-16'
            >
              <div className='grid md:grid-cols-2'>
                {/* Content */}
                <div className='relative z-10 flex flex-col justify-center p-8 md:p-12'>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className='mb-6 inline-flex size-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm ring-4 ring-white/30'
                  >
                    <Users className='size-10 text-white' />
                  </motion.div>

                  {/* Text */}
                  <p className='text-base leading-relaxed text-white/95 md:text-lg'>
                    Hướng đến trở thành trường mầm non uy tín, bền vững tại Đà Nẵng, được phụ huynh tin
                    chọn bởi chất lượng chăm sóc – giáo dục ổn định, môi trường an toàn, giàu trải nghiệm
                    và khả năng phát hiện – bồi dưỡng năng lực riêng của mỗi trẻ.
                  </p>
                </div>

                {/* Image */}
                <div className='relative h-80 overflow-hidden md:h-auto'>
                  <Image
                    src='/assets/images/mission2.jpg'
                    alt='Cộng đồng học sinh'
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-l from-[#F78F1E]/10 to-transparent' />
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Large with image on left */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='group relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#33B54A] to-[#2EA043] shadow-2xl'
            >
              <div className='grid md:grid-cols-2'>
                {/* Image */}
                <div className='relative order-2 h-80 overflow-hidden md:order-1 md:h-auto'>
                  <Image
                    src='/assets/images/mission4.jpg'
                    alt='Hoạt động khoa học'
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-r from-[#33B54A]/10 to-transparent' />
                </div>

                {/* Content */}
                <div className='relative z-10 order-1 flex flex-col justify-center p-8 md:order-2 md:p-12'>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className='mb-6 inline-flex size-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm ring-4 ring-white/30'
                  >
                    <Lightbulb className='size-10 text-white' />
                  </motion.div>

                  {/* Text */}
                  <p className='text-base leading-relaxed text-white/95 md:text-lg'>
                    Định vị Trúc Xinh là nơi trẻ được phát triển hài hòa giữa trí tuệ – thể chất – cảm
                    xúc – năng khiếu, hình thành sự tự tin, bản lĩnh và nền tảng kỹ năng cần thiết để
                    sẵn sàng bước vào Tiểu học và thích ứng với xã hội hiện đại.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Sứ mệnh - Creative Layout */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Large Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='mb-20 text-center'
          >
            <h2 className='text-4xl font-black leading-tight tracking-tight text-[#F78F1E] md:text-6xl'>
              SỨ MỆNH
            </h2>
          </motion.div>

          {/* Creative Grid Layout */}
          <div className='mx-auto max-w-7xl'>
            {/* Card 1 - Large with image on right */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='group relative mb-12 overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#33B54A] to-[#2EA043] shadow-2xl md:mb-16'
            >
              <div className='grid md:grid-cols-2'>
                {/* Content */}
                <div className='relative z-10 flex flex-col justify-center p-8 md:p-12'>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className='mb-6 inline-flex size-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm ring-4 ring-white/30'
                  >
                    <Sparkles className='size-10 text-white' />
                  </motion.div>

                  {/* Text */}
                  <p className='text-base leading-relaxed text-white/95 md:text-lg'>
                    Xây dựng môi trường giáo dục lấy trẻ làm trung tâm, thực hiện Chương trình Giáo dục
                    Mầm non của Bộ GD&ĐT, tích hợp STEAM, giáo dục trải nghiệm, kỹ năng sống và phát
                    triển năng khiếu phù hợp với từng độ tuổi.
                  </p>
                </div>

                {/* Image */}
                <div className='relative h-80 overflow-hidden md:h-auto'>
                  <Image
                    src='/assets/images/mission1.jpg'
                    alt='Hoạt động ngoài trời'
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-l from-[#33B54A]/10 to-transparent' />
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Large with image on left */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='group relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#F78F1E] to-[#E67E17] shadow-2xl'
            >
              <div className='grid md:grid-cols-2'>
                {/* Image */}
                <div className='relative order-2 h-80 overflow-hidden md:order-1 md:h-auto'>
                  <Image
                    src='/assets/images/mission3.jpg'
                    alt='Hoạt động học tập'
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-r from-[#F78F1E]/10 to-transparent' />
                </div>

                {/* Content */}
                <div className='relative z-10 order-1 flex flex-col justify-center p-8 md:order-2 md:p-12'>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className='mb-6 inline-flex size-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm ring-4 ring-white/30'
                  >
                    <Heart className='size-10 text-white' />
                  </motion.div>

                  {/* Text */}
                  <p className='text-base leading-relaxed text-white/95 md:text-lg'>
                    Nuôi dưỡng tối đa năng lực cá nhân của trẻ thông qua các hoạt động nghệ thuật, biểu
                    diễn sân khấu, trải nghiệm thiên nhiên, rèn luyện kỹ năng xã hội, tư duy khoa học –
                    công nghệ và khả năng hợp tác, giải quyết vấn đề.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      </motion.div>
    </section>
  )
}
