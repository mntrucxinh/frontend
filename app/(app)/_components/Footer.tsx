import React from 'react'
import Image from 'next/image'

import { BRAND_ASSETS, CONTACT_INFO } from '@/types/constants/infomations'

const Footer = () => {
  const phoneHref = CONTACT_INFO.phone.replace(/\D+/g, '')

  return (
    <footer className='relative bg-primary text-white'>
      <div className='pointer-events-none absolute inset-x-0 top-0 -translate-y-px'>
        <svg viewBox='0 0 1200 70' className='h-[64px] w-full' preserveAspectRatio='none'>
          <path
            d='M0,30 C120,60 240,0 360,30 C480,60 600,0 720,30 C840,60 960,0 1080,30 C1140,45 1180,55 1200,50 L1200,0 L0,0 Z'
            fill='#e6f5eb'
            opacity='0.9'
          />
          <path
            d='M0,40 C120,70 240,10 360,40 C480,70 600,10 720,40 C840,70 960,10 1080,40 C1140,55 1180,65 1200,60 L1200,0 L0,0 Z'
            fill='#d5f0e0'
            opacity='0.65'
          />
        </svg>
      </div>

      <div className='mx-auto max-w-6xl px-6 pb-10 pt-20'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14'>
          <div>
            <h3 className='mb-5 text-lg font-extrabold text-white'>Truc Xinh Preschool</h3>
            <ul className='space-y-3 text-sm text-white/90'>
              <li className='flex items-start gap-3'>
                <span className='mt-0.5'>-</span>
                <span>17 Do Quang, Thanh Khe, Da Nang</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='mt-0.5'>-</span>
                <a className='hover:underline' href={`tel:${phoneHref}`}>
                  Hotline: {CONTACT_INFO.phone}
                </a>
              </li>
              <li className='flex items-start gap-3'>
                <span className='mt-0.5'>-</span>
                <a className='hover:underline' href={`mailto:${CONTACT_INFO.email}`}>
                  Email: {CONTACT_INFO.email}
                </a>
              </li>
              <li className='flex items-start gap-3'>
                <span className='mt-0.5'>-</span>
                <a className='hover:underline' href='/' target='_blank'>
                  Website: trucxinh.edu.vn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-5 text-lg font-extrabold text-white'>Lien ket nhanh</h3>
            <div className='grid grid-cols-2 gap-x-10'>
              <ul className='space-y-3 text-sm text-white/90'>
                <li className='flex items-center gap-2'>
                  <span className='text-white'>•</span>
                  <a className='hover:underline' href='/'>
                    Trang chu
                  </a>
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-white'>•</span>
                  <a className='hover:underline' href='/tuyen-dung'>
                    Tuyen dung
                  </a>
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-white'>•</span>
                  <a className='hover:underline' href='/gioi-thieu'>
                    Gioi thieu
                  </a>
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-white'>•</span>
                  <a className='hover:underline' href='/lien-he'>
                    Lien he
                  </a>
                </li>
              </ul>
              <ul className='space-y-3 text-sm text-white/90'>
                <li className='flex items-center gap-2'>
                  <span className='text-white'>•</span>
                  <a className='hover:underline' href='/tuyen-sinh'>
                    Tuyen sinh
                  </a>
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-white'>•</span>
                  <a className='hover:underline' href='/tin-tuc'>
                    Tin tuc
                  </a>
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-white'>•</span>
                  <a className='hover:underline' href='/thu-vien'>
                    Thu vien
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='md:pl-6'>
            <h3 className='mb-5 text-lg font-extrabold text-white'>Theo doi chung toi</h3>
            <div className='flex items-center gap-4'>
              <a href='#' className='hover:opacity-90' aria-label='Facebook'>
                <Image width={40} height={40} src={BRAND_ASSETS.social.facebook} alt='Facebook' />
              </a>
              <a href='#' className='hover:opacity-90' aria-label='YouTube'>
                <Image width={40} height={40} src={BRAND_ASSETS.social.youtube} alt='YouTube' />
              </a>
              <a href='#' className='hover:opacity-90' aria-label='Zalo'>
                <Image width={40} height={40} src={BRAND_ASSETS.social.zalo} alt='Zalo' />
              </a>
            </div>
          </div>
        </div>

        <div className='mt-10 border-t border-white/30' />
        <div className='py-6 text-center text-sm text-white/80'>
          Copyright 2025 © Truc Xinh Preschool
        </div>
      </div>

      <div className='pointer-events-none absolute inset-x-0 bottom-0 translate-y-px'>
        <svg viewBox='0 0 1200 70' className='h-[64px] w-full' preserveAspectRatio='none'>
          <path
            d='M0,40 C120,10 240,70 360,40 C480,10 600,70 720,40 C840,10 960,70 1080,40 C1140,25 1180,15 1200,20 L1200,70 L0,70 Z'
            fill='#e6f5eb'
            opacity='1'
          />
          <path
            d='M0,30 C120,0 240,60 360,30 C480,0 600,60 720,30 C840,0 960,60 1080,30 C1140,15 1180,5 1200,10 L1200,70 L0,70 Z'
            fill='#d5f0e0'
            opacity='0.8'
          />
        </svg>
      </div>
    </footer>
  )
}

export default Footer
