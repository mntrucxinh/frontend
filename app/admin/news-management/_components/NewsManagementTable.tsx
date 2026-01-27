'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useDeleteAdminNews } from '@/hook/admin-news/use-admin-news-mutation'
import { useAdminNewsList } from '@/hook/admin-news/use-admin-news-query'
import type { TPaginationResponse } from '@/validators/index'
import { addToast, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

import type { AdminNewsResponse, AdminNewsStatus } from '@/types/admin-news'
import ConfirmModal from '@/components/ConfirmModal'
import CustomTable from '@/components/CustomTable'
import type { CustomTableProps } from '@/components/CustomTable'

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
  const q = searchParams.get('q') || undefined
  const status =
    tab === 'draft' || tab === 'published' || tab === 'archived'
      ? (tab as AdminNewsStatus)
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

  const { data, isLoading } = useAdminNewsList(listParams)
  const { mutateAsync: deleteNews, isPending: isDeleting } = useDeleteAdminNews()
  const [editingNews, setEditingNews] = useState<AdminNewsResponse | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminNewsResponse | null>(null)
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
      await deleteNews({ id: deleteTarget.id, delete_on_facebook: deleteOnFacebook })
      addToast({
        color: 'success',
        title: 'Thành công',
        description: 'Xóa tin tức thành công',
      })
      queryClient.invalidateQueries({ queryKey: ['admin-news'] })
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

  const renderCell: CustomTableProps<AdminNewsResponse>['renderCell'] = (item, columnKey) => {
    switch (columnKey) {
      case 'title':
        return (
          <Link
            href={`/admin/news-management/${item.id}`}
            className='font-medium underline hover:text-primary'
          >
            {item.title}
          </Link>
        )

      case 'status':
        return statusChip(item.status)

      case 'excerpt':
        return <div className='max-w-[420px] truncate text-default-500'>{item.excerpt ?? '—'}</div>

      case 'files':
        return <span className='text-default-500'>{item.content_assets?.length ?? 0}</span>

      case 'actions': {
        const isRowDeleting = isDeleting && deleteTarget?.id === item.id
        const isRowDisabled = isDeleting && !isRowDeleting
        return (
          <div className='flex items-center justify-center gap-2'>
            <Dropdown placement='bottom-end'>
              <DropdownTrigger>
                <Button
                  size='sm'
                  variant='light'
                  isIconOnly
                  isLoading={isRowDeleting}
                  isDisabled={isRowDisabled}
                  aria-label='Thao tác'
                >
                  <MoreVertical className='size-4' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label='Thao tác'
                onAction={(key) => {
                  if (key === 'edit') {
                    setEditingNews(item)
                  } else if (key === 'delete') {
                    setDeleteTarget(item)
                  }
                }}
              >
                <DropdownItem
                  key='edit'
                  startContent={<Pencil className='size-4' />}
                >
                  Sửa
                </DropdownItem>
                <DropdownItem
                  key='delete'
                  className='text-danger'
                  color='danger'
                  startContent={<Trash2 className='size-4' />}
                >
                  Xóa
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      }

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
        content_assets: editingNews.content_assets ?? [],
      }
    : undefined

  return (
    <section className='mt-4'>
      <CustomTable<AdminNewsResponse>
        tableClassNames={{
          tr: 'h-14',
          th: ['text-primary text-md bg-white', 'last:[border-start-end-radius:0px]'].join(' '),
          wrapper: 'min-h-[400px] max-h-[600px] p-0',
        }}
        hideTopContent
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
          modalHeader='Xóa tin tức'
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
