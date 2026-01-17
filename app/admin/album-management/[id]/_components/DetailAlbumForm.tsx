'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { addToast } from '@heroui/react'

import { useAdminAlbumDetail } from '@/hook/admin-album/use-admin-album-query'
import { useUpdateAdminAlbum, useDeleteAdminAlbum } from '@/hook/admin-album/use-admin-album-mutation'
import type { AdminAlbumResponse } from '@/types/admin-album'
import type { Album } from '../../_components/AlbumManagementTable'

import ConfirmModal from '@/components/ConfirmModal'

import ModalCreateEditAlbum from '../../_components/ModalCreateEditAlbum'
import DetailAlbumBreadCrumb from './DetailAlbumBreadCrumb'
import DetailAlbumContent, { type AlbumDetail } from './DetailAlbumContent'

export default function DetailAlbumForm({ albumId }: { albumId: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data: albumData, isLoading } = useAdminAlbumDetail(albumId)
  const { mutateAsync: updateAlbum, isPending: isUpdating } = useUpdateAdminAlbum()
  const { mutateAsync: deleteAlbum, isPending: isDeleting } = useDeleteAdminAlbum()

  const album: AlbumDetail | null = useMemo(() => {
    if (!albumData) return null
    
    // Map cover asset
    const cover = albumData.cover
      ? {
          id: albumData.cover.id,
          public_id: albumData.cover.public_id,
          url: albumData.cover.url,
          mime_type: albumData.cover.mime_type,
          byte_size: albumData.cover.byte_size ?? 0,
          width: albumData.cover.width ?? 0,
          height: albumData.cover.height ?? 0,
        }
      : null

    // Map items
    const items =
      albumData.items?.map((item) => ({
        position: item.position,
        caption: item.caption || '',
        asset: {
          id: item.asset.id,
          public_id: item.asset.public_id,
          url: item.asset.url,
          mime_type: item.asset.mime_type,
          byte_size: item.asset.byte_size ?? 0,
          width: item.asset.width ?? 0,
          height: item.asset.height ?? 0,
        },
      })) || []

    return {
      id: albumData.id,
      public_id: albumData.public_id,
      title: albumData.title,
      slug: albumData.slug,
      description: albumData.description || '',
      status: albumData.status,
      cover,
      items,
      videos: albumData.videos || [],
      item_count: albumData.item_count,
      image_count: albumData.image_count,
      video_count: albumData.video_count,
      created_at: albumData.created_at,
      updated_at: albumData.updated_at,
    }
  }, [albumData])

  const crumbs = useMemo(
    () => [
      { label: 'Quản lý ảnh & video ', href: '/admin/album-management' },
      { label: album?.title || '...' },
    ],
    [album?.title]
  )

  const handleEdit = () => setIsEditOpen(true)
  const handleDelete = () => setIsDeleteOpen(true)

  const getErrorMessage = (error: unknown) => {
    const err = error as any
    const detail = err?.response?.data?.detail
    if (typeof detail === 'string') return detail
    if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg
    if (typeof detail?.message === 'string') return detail.message
    return err?.response?.data?.message || err?.message || 'Có lỗi xảy ra'
  }

  const handleSubmitAlbum = async (args: {
    isCreate: boolean
    albumId?: Album['id']
    payload: { title: string; description?: string; status: 'draft' | 'published' | 'archived' }
    coverFile?: File | null
    newFiles: File[]
    existingImages: NonNullable<Album['items']>
    existingVideos: NonNullable<Album['videos']>
    removedImageIds: Array<number | string>
    removedVideoIds: Array<number | string>
  }) => {
    try {
      // Map existing images/videos to public_ids (đã filter bỏ removed items)
      const existingAssetPublicIds: string[] = args.existingImages
        .map((item) => item.asset?.public_id)
        .filter((id): id is string => Boolean(id))

      const existingCaptions: string[] = args.existingImages.map((item) => item.caption || '')

      // Map videos
      const videoPublicIds: string[] = args.existingVideos
        .map((v) => {
          const video = v.video
          return video?.public_id || video?.id || null
        })
        .filter((id): id is string => Boolean(id) && typeof id === 'string')

      // Update với items/videos
      await updateAlbum({
        id: args.albumId!,
        payload: {
          title: args.payload.title,
          description: args.payload.description,
          status: args.payload.status,
        },
        coverFile: args.coverFile,
        newFiles: args.newFiles.length > 0 ? args.newFiles : undefined,
        newCaptions: [], // TODO: Add caption support
        existingAssetPublicIds:
          existingAssetPublicIds.length > 0 || args.newFiles.length > 0
            ? existingAssetPublicIds
            : undefined,
        existingCaptions: existingCaptions.length > 0 ? existingCaptions : undefined,
        videoPublicIds: videoPublicIds.length > 0 ? videoPublicIds : undefined,
      } as any)

      addToast({
        color: 'success',
        title: 'Thành công',
        description: 'Cập nhật album thành công',
      })

      queryClient.invalidateQueries({ queryKey: ['admin-album', 'detail', albumId] })
      queryClient.invalidateQueries({ queryKey: ['admin-album', 'list'] })
      setIsEditOpen(false)
    } catch (error) {
      addToast({
        color: 'danger',
        title: 'Thất bại',
        description: getErrorMessage(error),
      })
      throw error
    }
  }

  const confirmDelete = async () => {
    try {
      await deleteAlbum({ id: albumId })
      addToast({
        color: 'success',
        title: 'Thành công',
        description: 'Xóa album thành công',
      })
      queryClient.invalidateQueries({ queryKey: ['admin-album', 'list'] })
      router.push('/admin/album-management')
    } catch (error) {
      addToast({
        color: 'danger',
        title: 'Thất bại',
        description: getErrorMessage(error),
      })
    }
  }

  if (isLoading) {
    return <div>Đang tải...</div>
  }

  if (!album) {
    return <div>Không tìm thấy album</div>
  }

  return (
    <section className='space-y-6'>
      <DetailAlbumBreadCrumb crumbs={crumbs} onEdit={handleEdit} onDelete={handleDelete} />

      <DetailAlbumContent album={album} />

      {/* Modal edit */}
      <ModalCreateEditAlbum
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        albumEdit={album as any}
        onSubmit={handleSubmitAlbum}
      />

      {/* Confirm delete */}
      {isDeleteOpen && (
        <ConfirmModal
          modalHeader='Xóa album'
          modalBody={`Bạn có chắc chắn muốn xóa album "${album.title}" không?`}
          confirmButtonText='Xóa'
          cancelButtonText='Hủy'
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={confirmDelete}
          isLoading={isDeleting}
          isDisabled={isDeleting}
        />
      )}
    </section>
  )
}
