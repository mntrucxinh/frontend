'use client'

import Image from 'next/image'
import { formatDate, formatDateTime } from '@/utils/date'
import { Button, Card, CardBody, CardHeader, Chip } from '@heroui/react'
import { FileText, Globe, ImageIcon, Info } from 'lucide-react'

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

type NewsDetailContentProps = {
  title: string
  slug: string
  excerpt?: string | null
  content_html: string
  status: 'draft' | 'published' | 'archived'
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

export default function NewsDetailContent({
  news,
  onEdit,
  onDelete,
  isDeleting,
}: {
  news: NewsDetailContentProps
  onEdit?: () => void
  onDelete?: () => void
  isDeleting?: boolean
}) {
  const status = STATUS_MAP[news.status]
  const assets = (news.content_assets ?? []).slice().sort((a, b) => a.position - b.position)
  const showMeta = Boolean(news.meta_title) || Boolean(news.meta_description)

  return (
    <div className='mx-auto mt-6 max-w-7xl space-y-6'>
      {/* ===== TIÊU ĐỀ CHÍNH ===== */}
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <h1 className='text-2xl font-semibold'>{news.title}</h1>
        <div className='flex gap-2'>
          <Button color='primary' onPress={onEdit} isDisabled={!onEdit}>
            Sua bai
          </Button>
          <Button color='warning' onPress={onDelete} isDisabled={!onDelete} isLoading={isDeleting}>
            Xoa bai
          </Button>
        </div>
      </div>

      {/* ===== 2 CỘT CHÍNH ===== */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* CỘT TRÁI: NỘI DUNG CHÍNH */}
        <div className='space-y-5 lg:col-span-2'>
          {/* Mô tả ngắn */}
          <Card shadow='none' className='border border-default-200'>
            <CardHeader className='flex items-center gap-2 border-b border-default-200 pb-2'>
              <FileText className='size-4 text-default-500' />
              <h2 className='text-base font-medium'>Mô tả ngắn</h2>
            </CardHeader>
            <CardBody>
              <p className='text-justify text-sm text-default-700'>{news.excerpt || '—'}</p>
            </CardBody>
          </Card>

          {/* Nội dung */}
          <Card shadow='none' className='border border-default-200'>
            <CardHeader className='flex items-center gap-2 border-b border-default-200 pb-2'>
              <FileText className='size-4 text-default-500' />
              <h2 className='text-base font-medium'>Nội dung</h2>
            </CardHeader>
            <CardBody>
              <article
                className='prose prose-neutral max-w-none text-justify text-sm text-default-700'
                dangerouslySetInnerHTML={{ __html: news.content_html }}
              />
            </CardBody>
          </Card>

          {/* Hình ảnh */}
          <Card shadow='none' className='border border-default-200'>
            <CardHeader className='flex items-center gap-2 border-b border-default-200 pb-2'>
              <ImageIcon className='size-4 text-default-500' />
              <h2 className='text-base font-medium'>Hình ảnh ({assets.length})</h2>
            </CardHeader>

            <CardBody>
              {assets.length === 0 ? (
                <p className='text-sm text-default-500'>Không có hình ảnh nào</p>
              ) : (
                <div className='grid gap-4 sm:grid-cols-2'>
                  {assets.slice(0, 4).map(({ asset, caption }, idx) => {
                    const isFourth = idx === 3
                    const remaining = assets.length - 4

                    return (
                      <figure
                        key={asset.id}
                        className='relative aspect-[4/3] overflow-hidden rounded-lg border border-default-200 bg-default-50'
                      >
                        <Image
                          src={asset.url}
                          alt={caption || news.title}
                          fill
                          className={`object-cover ${isFourth && remaining > 0 ? 'brightness-75' : ''}`}
                        />

                        {/* caption */}
                        <figcaption className='absolute bottom-0 w-full bg-black/40 p-1 text-center text-xs text-white backdrop-blur-sm'>
                          {caption || `Hình ảnh ${idx + 1}`}
                        </figcaption>

                        {/* overlay +n ở ảnh thứ 4 nếu còn dư */}
                        {isFourth && remaining > 0 && (
                          <div className='absolute inset-0 flex items-center justify-center bg-black/40'>
                            <span className='text-3xl font-semibold text-white'>+{remaining}</span>
                          </div>
                        )}
                      </figure>
                    )
                  })}
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* CỘT PHẢI: THÔNG TIN SEO + KHÁC */}
        <div className='space-y-5'>
          {/* Thông tin SEO */}
          {showMeta && (
            <Card shadow='none' className='border border-default-200'>
              <CardHeader className='flex items-center gap-2 border-b border-default-200 pb-2'>
                <Globe className='size-4 text-default-500' />
                <h2 className='text-base font-medium'>Thông tin SEO</h2>
              </CardHeader>
              <CardBody className='space-y-3 text-sm text-default-700'>
                <div>
                  <p className='font-medium text-default-800'>Tiêu đề hiển thị trên Google</p>
                  <p>{news.meta_title || '—'}</p>
                </div>
                <div>
                  <p className='font-medium text-default-800'>Mô tả hiển thị trên Google</p>
                  <p>{news.meta_description || '—'}</p>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Thông tin khác */}
          <Card shadow='none' className='border border-default-200'>
            <CardHeader className='flex items-center gap-2 border-b border-default-200 pb-2'>
              <Info className='size-4 text-default-500' />
              <h2 className='text-base font-medium'>Thông tin khác</h2>
            </CardHeader>

            <CardBody className='space-y-3 text-sm text-default-700'>
              <div>
                <span className='font-medium text-default-800'>Trạng thái:</span>{' '}
                <Chip color={status.color} size='sm' variant='flat'>
                  {status.label}
                </Chip>
              </div>

              <div>
                <span className='font-medium text-default-800'>Số lượng tệp tin:</span>{' '}
                {assets.length || 0} hình ảnh & video
              </div>

              <div>
                <span className='font-medium text-default-800'>Ngày xuất bản:</span>{' '}
                {formatDate(news.published_at)}
              </div>

              <div>
                <span className='font-medium text-default-800'>Cập nhật gần nhất:</span>{' '}
                {formatDateTime(news.updated_at)}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
