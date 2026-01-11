'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Button } from '@heroui/react'
import { X } from 'lucide-react'

import { useInView } from '../../../hook/video-image/useInView'

type Props = {
  file: File
  onRemove: () => void
  label?: string
}

export default function LazyMediaThumb({ file, onRemove, label }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '200px' })
  const [url, setUrl] = useState<string>('')

  const isVideo = useMemo(() => file.type.startsWith('video'), [file.type])

  // ✅ Chỉ tạo blob url khi gần viewport
  useEffect(() => {
    if (!inView || url) return

    const u = URL.createObjectURL(file)
    setUrl(u)

    return () => {
      URL.revokeObjectURL(u)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, file])

  return (
    <div ref={ref} className='relative aspect-square overflow-hidden rounded-xl border'>
      {!url ? (
        <div className='flex size-full items-center justify-center bg-default-50 text-xs text-default-500'>
          Đang tải...
        </div>
      ) : isVideo ? (
        <video src={url} className='size-full object-cover' controls preload='metadata' />
      ) : (
        <Image
          src={url}
          alt={file.name}
          fill
          className='object-cover'
          loading='lazy'
          sizes='(max-width: 1024px) 33vw, 220px'
          quality={45}
          unoptimized
        />
      )}

      {label && (
        <div className='absolute bottom-1 left-1 line-clamp-1 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white'>
          {label}
        </div>
      )}

      <Button
        onPress={onRemove}
        isIconOnly
        color='danger'
        radius='full'
        className='absolute right-2 top-2 size-6 min-w-0'
      >
        <X className='size-4 text-white' />
      </Button>
    </div>
  )
}
