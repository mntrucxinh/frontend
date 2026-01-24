'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate, formatDateTime } from '@/utils/date'
import { buildAssetUrl } from '@/utils/api-url'
import { Button, Card, CardBody, CardHeader, Chip, Divider } from '@heroui/react'
import { FileText, Globe, ImageIcon, Edit, Trash2, Eye, Copy, Check, Calendar, Clock, Info, Users } from 'lucide-react'
import { addToast } from '@heroui/react'

import type { BlockCode } from '@/types/admin-announcement'

type ContentAsset = {
  position: number
  caption?: string | null
  asset: {
    id: number
    public_id: string
    url: string
    mime_type: string
    byte_size?: number | null
    width?: number | null
    height?: number | null
  }
}

type AnnouncementDetailContentProps = {
  title: string
  slug: string
  excerpt?: string | null
  content_html: string
  status: 'draft' | 'published' | 'archived'
  block_code: BlockCode
  block_name?: string | null
  meta_title?: string | null
  meta_description?: string | null
  content_assets?: ContentAsset[] | null
  published_at?: string | null
  created_at: string
  updated_at: string
}

const STATUS_MAP = {
  draft: { label: 'Nháp', color: 'warning' },
  published: { label: 'Công khai', color: 'success' },
  archived: { label: 'Lưu trữ', color: 'default' },
} as const

const BLOCK_MAP: Record<BlockCode, { label: string; color: 'primary' | 'secondary' | 'success' | 'warning' | 'default' }> = {
  bee: { label: 'Bee', color: 'warning' },
  mouse: { label: 'Mouse', color: 'primary' },
  bear: { label: 'Bear', color: 'secondary' },
  dolphin: { label: 'Dolphin', color: 'success' },
}

export default function AnnouncementDetailContent({
  announcement,
  onEdit,
  onDelete,
  isDeleting,
}: {
  announcement: AnnouncementDetailContentProps
  onEdit?: () => void
  onDelete?: () => void
  isDeleting?: boolean
}) {
  const status = STATUS_MAP[announcement.status]
  const block = BLOCK_MAP[announcement.block_code]
  const assets = (announcement.content_assets ?? []).slice().sort((a, b) => a.position - b.position)
  const showMeta = Boolean(announcement.meta_title) || Boolean(announcement.meta_description)
  const [copied, setCopied] = useState(false)

  const previewUrl = `/notice/${announcement.slug}`

  const handleCopySlug = async () => {
    try {
      await navigator.clipboard.writeText(announcement.slug)
      setCopied(true)
      addToast({
        color: 'success',
        title: 'Đã sao chép',
        description: 'Đã sao chép slug vào clipboard',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      addToast({
        color: 'danger',
        title: 'Lỗi',
        description: 'Không thể sao chép',
      })
    }
  }

  return (
    <div className='mx-auto max-w-[1400px] space-y-6 p-6'>
      {/* ===== HEADER ===== */}
      <Card shadow='sm' className='border border-default-200 bg-gradient-to-r from-default-50 to-white'>
        <CardBody className='p-6'>
          <div className='flex flex-col gap-5'>
            {/* Title và Status */}
            <div className='flex flex-wrap items-start justify-between gap-4'>
              <div className='flex-1 min-w-0'>
                <h1 className='text-2xl font-bold text-foreground mb-3 leading-tight'>{announcement.title}</h1>
                <div className='flex items-center gap-3 flex-wrap'>
                  <Chip color={status.color} size='md' variant='flat' className='font-medium'>
                    {status.label}
                  </Chip>
                  <Chip color={block.color} size='md' variant='flat' className='font-medium'>
                    {announcement.block_name || block.label}
                  </Chip>
                  {announcement.status === 'published' && (
                    <Link
                      href={previewUrl}
                      target='_blank'
                      className='text-sm text-primary hover:underline flex items-center gap-1.5 transition-colors'
                    >
                      <Eye className='size-3.5' />
                      Xem trên website
                    </Link>
                  )}
                </div>
              </div>
              <div className='flex gap-2 shrink-0'>
                <Button
                  color='primary'
                  variant='flat'
                  startContent={<Edit className='size-4' />}
                  onPress={onEdit}
                  isDisabled={!onEdit}
                  size='md'
                >
                  Sửa thông báo
                </Button>
                <Button
                  color='danger'
                  variant='flat'
                  startContent={<Trash2 className='size-4' />}
                  onPress={onDelete}
                  isDisabled={!onDelete}
                  isLoading={isDeleting}
                  size='md'
                >
                  Xóa thông báo
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ===== 2 CỘT CHÍNH ===== */}
      <div className='grid gap-6 lg:grid-cols-12'>
        {/* CỘT TRÁI: NỘI DUNG CHÍNH */}
        <div className='space-y-6 lg:col-span-8'>
          {/* Mô tả ngắn */}
          {announcement.excerpt && (
            <Card shadow='sm' className='border border-default-200'>
              <CardHeader className='flex items-center gap-2.5 border-b border-default-200 pb-3 px-5 pt-5'>
                <FileText className='size-4.5 text-default-500' />
                <h2 className='text-base font-semibold text-default-800'>Mô tả ngắn</h2>
              </CardHeader>
              <CardBody className='p-5'>
                <p className='text-justify text-sm leading-relaxed text-default-700'>{announcement.excerpt}</p>
              </CardBody>
            </Card>
          )}

          {/* Nội dung */}
          <Card shadow='sm' className='border border-default-200'>
            <CardHeader className='flex items-center gap-2.5 border-b border-default-200 pb-3 px-5 pt-5'>
              <FileText className='size-4.5 text-default-500' />
              <h2 className='text-base font-semibold text-default-800'>Nội dung</h2>
            </CardHeader>
            <CardBody className='p-5'>
              <article
                className='prose prose-neutral prose-sm max-w-none text-justify text-default-700 prose-headings:text-default-900 prose-headings:font-semibold prose-p:leading-relaxed prose-p:mb-4 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-default-900 prose-ul:list-disc prose-ol:list-decimal prose-li:my-1.5'
                dangerouslySetInnerHTML={{ __html: announcement.content_html }}
              />
            </CardBody>
          </Card>

          {/* Hình ảnh & Video */}
          {assets.length > 0 && (
            <Card shadow='sm' className='border border-default-200'>
              <CardHeader className='flex items-center gap-2.5 border-b border-default-200 pb-3 px-5 pt-5'>
                <ImageIcon className='size-4.5 text-default-500' />
                <h2 className='text-base font-semibold text-default-800'>
                  Tệp đính kèm ({assets.length})
                </h2>
              </CardHeader>

              <CardBody className='p-5'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  {assets.map(({ asset, caption }) => {
                    const isImage = asset.mime_type?.startsWith('image/')
                    const isVideo = asset.mime_type?.startsWith('video/')
                    const assetUrl = buildAssetUrl(asset.url)

                    return (
                      <figure
                        key={asset.id}
                        className='relative aspect-[4/3] overflow-hidden rounded-lg border border-default-200 bg-default-50 group shadow-sm hover:shadow-md transition-shadow'
                      >
                        {isVideo ? (
                          <video
                            src={assetUrl}
                            className='size-full object-cover'
                            controls
                            preload='metadata'
                          />
                        ) : (
                          <Image
                            src={assetUrl}
                            alt={caption || announcement.title}
                            fill
                            className='object-cover transition-transform duration-300 group-hover:scale-105'
                            unoptimized
                          />
                        )}

                        {/* caption */}
                        {caption && (
                          <figcaption className='absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-3 text-xs text-white leading-relaxed'>
                            {caption}
                          </figcaption>
                        )}

                        {/* Video indicator */}
                        {isVideo && (
                          <div className='absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full p-2'>
                            <div className='size-2.5 bg-white rounded-full' />
                          </div>
                        )}
                      </figure>
                    )
                  })}
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* CỘT PHẢI: THÔNG TIN SEO + THÔNG TIN KHÁC */}
        <div className='space-y-6 lg:col-span-4'>
          {/* Thông tin SEO */}
          {showMeta ? (
            <Card shadow='sm' className='border border-default-200'>
              <CardHeader className='flex items-center gap-2.5 border-b border-default-200 pb-3 px-5 pt-5'>
                <Globe className='size-4.5 text-default-500' />
                <h2 className='text-base font-semibold text-default-800'>Thông tin SEO</h2>
              </CardHeader>
              <CardBody className='p-5 space-y-4'>
                <div>
                  <p className='font-semibold text-default-800 mb-2 text-sm'>Meta Title</p>
                  <p className='text-sm text-default-600 break-words leading-relaxed'>
                    {announcement.meta_title || '—'}
                  </p>
                </div>
                <Divider className='my-2' />
                <div>
                  <p className='font-semibold text-default-800 mb-2 text-sm'>Meta Description</p>
                  <p className='text-sm text-default-600 break-words leading-relaxed'>
                    {announcement.meta_description || '—'}
                  </p>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card shadow='sm' className='border border-default-200'>
              <CardBody className='px-5 py-8 text-center'>
                <Globe className='size-8 text-default-300 mx-auto mb-2' />
                <p className='text-sm text-default-500'>Chưa có thông tin SEO</p>
              </CardBody>
            </Card>
          )}

          {/* Thông tin chi tiết */}
          <Card shadow='sm' className='border border-default-200'>
            <CardHeader className='flex items-center gap-2.5 border-b border-default-200 pb-3 px-5 pt-5'>
              <Info className='size-4.5 text-default-500' />
              <h2 className='text-base font-semibold text-default-800'>Thông tin chi tiết</h2>
            </CardHeader>
            <CardBody className='p-5 space-y-4'>
              <div className='flex items-start gap-3'>
                <div className='shrink-0 mt-0.5'>
                  <Users className='size-4 text-default-400' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs text-default-500 mb-1'>Khối</p>
                  <Chip color={block.color} size='sm' variant='flat' className='font-medium'>
                    {announcement.block_name || block.label}
                  </Chip>
                </div>
              </div>

              <Divider className='my-2' />

              <div className='flex items-start gap-3'>
                <div className='shrink-0 mt-0.5'>
                  <Calendar className='size-4 text-default-400' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs text-default-500 mb-1'>Ngày xuất bản</p>
                  <p className='text-sm font-semibold text-default-700'>
                    {formatDate(announcement.published_at) || 'Chưa xuất bản'}
                  </p>
                </div>
              </div>

              <Divider className='my-2' />

              <div className='flex items-start gap-3'>
                <div className='shrink-0 mt-0.5'>
                  <Clock className='size-4 text-default-400' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs text-default-500 mb-1'>Cập nhật lần cuối</p>
                  <p className='text-sm font-semibold text-default-700'>{formatDateTime(announcement.updated_at)}</p>
                </div>
              </div>

              <Divider className='my-2' />

              <div className='flex items-start gap-3'>
                <div className='shrink-0 mt-0.5'>
                  <ImageIcon className='size-4 text-default-400' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs text-default-500 mb-1'>Tệp đính kèm</p>
                  <p className='text-sm font-semibold text-default-700'>{assets.length} file(s)</p>
                </div>
              </div>

              <Divider className='my-2' />

              <div className='flex items-start gap-3'>
                <div className='shrink-0 mt-0.5'>
                  <FileText className='size-4 text-default-400' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs text-default-500 mb-1'>Slug</p>
                  <div className='flex items-center gap-1.5'>
                    <p className='text-sm font-semibold text-default-700 truncate flex-1'>{announcement.slug}</p>
                    <Button
                      isIconOnly
                      size='sm'
                      variant='light'
                      onPress={handleCopySlug}
                      className='min-w-7 h-7 shrink-0'
                    >
                      {copied ? <Check className='size-3.5 text-success' /> : <Copy className='size-3.5' />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

