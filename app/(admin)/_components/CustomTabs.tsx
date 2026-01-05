'use client'

import type { Key } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Tab, Tabs } from '@heroui/react'

type IconType = React.ComponentType<{ className?: string }>

export type CustomTabItem = {
  key: string
  label: string
  icon?: IconType
}

type Props = {
  tabs: CustomTabItem[]
  defaultKey: string
  queryKey?: string
  deleteQueryWhenDefault?: boolean
  className?: string
}

export default function CustomTabs({
  tabs,
  defaultKey,
  queryKey = 'tab',
  deleteQueryWhenDefault = true,
  className,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const allowedKeys = new Set(tabs.map((t) => t.key))
  const raw = searchParams.get(queryKey)
  const selected = raw && allowedKeys.has(raw) ? raw : defaultKey

  const onChange = (key: Key) => {
    const next = String(key)

    const params = new URLSearchParams(searchParams.toString())
    if (deleteQueryWhenDefault && next === defaultKey) params.delete(queryKey)
    else params.set(queryKey, next)

    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  return (
    <div className={className}>
      <div className='w-full border-b border-default-200'>
        <Tabs
          aria-label='Query Tabs'
          selectedKey={selected}
          onSelectionChange={onChange}
          variant='light'
          classNames={{
            base: 'w-fit',
            tabList: 'relative gap-6 bg-transparent p-0 rounded-none',
            cursor: 'hidden',
            tab: [
              'group relative h-11 px-0 rounded-none transition-colors',
              'text-foreground/60 hover:text-foreground/80',
              'data-[selected=true]:text-primary',
              'data-[selected=true]:border-b-2 data-[selected=true]:border-primary',
            ].join(' '),
            tabContent: 'text-base font-semibold',
          }}
        >
          {tabs.map((t) => {
            const Icon = t.icon
            const isActive = selected === t.key

            return (
              <Tab
                key={t.key}
                title={
                  <div className='flex items-center gap-2 px-4'>
                    {Icon ? (
                      <Icon
                        className={[
                          'size-5 transition-colors',
                          isActive
                            ? 'text-primary'
                            : 'text-foreground/60 group-hover:text-foreground/80',
                        ].join(' ')}
                      />
                    ) : null}

                    <span
                      className={[
                        'transition-colors',
                        isActive
                          ? 'text-primary'
                          : 'text-foreground/60 group-hover:text-foreground/80',
                      ].join(' ')}
                    >
                      {t.label}
                    </span>
                  </div>
                }
              />
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}
