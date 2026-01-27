'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  addToast,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'
import { MoreVertical } from 'lucide-react'

import ConfirmModal from '@/components/ConfirmModal'
import CustomTable from '@/components/CustomTable'
import type { CustomTableProps } from '@/components/CustomTable'
import {
  useDeleteAdminContactMessage,
  useUpdateAdminContactStatus,
} from '@/hook/admin-contact/use-admin-contact-mutation'
import { useAdminContactMessagesList } from '@/hook/admin-contact/use-admin-contact-query'
import type { AdminContactMessage, AdminContactStatus } from '@/types/admin-contact'
import { formatDateTime } from '@/utils/date'
import type { TPaginationResponse } from '@/validators/index'

const columns = [
  { uid: 'full_name', name: 'Người gửi', sortable: true },
  { uid: 'email', name: 'Địa chỉ email', sortable: false },
  { uid: 'phone', name: 'Số điện thoại', sortable: false },
  { uid: 'subject', name: 'Chủ đề', sortable: false },
  { uid: 'message', name: 'Nội dung', sortable: false },
  { uid: 'status', name: 'Trạng thái', sortable: true },
  { uid: 'created_at', name: 'Thời gian', sortable: true },
  { uid: 'actions', name: 'Thao tác', sortable: false },
]

const statusChip = (status: AdminContactStatus) => {
  const map = {
    new: { label: 'Mới', color: 'warning' as const },
    handled: { label: 'Đã xử lý', color: 'success' as const },
    spam: { label: 'Thư rác', color: 'danger' as const },
  }
  const s = map[status]
  return (
    <Chip color={s.color} size='sm' variant='flat'>
      {s.label}
    </Chip>
  )
}

export default function ContactMessagesTable() {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const tab = searchParams.get('tab') || 'all'
  const q = searchParams.get('q') ?? ''
  const status =
    tab === 'new' || tab === 'handled' || tab === 'spam'
      ? (tab as AdminContactStatus)
      : undefined

  const listParams = useMemo(
    () => ({
      page,
      pageSize: limit,
      status,
      q: q || undefined,
    }),
    [page, limit, status, q]
  )

  const { data, isLoading } = useAdminContactMessagesList(listParams, {
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
  })
  const { mutateAsync: updateStatus, isPending: isUpdating } = useUpdateAdminContactStatus()
  const { mutateAsync: deleteMessage, isPending: isDeleting } = useDeleteAdminContactMessage()

  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminContactMessage | null>(null)
  const prevTotalsRef = useRef<Record<string, number>>({})

  useEffect(() => {
    const totalItems = data?.meta?.total_items
    if (totalItems === undefined) return

    const key = status ?? 'all'
    const shouldNotify = page === 1 && (status === undefined || status === 'new')
    const prevTotal = prevTotalsRef.current[key]

    if (shouldNotify && prevTotal !== undefined && totalItems > prevTotal) {
      const diff = totalItems - prevTotal
      addToast({
        color: 'success',
        title: 'Tin nhắn mới',
        description: diff > 1 ? `Có ${diff} liên hệ mới.` : 'Có 1 liên hệ mới.',
      })
    }

    prevTotalsRef.current[key] = totalItems
  }, [data?.meta?.total_items, page, status])

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

  const handleStatusChange = async (item: AdminContactMessage, nextStatus: AdminContactStatus) => {
    if (item.status === nextStatus) return
    setUpdatingId(item.id)
    try {
      await updateStatus({ id: item.id, status: nextStatus })
      addToast({
        color: 'success',
        title: 'Thành công',
        description: 'Cập nhật trạng thái thành công',
      })
      queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] })
    } catch (error) {
      addToast({
        color: 'danger',
        title: 'Thất bại',
        description: getErrorMessage(error),
      })
    } finally {
      setUpdatingId(null)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteMessage({ id: deleteTarget.id })
      addToast({
        color: 'success',
        title: 'Thành công',
        description: 'Xóa liên hệ thành công',
      })
      queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] })
      setDeleteTarget(null)
    } catch (error) {
      addToast({
        color: 'danger',
        title: 'Thất bại',
        description: getErrorMessage(error),
      })
    }
  }

  const handleAction = (item: AdminContactMessage, action: string) => {
    if (action === 'delete') {
      setDeleteTarget(item)
      return
    }
    if (action === 'new' || action === 'handled' || action === 'spam') {
      void handleStatusChange(item, action as AdminContactStatus)
    }
  }

  const renderCell: CustomTableProps<AdminContactMessage>['renderCell'] = (item, columnKey) => {
    switch (columnKey) {
      case 'full_name':
        return <div className='font-medium'>{item.full_name}</div>

      case 'email':
        return <span className='text-default-500'>{item.email || '-'}</span>

      case 'phone':
        return <span className='text-default-500'>{item.phone || '-'}</span>

      case 'subject': {
        // Parse subject from message if format is "Chu de: xxx\ncontent"
        const parseMessage = (msg: string) => {
          const subjectMatch = msg.match(/^Chu de:\s*([^\n]+)/i)
          if (subjectMatch) {
            return subjectMatch[1].trim()
          }
          return null
        }

        const parsedSubject = parseMessage(item.message) || item.subject
        const subjectMap: Record<string, string> = {
          'tuyen-sinh': 'Tuyển sinh',
          'chuong-trinh-hoc': 'Chương trình học',
          'co-so-vat-chat': 'Cơ sở vật chất',
          'khac': 'Khác',
        }
        const subjectLabel = parsedSubject ? subjectMap[parsedSubject] || parsedSubject : '-'
        return (
          <div className='max-w-[200px]'>
            <span className='font-medium text-default-700'>{subjectLabel}</span>
          </div>
        )
      }

      case 'message': {
        // Extract actual message content (remove "Chu de: xxx\n" part)
        const extractMessageContent = (msg: string) => {
          const subjectMatch = msg.match(/^Chu de:\s*[^\n]+\n/i)
          if (subjectMatch) {
            return msg.replace(subjectMatch[0], '').trim()
          }
          return msg
        }

        const messageContent = extractMessageContent(item.message)
        return (
          <div className='max-w-[300px] truncate text-default-500' title={messageContent}>
            {messageContent}
          </div>
        )
      }

      case 'status':
        return statusChip(item.status)

      case 'created_at':
        return <span className='text-default-500'>{formatDateTime(item.created_at)}</span>

      case 'actions': {
        const isRowUpdating = isUpdating && updatingId === item.id
        const isRowDisabled = isUpdating && !isRowUpdating
        return (
          <div className='flex items-center justify-center gap-2'>
            <Dropdown placement='bottom-end'>
              <DropdownTrigger>
                <Button
                  size='sm'
                  variant='light'
                  isIconOnly
                  isLoading={isRowUpdating}
                  isDisabled={isRowDisabled}
                  aria-label='Thao tác'
                >
                  <MoreVertical className='size-4' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label='Thao tác'
                onAction={(key) => handleAction(item, String(key))}
              >
                <DropdownItem key='new' isDisabled={item.status === 'new'}>
                  Đánh dấu mới
                </DropdownItem>
                <DropdownItem key='handled' isDisabled={item.status === 'handled'}>
                  Đánh dấu đã xử lý
                </DropdownItem>
                <DropdownItem key='spam' isDisabled={item.status === 'spam'}>
                  Đánh dấu thư rác
                </DropdownItem>
                <DropdownItem key='delete' className='text-danger'>
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

  return (
    <section>
      <CustomTable<AdminContactMessage>
        tableClassNames={{
          tr: 'h-14',
          th: ['text-primary text-md bg-white', 'last:[border-start-end-radius:0px]'].join(' '),
          wrapper: 'h-[520px] p-0',
        }}
        selectionMode='none'
        columns={columns}
        data={data?.items ?? []}
        renderCell={renderCell}
        paginationResponse={paginationResponse}
        isLoading={isLoading}
      />

      {deleteTarget && (
        <ConfirmModal
          modalHeader='Xóa liên hệ'
          modalBody={`Bạn chắc chắn muốn xóa liên hệ của "${deleteTarget.full_name}"?`}
          confirmButtonText='Xác nhận'
          cancelButtonText='Hủy'
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
