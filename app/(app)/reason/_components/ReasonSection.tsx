'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Bed,
  Sun,
  TreePine,
  GraduationCap,
  Sparkles,
  UtensilsCrossed,
  Shield,
  Droplets,
  Gamepad2,
  Heart,
} from 'lucide-react'

export default function ReasonSection() {
  const reasons = [
    {
      icon: Bed,
      number: '01',
      title: 'Phòng ngủ riêng biệt cho trẻ nam – trẻ nữ theo từng độ tuổi',
      description:
        'Trúc Xinh là trường mầm non hiếm có bố trí phòng ngủ riêng cho bé trai và bé gái, đảm bảo sự riêng tư, khoa học và phù hợp tâm sinh lý. Phòng ngủ rộng rãi, thoáng mát, trang bị điều hòa, máy lọc không khí và máy xông tinh dầu quế tự nhiên.',
      color: 'from-[#33B54A] to-[#2EA043]',
      ringColor: 'ring-[#33B54A]/30',
    },
    {
      icon: Sun,
      number: '02',
      title: 'Không gian xanh – ngập tràn ánh sáng tự nhiên',
      description:
        'Khuôn viên trường được thiết kế nhiều cây xanh, thông thoáng, đón ánh sáng tự nhiên, tạo môi trường học tập trong lành, dễ chịu và an toàn cho trẻ.',
      color: 'from-[#F78F1E] to-[#E67E17]',
      ringColor: 'ring-[#F78F1E]/30',
    },
    {
      icon: TreePine,
      number: '03',
      title: 'Môi trường học tập gần gũi thiên nhiên',
      description:
        'Trẻ được sinh hoạt và học tập trong không gian thân thiện với thiên nhiên, hình thành tình yêu cây cối, động vật và ý thức bảo vệ môi trường từ sớm.',
      color: 'from-[#33B54A] to-[#2EA043]',
      ringColor: 'ring-[#33B54A]/30',
    },
    {
      icon: GraduationCap,
      number: '04',
      title: 'Lớp học thân thiện – đầy đủ tiện nghi – an toàn',
      description:
        'Các lớp học được trang bị đồ chơi hiện đại, đạt chuẩn an toàn, phù hợp từng độ tuổi, tạo cảm giác ấm áp, gần gũi như ở nhà.',
      color: 'from-[#F78F1E] to-[#E67E17]',
      ringColor: 'ring-[#F78F1E]/30',
    },
    {
      icon: Sparkles,
      number: '05',
      title: 'Phát triển năng khiếu – điểm khác biệt nổi bật của Trúc Xinh',
      description:
        'Nhà trường kết hợp phương pháp giáo dục hiện đại với các câu lạc bộ bồi dưỡng năng khiếu như: MC nhí – Ca hát – Nhảy hiện đại – Aerobic – Tiếng Anh, giúp trẻ phát huy tối đa tài năng, rèn luyện sự tự tin và khả năng giao tiếp.',
      color: 'from-[#33B54A] to-[#2EA043]',
      ringColor: 'ring-[#33B54A]/30',
    },
    {
      icon: UtensilsCrossed,
      number: '06',
      title: 'Chế độ dinh dưỡng khoa học – an toàn',
      description:
        'Thực phẩm được cung cấp từ các đơn vị uy tín như Vinamilk, Công ty Thực phẩm Đắc Vinh. Nguồn nước sinh hoạt sử dụng nước thủy cục, lọc qua hệ thống và khử trùng bằng tia UV, đảm bảo an toàn tuyệt đối cho trẻ.',
      color: 'from-[#F78F1E] to-[#E67E17]',
      ringColor: 'ring-[#F78F1E]/30',
    },
    {
      icon: Shield,
      number: '07',
      title: 'An toàn được đặt lên hàng đầu',
      description:
        'Hệ thống 64 camera giám sát kết nối về 4 màn hình lớn, phủ khắp các khu vực, giúp Ban Giám hiệu kiểm soát toàn diện mọi hoạt động trong trường.',
      color: 'from-[#33B54A] to-[#2EA043]',
      ringColor: 'ring-[#33B54A]/30',
    },
    {
      icon: Droplets,
      number: '08',
      title: 'Sử dụng 100% tinh dầu tự nhiên trong vệ sinh và khử khuẩn',
      description:
        'Trúc Xinh sử dụng tinh dầu quế Trà My tự nhiên trong vệ sinh phòng học, phòng chức năng, lọc không khí và khử khuẩn, an toàn cho sức khỏe trẻ nhỏ.',
      color: 'from-[#F78F1E] to-[#E67E17]',
      ringColor: 'ring-[#F78F1E]/30',
    },
    {
      icon: Gamepad2,
      number: '09',
      title: 'Hệ thống phòng chơi đa dạng – quy mô lớn',
      description:
        'Trường có nhiều phòng chơi đáp ứng nhu cầu phát triển trí tuệ và thể chất cho trẻ. Đặc biệt, phòng chơi đa năng công suất lớn, phòng STEAM LAB, được đưa vào vận hành, trang bị nhiều đồ chơi đạt tiêu chuẩn châu Âu, phù hợp từng độ tuổi.',
      color: 'from-[#33B54A] to-[#2EA043]',
      ringColor: 'ring-[#33B54A]/30',
    },
    {
      icon: Heart,
      number: '10',
      title: 'Ban Giám hiệu luôn lắng nghe và đồng hành cùng phụ huynh',
      description:
        'Trúc Xinh đề cao sự kết nối – thấu hiểu – hợp tác với phụ huynh, không ngừng đổi mới, bổ sung các tiện ích nhằm nâng cao chất lượng chăm sóc và giáo dục trẻ.',
      color: 'from-[#F78F1E] to-[#E67E17]',
      ringColor: 'ring-[#F78F1E]/30',
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className='relative overflow-hidden bg-gradient-to-b from-white via-[#E8F5E9]/20 to-white py-16 md:py-20'
    >
      {/* Subtle decorative background */}
      <div className='pointer-events-none absolute inset-0'>
        <motion.div
          className='bg-[#33B54A]/6 absolute left-0 top-0 size-[500px] rounded-full blur-3xl'
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
          className='bg-[#F78F1E]/6 absolute bottom-0 right-0 size-[500px] rounded-full blur-3xl'
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
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
            className='mb-16 text-center md:mb-20'
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className='mb-6 text-3xl font-black tracking-tight md:text-5xl lg:text-6xl'
            >
              <span className='text-[#33B54A]'>Những điểm khác biệt </span>
              <span className='text-[#F78F1E]'>chỉ có ở Trúc Xinh</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className='mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg'
            >
              Khám phá 10 điểm nổi bật tạo nên sự khác biệt và giá trị độc đáo của Trúc Xinh
            </motion.p>
          </motion.div>

          {/* Mobile Layout - Side by side (Icon + Content in card) */}
          <div className='relative mb-16 md:hidden space-y-4'>
            {reasons.slice(0, 9).map((reason, index) => {
              const Icon = reason.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1, margin: "-50px" }}
                  transition={{ delay: 0.1 + index * 0.03, duration: 0.4 }}
                  className='relative z-10 flex items-center'
                >
                  <div className='flex w-full flex-col gap-4'>
                    {/* Mobile Card - Icon and content side by side */}
                    <div className='relative z-20 flex-1'>
                      <motion.div
                        whileHover={{ y: -6, scale: 1.01 }}
                        className='group relative overflow-hidden rounded-3xl bg-white p-4 shadow-xl ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl md:p-7 h-full flex flex-col md:flex-row md:items-center md:gap-4 lg:gap-6 lg:p-10'
                      >
                        {/* Gradient accent bar */}
                        <div
                          className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${reason.color}`}
                        />

                        {/* Gradient background overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 transition-opacity duration-300 group-hover:opacity-8`}
                        />

                        {/* Icon Box */}
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className='relative z-10 mb-3 flex shrink-0 justify-center md:mb-0'
                        >
                          <div
                            className={`relative flex size-20 flex-col items-center justify-center rounded-3xl bg-gradient-to-br ${reason.color} p-3 shadow-lg ring-4 ring-white transition-all duration-300 md:size-24 md:p-4 lg:size-28 lg:p-5`}
                          >
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${reason.color} blur-xl opacity-50`} />
                            <div className='relative z-10 mb-1 text-2xl font-black text-white md:mb-2 md:text-3xl lg:text-4xl'>
                              {reason.number}
                            </div>
                            <div className='relative z-10 flex size-10 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm ring-2 ring-white/40 md:size-12 lg:size-14'>
                              <Icon className='size-5 text-white md:size-6 lg:size-7' />
                            </div>
                          </div>
                        </motion.div>

                        {/* Content */}
                        <div className='relative z-10 flex-1 text-center md:text-left'>
                          <div className='mb-2 flex items-center justify-center gap-2 md:justify-start md:mb-3'>
                            <div className={`h-0.5 w-6 rounded-full bg-gradient-to-r ${reason.color} md:h-1 md:w-8`} />
                            <span className={`text-xs font-black uppercase tracking-wider ${reason.color.includes('33B54A') ? 'text-[#33B54A]' : 'text-[#F78F1E]'}`}>
                              Điểm {reason.number}
                            </span>
                          </div>
                          <h3 className={`mb-2 text-sm font-black leading-snug transition-colors duration-300 md:mb-3 md:text-lg lg:text-xl lg:mb-4 ${reason.color.includes('33B54A') ? 'text-[#33B54A] group-hover:text-[#2EA043]' : 'text-[#F78F1E] group-hover:text-[#E67E17]'}`}>
                            {reason.title}
                          </h3>
                          <p className='text-justify text-xs leading-relaxed text-gray-700 md:text-sm md:text-left lg:text-base'>
                            {reason.description}
                          </p>
                        </div>

                        <div className={`absolute right-0 top-0 size-24 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br ${reason.color} opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-25`} />
                      </motion.div>
                    </div>

                    {/* Spacer */}
                    <div className='hidden shrink-0 md:block md:w-0.5' />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Desktop Layout - Timeline with separate icon boxes */}
          <div className='relative mb-16 hidden min-h-[200px] md:block'>
            {/* Vertical Timeline Line */}
            <div className='pointer-events-none absolute left-1/2 top-0 z-0 h-full w-0.5 -translate-x-1/2'>
              <div className='size-full bg-gradient-to-b from-[#33B54A] via-[#F78F1E] to-[#33B54A] opacity-30' />
            </div>

            <div className='relative z-10 space-y-6'>
              {reasons.slice(0, 9).map((reason, index) => {
                const Icon = reason.icon
                const isEven = index % 2 === 0
                const isLeft = isEven

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1, margin: "-50px" }}
                    transition={{ delay: 0.1 + index * 0.03, duration: 0.4 }}
                    className='relative z-10 flex items-center'
                  >
                    <div className='flex w-full flex-col gap-6 md:flex-row md:items-center md:gap-0'>
                      {isLeft ? (
                        <>
                          {/* Left Icon */}
                          <div className='relative z-20 flex shrink-0 justify-end md:w-[calc(50%-0.25rem)]'>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className='relative'
                            >
                              <div
                                className={`relative flex size-28 flex-col items-center justify-center rounded-3xl bg-gradient-to-br ${reason.color} p-5 shadow-2xl ring-4 ring-white transition-all duration-300`}
                              >
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${reason.color} blur-xl opacity-50`} />
                                <div className='relative z-10 mb-2 text-4xl font-black text-white'>
                                  {reason.number}
                                </div>
                                <div className='relative z-10 flex size-16 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm ring-2 ring-white/40'>
                                  <Icon className='size-8 text-white' />
                                </div>
                                <div className='absolute -left-2 -top-2 size-6 rounded-full bg-white/40 blur-md' />
                                <div className='absolute -bottom-2 -right-2 size-6 rounded-full bg-white/40 blur-md' />
                              </div>
                            </motion.div>
                          </div>

                          {/* Timeline Spacer */}
                          <div className='hidden shrink-0 md:block md:w-0.5' />

                          {/* Right Content */}
                          <div className='relative z-20 flex-1 md:w-[calc(50%-0.25rem)] md:pl-6'>
                            <motion.div
                              whileHover={{ y: -6, scale: 1.01 }}
                              className='group relative overflow-hidden rounded-3xl bg-white p-10 shadow-xl ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl'
                            >
                              <div className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${reason.color}`} />
                              <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 transition-opacity duration-300 group-hover:opacity-8`} />
                              <div className='relative z-10 pl-6'>
                                <div className='mb-4 flex items-center gap-3'>
                                  <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${reason.color}`} />
                                  <span className={`text-xs font-black uppercase tracking-wider ${reason.color.includes('33B54A') ? 'text-[#33B54A]' : 'text-[#F78F1E]'}`}>
                                    Điểm {reason.number}
                                  </span>
                                </div>
                                <h3 className={`mb-4 text-2xl font-black leading-tight transition-colors duration-300 lg:text-3xl ${reason.color.includes('33B54A') ? 'text-[#33B54A] group-hover:text-[#2EA043]' : 'text-[#F78F1E] group-hover:text-[#E67E17]'}`}>
                                  {reason.title}
                                </h3>
                                <p className='text-justify text-base leading-relaxed text-gray-700 lg:text-lg'>
                                  {reason.description}
                                </p>
                              </div>
                              <div className={`absolute right-0 top-0 size-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br ${reason.color} opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-25`} />
                            </motion.div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Left Content */}
                          <div className='relative z-20 flex-1 md:w-[calc(50%-0.25rem)] md:pr-6'>
                            <motion.div
                              whileHover={{ y: -6, scale: 1.01 }}
                              className='group relative overflow-hidden rounded-3xl bg-white p-10 shadow-xl ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl'
                            >
                              <div className={`absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b ${reason.color}`} />
                              <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 transition-opacity duration-300 group-hover:opacity-8`} />
                              <div className='relative z-10 pr-6 text-right'>
                                <div className='mb-4 flex items-center justify-end gap-3'>
                                  <span className={`text-xs font-black uppercase tracking-wider ${reason.color.includes('33B54A') ? 'text-[#33B54A]' : 'text-[#F78F1E]'}`}>
                                    Điểm {reason.number}
                                  </span>
                                  <div className={`h-1 w-12 rounded-full bg-gradient-to-l ${reason.color}`} />
                                </div>
                                <h3 className={`mb-4 text-2xl font-black leading-tight transition-colors duration-300 lg:text-3xl ${reason.color.includes('33B54A') ? 'text-[#33B54A] group-hover:text-[#2EA043]' : 'text-[#F78F1E] group-hover:text-[#E67E17]'}`}>
                                  {reason.title}
                                </h3>
                                <p className='text-justify text-base leading-relaxed text-gray-700 lg:text-lg'>
                                  {reason.description}
                                </p>
                              </div>
                              <div className={`absolute left-0 top-0 size-32 -translate-y-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br ${reason.color} opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-25`} />
                            </motion.div>
                          </div>

                          {/* Timeline Spacer */}
                          <div className='hidden shrink-0 md:block md:w-0.5' />

                          {/* Right Icon */}
                          <div className='relative z-20 flex shrink-0 justify-start md:w-[calc(50%-0.25rem)]'>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className='relative'
                            >
                              <div
                                className={`relative flex size-28 flex-col items-center justify-center rounded-3xl bg-gradient-to-br ${reason.color} p-5 shadow-2xl ring-4 ring-white transition-all duration-300`}
                              >
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${reason.color} blur-xl opacity-50`} />
                                <div className='relative z-10 mb-2 text-4xl font-black text-white'>
                                  {reason.number}
                                </div>
                                <div className='relative z-10 flex size-16 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm ring-2 ring-white/40'>
                                  <Icon className='size-8 text-white' />
                                </div>
                                <div className='absolute -left-2 -top-2 size-6 rounded-full bg-white/40 blur-md' />
                                <div className='absolute -bottom-2 -right-2 size-6 rounded-full bg-white/40 blur-md' />
                              </div>
                            </motion.div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Last Card - Item 10 Centered */}
          {reasons.slice(9).map((reason, index) => {
            const Icon = reason.icon
            const actualIndex = 9
            return (
              <motion.div
                key={actualIndex}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className='relative z-10 mb-16 flex flex-col items-center'
              >
                {/* Centered Card */}
                <div className='relative z-20 w-full max-w-5xl'>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.01 }}
                    className='group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50/30 to-white p-10 shadow-2xl ring-2 ring-[#F78F1E]/30 transition-all duration-300 md:p-14'
                  >
                    {/* Enhanced animated background gradient */}
                    <div className='absolute inset-0 bg-gradient-to-br from-[#F78F1E]/8 via-transparent to-[#33B54A]/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                    
                    {/* Pattern overlay */}
                    <div className='absolute inset-0 opacity-[0.02]'>
                      <div className='size-full bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:40px_40px]' />
                    </div>

                    <div className='relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:gap-16'>
                      {/* Left: Large Number & Icon - Enhanced */}
                      <div className='flex shrink-0 flex-col items-center gap-6 md:items-start'>
                        <motion.div
                          whileHover={{ rotate: 12, scale: 1.15 }}
                          className='relative flex size-32 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#F78F1E] to-[#E67E17] p-8 shadow-2xl ring-4 ring-white transition-all duration-300 md:size-36'
                        >
                          {/* Enhanced glow */}
                          <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-[#F78F1E] to-[#E67E17] blur-2xl opacity-60' />
                          
                          <div className='relative z-10 mb-4 text-6xl font-black text-white md:text-7xl'>
                            {reason.number}
                          </div>
                          <div className='relative z-10 flex size-20 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm ring-2 ring-white/40 md:size-24'>
                            <Icon className='size-10 text-white md:size-12' />
                          </div>
                          
                          {/* Multiple glow layers */}
                          <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                          <div className='absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#F78F1E]/20 to-[#E67E17]/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                        </motion.div>
                      </div>

                      {/* Right: Content - Enhanced */}
                      <div className='flex-1 text-center md:text-left'>
                        <div className='mb-6 flex items-center justify-center gap-3 md:justify-start'>
                          <div className='h-1 w-16 rounded-full bg-gradient-to-r from-[#F78F1E] to-[#E67E17]' />
                          <span className='text-xs font-black uppercase tracking-wider text-[#F78F1E]'>
                            Điểm cuối cùng
                          </span>
                        </div>
                        
                        <h3 className='mb-6 text-2xl font-black leading-tight text-[#F78F1E] transition-colors duration-300 group-hover:text-[#E67E17] md:text-3xl lg:text-4xl'>
                          {reason.title}
                        </h3>
                        <p className='text-justify text-base leading-relaxed text-gray-700 md:text-lg lg:text-xl'>
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}

          {/* Call to Action - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className='mt-16'
          >
            <div className='relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#33B54A] via-[#2EA043] to-[#33B54A] p-10 shadow-2xl ring-2 ring-[#33B54A]/30 md:p-16'>
              {/* Animated gradient overlay */}
              <div className='absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/15' />
              
              {/* Decorative elements */}
              <div className='absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl' />
              <div className='absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl' />
              
              {/* Pattern overlay */}
              <div className='absolute inset-0 opacity-10'>
                <div className='size-full bg-[radial-gradient(circle_at_2px_2px,_white_1px,_transparent_0)] bg-[length:30px_30px]' />
              </div>

              <div className='relative z-10 text-center'>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className='mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm ring-2 ring-white/30'
                >
                  <Heart className='size-5 text-white' />
                  <span className='text-sm font-black text-white md:text-base'>CAM KẾT CỦA CHÚNG TÔI</span>
                </motion.div>
                
                <h3 className='mb-6 text-3xl font-black text-white drop-shadow-lg md:text-4xl lg:text-5xl'>
                  Trúc Xinh - Nơi phụ huynh gửi trọn niềm tin
                </h3>
                <p className='mx-auto max-w-3xl text-lg leading-relaxed text-white/95 md:text-xl lg:text-2xl'>
                  Với 10 điểm khác biệt độc đáo, Trúc Xinh cam kết mang đến môi trường giáo dục tốt
                  nhất, nơi trẻ được phát triển toàn diện về thể chất, trí tuệ và tâm hồn.
                </p>
                
                {/* Decorative line */}
                <div className='mx-auto mt-8 h-1 w-24 rounded-full bg-white/30' />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
