'use client'

import Link from 'next/link'
import { Calendar, Bell, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Notice } from '../../mock'

interface NoticeDetailClientProps {
  notice: Notice
  latestNotices: Notice[]
}

export default function NoticeDetailClient({ notice, latestNotices }: NoticeDetailClientProps) {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 md:py-12'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        {/* Main Content */}
        <div className='lg:col-span-2'>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 100 }}
            className='bg-white'
          >
            {/* Header Section */}
            <header className='mb-8'>
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight mb-6 tracking-tight'
              >
                {notice.title || ''}
              </motion.h1>

              {/* Metadata */}
              {notice.date && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#33B54A]/10 to-[#33B54A]/5 border border-[#33B54A]/20'
                >
                  <Calendar className='w-4 h-4 text-[#33B54A]' />
                  <span className='text-sm font-semibold text-gray-700'>{notice.date}</span>
                </motion.div>
              )}
            </header>

            {/* Content Section */}
            {notice.content && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 100 }}
                className='mb-10'
              >
                <div className='prose prose-lg md:prose-xl max-w-none text-justify
                  prose-headings:text-gray-900 prose-headings:font-black prose-headings:mt-8 prose-headings:mb-4
                  prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg prose-p:mb-4
                  prose-a:text-[#33B54A] prose-a:no-underline prose-a:font-semibold hover:prose-a:underline hover:prose-a:text-[#F78F1E] prose-a:transition-all
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6 prose-ul:space-y-1
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6 prose-ol:space-y-1
                  prose-li:my-1 prose-li:leading-relaxed
                  prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8 prose-img:w-full
                  prose-blockquote:border-l-4 prose-blockquote:border-[#33B54A] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50 prose-blockquote:py-3 prose-blockquote:rounded-r-lg prose-blockquote:my-6
                  prose-code:text-[#F78F1E] prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-medium prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4 prose-pre:shadow-lg prose-pre:my-6'
                >
                  <div dangerouslySetInnerHTML={{ __html: notice.content }} />
                </div>
              </motion.div>
            )}

            {/* Featured Image */}
            {notice.thumbnail && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.6, type: 'spring', stiffness: 100 }}
                className='relative w-full h-64 md:h-96 lg:h-[450px] mb-8 rounded-2xl overflow-hidden shadow-lg group'
              >
                <Image
                  src={notice.thumbnail || ''}
                  alt={notice.title || 'Thông báo'}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                  priority
                />
              </motion.div>
            )}
          </motion.article>
        </div>

        {/* Sidebar - Latest Notices */}
        <aside className='lg:sticky lg:top-32 lg:z-20'>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 100 }}
            className='rounded-3xl bg-white p-6 md:p-8 shadow-2xl'
          >
            <div className='mb-6'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='p-2.5 rounded-xl bg-gradient-to-br from-[#33B54A] to-[#2EA043] shadow-lg'>
                  <Bell className='w-5 h-5 text-white' />
                </div>
                <h3 className='text-xl font-black text-gray-900'>
                  <span className='text-[#33B54A]'>Thông báo </span>
                  <span className='text-[#F78F1E]'>mới nhất</span>
                </h3>
              </div>
              <div className='h-1 w-16 bg-gradient-to-r from-[#33B54A] to-[#F78F1E] rounded-full' />
            </div>
            
            {latestNotices.length > 0 ? (
              <ul className='space-y-2.5'>
                {latestNotices.map((item, index) => (
                  <motion.li
                    key={item.slug}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1, type: 'spring', stiffness: 100 }}
                  >
                    <Link
                      href={`/notice/${item.slug}`}
                      className='group block p-4 rounded-xl hover:bg-gradient-to-br hover:from-[#33B54A]/10 hover:to-[#F78F1E]/10 transition-all duration-300 hover:shadow-md'
                    >
                      <div className='flex items-start gap-3'>
                        <div className='flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#33B54A] mt-2.5 group-hover:bg-[#F78F1E] transition-colors duration-300' />
                        <div className='flex-1 min-w-0'>
                          <h4 className='text-sm font-black text-gray-900 group-hover:text-[#33B54A] transition-colors duration-300 line-clamp-2 mb-2 leading-snug'>
                            {item.title || 'Thông báo'}
                          </h4>
                          {item.date && (
                            <div className='flex items-center gap-1.5 text-xs font-semibold text-gray-500'>
                              <Calendar className='w-3 h-3 text-[#33B54A]' />
                              <span>{item.date.split(', ')[0]}</span>
                            </div>
                          )}
                        </div>
                        <ArrowRight className='w-3.5 h-3.5 text-gray-400 group-hover:text-[#33B54A] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-2.5' />
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className='text-center py-8'>
                <Bell className='w-10 h-10 text-gray-300 mx-auto mb-3' />
                <p className='text-xs text-gray-500 font-medium'>Chưa có thông báo nào khác</p>
              </div>
            )}
          </motion.div>
        </aside>
      </div>
    </div>
  )
}
