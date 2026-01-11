'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { TPaginationResponse } from '@/validators'
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { Eye, Image as ImageIcon, MoreVertical, Pencil, Plus, Trash2 } from 'lucide-react'

import ConfirmModal from '@/components/ConfirmModal'
import CustomTable from '@/components/CustomTable'

type AlbumItem = {
  id: number | string
  name: string
  totalFiles: number
  publishedAt: string // ISO string
}

const formatDateFallback = (iso: string) => {
  try {
    const d = new Date(iso)
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(d)
  } catch {
    return '—'
  }
}

export default function AlbumManagementForm() {
  const router = useRouter()

  const data: AlbumItem[] = useMemo(
    () => [
      { id: 1, name: 'Trung thu 2025', totalFiles: 56, publishedAt: '2025-09-17T10:20:00.000Z' },
      {
        id: 2,
        name: 'Hoạt động ngoài trời',
        totalFiles: 34,
        publishedAt: '2025-08-03T08:00:00.000Z',
      },
      { id: 3, name: 'Bé vào lớp', totalFiles: 18, publishedAt: '2025-07-12T03:40:00.000Z' },
    ],
    []
  )

  const paginationResponse: TPaginationResponse = useMemo(
    () => ({
      total_items: data.length,
      total_pages: 1,
      page: 1,
      limit: 10,
    }),
    [data.length]
  )

  const columns = useMemo(
    () => [
      { uid: 'name', name: 'Tên album', sortable: true },
      { uid: 'totalFiles', name: 'Tổng tệp ảnh & video', sortable: true },
      { uid: 'publishedAt', name: 'Ngày đăng', sortable: true },
      { uid: 'actions', name: 'Action' },
    ],
    []
  )

  const [deleteTarget, setDeleteTarget] = useState<AlbumItem | null>(null)

  const handleCreate = () => {
    // bạn đổi route theo dự án của bạn
    router.push('/admin/album-management/create')
  }

  const handleEdit = (id: AlbumItem['id']) => {
    router.push(`/admin/album-management/${id}/edit`)
  }

  const handleViewDetail = (id: AlbumItem['id']) => {
    router.push(`/admin/album-management/${id}`)
  }

  const handleAskDelete = (item: AlbumItem) => {
    setDeleteTarget(item)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    // TODO: gọi API xóa album ở đây
    // await albumApi.delete(deleteTarget.id)
    setDeleteTarget(null)
  }

  const renderCell = (item: AlbumItem, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className='flex items-center gap-3'>
            <div className='flex size-9 items-center justify-center rounded-lg bg-default-100'>
              <ImageIcon className='size-4 text-default-600' />
            </div>
            <div className='min-w-0'>
              <p className='truncate font-medium text-default-900'>{item.name}</p>
              <p className='truncate text-xs text-default-500'>ID: {item.id}</p>
            </div>
          </div>
        )

      case 'totalFiles':
        return (
          <div className='flex items-center gap-2'>
            <Chip size='sm' variant='flat' color='primary'>
              {item.totalFiles}
            </Chip>
            <span className='text-default-600'>tệp</span>
          </div>
        )

      case 'publishedAt':
        return <span className='text-default-700'>{formatDateFallback(item.publishedAt)}</span>
      // nếu bạn có formatDate thì thay dòng trên bằng:
      // return <span className='text-default-700'>{formatDate(item.publishedAt)}</span>

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
                  onPress={() => handleEdit(item.id)}
                >
                  Chỉnh sửa
                </DropdownItem>
                <DropdownItem
                  key='detail'
                  startContent={<Eye className='size-4' />}
                  onPress={() => handleViewDetail(item.id)}
                >
                  Xem chi tiết
                </DropdownItem>
                <DropdownItem
                  key='delete'
                  className='text-danger'
                  color='danger'
                  startContent={<Trash2 className='size-4' />}
                  onPress={() => handleAskDelete(item)}
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
    <div className='w-full px-6 py-5'>
      {/* Header */}
      <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h1 className='text-lg font-semibold text-default-900'>Album</h1>
          <p className='text-sm text-default-500'>Quản lý danh sách album ảnh & video</p>
        </div>

        <Button color='primary' startContent={<Plus className='size-4' />} onPress={handleCreate}>
          Tạo mới album
        </Button>
      </div>

      {/* Table */}
      <div className='rounded-xl bg-background p-3 shadow-sm'>
        <CustomTable<AlbumItem>
          tableKey='album-management-table'
          columns={columns}
          data={data}
          paginationResponse={paginationResponse}
          renderCell={renderCell}
          selectionMode='none' // Album quản lý theo row action, nên tắt selection cho gọn (bạn muốn bật cũng được)
          tableClassNames={{
            wrapper: 'h-[560px] pt-0 pb-4 px-0 bg-transparent shadow-none',
            table: 'bg-transparent',
          }}
        />
      </div>

      {/* Confirm delete */}
      {deleteTarget && (
        <ConfirmModal
          modalHeader='Xóa album'
          modalBody={`Bạn có chắc chắn muốn xóa album “${deleteTarget.name}” không?`}
          confirmButtonText='Xóa'
          cancelButtonText='Hủy'
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          // Nếu ConfirmModal của bạn có onConfirm thì mở dòng dưới, còn không thì bạn chỉnh theo props thực tế
          onConfirm={handleConfirmDelete as any}
        />
      )}
    </div>
  )
}
