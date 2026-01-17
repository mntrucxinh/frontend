'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/utils/date'
import type { TPaginationResponse } from '@/validators'
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { Eye, Image as ImageIcon, MoreVertical, Pencil, Trash2 } from 'lucide-react'

import ConfirmModal from '@/components/ConfirmModal'
import CustomTable from '@/components/CustomTable'

export type Asset = {
  id: number
  public_id: string
  url: string
  mime_type: string
  byte_size: number
  width: number
  height: number
}

export type AlbumMediaItem = {
  position: number
  caption: string
  asset: Asset
}

export type AlbumVideoItem = {
  position: number
  video: Record<string, any>
}

export type AlbumStatus = 'draft' | 'published' | 'archived'

export type Album = {
  id: number | string
  public_id?: string
  title: string
  slug?: string
  description?: string
  status?: AlbumStatus
  cover?: Asset | null
  items?: AlbumMediaItem[]
  videos?: AlbumVideoItem[]
  item_count?: number
  image_count?: number
  video_count?: number
  created_at?: string
  updated_at?: string
}

type Props = {
  data: Album[]
  paginationResponse?: TPaginationResponse
  onEdit: (album: Album) => void
  onOpenDetail?: (id: Album['id']) => void
  onDelete?: (album: Album) => Promise<void> | void
  isLoading?: boolean
}

export default function AlbumManagementTable({
  data,
  paginationResponse,
  onEdit,
  onOpenDetail,
  onDelete,
  isLoading,
}: Props) {
  const router = useRouter()
  const [deleteTarget, setDeleteTarget] = useState<Album | null>(null)

  const columns = useMemo(
    () => [
      { uid: 'id', name: 'ID', sortable: true },
      { uid: 'title', name: 'Tên album', sortable: true },
      { uid: 'total', name: 'Tổng ảnh & video', sortable: true },
      { uid: 'publishedAt', name: 'Ngày đăng', sortable: true },
      { uid: 'actions', name: 'Thao tác' },
    ],
    []
  )

  const goDetail = (id: Album['id']) => {
    if (onOpenDetail) return onOpenDetail(id)
    router.push(`/admin/album-management/${id}`)
  }

  const askDelete = (album: Album) => setDeleteTarget(album)

  const confirmDelete = async () => {
    if (!deleteTarget) return
    await onDelete?.(deleteTarget)
    setDeleteTarget(null)
  }

  const renderCell = (item: Album, columnKey: string) => {
    switch (columnKey) {
      case 'id':
        return (
          <Link
            href={`/admin/album-management/${item.id}`}
            className='px-0 underline hover:text-primary'
          >
            {item.id}
          </Link>
        )

      case 'title':
        return (
          <div className='flex items-center gap-3'>
            <div className='flex size-9 items-center justify-center rounded-lg bg-default-100'>
              <ImageIcon className='size-4 text-default-600' />
            </div>
            <div className='min-w-0'>
              <p className='truncate font-medium text-default-900'>{item.title}</p>
              <p className='truncate text-xs text-default-500'>
                {item.slug ? `/${item.slug}` : '—'}
              </p>
            </div>
          </div>
        )

      case 'total': {
        const images = item.image_count ?? 0
        const videos = item.video_count ?? 0
        return (
          <div className='flex items-center gap-2'>
            <Chip size='sm' variant='flat' color='primary'>
              {images} ảnh
            </Chip>
            <Chip size='sm' variant='flat' color='secondary'>
              {videos} video
            </Chip>
          </div>
        )
      }

      case 'publishedAt': {
        const date = item.created_at ?? item.updated_at ?? ''
        return <span className='text-default-700'>{date ? formatDate(date) : '—'}</span>
      }

      case 'actions':
        return (
          <div className='flex justify-center'>
            <Dropdown placement='bottom-end'>
              <DropdownTrigger>
                <Button isIconOnly variant='light' aria-label='More actions'>
                  <MoreVertical className='size-4 text-default-600' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label='Album actions'>
                <DropdownItem
                  key='edit'
                  startContent={<Pencil className='size-4' />}
                  onPress={() => onEdit(item)}
                >
                  Chỉnh sửa
                </DropdownItem>

                <DropdownItem
                  key='detail'
                  startContent={<Eye className='size-4' />}
                  onPress={() => goDetail(item.id)}
                >
                  Xem chi tiết
                </DropdownItem>

                <DropdownItem
                  key='delete'
                  className='text-danger'
                  color='danger'
                  startContent={<Trash2 className='size-4' />}
                  onPress={() => askDelete(item)}
                >
                  Xóa album
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )

      default:
        return '—'
    }
  }

  return (
    <>
      <CustomTable<Album>
        hideTopContent
        tableKey='album-management-table'
        columns={columns}
        data={data}
        paginationResponse={paginationResponse}
        renderCell={renderCell}
        selectionMode='none'
        isLoading={isLoading}
        tableClassNames={{
          tr: 'h-14',
          th: ['text-primary text-md bg-white', 'last:[border-start-end-radius:0px]'].join(' '),
          wrapper: 'h-[520px] p-0',
        }}
      />

      {deleteTarget && (
        <ConfirmModal
          modalHeader='Xóa album'
          modalBody={`Bạn có chắc chắn muốn xóa album “${deleteTarget.title}” không?`}
          confirmButtonText='Xóa'
          cancelButtonText='Hủy'
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete as any}
        />
      )}
    </>
  )
}
