'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useDeleteAdminAnnouncement } from '@/hook/admin-announcement/use-admin-announcement-mutation'
import { useAdminAnnouncementList } from '@/hook/admin-announcement/use-admin-announcement-query'
import type { TPaginationResponse } from '@/validators/index'
import { addToast, Button, Chip } from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Pencil, Trash2 } from 'lucide-react'

import type { AdminAnnouncementResponse, AdminAnnouncementStatus, BlockCode } from '@/types/admin-announcement'
import ConfirmModal from '@/components/ConfirmModal'
import CustomTable from '@/components/CustomTable'
import type { CustomTableProps } from '@/components/CustomTable'

import ModalCreateEditAnnouncement from './ModalCreateEditAnnouncement'

const columns = [
  { uid: 'title', name: 'Tiêu đề', sortable: true },
  { uid: 'block_code', name: 'Khối', sortable: true },
  { uid: 'status', name: 'Trạng thái', sortable: true },
  { uid: 'excerpt', name: 'Mô tả ngắn', sortable: true },
  { uid: 'files', name: 'Files', sortable: true },
  { uid: 'actions', name: 'Thao tác', sortable: false },
]

const statusChip = (status: AdminAnnouncementStatus) => {
  const map = {
    draft: { label: 'Thông báo nháp', color: 'warning' as const },
    published: { label: 'Công khai', color: 'success' as const },
    archived: { label: 'Lưu trữ', color: 'default' as const },
  }
  const s = map[status]
  return (
    <Chip color={s.color} size='sm' variant='flat'>
      {s.label}
    </Chip>
  )
}

const blockChip = (blockCode: BlockCode) => {
  const map: Record<BlockCode, { label: string; color: 'primary' | 'secondary' | 'success' | 'warning' | 'default' }> = {
    bee: { label: 'Bee', color: 'warning' },
    mouse: { label: 'Mouse', color: 'primary' },
    bear: { label: 'Bear', color: 'secondary' },
    dolphin: { label: 'Dolphin', color: 'success' },
  }
  const b = map[blockCode]
  return (
    <Chip color={b.color} size='sm' variant='flat'>
      {b.label}
    </Chip>
  )
}

export default function AnnouncementManagementTable() {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const tab = searchParams.get('tab') || 'all'
  const q = searchParams.get('q') || undefined
  const status =
    tab === 'draft' || tab === 'published' || tab === 'archived'
      ? (tab as AdminAnnouncementStatus)
      : undefined

  const listParams = useMemo(
    () => ({
      page,
      pageSize: limit,
      status,
      q,
    }),
    [page, limit, status, q]
  )

  const { data, isLoading } = useAdminAnnouncementList(listParams)
  const { mutateAsync: deleteAnnouncement, isPending: isDeleting } = useDeleteAdminAnnouncement()
  const [editingAnnouncement, setEditingAnnouncement] = useState<AdminAnnouncementResponse | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminAnnouncementResponse | null>(null)
  const [deleteOnFacebook, setDeleteOnFacebook] = useState(false)

  const paginationResponse = useMemo(() => {
    if (!data?.meta) return undefined
    return {
      total_items: data.meta.total_items,
      total_pages: data.meta.total_pages,
      page: data.meta.page,
      limit: data.meta.page_size,
    } as TPaginationResponse
  }, [data])

  const getErrorMessage = (error: unknown) => {
    const err = error as any
    const detail = err?.response?.data?.detail
    if (typeof detail === 'string') return detail
    if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg
    if (typeof detail?.message === 'string') return detail.message
    return err?.response?.data?.message || err?.message || 'Có lỗi xảy ra'
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteAnnouncement({ id: deleteTarget.id, delete_on_facebook: deleteOnFacebook })
      addToast({
        color: 'success',
        title: 'Thành công',
        description: 'Xóa thông báo thành công',
      })
      queryClient.invalidateQueries({ queryKey: ['admin-announcement'] })
      setDeleteTarget(null)
      setDeleteOnFacebook(false)
    } catch (error) {
      addToast({
        color: 'danger',
        title: 'Thất bại',
        description: getErrorMessage(error),
      })
    }
  }

  const renderCell: CustomTableProps<AdminAnnouncementResponse>['renderCell'] = (item, columnKey) => {
    switch (columnKey) {
      case 'title':
        return (
          <Link
            href={`/admin/announcements-management/${item.id}`}
            className='font-medium underline hover:text-primary'
          >
            {item.title}
          </Link>
        )

      case 'block_code':
        return blockChip(item.block_code)

      case 'status':
        return statusChip(item.status)

      case 'excerpt':
        return <div className='max-w-[420px] truncate text-default-500'>{item.excerpt ?? '—'}</div>

      case 'files':
        return <span className='text-default-500'>{item.content_assets?.length ?? 0}</span>

      case 'actions':
        return (
          <div className='flex items-center justify-center gap-2'>
            <Button
              size='sm'
              variant='flat'
              onPress={() => setEditingAnnouncement(item)}
              startContent={<Pencil className='size-4' />}
            >
              Sửa
            </Button>
            <Button
              size='sm'
              color='danger'
              variant='light'
              onPress={() => setDeleteTarget(item)}
              startContent={<Trash2 className='size-4' />}
            >
              Xóa
            </Button>
          </div>
        )

      default:
        return '—'
    }
  }

  const editingPayload = editingAnnouncement
    ? {
        id: editingAnnouncement.id,
        title: editingAnnouncement.title,
        excerpt: editingAnnouncement.excerpt ?? undefined,
        content_html: editingAnnouncement.content_html,
        status: editingAnnouncement.status,
        meta_title: editingAnnouncement.meta_title ?? undefined,
        meta_description: editingAnnouncement.meta_description ?? undefined,
        block_code: editingAnnouncement.block_code,
        content_assets: editingAnnouncement.content_assets ?? [],
      }
    : undefined

  return (
    <section className='mt-10'>
      <CustomTable<AdminAnnouncementResponse>
        tableClassNames={{
          tr: 'h-14',
          th: ['text-primary text-md bg-white', 'last:[border-start-end-radius:0px]'].join(' '),
          wrapper: 'min-h-[400px] max-h-[520px] p-0',
        }}
        selectionMode='none'
        columns={columns}
        data={data?.items ?? []}
        renderCell={renderCell}
        paginationResponse={paginationResponse}
        isLoading={isLoading}
      />

      {editingPayload && (
        <ModalCreateEditAnnouncement
          isOpen={Boolean(editingPayload)}
          onClose={() => setEditingAnnouncement(null)}
          announcementEdit={editingPayload}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          modalHeader='Xóa thông báo'
          modalBody={`Bạn có chắc chắn muốn xóa "${deleteTarget.title}"?`}
          confirmButtonText='Xác nhận'
          cancelButtonText='Hủy'
          isOpen={Boolean(deleteTarget)}
          onClose={() => {
            setDeleteTarget(null)
            setDeleteOnFacebook(false)
          }}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
          isDisabled={isDeleting}
          deleteOnFacebook={deleteOnFacebook}
          onDeleteOnFacebookChange={setDeleteOnFacebook}
        />
      )}
    </section>
  )
}

