// app/(admin)/album-management/_components/LazyRemoteVideoThumb.tsx
'use client'

import React from 'react'
import { Button } from '@heroui/react'
import { X } from 'lucide-react'

import { useInView } from '../../../hook/video-image/useInView'

export default function LazyRemoteVideoThumb({
  src,
  onRemove,
  label,
}: {
  src: string | null
  onRemove: () => void
  label?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '200px' })

  return (
    <div ref={ref} className='relative aspect-square overflow-hidden rounded-xl border'>
      {!inView ? (
        <div className='flex size-full items-center justify-center bg-default-50 text-xs text-default-500'>
          Đang tải...
        </div>
      ) : src ? (
        <video src={src} className='size-full object-cover' controls preload='metadata' />
      ) : (
        <div className='flex size-full items-center justify-center text-xs text-default-500'>
          Video (no url)
        </div>
      )}

      {label && (
        <div className='absolute bottom-1 left-1 line-clamp-1 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white'>
          {label}
        </div>
      )}

      <Button
        isIconOnly
        color='danger'
        radius='full'
        className='absolute right-2 top-2 size-6 min-w-0'
        onPress={onRemove}
      >
        <X className='size-4 text-white' />
      </Button>
    </div>
  )
}
