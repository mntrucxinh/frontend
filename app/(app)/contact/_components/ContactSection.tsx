'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  Building2,
  MessageSquare,
  User,
  CheckCircle2,
} from 'lucide-react'
import { CONTACT_INFO } from '@/types/constants/infomations'
import { useCreateContactMessage } from '@/hook/contact/use-contact-mutation'

const contactInfo = [
  {
    icon: Phone,
    title: 'Điện thoại',
    content: CONTACT_INFO.phone,
    link: `tel:${CONTACT_INFO.phone.replace(/\D+/g, '')}`,
    color: 'from-[#33B54A] to-[#2EA043]',
  },
  {
    icon: Mail,
    title: 'Email',
    content: CONTACT_INFO.email,
    link: `mailto:${CONTACT_INFO.email}`,
    color: 'from-[#F78F1E] to-[#E67E17]',
  },
  {
    icon: MapPin,
    title: 'Địa chỉ',
    content: '614 Tôn Đức Thắng, Liên Chiểu, Da Nang',
    link: '#',
    color: 'from-[#33B54A] to-[#2EA043]',
  },
  {
    icon: Clock,
    title: 'Giờ làm việc',
    content: 'Thứ 2 - Thứ 6: 7:00 - 17:00',
    link: '#',
    color: 'from-[#F78F1E] to-[#E67E17]',
  },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { mutateAsync: createContactMessage, isPending: isSubmitting } =
    useCreateContactMessage()

  const getErrorMessage = (error: unknown) => {
    const detail = (error as any)?.response?.data?.detail
    if (typeof detail === 'string') return detail
    if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg
    if (typeof detail?.message === 'string') return detail.message
    return (error as any)?.response?.data?.message || (error as any)?.message || 'Co loi xay ra'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    try {
      await createContactMessage({
        full_name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        subject: formData.subject.trim() || undefined,
        message: formData.message.trim(),
      })

      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })

      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
            <span className='block'>Liên hệ với</span>
            <span className='block text-[#F78F1E] drop-shadow-lg'>Trúc Xinh</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className='mx-auto max-w-3xl text-lg leading-relaxed text-white/95 md:text-xl'
          >
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi để được tư vấn
            tốt nhất về chương trình học và dịch vụ của trường.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Info Cards */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className='relative -mt-16 z-20'
      >
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className='group relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200/50 transition-all hover:shadow-2xl'
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 transition-opacity group-hover:opacity-5`}
                  />
                  <div className='relative z-10 text-center'>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`mb-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${info.color} p-3 shadow-lg`}
                    >
                      <IconComponent className='size-6 text-white' />
                    </motion.div>
                    <h3 className='mb-2 text-sm font-black text-gray-900 md:text-base'>{info.title}</h3>
                    <p className='text-xs font-semibold text-gray-600 md:text-sm'>{info.content}</p>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Form and Map Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className='relative overflow-hidden bg-gradient-to-b from-white via-[#E8F5E9]/30 to-white py-24 md:py-32'
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
          <div className='mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-stretch'>
            {/* Contact Form */}
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
              className='relative flex flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-gray-200/50 md:p-10'
            >
              {/* Decorative gradient */}
              <div className='absolute inset-0 bg-gradient-to-br from-[#33B54A]/5 via-transparent to-[#F78F1E]/5' />

              <div className='relative z-10 flex flex-1 flex-col'>
                <div className='mb-6 flex items-center gap-3'>
                  <div className='flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#33B54A] to-[#2EA043] shadow-lg'>
                    <MessageSquare className='size-6 text-white' />
                  </div>
                  <div className='h-1 flex-1 rounded-full bg-gradient-to-r from-[#33B54A]/30 via-[#F78F1E]/30 to-transparent' />
                </div>

                <h2 className='mb-2 text-3xl font-black text-gray-900 md:text-4xl'>
                  <span className='text-[#33B54A]'>Gửi tin nhắn </span>
                  <span className='text-[#F78F1E]'>cho chúng tôi</span>
                </h2>
                <p className='mb-8 text-base text-gray-600 md:text-lg'>
                  Điền thông tin vào form bên dưới, chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='rounded-2xl bg-gradient-to-br from-[#33B54A] to-[#2EA043] p-8 text-center'
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className='mb-4 inline-flex items-center justify-center rounded-full bg-white p-3'
                    >
                      <CheckCircle2 className='size-8 text-[#33B54A]' />
                    </motion.div>
                    <h3 className='mb-2 text-xl font-black text-white'>Gửi thành công!</h3>
                    <p className='text-white/90'>
                      Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className='flex flex-1 flex-col space-y-6'>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <label htmlFor='name' className='mb-2 block text-sm font-bold text-gray-700'>
                          Họ và tên <span className='text-[#F78F1E]'>*</span>
                        </label>
                        <div className='relative'>
                          <User className='absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400' />
                          <input
                            type='text'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 transition-all focus:border-[#33B54A] focus:outline-none focus:ring-2 focus:ring-[#33B54A]/20'
                            placeholder='Nhập họ và tên'
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <label htmlFor='phone' className='mb-2 block text-sm font-bold text-gray-700'>
                          Số điện thoại <span className='text-[#F78F1E]'>*</span>
                        </label>
                        <div className='relative'>
                          <Phone className='absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400' />
                          <input
                            type='tel'
                            id='phone'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className='w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 transition-all focus:border-[#33B54A] focus:outline-none focus:ring-2 focus:ring-[#33B54A]/20'
                            placeholder='Nhập số điện thoại'
                          />
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <label htmlFor='email' className='mb-2 block text-sm font-bold text-gray-700'>
                        Email <span className='text-[#F78F1E]'>*</span>
                      </label>
                      <div className='relative'>
                        <Mail className='absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400' />
                        <input
                          type='email'
                          id='email'
                          name='email'
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className='w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 transition-all focus:border-[#33B54A] focus:outline-none focus:ring-2 focus:ring-[#33B54A]/20'
                          placeholder='Nhập email của bạn'
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <label htmlFor='subject' className='mb-2 block text-sm font-bold text-gray-700'>
                        Chủ đề <span className='text-[#F78F1E]'>*</span>
                      </label>
                      <select
                        id='subject'
                        name='subject'
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className='w-full rounded-xl border-2 border-gray-200 bg-white py-3 px-4 text-gray-900 transition-all focus:border-[#33B54A] focus:outline-none focus:ring-2 focus:ring-[#33B54A]/20'
                      >
                        <option value=''>Chọn chủ đề</option>
                        <option value='tuyen-sinh'>Tuyển sinh</option>
                        <option value='chuong-trinh-hoc'>Chương trình học</option>
                        <option value='co-so-vat-chat'>Cơ sở vật chất</option>
                        <option value='khac'>Khác</option>
                      </select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                    >
                      <label htmlFor='message' className='mb-2 block text-sm font-bold text-gray-700'>
                        Tin nhắn <span className='text-[#F78F1E]'>*</span>
                      </label>
                      <textarea
                        id='message'
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className='w-full rounded-xl border-2 border-gray-200 bg-white py-3 px-4 text-gray-900 transition-all focus:border-[#33B54A] focus:outline-none focus:ring-2 focus:ring-[#33B54A]/20'
                        placeholder='Nhập tin nhắn của bạn...'
                      />
                    </motion.div>

                    {errorMessage && (
                      <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700'>
                        {errorMessage}
                      </div>
                    )}

                    <motion.button
                      type='submit'
                      disabled={isSubmitting}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='group w-full rounded-full bg-gradient-to-r from-[#33B54A] to-[#2EA043] px-8 py-4 text-base font-black text-white shadow-xl transition-all hover:from-[#F78F1E] hover:to-[#E67E17] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed md:py-5 md:text-lg'
                    >
                      {isSubmitting ? (
                        <span className='flex items-center justify-center gap-2'>
                          <motion.div
                            className='size-5 rounded-full border-2 border-white border-t-transparent'
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Đang gửi...
                        </span>
                      ) : (
                        <span className='flex items-center justify-center gap-2'>
                          Gửi tin nhắn
                          <Send className='size-5 transition-transform group-hover:translate-x-1' />
                        </span>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Map and Additional Info */}
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
              className='flex h-full flex-col space-y-8'
            >
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.01 }}
                className='group relative h-96 overflow-hidden rounded-3xl shadow-xl ring-1 ring-gray-200/50'
              >
                <iframe
                  src='https://www.google.com/maps?q=614+Tôn+Đức+Thắng,+phường+Hòa+Khánh+Nam,+quận+Liên+Chiểu,+Đà+Nẵng,+Vietnam&output=embed&zoom=15'
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  className='absolute inset-0'
                  title='Bản đồ Trường Mầm non Trúc Xinh - 614 Tôn Đức Thắng, phường Hòa Khánh Nam, quận Liên Chiểu, Đà Nẵng'
                />
                {/* Overlay gradient for better integration */}
                <div className='pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#33B54A]/5 to-[#F78F1E]/5' />
              </motion.div>

              {/* Additional Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className='relative flex flex-1 flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#33B54A] to-[#2EA043] p-8 shadow-xl'
              >
                <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-black/10' />
                <div className='relative z-10'>
                  <div className='mb-6 flex items-center gap-3'>
                    <div className='flex size-12 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm shadow-lg ring-2 ring-white/40'>
                      <Building2 className='size-6 text-white' />
                    </div>
                    <div className='h-1 flex-1 rounded-full bg-gradient-to-r from-white/50 via-white/30 to-transparent' />
                  </div>

                  <h3 className='mb-4 text-2xl font-black text-white md:text-3xl'>Thông tin trường</h3>
                  <ul className='space-y-3 text-white/95'>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className='flex items-start gap-3'
                    >
                      <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                      <span className='leading-relaxed'>
                        Nhận trẻ từ 18 tháng đến 6 tuổi
                      </span>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className='flex items-start gap-3'
                    >
                      <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                      <span className='leading-relaxed'>
                        Giáo viên có chứng chỉ quốc tế
                      </span>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                      className='flex items-start gap-3'
                    >
                      <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                      <span className='leading-relaxed'>
                        Cơ sở vật chất đạt chuẩn
                      </span>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                      className='flex items-start gap-3'
                    >
                      <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                      <span className='leading-relaxed'>
                        Hoạt động: bơi lội, aerobic, nghệ thuật
                      </span>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 }}
                      className='flex items-start gap-3'
                    >
                      <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                      <span className='leading-relaxed'>
                        Gần 20 năm kinh nghiệm giáo dục
                      </span>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.0 }}
                      className='flex items-start gap-3'
                    >
                      <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                      <span className='leading-relaxed'>
                        Môi trường học tập an toàn, thân thiện
                      </span>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.1 }}
                      className='flex items-start gap-3'
                    >
                      <span className='mt-1.5 size-2 shrink-0 rounded-full bg-white' />
                      <span className='leading-relaxed'>
                        Chương trình học phù hợp từng độ tuổi
                      </span>
                    </motion.li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
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

