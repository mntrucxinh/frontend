'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Coffee, 
  ArrowRight, 
  Gift, 
  Users, 
  MapPin, 
  TreePine, 
  Fish,
  Cake,
  Sparkles,
  Shield,
  Heart
} from 'lucide-react'

const features = [
  {
    icon: TreePine,
    title: 'Không gian xanh mát',
    description: 'Nhiều cây xanh, hồ cá tạo không gian trong lành, thư giãn',
    color: 'from-[#33B54A] to-[#2EA043]',
  },
  {
    icon: Shield,
    title: 'Khu vui chơi an toàn',
    description: 'Đồ chơi an toàn, phù hợp nhiều độ tuổi, thường xuyên vệ sinh',
    color: 'from-[#F78F1E] to-[#E67E17]',
  },
  {
    icon: Cake,
    title: 'Phòng tổ chức sinh nhật',
    description: 'Phòng riêng tổ chức sinh nhật, tiệc nhỏ và hoạt động trải nghiệm',
    color: 'from-[#33B54A] to-[#2EA043]',
  },
  {
    icon: Users,
    title: 'Mở cửa cộng đồng',
    description: 'Đón khách cộng đồng, điểm đến quen thuộc cho gia đình có trẻ nhỏ',
    color: 'from-[#F78F1E] to-[#E67E17]',
  },
]

const galleryImages = [
  '/assets/images/cafe-1.jpg',
  '/assets/images/cafe-2.jpg',
  '/assets/images/cafe-3.jpg',
  '/assets/images/cafe-4.jpg',
  '/assets/images/cafe-5.jpg',
  '/assets/images/cafe-6.jpg',
]

export default function CafeSection() {
  const router = useRouter()

  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
            className='mb-6 inline-flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm p-4 shadow-lg'
          >
            <Coffee className='size-12 text-white' />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            className='mb-6 text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl'
          >
            <span className='block'>Trúc Xinh Zone</span>
            <span className='block text-[#F78F1E] drop-shadow-lg'>Cafe & Vui chơi</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className='mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white/95 md:text-xl'
          >
            Không gian cafe kết hợp vui chơi dành cho trẻ em và gia đình. Nơi mọi người có thể thư giãn, 
            vui chơi và tận hưởng không gian xanh mát.
          </motion.p>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className='mb-8 flex flex-col items-center gap-2'
          >
            <div className='flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm'>
              <MapPin className='size-5 text-white' />
              <span className='text-base font-semibold text-white md:text-lg'>
                101 Phạm Như Xương, phường Hòa Khánh, quận Liên Chiểu, Đà Nẵng
              </span>
            </div>
          </motion.div>

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
              Liên hệ ngay
              <ArrowRight className='size-5 transition-transform group-hover:translate-x-1' />
            </motion.button>
            <motion.a
              href='https://www.facebook.com/CafeTrucXinh101'
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='rounded-full border-2 border-white/50 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white'
            >
              Xem trên Facebook
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom arc */}
        <div className='pointer-events-none absolute inset-x-0 bottom-0 translate-y-px'>
          <svg viewBox='0 0 1440 160' className='h-28 w-full' preserveAspectRatio='none'>
            <motion.path
              fill='#E8F5E9'
              d='M0,0 Q720,200 1440,0 L1440,160 L0,160 Z'
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className='relative overflow-hidden bg-[#E8F5E9] py-24 md:py-32'
      >
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
          <div className='mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center'>
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: 0.1,
              }}
              className='flex flex-col justify-center space-y-6'
            >
              <h2 className='text-3xl font-black text-gray-900 md:text-4xl'>
                <span className='text-[#33B54A]'>Về </span>
                <span className='text-[#F78F1E]'>Trúc Xinh Zone</span>
              </h2>

              <p className='text-justify text-base leading-relaxed text-gray-700 md:text-lg'>
                Trúc Xinh Zone là không gian cafe kết hợp vui chơi dành cho trẻ em và gia đình, nơi mọi người có thể 
                thư giãn, vui chơi và tận hưởng không gian xanh mát.
              </p>

              <p className='text-justify text-base leading-relaxed text-gray-700 md:text-lg'>
                Không gian được thiết kế rộng rãi, thoáng đãng, nhiều cây xanh, hồ cá, có khu vui chơi cho trẻ. 
                Trẻ có không gian vận động, khám phá và vui chơi tự do; ba mẹ có thể ngồi thư giãn, trò chuyện 
                hoặc làm việc nhẹ trong không gian yên tĩnh, dễ chịu.
              </p>

              {/* Special Offer Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className='group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#33B54A] via-[#2EA043] to-[#33B54A] p-6 shadow-2xl ring-4 ring-[#33B54A]/20 md:p-8'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5' />
                <div
                  className='absolute inset-0 opacity-30'
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <div className='relative z-10 flex items-start gap-4'>
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className='flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm shadow-xl ring-2 ring-white/40'
                  >
                    <Gift className='size-7 text-white' />
                  </motion.div>
                  <div className='flex-1'>
                    <div className='mb-3 flex items-center gap-2'>
                      <Users className='size-5 text-white' />
                      <h3 className='text-xl font-black text-white md:text-2xl'>
                        Ưu đãi đặc biệt
                      </h3>
                    </div>
                    <p className='text-base leading-relaxed text-white md:text-lg'>
                      <span className='font-bold'>Trẻ đang theo học tại Trường Mầm non Trúc Xinh</span> được{' '}
                      <span className='font-black text-white underline decoration-2 underline-offset-2 decoration-white/50'>
                        sử dụng khu vui chơi miễn phí
                      </span>{' '}
                      như một ưu đãi riêng dành cho gia đình Trúc Xinh.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: 0.2,
              }}
              className='relative h-80 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-200/50 md:h-96'
            >
              <Image
                src='/assets/images/cafe-main.jpg'
                alt='Trúc Xinh Zone'
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent' />
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className='pointer-events-none absolute inset-x-0 bottom-0'>
          <svg viewBox='0 0 1440 120' className='h-24 w-full rotate-180' preserveAspectRatio='none'>
            <motion.path
              fill='#E8F5E9'
              d='M0,96L60,85.3C120,75,240,53,360,58.7C480,64,600,96,720,106.7C840,117,960,107,1080,96C1200,85,1320,75,1380,69.3L1440,64L1440,120L0,120Z'
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
            />
          </svg>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className='relative overflow-hidden bg-white py-24 md:py-32'
      >
        <div className='container relative z-10 mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100 }}
            className='mb-16 text-center'
          >
            <h2 className='mb-4 text-4xl font-black tracking-tight md:text-5xl'>
              <span className='text-[#33B54A]'>Điểm nổi bật </span>
              <span className='text-[#F78F1E]'>của Trúc Xinh Zone</span>
            </h2>
            <p className='mx-auto max-w-2xl text-base text-gray-700 md:text-lg'>
              Khám phá những điểm đặc biệt tạo nên không gian độc đáo tại Trúc Xinh Zone
            </p>
          </motion.div>

          <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2'>
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className='group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-200/50 transition-all hover:shadow-2xl'
                >
                  {/* Gradient accent */}
                  <div className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${feature.color}`} />
                  
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
                  
                  <div className='relative z-10 flex items-start gap-4'>
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      className={`flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg ring-2 ring-white/30 transition-all`}
                    >
                      <Icon className='size-8 text-white' />
                    </motion.div>
                    <div className='flex-1'>
                      <h3 className='mb-2 text-xl font-black text-gray-900 md:text-2xl'>
                        {feature.title}
                      </h3>
                      <p className='text-base leading-relaxed text-gray-600 md:text-lg'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Birthday Room Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className='relative overflow-hidden bg-gradient-to-b from-[#FFF3E0]/50 via-white to-[#E8F5E9]/30 py-24 md:py-32'
      >
        <div className='container relative z-10 mx-auto px-4'>
          <div className='mx-auto max-w-6xl'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100 }}
              className='mb-12 text-center'
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className='mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#F78F1E] to-[#E67E17] p-4 shadow-xl'
              >
                <Cake className='size-10 text-white' />
              </motion.div>
              <h2 className='mb-4 text-4xl font-black tracking-tight md:text-5xl'>
                <span className='text-[#F78F1E]'>Phòng tổ chức </span>
                <span className='text-[#33B54A]'>sinh nhật & tiệc</span>
              </h2>
              <p className='mx-auto max-w-2xl text-base text-gray-700 md:text-lg'>
                Trúc Xinh Zone có phòng riêng tổ chức sinh nhật, tiệc nhỏ và các hoạt động trải nghiệm cho trẻ, 
                phù hợp cho những buổi gặp gỡ ấm cúng, riêng tư.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50/50 to-white p-10 shadow-2xl ring-2 ring-[#F78F1E]/20 md:p-14'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-[#F78F1E]/5 via-transparent to-[#33B54A]/5' />
              
              <div className='relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center'>
                <div>
                  <h3 className='mb-4 text-2xl font-black text-gray-900 md:text-3xl'>
                    Không gian riêng tư, ấm cúng
                  </h3>
                  <p className='mb-6 text-base leading-relaxed text-gray-700 md:text-lg'>
                    Phòng riêng được trang bị đầy đủ tiện nghi, tạo không gian lý tưởng cho các buổi tiệc sinh nhật, 
                    gặp gỡ gia đình và bạn bè. Không gian yên tĩnh, riêng tư giúp mọi người có thể trò chuyện, 
                    vui chơi một cách thoải mái.
                  </p>
                  <div className='flex flex-wrap gap-3'>
                    {['Sinh nhật', 'Tiệc nhỏ', 'Hoạt động trải nghiệm', 'Gặp gỡ gia đình'].map((tag, i) => (
                      <span
                        key={i}
                        className='rounded-full bg-gradient-to-r from-[#F78F1E] to-[#E67E17] px-4 py-2 text-sm font-bold text-white shadow-md'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className='relative h-64 overflow-hidden rounded-2xl shadow-xl md:h-80'>
                  <Image
                    src='/assets/images/cafe-birthday.jpg'
                    alt='Phòng tổ chức sinh nhật'
                    fill
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Community Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className='relative overflow-hidden bg-gradient-to-br from-[#33B54A] via-[#2EA043] to-[#33B54A] py-24 md:py-32'
      >
        <div className='container relative z-10 mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className='relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white/10 p-10 backdrop-blur-md shadow-2xl ring-2 ring-white/20 md:p-16'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5' />
            
            <div className='relative z-10 text-center'>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className='mb-6 inline-flex items-center justify-center rounded-full bg-white/20 p-4 backdrop-blur-sm'
              >
                <Heart className='size-10 text-white' />
              </motion.div>
              
              <h2 className='mb-6 text-3xl font-black text-white drop-shadow-lg md:text-4xl lg:text-5xl'>
                Mở cửa đón khách cộng đồng
              </h2>
              
              <p className='mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/95 md:text-xl'>
                Trúc Xinh Zone mở cửa đón khách cộng đồng, là điểm đến quen thuộc cho gia đình có trẻ nhỏ, 
                nơi mỗi buổi ghé chơi đều nhẹ nhàng, vui vẻ và dễ chịu.
              </p>
              
              <div className='flex flex-wrap justify-center gap-4'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/contact')}
                  className='group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-black text-[#33B54A] shadow-2xl transition-all hover:bg-[#F78F1E] hover:text-white'
                >
                  Đặt chỗ ngay
                  <ArrowRight className='size-5 transition-transform group-hover:translate-x-1' />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className='relative overflow-hidden bg-gradient-to-b from-white via-[#FFF3E0]/50 to-white py-24 md:py-32'
      >
        {/* Top wave */}
        <div className='pointer-events-none absolute inset-x-0 top-0'>
          <svg viewBox='0 0 1440 120' className='h-24 w-full' preserveAspectRatio='none'>
            <motion.path
              fill='#f9fafb'
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
            className='absolute left-0 top-20 size-96 rounded-full bg-[#F78F1E]/6 blur-3xl'
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
            className='absolute right-0 bottom-20 size-96 rounded-full bg-[#33B54A]/6 blur-3xl'
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100 }}
            className='mb-16 text-center'
          >
            <h2 className='mb-4 text-4xl font-black tracking-tight md:text-5xl'>
              <span className='text-[#33B54A]'>Không gian </span>
              <span className='text-[#F78F1E]'>Trúc Xinh Zone</span>
            </h2>
            <p className='mx-auto max-w-2xl text-base text-gray-700 md:text-lg'>
              Khám phá không gian rộng rãi, thoáng đãng với nhiều cây xanh và hồ cá tại Trúc Xinh Zone
            </p>
          </motion.div>

          <div className='mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-4'>
            {galleryImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-200/50 transition-all hover:shadow-2xl ${
                  index === 0 || index === 3 ? 'col-span-2 md:col-span-1' : ''
                } ${index === 0 ? 'md:row-span-2' : ''}`}
              >
                <div className='relative h-48 md:h-64 lg:h-80'>
                  <Image
                    src={image}
                    alt={`Trúc Xinh Zone gallery ${index + 1}`}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
