'use client'

import type { Key } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button, Tab, Tabs } from '@heroui/react'

type IconType = React.ComponentType<{ className?: string }>

export type CustomTabItem = {
  key: string
  label: string
  icon?: IconType
}

export type ButtonProps = {
  label: string
  icon?: IconType
  onPress: () => void
}

type Props = {
  tabs: CustomTabItem[]
  button?: ButtonProps
  defaultKey: string
  queryKey?: string
  deleteQueryWhenDefault?: boolean
  className?: string
}

export default function CustomTabs({
  tabs,
  button,
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
    <div className={`flex items-center ${button ? 'justify-between' : 'justify-start'} ${className ?? ''}`}>
      <Tabs
        aria-label='Query Tabs'
        selectedKey={selected}
        onSelectionChange={onChange}
        variant='light'
        classNames={{
          base: 'w-full',
          tabList: 'gap-4 bg-transparent border-b-2 p-0 rounded-none',
          cursor: 'hidden',
          tab: [
            'group h-10 px-0 rounded-none transition-colors',
            'text-foreground/60 hover:text-foreground/80',
            'data-[selected=true]:text-primary',
            'data-[selected=true]:border-b-2 data-[selected=true]:border-primary',
          ].join(' '),
          tabContent: 'text-sm font-semibold',
        }}
      >
        {tabs.map((t) => {
          const Icon = t.icon
          const isActive = selected === t.key

          return (
            <Tab
              key={t.key}
              title={
                <div className='flex items-center gap-2 px-3'>
                  {Icon ? (
                    <Icon
                      className={[
                        'size-4 transition-colors',
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

      {button && (
        <Button color='primary' onPress={button.onPress} size='sm' className='ml-4 shrink-0'>
          <span className='flex items-center gap-2'>
            {button.icon ? <button.icon className='size-4' /> : null}
            {button.label}
          </span>
        </Button>
      )}
    </div>
  )
}
