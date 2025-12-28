'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BRAND_ASSETS, CONTACT_INFO } from '@/constants/infomations'
import { NAV_ITEMS } from '@/constants/routes'
import { ChevronDown, Mail, Menu, Phone, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileOpenKey, setMobileOpenKey] = useState<string | null>(null)

  const phoneHref = CONTACT_INFO.phone.replace(/\D+/g, '')

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setMobileOpenKey(null)
  }

  return (
    <header className='sticky top-0 z-50 bg-white'>
      {/* Top contact bar */}
      <div className='w-full bg-primary text-white'>
        <div className='container mx-auto flex items-center justify-between px-4 py-2 text-sm'>
          <div className='flex flex-col gap-1 leading-tight text-white'>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className='inline-flex items-center gap-2 hover:opacity-90'
            >
              <Mail className='size-4' />
              {CONTACT_INFO.email}
            </a>
            <a
              href={`tel:${phoneHref}`}
              className='inline-flex items-center gap-2 hover:opacity-90'
            >
              <Phone className='size-4' />
              {CONTACT_INFO.phone}
            </a>
          </div>

          <div className='hidden items-center gap-4 md:flex'>
            <span className='text-base font-semibold'>Theo dõi</span>
            <a href='#' className='hover:opacity-90'>
              <Image width={32} height={32} src={BRAND_ASSETS.social.facebook} alt='Facebook' />
            </a>
            <a href='#' className='hover:opacity-90'>
              <Image width={32} height={32} src={BRAND_ASSETS.social.youtube} alt='YouTube' />
            </a>
            <a href='#' className='hover:opacity-90'>
              <Image width={32} height={32} src={BRAND_ASSETS.social.zalo} alt='Zalo' />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className='bg-white shadow-sm'>
        {/* main bar height fixed */}
        <div className='container mx-auto flex h-16 items-center justify-between px-4 lg:h-20'>
          {/* Logo */}
          <Link href='/' className='flex shrink-0 items-center overflow-visible'>
            <div className='flex w-[120px] items-center overflow-visible lg:w-[170px]'>
              <Image
                src={BRAND_ASSETS.logo}
                width={200}
                height={200}
                alt='Trúc Xinh'
                className='h-10 w-auto origin-left -translate-x-[100px] translate-y-[10px] scale-[6] object-contain [clip-path:inset(30%_20%_40%_25%)] lg:h-12 lg:-translate-x-[100px] lg:translate-y-[8px] lg:scale-[5]'
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className='hidden items-center gap-6 text-[15px] font-semibold text-primary lg:flex'>
            {NAV_ITEMS.map((item) => {
              if (!item.children?.length) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className='transition-colors hover:text-primary/70'
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <div key={item.label} className='group relative'>
                  <div className='inline-flex cursor-pointer select-none items-center gap-1 transition-colors hover:text-primary/70'>
                    {item.label}
                    <ChevronDown className='size-4 transition-transform group-hover:rotate-180' />
                  </div>

                  {/* Dropdown */}
                  <div className='invisible absolute left-0 top-full mt-3 w-64 translate-y-2 rounded-xl bg-white opacity-0 shadow-lg ring-1 ring-black/5 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100'>
                    <div className='py-2'>
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          className='block px-4 py-2 text-[15px] text-primary transition-colors hover:bg-primary/5 hover:text-primary/70'
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className='inline-flex size-10 items-center justify-center rounded-full border border-primary/25 text-primary transition hover:bg-primary/5 active:scale-95 lg:hidden'
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label='Toggle menu'
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className='size-6' /> : <Menu className='size-6' />}
          </button>
        </div>

        {/* Mobile menu OVERLAY */}
        {isMenuOpen && (
          <div className='pointer-events-auto absolute inset-x-0 top-full origin-top translate-y-0 border-t bg-white opacity-100 shadow-lg transition-all duration-300 ease-out lg:hidden'>
            <nav className='container mx-auto px-4 py-3'>
              <div className='flex flex-col gap-1 font-semibold text-primary'>
                {NAV_ITEMS.map((item) => {
                  const hasChildren = !!item.children?.length
                  const isOpen = mobileOpenKey === item.label

                  if (!hasChildren) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className='rounded-lg p-3 transition hover:bg-primary/5'
                      >
                        {item.label}
                      </Link>
                    )
                  }

                  return (
                    <div key={item.label} className='rounded-lg'>
                      <button
                        type='button'
                        onClick={() => setMobileOpenKey(isOpen ? null : item.label)}
                        className='flex w-full items-center justify-between rounded-lg p-3 transition hover:bg-primary/5'
                        aria-expanded={isOpen}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`size-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {isOpen && (
                        <div className='pb-2 pl-3'>
                          {item.children!.map((c) => (
                            <Link
                              key={c.label}
                              href={c.href}
                              onClick={closeMobileMenu}
                              className='block rounded-lg px-3 py-2 text-[14px] text-primary transition-colors hover:bg-primary/5 hover:text-primary/70'
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
