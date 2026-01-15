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
          <div className='px-10 text-justify leading-relaxed text-gray-700 md:text-lg'>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className='flex flex-col space-y-6 lg:col-span-8 lg:h-full'
            >
              <p>
                Với gần 20 năm hình thành và phát triển, Trường Mầm non Trúc Xinh luôn mang trong
                mình khát vọng nâng cao trí thức Việt. Chúng tôi xác định vị thế và bản lĩnh của
                mình từ sự khác biệt trong phương pháp giảng dạy sáng tạo và hiệu quả, các dịch vụ
                vượt trội và thiết thực, môi trường học tập thân thiện với nhiều giải pháp khích lệ
                niềm yêu thích, đam mê khám phá của trẻ, đã cùng với phụ huynh phát hiện và bồi
                dưỡng kịp thời nhiều tài năng, chắp cánh cho những ước mơ của trẻ hướng tới tương
                lai.
              </p>
              <p>
                Hiểu rằng sáu năm đầu đời là giai đoạn phát triển vàng, ngay từ khi còn là một cơ sở
                với quy mô nhỏ, Trúc Xinh đã chú trọng đầu tư không gian sân khấu đủ lớn để trẻ thể
                hiện năng khiếu, sân chơi rộng mở, thường xuyên bổ sung đồ dùng – đồ chơi đạt chuẩn
                và các giải pháp công nghệ nhằm mở rộng trải nghiệm học tập cho trẻ. Bên cạnh đó,
                nhà trường luôn quan tâm nuôi dưỡng tuổi thơ hồn nhiên, giàu cảm xúc và gắn bó với
                thiên nhiên, con người Việt Nam thông qua các hoạt động dã ngoại, trải nghiệm, xem
                rối nước, rối cạn, tuồng và tham quan trang trại.
              </p>
              <p>
                Lắng nghe để đổi mới là giá trị xuyên suốt trong hành trình phát triển của Trúc
                Xinh. Từ sự thấu hiểu mong muốn của phụ huynh, nhà trường từng bước xây dựng và phát
                triển thành một ngôi trường với hệ thống phòng học đạt chuẩn, cơ sở vật chất hiện
                đại, các khu chức năng riêng biệt, tạo môi trường học tập an toàn, sinh động, giúp
                trẻ phát triển toàn diện về thể chất, trí tuệ, kỹ năng và sự tự tin khi bước vào bậc
                Tiểu học.
              </p>
              <p>
                Song song đó, Trúc Xinh đặc biệt chú trọng xây dựng đội ngũ quản lý và giáo viên có
                năng lực, tâm huyết, yêu nghề mến trẻ, làm việc theo quy trình khoa học, ổn định
                chất lượng chăm sóc – giáo dục. Nhà trường luôn nỗ lực cân bằng giữa chất lượng giáo
                dục và mức học phí hợp lý, để nhiều trẻ em trên địa bàn có cơ hội được học tập trong
                một môi trường tốt, nhân văn và bền vững.
              </p>
              <p className='font-semibold'>
                Với nền tảng đã được bồi đắp qua thời gian, Trúc Xinh cam kết luôn &quot;Chăm sóc
                con bạn như chính con mình&quot;, xứng đáng là &quot;Nơi phụ huynh gửi trọn niềm
                tin&quot;.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
