'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { addToast, Spinner } from '@heroui/react'

import ConfirmModal from '@/components/ConfirmModal'
import { useDeleteAdminAnnouncement } from '@/hook/admin-announcement/use-admin-announcement-mutation'
import { useAdminAnnouncementDetail } from '@/hook/admin-announcement/use-admin-announcement-query'

import ModalCreateEditAnnouncement from '../../_components/ModalCreateEditAnnouncement'
import AnnouncementDetailBreadCrumbs from './AnnouncementDetailBreadCrumbs'
import AnnouncementDetailContent from './AnnouncementDetailContent'

export default function AnnouncementDetailInformation() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deleteOnFacebook, setDeleteOnFacebook] = useState(false)
  const announcementId = params?.id

  const { data: announcement, isLoading, isError, error } = useAdminAnnouncementDetail(announcementId)
  const { mutateAsync: deleteAnnouncement, isPending: isDeleting } = useDeleteAdminAnnouncement()

  const getErrorMessage = (err: unknown) => {
    const detail = (err as any)?.response?.data?.detail
    if (typeof detail === 'string') return detail
    if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg
    if (typeof detail?.message === 'string') return detail.message
    return (err as any)?.response?.data?.message || (err as any)?.message || 'Có lỗi xảy ra'
  }

  const handleConfirmDelete = async () => {
    if (!announcement?.id) return
    try {
      await deleteAnnouncement({ id: announcement.id, delete_on_facebook: deleteOnFacebook })
      addToast({
        color: 'success',
        title: 'Thành công',
        description: 'Xóa thông báo thành công',
      })
      queryClient.invalidateQueries({ queryKey: ['admin-announcement'] })
      router.push('/admin/announcements-management')
    } catch (err) {
      addToast({
        color: 'danger',
        title: 'Thất bại',
        description: getErrorMessage(err),
      })
    } finally {
      setIsDeleteOpen(false)
      setDeleteOnFacebook(false)
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center py-16'>
        <Spinner color='primary' />
      </div>
    )
  }

  if (!announcement || isError) {
    return (
      <div className='py-16 text-center text-default-500'>
        {getErrorMessage(error) || 'Không tìm thấy thông báo'}
      </div>
    )
  }

  const editingPayload = {
    id: announcement.id,
    title: announcement.title,
    excerpt: announcement.excerpt ?? undefined,
    content_html: announcement.content_html,
    status: announcement.status,
    meta_title: announcement.meta_title ?? undefined,
    meta_description: announcement.meta_description ?? undefined,
    block_code: announcement.block_code,
    content_assets: announcement.content_assets ?? [],
  }

  return (
    <div>
      <AnnouncementDetailBreadCrumbs id={announcement.id} metaTitle={announcement.meta_title || announcement.title} />
      <AnnouncementDetailContent
        announcement={{
          title: announcement.title,
          slug: announcement.slug,
          excerpt: announcement.excerpt,
          content_html: announcement.content_html,
          status: announcement.status,
          block_code: announcement.block_code,
          block_name: announcement.block_name,
          meta_title: announcement.meta_title,
          meta_description: announcement.meta_description,
          content_assets: announcement.content_assets ?? [],
          published_at: announcement.published_at,
          created_at: announcement.created_at,
          updated_at: announcement.updated_at,
        }}
        onEdit={() => setIsEditOpen(true)}
        onDelete={() => setIsDeleteOpen(true)}
        isDeleting={isDeleting}
      />

      <ModalCreateEditAnnouncement
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        announcementEdit={editingPayload}
      />

      {isDeleteOpen && (
        <ConfirmModal
          modalHeader='Xóa thông báo'
          modalBody={`Bạn có chắc chắn muốn xóa "${announcement.title}"?`}
          confirmButtonText='Xác nhận'
          cancelButtonText='Hủy'
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false)
            setDeleteOnFacebook(false)
          }}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
          isDisabled={isDeleting}
          deleteOnFacebook={deleteOnFacebook}
          onDeleteOnFacebookChange={setDeleteOnFacebook}
        />
      )}
    </div>
  )
}

