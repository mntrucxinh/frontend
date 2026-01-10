'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { addToast, Button, Chip } from '@heroui/react'
import { Pencil, Trash2 } from 'lucide-react'

import ConfirmModal from '@/components/ConfirmModal'
import CustomTable from '@/components/CustomTable'
import type { CustomTableProps } from '@/components/CustomTable'
import { useDeleteAdminNews } from '@/hook/admin-news/use-admin-news-mutation'
import { useAdminNewsList } from '@/hook/admin-news/use-admin-news-query'
import type { AdminNewsResponse, AdminNewsStatus } from '@/types/admin-news'
import type { TPaginationResponse } from '@/validators/index'

import ModalCreateEditNews from './ModalCreateEditNews'

const columns = [
  { uid: 'title', name: 'Tiêu đề', sortable: true },
  { uid: 'status', name: 'Trạng thái', sortable: true },
  { uid: 'excerpt', name: 'Mô tả ngắn', sortable: true },
  { uid: 'files', name: 'Files', sortable: true },
  { uid: 'actions', name: 'Thao tác', sortable: false },
]

const statusChip = (status: AdminNewsStatus) => {
  const map = {
    draft: { label: 'Tin nháp', color: 'warning' as const },
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

export default function NewsManagementTable() {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const tab = searchParams.get('tab') || 'all'
  const status =
    tab === 'draft' || tab === 'published' || tab === 'archived'
      ? (tab as AdminNewsStatus)
      : undefined

  const listParams = useMemo(
    () => ({
      page,
      pageSize: limit,
      status,
    }),
    [page, limit, status]
  )

  const { data, isLoading } = useAdminNewsList(listParams)
  const { mutateAsync: deleteNews, isPending: isDeleting } = useDeleteAdminNews()
  const [editingNews, setEditingNews] = useState<AdminNewsResponse | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminNewsResponse | null>(null)

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
    return err?.response?.data?.message || err?.message || 'Co loi xay ra'
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteNews({ id: deleteTarget.id })
      addToast({
        color: 'success',
        title: 'Thành công',
        description: 'Xoa tin tuc thanh cong',
      })
      queryClient.invalidateQueries({ queryKey: ['admin-news'] })
      setDeleteTarget(null)
    } catch (error) {
      addToast({
        color: 'danger',
        title: 'That bai',
        description: getErrorMessage(error),
      })
    }
  }

  const renderCell: CustomTableProps<AdminNewsResponse>['renderCell'] = (item, columnKey) => {
    switch (columnKey) {
      case 'title':
        return (
          <Link href={`/admin/news-management/${item.id}`} className='font-medium text-primary'>
            {item.title}
          </Link>
        )

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
              onPress={() => setEditingNews(item)}
              startContent={<Pencil className='size-4' />}
            >
              Sua
            </Button>
            <Button
              size='sm'
              color='danger'
              variant='light'
              onPress={() => setDeleteTarget(item)}
              startContent={<Trash2 className='size-4' />}
            >
              Xoa
            </Button>
          </div>
        )

      default:
        return '—'
    }
  }

  const editingPayload = editingNews
    ? {
        id: editingNews.id,
        title: editingNews.title,
        excerpt: editingNews.excerpt ?? undefined,
        content_html: editingNews.content_html,
        status: editingNews.status,
        meta_title: editingNews.meta_title ?? undefined,
        meta_description: editingNews.meta_description ?? undefined,
      }
    : undefined

  return (
    <section className='mt-10'>
      <CustomTable<AdminNewsResponse>
        tableClassNames={{
          tr: 'h-14',
          th: [
            'text-primary text-md bg-white',
            'last:[border-start-end-radius:0px]',
          ].join(' '),
          wrapper: 'h-[520px] p-0',
        }}
        selectionMode='none'
        columns={columns}
        data={data?.items ?? []}
        renderCell={renderCell}
        paginationResponse={paginationResponse}
        isLoading={isLoading}
      />

      {editingPayload && (
        <ModalCreateEditNews
          isOpen={Boolean(editingPayload)}
          onClose={() => setEditingNews(null)}
          newsEdit={editingPayload}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          modalHeader='Xoa tin tuc'
          modalBody={`Ban chac chan muon xoa "${deleteTarget.title}"?`}
          confirmButtonText='Xac nhan'
          cancelButtonText='Huy'
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
          isDisabled={isDeleting}
        />
      )}
    </section>
  )
}
