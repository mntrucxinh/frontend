"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { BRAND_ASSETS, CONTACT_INFO } from "@/assets/infomations"
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react"
import { NAV_ITEMS } from "@/constants/routes"

const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileOpenKey, setMobileOpenKey] = useState<string | null>(null)

  const phoneHref = CONTACT_INFO.phone.replace(/\D+/g, "")

  const handleNavigation = (href: string) => {
    // Đóng tất cả menu trước khi chuyển trang
    setIsMenuOpen(false)
    setMobileOpenKey(null)
    
    // Thực hiện chuyển trang bằng router.push
    router.push(href)
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setMobileOpenKey(null)
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top contact bar */}
      <div className="w-full bg-primary text-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
          <div className="flex flex-col leading-tight text-white gap-1">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="inline-flex items-center gap-2 hover:opacity-90"
            >
              <Mail className="w-4 h-4" />
              {CONTACT_INFO.email}
            </a>
            <a
              href={`tel:${phoneHref}`}
              className="inline-flex items-center gap-2 hover:opacity-90"
            >
              <Phone className="w-4 h-4" />
              {CONTACT_INFO.phone}
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <span className="text-base font-semibold">Theo dõi</span>
            <a href="#" className="hover:opacity-90">
              <img
                src={BRAND_ASSETS.social.facebook}
                alt="Facebook"
                className="w-8 h-8"
              />
            </a>
            <a href="#" className="hover:opacity-90">
              <img
                src={BRAND_ASSETS.social.youtube}
                alt="YouTube"
                className="w-8 h-8"
              />
            </a>
            <a href="#" className="hover:opacity-90">
              <img
                src={BRAND_ASSETS.social.zalo}
                alt="Zalo"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white shadow-sm">
        {/* main bar height fixed */}
        <div className="container mx-auto px-4 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleNavigation("/")} 
            className="flex items-center flex-shrink-0 cursor-pointer"
          >
            <div className="w-[120px] lg:w-[170px] flex items-center overflow-visible">
              <img
                src={BRAND_ASSETS.logo}
                alt="Trúc Xinh"
                className="
                  h-10 lg:h-12 w-auto object-contain
                  origin-left
                  scale-[6] lg:scale-[5]
                  -translate-x-[100px] lg:-translate-x-[100px]
                  translate-y-[10px] lg:translate-y-[8px]
                  [clip-path:inset(30%_20%_40%_25%)]
                "
              />
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 text-[15px] font-semibold text-primary">
            {NAV_ITEMS.map((item) => {
              if (!item.children?.length) {
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className="hover:text-primary/70 transition-colors"
                  >
                    {item.label}
                  </button>
                )
              }

              return (
                <div key={item.label} className="relative group">
                  <div
                    className="inline-flex items-center gap-1 hover:text-primary/70 transition-colors cursor-pointer select-none"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </div>

                  {/* Dropdown */}
                  <div
                    className="
                      absolute left-0 top-full mt-3 w-64
                      rounded-xl bg-white shadow-lg ring-1 ring-black/5
                      opacity-0 invisible translate-y-2
                      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                      transition-all duration-200 ease-out
                    "
                  >
                    <div className="py-2">
                      {item.children.map((c) => (
                        <button
                          key={c.label}
                          onClick={() => handleNavigation(c.href)}
                          className="w-full text-left block px-4 py-2 hover:bg-primary/5 transition-colors"
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="
              lg:hidden inline-flex items-center justify-center
              w-10 h-10 rounded-full
              border border-primary/25 text-primary
              hover:bg-primary/5 active:scale-95 transition
            "
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu OVERLAY (không làm header cao lên) */}
        <div
          className={`lg:hidden absolute left-0 right-0 top-full bg-white shadow-lg border-t transform transition-all duration-300 ease-out origin-top ${
            isMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <nav className="container mx-auto px-4 py-3">
            <div className="flex flex-col gap-1 text-primary font-semibold">
              {NAV_ITEMS.map((item) => {
                const hasChildren = !!item.children?.length
                const isOpen = mobileOpenKey === item.label

                if (!hasChildren) {
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavigation(item.href)}
                      className="text-left px-3 py-3 rounded-lg hover:bg-primary/5 font-semibold text-primary"
                    >
                      {item.label}
                    </button>
                  )
                }

                return (
                  <div key={item.label} className="rounded-lg">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileOpenKey(isOpen ? null : item.label)
                      }
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-primary/5 transition"
                      aria-expanded={isOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="pl-3 pb-2">
                        {item.children!.map((c) => (
                          <button
                            key={c.label}
                            onClick={() => handleNavigation(c.href)}
                            className="text-left py-2 text-sm text-primary/80 hover:text-primary"
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

