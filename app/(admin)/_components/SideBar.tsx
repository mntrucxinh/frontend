'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Accordion,
  AccordionItem,
  cn,
  Tooltip,
  type AccordionItemIndicatorProps,
} from '@heroui/react'
import { ChevronLeft, ChevronRight, Dot } from 'lucide-react'

import { MAIN_SIDEBAR_ITEMS, type SidebarItem } from '@/types/constants/sidebar-items'

const Indicator = ({ isOpen = false }: AccordionItemIndicatorProps) => {
  return isOpen ? (
    <ChevronLeft className='size-5 text-foreground' />
  ) : (
    <ChevronRight className='size-5 text-foreground' />
  )
}

const MainSidebar = () => {
  const pathName = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  const expandedKeys = useMemo(() => {
    return MAIN_SIDEBAR_ITEMS.filter((sideBarItem) =>
      sideBarItem.items?.some((subItem) => subItem.path === pathName)
    ).map((sideBarItem) => sideBarItem.label)
  }, [pathName])

  const itemTextClass = (isActive: boolean) =>
    cn('text-white/80 transition-colors group-hover:text-white', isActive && 'text-white')

  const renderIcon = (icon: React.ReactNode, isActive: boolean) => {
    const classes = cn('size-5', itemTextClass(isActive))

    if (React.isValidElement(icon)) {
      const existing = (icon.props as { className?: string })?.className
      return React.cloneElement(icon, { className: cn(existing, classes) } as any)
    }

    return <span className={classes}>{icon}</span>
  }

  const renderSidebarItem = (item: SidebarItem, index: number, keyPrefix = ''): React.ReactNode => {
    const key = `${keyPrefix}${item.label}-${item.path ?? 'group'}-${index}`

    const isActive = item.path
      ? pathName === item.path
      : !!item.items?.some((sub) => sub.path === pathName)

    // Item có path => Link
    if (item.path) {
      return (
        <Tooltip
          key={key}
          radius='sm'
          closeDelay={250}
          color='foreground'
          content={item.label}
          className={cn(isExpanded && 'hidden')}
        >
          <Link
            href={item.path}
            className={cn(
              'group flex items-center whitespace-nowrap rounded-xl px-3 py-2 transition',
              'text-white/75',
              'hover:bg-white/15 hover:text-white',
              isActive && 'bg-white/20 text-white shadow-sm ring-1 ring-white/20',
              isExpanded ? 'justify-start gap-3' : 'justify-center'
            )}
          >
            <span className='shrink-0'>
              {item.icon ? (
                renderIcon(item.icon, isActive)
              ) : (
                <Dot className={cn('size-4', itemTextClass(isActive))} />
              )}
            </span>

            <span
              className={cn(
                'text-sm font-medium tracking-wide',
                !isExpanded && 'hidden',
                itemTextClass(isActive)
              )}
            >
              {item.label}
            </span>
          </Link>
        </Tooltip>
      )
    }

    // Item dạng group => Accordion
    return (
      <Tooltip
        key={key}
        radius='sm'
        closeDelay={250}
        color='foreground'
        content={item.label}
        className={cn(isExpanded && 'hidden')}
      >
        <Accordion defaultExpandedKeys={expandedKeys} className='px-0'>
          <AccordionItem
            key={item.label}
            classNames={{
              title: cn(
                'whitespace-nowrap text-sm font-medium tracking-wide transition-colors',
                itemTextClass(isActive),
                !isExpanded && 'w-0 opacity-0'
              ),
              trigger: cn(
                'group gap-2 rounded-xl py-0 transition',
                'hover:bg-white/15',
                isActive && 'bg-white/20 shadow-sm ring-1 ring-white/20'
              ),
              heading: 'p-2 group',
              content: cn('space-y-2', isExpanded ? 'ml-2' : 'py-0'),
              indicator: cn(!isExpanded && 'hidden'),
            }}
            title={item.label}
            startContent={
              <span className='shrink-0'>
                {item.icon ? (
                  renderIcon(item.icon, isActive)
                ) : (
                  <Dot className={cn('size-4', itemTextClass(isActive))} />
                )}
              </span>
            }
            indicator={Indicator}
          >
            {isExpanded &&
              item.items?.map((subItem, i) => renderSidebarItem(subItem, i, `${key}-`))}
          </AccordionItem>
        </Accordion>
      </Tooltip>
    )
  }

  return (
    <div
      className={cn(
        'relative flex h-full min-h-0 w-[200px] flex-col border-r px-2 pt-2 transition-all duration-300',
        'border-default-200/30 bg-gradient-to-b from-primary/95 via-primary to-primary/90',
        'dark:border-default-100/20',
        !isExpanded && 'w-14'
      )}
    >
      <div
        className={cn(
          'absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border p-2 transition',
          'border-white/20 bg-primary/90 shadow-sm hover:bg-primary'
        )}
        role='button'
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        onClick={() => setIsExpanded((v) => !v)}
      >
        {isExpanded ? (
          <ChevronLeft className='size-5 text-white' />
        ) : (
          <ChevronRight className='size-5 text-white' />
        )}
      </div>

      {/* List scroll riêng khi dài */}
      <div className='my-2 flex min-h-0 flex-1 flex-col space-y-2 overflow-y-auto overflow-x-hidden px-0.5 [&>p]:hidden'>
        {MAIN_SIDEBAR_ITEMS.map((item, idx) => renderSidebarItem(item, idx))}
      </div>
    </div>
  )
}

export default MainSidebar
