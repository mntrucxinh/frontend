'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

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

export function SidebarNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'general'

  return (
    <div className="border rounded-lg p-4 bg-card">
        <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
        <nav className='flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'>
        {sidebarNavItems.map((item) => (
            <Link
            key={item.href}
            href={item.href}
            className={cn(
                buttonVariants({ variant: 'ghost' }),
                type === item.type
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'hover:bg-accent hover:text-accent-foreground',
                'justify-start'
            )}
            >
            {item.title}
            </Link>
        ))}
        </nav>
    </div>
  )
}