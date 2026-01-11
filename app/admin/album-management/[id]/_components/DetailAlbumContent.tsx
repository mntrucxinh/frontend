'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import { formatDateTime } from '@/utils/date'
import { Card, CardBody, Chip, Divider } from '@heroui/react'

export type Asset = {
  id: number
  public_id: string
  url: string
  mime_type: string
  byte_size: number
  width: number
  height: number
}

export type AlbumItemAsset = {
  position: number
  caption: string
  asset: Asset
}

export type AlbumVideo = {
  position: number
  video: Record<string, any>
}

export type AlbumStatus = 'draft' | 'published' | 'archived'

export type AlbumDetail = {
  id: number | string
  public_id: string
  title: string
  slug: string
  description?: string
  status: AlbumStatus
  cover?: Asset | null
  items?: AlbumItemAsset[]
  videos?: AlbumVideo[]
  item_count?: number
  image_count?: number
  video_count?: number
  created_by?: number
  created_at?: string
  updated_at?: string
}

const getVideoUrl = (v: any): string | null => {
  if (!v) return null
  if (typeof v.url === 'string') return v.url
  if (typeof v.src === 'string') return v.src
  if (typeof v.link === 'string') return v.link
  return null
}

const ALBUM_STATUS_LABEL: Record<AlbumStatus, string> = {
  draft: 'Nháp',
  published: 'Công khai',
  archived: 'Lưu trữ',
}

const ALBUM_STATUS_COLOR: Record<AlbumStatus, 'default' | 'success' | 'warning'> = {
  draft: 'default',
  published: 'success',
  archived: 'warning',
}

export default function DetailAlbumContent({ album }: { album: AlbumDetail }) {
  const images = album.items ?? []
  const videos = album.videos ?? []

  const counts = useMemo(() => {
    const img = album.image_count ?? images.length
    const vid = album.video_count ?? videos.length
    const total = album.item_count ?? img + vid
    return { img, vid, total }
  }, [album.image_count, album.video_count, album.item_count, images.length, videos.length])

  return (
    <div className='space-y-6'>
      {/* Cover */}
      <Card className='overflow-hidden'>
        <CardBody className='p-0'>
          <div className='relative aspect-[21/9] w-full bg-default-100'>
            {album.cover?.url ? (
              <Image
                src={album.cover.url}
                alt='cover'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 1200px'
                priority={false}
              />
            ) : (
              <div className='flex size-full items-center justify-center text-sm text-default-500'>
                Chưa có ảnh bìa
              </div>
            )}

            <div className='absolute inset-x-3 bottom-3 rounded-xl bg-black/45 p-3 text-white backdrop-blur'>
              <div className='line-clamp-1 text-lg font-semibold'>{album.title}</div>
              <div className='line-clamp-1 text-xs opacity-90'>
                ID: {album.id} • Slug: {album.slug}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Details (2 cột) */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <Card>
          <CardBody className='space-y-3'>
            <div className='text-base font-semibold text-default-900'>Thông tin</div>
            <Divider />

            <div className='space-y-2 text-sm'>
              <div className='flex justify-between gap-3'>
                <span className='text-default-500'>Public ID</span>
                <span className='line-clamp-1 text-default-800'>{album.public_id || '—'}</span>
              </div>

              <div className='flex justify-between gap-3'>
                <span className='text-default-500'>Trạng thái</span>
                <Chip size='sm' color={ALBUM_STATUS_COLOR[album.status]} variant='flat'>
                  {ALBUM_STATUS_LABEL[album.status]}
                </Chip>
              </div>

              <div className='flex justify-between gap-3'>
                <span className='text-default-500'>Người tạo</span>
                <span className='text-default-800'>{album.created_by ?? '—'}</span>
              </div>

              <div className='flex justify-between gap-3'>
                <span className='text-default-500'>Tạo lúc</span>
                <span className='text-default-800'>
                  {album.created_at ? formatDateTime(album.created_at) : '—'}
                </span>
              </div>

              <div className='flex justify-between gap-3'>
                <span className='text-default-500'>Cập nhật</span>
                <span className='text-default-800'>
                  {album.updated_at ? formatDateTime(album.updated_at) : '—'}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className='space-y-3'>
            <div className='text-base font-semibold text-default-900'>Mô tả</div>
            <Divider />
            <p className='whitespace-pre-line text-sm leading-6 text-default-700'>
              {album.description?.trim() ? album.description : 'Chưa có mô tả.'}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Media */}
      <Card>
        <CardBody className='space-y-4'>
          <div className='flex gap-2 text-base font-semibold text-default-900'>
            Ảnh trong album
            <Chip size='sm' variant='flat'>
              {counts.img} ảnh
            </Chip>
          </div>

          {images.length === 0 ? (
            <div className='rounded-xl border border-dashed p-6 text-center text-sm text-default-500'>
              Chưa có ảnh.
            </div>
          ) : (
            <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
              {images.map((it) => (
                <div
                  key={`${it.asset.public_id}-${it.position}`}
                  className='relative aspect-square overflow-hidden rounded-xl border bg-default-100'
                  title={it.caption}
                >
                  <Image
                    src={it.asset.url}
                    alt={it.caption || 'image'}
                    fill
                    className='object-cover'
                    loading='lazy'
                    sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 220px'
                    quality={60}
                  />
                  {it.caption ? (
                    <div className='absolute inset-x-0 bottom-0 line-clamp-1 bg-black/45 p-2 text-xs text-white'>
                      {it.caption}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}

          <Divider />

          <div className='flex gap-2 text-base font-semibold text-default-900'>
            Video trong album
            <Chip size='sm' variant='flat'>
              {counts.vid} video
            </Chip>
          </div>

          {videos.length === 0 ? (
            <div className='rounded-xl border border-dashed p-6 text-center text-sm text-default-500'>
              Chưa có video.
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {videos.map((v, idx) => {
                const url = getVideoUrl(v.video)
                return (
                  <div key={`video-${idx}`} className='rounded-xl border p-3'>
                    {url ? (
                      <video src={url} controls preload='metadata' className='w-full rounded-lg' />
                    ) : (
                      <div className='rounded-lg border border-dashed p-6 text-center text-sm text-default-500'>
                        Video không có url
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
