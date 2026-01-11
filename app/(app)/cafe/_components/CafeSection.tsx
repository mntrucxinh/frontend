'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Coffee, ArrowRight, UtensilsCrossed, Gift, Users } from 'lucide-react'

const menuItems = [
  {
    category: 'Đồ uống',
    items: [
      { name: 'Cà phê đen', price: '25,000đ', description: 'Cà phê đen đậm đà, thơm ngon' },
      { name: 'Cà phê sữa', price: '30,000đ', description: 'Cà phê sữa đặc biệt' },
      { name: 'Cappuccino', price: '45,000đ', description: 'Cappuccino Ý chính hiệu' },
      { name: 'Latte', price: '50,000đ', description: 'Latte thơm ngon, béo ngậy' },
      { name: 'Trà đào cam sả', price: '35,000đ', description: 'Trà đào cam sả mát lạnh' },
      { name: 'Nước ép trái cây', price: '40,000đ', description: 'Nước ép tươi ngon' },
    ],
  },
  {
    category: 'Đồ ăn',
    items: [
      { name: 'Bánh mì thịt nướng', price: '35,000đ', description: 'Bánh mì thịt nướng thơm ngon' },
      { name: 'Bánh mì pate', price: '25,000đ', description: 'Bánh mì pate đặc biệt' },
      { name: 'Bánh ngọt', price: '30,000đ', description: 'Bánh ngọt tự làm' },
      { name: 'Sandwich', price: '45,000đ', description: 'Sandwich đầy đủ dinh dưỡng' },
    ],
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
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className='relative overflow-hidden bg-gradient-to-br from-[#F78F1E] via-[#E67E17] to-[#33B54A] py-20 md:py-32'
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
            transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            className='mb-6 inline-flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm p-4 shadow-lg'
          >
            <Coffee className='size-12 text-white' />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
            className='mb-6 text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl'
          >
            <span className='block'>Trúc Xinh</span>
            <span className='block text-[#F78F1E] drop-shadow-lg'>Play Cafe</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className='mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white/95 md:text-xl'
          >
            Không gian cafe ấm cúng, đồ uống thơm ngon và khu vui chơi an toàn cho trẻ em.
            Nơi lý tưởng để gia đình thư giãn và tận hưởng những khoảnh khắc đáng nhớ.
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
              className='group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-black text-[#F78F1E] shadow-2xl transition-all hover:bg-[#33B54A] hover:text-white hover:shadow-3xl'
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

        {/* Bottom arc into cafe section (inverted: lowest at center) */}
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
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
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
                delay: 0.2,
              }}
              className='flex flex-col justify-center space-y-6'
            >
              <h2 className='text-3xl font-black text-gray-900 md:text-4xl'>
                <span className='text-[#F78F1E]'>Về </span>
                <span className='text-[#33B54A]'>Trúc Xinh Play Cafe</span>
              </h2>

              <p className='text-justify text-base leading-relaxed text-gray-700 md:text-lg'>
                Trúc Xinh Play Cafe là không gian cafe kết hợp khu vui chơi cho trẻ em. Chúng tôi mang
                đến môi trường thân thiện, ấm cúng, nơi bố mẹ có thể thưởng thức đồ uống chất lượng cao
                trong khi các bé vui chơi an toàn.
              </p>

              {/* Special Offer Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
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
                      <span className='font-bold'>Học sinh của Mầm non Trúc Xinh</span> được{' '}
                      <span className='font-black text-white underline decoration-2 underline-offset-2 decoration-white/50'>
                        vui chơi miễn phí
                      </span>{' '}
                      tại khu vui chơi của cafe. Đây là món quà đặc biệt dành cho các bé và gia đình!
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
                delay: 0.3,
              }}
              className='relative h-80 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-200/50 md:h-96'
            >
              <Image
                src='/assets/images/cafe-main.jpg'
                alt='Trúc Xinh Play Cafe'
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

      {/* Menu Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className='relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-24 md:py-32'
      >
        {/* Top wave */}
        <div className='pointer-events-none absolute inset-x-0 top-0'>
          <svg viewBox='0 0 1440 120' className='h-24 w-full' preserveAspectRatio='none'>
            <motion.path
              fill='#E8F5E9'
              d='M0,96L60,85.3C120,75,240,53,360,58.7C480,64,600,96,720,106.7C840,117,960,107,1080,96C1200,85,1320,75,1380,69.3L1440,64L1440,0L0,0Z'
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>
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
              <span className='text-[#F78F1E]'>Thực đơn </span>
              <span className='text-[#33B54A]'>đặc biệt</span>
            </h2>
            <p className='mx-auto max-w-2xl text-base text-gray-700 md:text-lg'>
              Khám phá những món ngon và đồ uống thơm ngon tại Trúc Xinh Play Cafe
            </p>
          </motion.div>

          <div className='mx-auto max-w-6xl space-y-12'>
            {menuItems.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.2 }}
                className='rounded-3xl bg-gradient-to-br from-white to-gray-50/50 p-8 shadow-xl ring-1 ring-gray-200/50 md:p-10'
              >
                <h3 className='mb-6 text-2xl font-black text-gray-900 md:text-3xl'>
                  <span className='text-[#F78F1E]'>{category.category}</span>
                </h3>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  {category.items.map((item) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.2 }}
                      whileHover={{ x: 4 }}
                      className='group flex items-start gap-4 rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg'
                    >
                      <div className='flex size-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#F78F1E] to-[#E67E17] text-white shadow-md'>
                        <UtensilsCrossed className='size-6' />
                      </div>
                      <div className='flex-1'>
                        <div className='mb-1 flex items-center justify-between'>
                          <h4 className='font-bold text-gray-900'>{item.name}</h4>
                          <span className='font-black text-[#F78F1E]'>{item.price}</span>
                        </div>
                        <p className='text-sm text-gray-600'>{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
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
              <span className='text-[#F78F1E]'>cafe</span>
            </h2>
            <p className='mx-auto max-w-2xl text-base text-gray-700 md:text-lg'>
              Khám phá không gian ấm cúng và thân thiện tại Trúc Xinh Play Cafe
            </p>
          </motion.div>

          <div className='mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-4'>
            {galleryImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-200/50 transition-all hover:shadow-2xl ${
                  index === 0 || index === 3 ? 'col-span-2 md:col-span-1' : ''
                } ${index === 0 ? 'md:row-span-2' : ''}`}
              >
                <div className='relative h-48 md:h-64 lg:h-80'>
                  <Image
                    src={image}
                    alt={`Cafe gallery ${index + 1}`}
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


