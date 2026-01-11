'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Sparkles,
  Globe,
  Lightbulb,
  CheckCircle2,
  Award,
  Users,
  Star,
  TrendingUp,
  Heart,
  Shield,
  ArrowRight,
  Trophy,
  Target,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const programs = [
  {
    id: 'fastrackkids',
    name: 'FasTrackKids',
    logo: '/assets/images/fastrackkids.png',
    icon: Sparkles,
    color: 'from-blue-500 to-purple-600',
    quote: 'Kiến thức ẩn giấu trong những niềm vui',
    description:
      'Chương trình FasTrackKids - phương pháp giáo dục sớm hàng đầu thế giới, giúp trẻ phát triển tư duy sáng tạo, kỹ năng giao tiếp và khả năng giải quyết vấn đề vượt trội. Trẻ được học qua các hoạt động tương tác đa dạng, tạo nền tảng vững chắc cho sự phát triển toàn diện.',
    features: [
      'Phát triển tư duy sáng tạo và logic vượt trội',
      'Rèn luyện kỹ năng giao tiếp và thuyết trình tự tin',
      'Xây dựng khả năng làm việc nhóm hiệu quả',
      'Nâng cao kỹ năng giải quyết vấn đề thực tế',
    ],
  },
  {
    id: 'cambridge',
    name: 'Cambridge',
    logo: '/assets/images/cambridge.png',
    icon: Globe,
    color: 'from-red-500 to-pink-600',
    quote: 'Sự khởi đầu tốt đẹp nhất cho việc học tiếng Anh của trẻ',
    description:
      'Chương trình Cambridge chuẩn quốc tế - chứng nhận chính thức từ Đại học Cambridge. Trẻ tiếp cận tiếng Anh một cách tự nhiên, phát triển kỹ năng ngôn ngữ toàn diện và chuẩn bị tốt nhất cho hành trình học tập quốc tế sau này. Đội ngũ giáo viên bản ngữ và Việt Nam có chứng chỉ quốc tế.',
    features: [
      'Chuẩn giáo dục quốc tế Cambridge được công nhận toàn cầu',
      'Phát triển tiếng Anh toàn diện 4 kỹ năng',
      'Môi trường học tập đa văn hóa, chuẩn bị hội nhập',
      'Chuẩn bị nền tảng vững chắc cho tương lai quốc tế',
    ],
  },
  {
    id: 'montessori',
    name: 'Montessori',
    logo: '/assets/images/montessori.png',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-600',
    quote: 'Chiếc nôi ươm mầm những tài năng',
    description:
      'Phương pháp Montessori được áp dụng chuyên nghiệp tại Trúc Xinh - tôn trọng sự phát triển tự nhiên của trẻ, khuyến khích trẻ tự khám phá, học hỏi và phát triển độc lập. Môi trường học tập được chuẩn bị kỹ lưỡng với giáo cụ Montessori chính hãng, tạo điều kiện tối ưu cho sự phát triển của trẻ.',
    features: [
      'Tôn trọng nhịp độ phát triển tự nhiên của từng trẻ',
      'Học tập thông qua trải nghiệm thực tế với giáo cụ chuyên biệt',
      'Phát triển tính độc lập, tự tin và khả năng tự học',
      'Môi trường học tập được chuẩn bị đặc biệt theo chuẩn Montessori',
    ],
  },
  {
    id: 'steam',
    name: 'STEAM',
    logo: '/assets/images/steam.png',
    icon: Lightbulb,
    color: 'from-orange-500 to-amber-600',
    quote: 'Vui học - Sáng tạo',
    description:
      'Chương trình STEAM tích hợp Khoa học, Công nghệ, Kỹ thuật, Nghệ thuật và Toán học - xu hướng giáo dục của tương lai. Khơi dậy niềm đam mê khám phá, sáng tạo và tư duy phản biện ở trẻ. Trẻ được học qua thực hành, thí nghiệm và các dự án sáng tạo, phát triển kỹ năng giải quyết vấn đề thực tế.',
    features: [
      'Tích hợp đa lĩnh vực học tập theo xu hướng giáo dục hiện đại',
      'Khơi dậy tư duy sáng tạo, logic và phản biện',
      'Học qua thực hành, thí nghiệm và dự án sáng tạo',
      'Phát triển kỹ năng giải quyết vấn đề thực tế',
    ],
  },
]

const advantages = [
  {
    icon: Award,
    title: 'Chương trình quốc tế',
    description: 'FasTrackKids - phương pháp giáo dục sớm hàng đầu thế giới',
    cardColor: 'bg-blue-600',
  },
  {
    icon: Trophy,
    title: 'Chứng nhận quốc tế',
    description: 'Cambridge chính thức - chuẩn giáo dục được công nhận toàn cầu',
    cardColor: 'bg-red-600',
  },
  {
    icon: Target,
    title: 'Phương pháp đã được chứng minh',
    description: 'Montessori & STEAM - các phương pháp giáo dục hàng đầu thế giới',
    cardColor: 'bg-green-600',
  },
  {
    icon: TrendingUp,
    title: 'Kết quả vượt trội',
    description: 'Trẻ phát triển toàn diện, tự tin và sẵn sàng cho tương lai',
    cardColor: 'bg-orange-500',
  },
]

const stats = [
  { number: '4', label: 'Chương trình quốc tế', icon: BookOpen },
  { number: '100%', label: 'Giáo viên có chứng chỉ', icon: Award },
  { number: '15+', label: 'Năm kinh nghiệm', icon: Star },
  { number: '500+', label: 'Học sinh đã tốt nghiệp', icon: Users },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
}

export default function ProgramSection() {
  const router = useRouter()

  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
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

        <div className='container relative z-10 mx-auto px-4 text-center'>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
            className='mb-6 text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl'
          >
            Tại sao chọn{' '}
            <span className='block text-[#F78F1E] drop-shadow-lg'>Trúc Xinh?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className='mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white/95 md:text-xl'
          >
            <span className='font-bold'>4 chương trình quốc tế độc quyền</span> - FasTrackKids,
            Cambridge, Montessori & STEAM. Đội ngũ giáo viên chuyên nghiệp, cơ sở vật chất hiện
            đại. <span className='font-bold'>Kết quả vượt trội</span> - trẻ phát triển toàn diện,
            tự tin và sẵn sàng cho tương lai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className='flex flex-wrap items-center justify-center gap-4'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/contact')}
              className='group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-black text-[#33B54A] shadow-2xl transition-all hover:bg-[#F78F1E] hover:text-white hover:shadow-3xl'
            >
              Đăng ký ngay
              <ArrowRight className='size-5 transition-transform group-hover:translate-x-1' />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/introduce')}
              className='rounded-full border-2 border-white/50 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white'
            >
              Tìm hiểu thêm
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className='relative -mt-16 z-20'
      >
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className='group relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200/50 transition-all hover:shadow-2xl'
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-[#33B54A]/5 to-[#F78F1E]/5 opacity-0 transition-opacity group-hover:opacity-100' />
                  <div className='relative z-10 text-center'>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className='mb-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#33B54A] to-[#2EA043] p-3'
                    >
                      <IconComponent className='size-6 text-white' />
                    </motion.div>
                    <div className='mb-1 text-3xl font-black text-gray-900 md:text-4xl'>
                      {stat.number}
                    </div>
                    <div className='text-xs font-semibold text-gray-600 md:text-sm'>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Advantages Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className='relative overflow-hidden bg-gradient-to-b from-white via-[#E8F5E9]/30 to-white py-24 md:py-32'
      >
        <div className='container relative z-10 mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100 }}
            className='mb-16 text-center'
          >
            <motion.h2
              className='mb-4 text-4xl font-black tracking-tight md:text-5xl'
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className='text-[#33B54A]'>Điểm khác biệt </span>
              <span className='text-[#F78F1E]'>của Trúc Xinh</span>
            </motion.h2>
            <p className='mx-auto max-w-2xl text-base text-gray-700 md:text-lg'>
              Những ưu thế vượt trội khiến Trúc Xinh trở thành lựa chọn hàng đầu của phụ huynh
            </p>
          </motion.div>

          <div className='mx-auto grid max-w-7xl grid-cols-1 gap-4 md:gap-6 md:grid-cols-4'>
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    mass: 0.8,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                    transition: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                    },
                  }}
                  className={`group relative overflow-hidden rounded-3xl ${advantage.cardColor} p-6 shadow-2xl flex flex-col md:p-8`}
                >
                  {/* Icon */}
                  <div className='mb-4 flex justify-center'>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.15,
                        rotate: 5,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        y: {
                          duration: 3.5,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: [0.4, 0, 0.6, 1],
                          delay: index * 0.15,
                        },
                        type: 'spring',
                        stiffness: 150,
                        damping: 18,
                        delay: index * 0.1 + 0.2,
                      }}
                      className='flex items-center justify-center'
                    >
                      <div className='flex size-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg ring-2 ring-white/30 md:size-20'>
                        <IconComponent className='size-8 text-white md:size-10' />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className='relative z-10 flex-1 flex flex-col'>
                    <motion.h3
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 120,
                        damping: 20,
                        delay: index * 0.1 + 0.35,
                      }}
                      className='mb-3 text-center text-lg font-black text-white md:text-xl'
                    >
                      {advantage.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 120,
                        damping: 20,
                        delay: index * 0.1 + 0.45,
                      }}
                      className='text-center text-sm leading-relaxed text-white/90'
                    >
                      {advantage.description}
                    </motion.p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Programs Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className='relative overflow-hidden bg-gradient-to-b from-[#E8F5E9] via-white to-[#FFF3E0] py-24 md:py-32'
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

        {/* Decorative blur elements */}
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 20,
              delay: 0.1,
            }}
            className='mb-16 text-center'
          >
            <motion.h2
              className='mb-6 text-4xl font-black tracking-tight md:text-6xl'
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            >
              <span className='text-[#33B54A]'>4 Chương trình </span>
              <span className='text-[#F78F1E]'>quốc tế</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className='mx-auto max-w-3xl text-base leading-relaxed text-gray-700 md:text-lg'
            >
              Mỗi chương trình được thiết kế đặc biệt để phát triển toàn diện về trí tuệ, thể chất,
              tình cảm và kỹ năng xã hội cho trẻ. Trẻ được học trong môi trường quốc tế, chuẩn bị
              tốt nhất cho tương lai.
            </motion.p>
          </motion.div>

          {/* Programs Grid */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.1 }}
            className='mx-auto max-w-7xl'
          >
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
              {programs.map((program, index) => {
                const IconComponent = program.icon

                // Đổi màu ngược lại cho 2 card phía dưới (index 2 và 3)
                const isBottomCard = index >= 2
                const shouldUseOrange = isBottomCard
                  ? index % 2 === 0 // index 2 (Montessori) -> cam
                  : index % 2 === 1 // index 0,1 giữ nguyên, index 1 (Cambridge) -> cam

                const brandColor = shouldUseOrange
                  ? 'from-[#F78F1E] to-[#E67E17]'
                  : 'from-[#33B54A] to-[#2EA043]'
                const ringColor = shouldUseOrange ? 'ring-[#F78F1E]/40' : 'ring-[#33B54A]/40'
                const hoverRingColor = shouldUseOrange
                  ? 'hover:ring-[#F78F1E]/60'
                  : 'hover:ring-[#33B54A]/60'

                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 20,
                      mass: 0.8,
                      delay: index * 0.15,
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        mass: 0.5,
                      },
                    }}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${brandColor} p-8 shadow-xl ring-1 ${ringColor} transition-all duration-500 ease-out hover:shadow-2xl ${hoverRingColor} md:p-10`}
                  >
                    {/* Gradient overlay */}
                    <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-black/10' />

                    <div className='relative flex flex-1 flex-col'>
                      {/* Icon and decorative line */}
                      <div className='mb-6 flex items-center gap-3'>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            type: 'spring',
                            stiffness: 150,
                            damping: 18,
                            delay: index * 0.1 + 0.2,
                          }}
                          whileHover={{
                            scale: 1.08,
                            rotate: 3,
                            transition: {
                              type: 'spring',
                              stiffness: 250,
                              damping: 25,
                              mass: 0.5,
                            },
                          }}
                          className='flex size-12 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm shadow-lg ring-2 ring-white/40'
                        >
                          <IconComponent className='size-6 text-white' />
                        </motion.div>
                        <div className='h-1 flex-1 rounded-full bg-gradient-to-r from-white/50 via-white/30 to-transparent' />
                      </div>

                      {/* Logo */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: 'spring',
                          stiffness: 150,
                          damping: 18,
                          delay: index * 0.1 + 0.3,
                        }}
                        whileHover={{
                          scale: 1.04,
                          transition: {
                            type: 'spring',
                            stiffness: 250,
                            damping: 25,
                            mass: 0.5,
                          },
                        }}
                        className='mb-6 flex items-center justify-center'
                      >
                        <div className='relative size-24 overflow-hidden rounded-2xl bg-white/20 backdrop-blur-sm p-4 shadow-lg ring-2 ring-white/30 md:size-28'>
                          <Image
                            src={program.logo}
                            alt={program.name}
                            fill
                            className='object-contain'
                          />
                        </div>
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          type: 'spring',
                          stiffness: 120,
                          damping: 20,
                          delay: index * 0.1 + 0.35,
                        }}
                        className='mb-4 text-center text-2xl font-black text-white md:text-3xl'
                      >
                        {program.name}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          type: 'spring',
                          stiffness: 120,
                          damping: 20,
                          delay: index * 0.1 + 0.45,
                        }}
                        className='mb-6 text-justify text-sm leading-relaxed text-white/95 md:text-base'
                      >
                        {program.description}
                      </motion.p>

                      {/* Features */}
                      <motion.ul
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: 'spring',
                          stiffness: 100,
                          damping: 20,
                          delay: index * 0.1 + 0.55,
                        }}
                        className='flex-1 space-y-4 text-white/95'
                      >
                        {program.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              type: 'spring',
                              stiffness: 100,
                              damping: 20,
                              delay: index * 0.1 + 0.65 + featureIndex * 0.05,
                            }}
                            className='flex items-start gap-3'
                          >
                            <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                            <span className='text-justify leading-relaxed'>{feature}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className='pointer-events-none absolute inset-x-0 bottom-0'>
          <svg viewBox='0 0 1440 120' className='h-24 w-full rotate-180' preserveAspectRatio='none'>
            <motion.path
              fill='#ffffff'
              d='M0,96L60,85.3C120,75,240,53,360,58.7C480,64,600,96,720,106.7C840,117,960,107,1080,96C1200,85,1320,75,1380,69.3L1440,64L1440,0L0,0Z'
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
            />
          </svg>
        </div>
      </motion.section>

    </div>
  )
}
