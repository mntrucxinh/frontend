'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, Mail, Menu, Phone, X } from 'lucide-react'

import { BRAND_ASSETS, CONTACT_INFO } from '@/types/constants/infomations'
import { NAV_ITEMS } from '@/config/route'
import { Icons } from '@/components/icons'

const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileOpenKey, setMobileOpenKey] = useState<string | null>(null)

  const phoneHref = CONTACT_INFO.phone.replace(/\D+/g, '')

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setMobileOpenKey(null)
  }

  return (
    <header className='sticky top-0 z-50'>
      {/* Top contact bar - Creative Design */}
      <div className='relative w-full overflow-hidden bg-[#F78F1E] py-2.5 shadow-sm'>
        {/* Animated background pattern */}
        <div className='absolute inset-0 opacity-20'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:24px_24px]' />
        </div>

        {/* Decorative wave */}
        <div className='absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent' />

        <div className='container relative mx-auto flex flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between md:gap-4'>
          {/* Contact Info - Pill Style */}
          <div className='flex flex-wrap items-center gap-2.5 md:gap-3'>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className='group relative inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-[#33B54A] shadow-sm transition-all hover:scale-105 hover:shadow-md active:scale-95 md:px-4 md:py-2 md:text-sm'
            >
              <div className='flex size-6 items-center justify-center rounded-full bg-[#33B54A]/10 text-[#33B54A] transition-all group-hover:scale-110 group-hover:bg-[#33B54A]/20 md:size-7'>
                <Mail className='size-3.5 md:size-4' />
              </div>
              <span className='whitespace-nowrap font-semibold'>{CONTACT_INFO.email}</span>
              <div className='absolute inset-0 rounded-full bg-gradient-to-r from-[#33B54A]/0 via-[#33B54A]/20 to-[#33B54A]/0 opacity-0 blur-md transition-opacity group-hover:opacity-100' />
            </a>

            <a
              href={`tel:${phoneHref}`}
              className='group relative inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-[#33B54A] shadow-sm transition-all hover:scale-105 hover:shadow-md active:scale-95 md:px-4 md:py-2 md:text-sm'
            >
              <div className='flex size-6 items-center justify-center rounded-full bg-[#33B54A]/10 text-[#33B54A] transition-all group-hover:scale-110 group-hover:bg-[#33B54A]/20 md:size-7'>
                <Phone className='size-3.5 md:size-4' />
              </div>
              <span className='whitespace-nowrap font-semibold'>{CONTACT_INFO.phone}</span>
              <div className='absolute inset-0 rounded-full bg-gradient-to-r from-[#33B54A]/0 via-[#33B54A]/20 to-[#33B54A]/0 opacity-0 blur-md transition-opacity group-hover:opacity-100' />
            </a>
          </div>

          {/* Social Media - Floating Style (hide on mobile) */}
          <div className='hidden items-center gap-3 md:flex'>
            <span className='hidden text-xs font-semibold uppercase tracking-wider text-white/90 md:inline-block md:text-sm'>
              Kết nối:
            </span>
            <div className='flex items-center gap-2 rounded-full bg-white px-2 py-1.5 shadow-sm md:gap-2.5 md:px-3'>
              <a
                href='#'
                className='group relative flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md transition-all hover:scale-110 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg active:scale-95 md:size-9'
                aria-label='Facebook'
              >
                <Icons.facebook className='size-4 transition-transform group-hover:rotate-12 md:size-5' />
              </a>
              <a
                href='#'
                className='group relative flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md transition-all hover:scale-110 hover:from-red-600 hover:to-red-700 hover:shadow-lg active:scale-95 md:size-9'
                aria-label='YouTube'
              >
                <Icons.youtube className='size-4 transition-transform group-hover:rotate-12 md:size-5' />
              </a>
              <a
                href='#'
                className='group relative flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-md transition-all hover:scale-110 hover:from-blue-500 hover:to-blue-600 hover:shadow-lg active:scale-95 md:size-9'
                aria-label='Zalo'
              >
                <Icons.zalo className='size-4 transition-transform group-hover:rotate-12 md:size-5' />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className='bg-white shadow-md'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4 lg:h-20'>
          {/* Logo */}
          <Link
            href='/'
            className='group flex shrink-0 items-center overflow-visible transition-transform duration-200 hover:scale-[1.02]'
          >
            <div className='flex w-[120px] items-center overflow-visible lg:w-[170px]'>
              <Image
                src={BRAND_ASSETS.logo}
                width={200}
                height={200}
                alt='Trúc Xinh'
                className='h-10 w-auto origin-left translate-x-[-100px] translate-y-[10px] scale-[6] object-contain transition-transform duration-300 [clip-path:inset(30%_20%_40%_25%)] group-hover:translate-y-[6px] group-hover:scale-[6.2] lg:h-12 lg:translate-x-[-100px] lg:translate-y-[8px] lg:scale-[5] lg:group-hover:translate-y-[6px] lg:group-hover:scale-[5.2]'
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className='hidden items-center gap-7 text-[15px] font-semibold text-primary lg:flex'>
            {NAV_ITEMS.map((item) => {
              const isAnchor = item.href.startsWith('#')
              if (!item.children?.length) {
                if (isAnchor) {
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        const element = document.querySelector(item.href)
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className='relative pb-1.5 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#33B54A] after:to-[#F78F1E] after:transition-all after:duration-300 hover:text-[#33B54A] hover:after:w-full'
                    >
                      {item.label}
                    </button>
                  )
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => router.prefetch(item.href)}
                    className='relative pb-1.5 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#33B54A] after:to-[#F78F1E] after:transition-all after:duration-300 hover:text-[#33B54A] hover:after:w-full'
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <div key={item.label} className='group relative'>
                  <div className='inline-flex cursor-pointer select-none items-center gap-1.5 pb-1.5 transition-all duration-300 hover:text-[#33B54A]'>
                    {item.label}
                    <ChevronDown className='size-4 transition-transform duration-300 group-hover:rotate-180' />
                  </div>

                  {/* Dropdown */}
                  <div className='invisible absolute left-0 top-full mt-2 w-64 translate-y-2 rounded-2xl bg-white opacity-0 shadow-2xl ring-1 ring-[#33B54A]/20 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100'>
                    <div className='py-2'>
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          onMouseEnter={() => router.prefetch(c.href)}
                          className='block w-full px-5 py-2.5 text-left text-[15px] text-primary transition-all duration-200 hover:bg-gradient-to-r hover:from-[#33B54A]/10 hover:to-[#F78F1E]/10 hover:pl-6 hover:text-[#33B54A]'
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
            className='inline-flex size-10 items-center justify-center rounded-lg border border-primary/20 bg-white/50 text-primary shadow-sm transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-95 lg:hidden'
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label='Toggle menu'
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className='size-6' /> : <Menu className='size-6' />}
          </button>
        </div>

        {/* Mobile menu OVERLAY */}
        {isMenuOpen && (
          <div className='pointer-events-auto absolute inset-x-0 top-full origin-top translate-y-0 border-t border-[#33B54A]/20 bg-white opacity-100 shadow-2xl transition-all duration-300 ease-out lg:hidden'>
            <nav className='container mx-auto p-4'>
              <div className='flex flex-col gap-1 font-semibold text-gray-900'>
                {NAV_ITEMS.map((item) => {
                  const hasChildren = !!item.children?.length
                  const isOpen = mobileOpenKey === item.label
                  const isAnchor = item.href.startsWith('#')

                  if (!hasChildren) {
                    return (
                      isAnchor ? (
                        <button
                          key={item.label}
                          onClick={() => {
                            closeMobileMenu()
                            const element = document.querySelector(item.href)
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' })
                            }
                          }}
                          className='active:scale-98 w-full rounded-xl p-3.5 text-left transition-all duration-200 hover:bg-gradient-to-r hover:from-[#33B54A]/10 hover:to-[#F78F1E]/10 hover:text-[#33B54A]'
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={closeMobileMenu}
                          onMouseEnter={() => router.prefetch(item.href)}
                          className='active:scale-98 block w-full rounded-xl p-3.5 text-left transition-all duration-200 hover:bg-gradient-to-r hover:from-[#33B54A]/10 hover:to-[#F78F1E]/10 hover:text-[#33B54A]'
                        >
                          {item.label}
                        </Link>
                      )
                    )
                  }

                  return (
                    <div key={item.label} className='rounded-xl'>
                      <button
                        type='button'
                        onClick={() => setMobileOpenKey(isOpen ? null : item.label)}
                        className='active:scale-98 flex w-full items-center justify-between rounded-xl p-3.5 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#33B54A]/10 hover:to-[#F78F1E]/10 hover:text-[#33B54A]'
                        aria-expanded={isOpen}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`size-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {isOpen && (
                        <div className='pb-2 pl-4'>
                          {item.children!.map((c) => (
                            <Link
                              key={c.label}
                              href={c.href}
                              onClick={closeMobileMenu}
                              onMouseEnter={() => router.prefetch(c.href)}
                              className='active:scale-98 block w-full rounded-lg px-4 py-2.5 text-left text-[14px] text-primary transition-all duration-200 hover:bg-[#33B54A]/10 hover:pl-5 hover:text-[#33B54A]'
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
