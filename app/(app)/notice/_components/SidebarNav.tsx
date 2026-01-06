'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const sidebarNavItems = [
  {
    title: 'Thông báo chung',
    href: '/notice?type=general',
    type: 'general',
  },
  {
    title: 'Khối Bee (Nhà trẻ)',
    href: '/notice?type=bee',
    type: 'bee',
  },
  {
    title: 'Khối Mouse (Mầm)',
    href: '/notice?type=mouse',
    type: 'mouse',
  },
  {
    title: 'Khối Bear (Chồi)',
    href: '/notice?type=bear',
    type: 'bear',
  },
  {
    title: 'Khối Dolphin (Lá)',
    href: '/notice?type=dolphin',
    type: 'dolphin',
  },
]

export default function SidebarNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'general'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200/50"
    >
      <h3 className="text-xl font-black text-gray-900 mb-6">Danh mục</h3>
      <nav className='flex flex-col space-y-2'>
        {sidebarNavItems.map((item, index) => {
          const isActive = type === item.type
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className={cn(
                  'relative block px-4 py-3 rounded-xl font-semibold transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-r from-[#33B54A] to-[#2EA043] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#33B54A]'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#33B54A] to-[#2EA043]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.title}</span>
              </Link>
            </motion.div>
          )
        })}
      </nav>
    </motion.div>
  )
}