'use client'

import React, { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { addToast } from '@heroui/react'

import { useCreateAdminAlbum, useUpdateAdminAlbum, useDeleteAdminAlbum } from '@/hook/admin-album/use-admin-album-mutation'
import { useAdminAlbumList } from '@/hook/admin-album/use-admin-album-query'
import type { AdminAlbumResponse } from '@/types/admin-album'
import type { TPaginationResponse } from '@/validators'

import AlbumManagementFilter from '../_components/AlbumManagementFilter'
import AlbumManagementTable, { type Album } from '../_components/AlbumManagementTable'
import ModalCreateEditAlbum from '../_components/ModalCreateEditAlbum'

export default function AlbumManagementForm() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [albumEdit, setAlbumEdit] = useState<AdminAlbumResponse | null>(null)

  // Query params
  const listParams = useMemo(
    () => ({
      page: 1,
      pageSize: 20,
      q: search.trim() || undefined,
    }),
    [search]
  )

  const { data, isLoading } = useAdminAlbumList(listParams)
  const { mutateAsync: createAlbum, isPending: isCreating } = useCreateAdminAlbum()
  const { mutateAsync: updateAlbum, isPending: isUpdating } = useUpdateAdminAlbum()
  const { mutateAsync: deleteAlbum, isPending: isDeleting } = useDeleteAdminAlbum()

  const paginationResponse: TPaginationResponse | undefined = useMemo(() => {
    if (!data?.meta) return undefined
    return {
      total_items: data.meta.total_items,
      total_pages: data.meta.total_pages,
      page: data.meta.page,
      limit: data.meta.page_size,
    }
  }, [data])

  const openCreate = () => {
    setAlbumEdit(null)
    setIsModalOpen(true)
  }

  const openEdit = (album: Album) => {
    // Convert Album to AdminAlbumResponse format
    const albumResponse: AdminAlbumResponse = {
      id: typeof album.id === 'number' ? album.id : parseInt(String(album.id)),
      public_id: album.public_id || '',
      title: album.title,
      slug: album.slug || '',
      description: album.description || null,
      status: album.status || 'draft',
      cover: album.cover || null,
      items: album.items || null,
      videos: album.videos || null,
      item_count: album.item_count || 0,
      image_count: album.image_count || 0,
      video_count: album.video_count || 0,
      created_by: null,
      created_at: album.created_at || new Date().toISOString(),
      updated_at: album.updated_at || new Date().toISOString(),
    }
    setAlbumEdit(albumResponse)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setAlbumEdit(null)
  }

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
      if (args.isCreate) {
        // Map existing items/videos to public_ids
        const existingAssetPublicIds: string[] = args.existingImages
          .map((item) => item.asset?.public_id)
          .filter((id): id is string => Boolean(id))

        const existingCaptions: string[] = args.existingImages.map((item) => item.caption || '')

        // Map videos - need to extract public_id from video object
        const videoPublicIds: string[] = args.existingVideos
          .map((v) => {
            const video = v.video
            return video?.public_id || video?.id || null
          })
          .filter((id): id is string => Boolean(id) && typeof id === 'string')

        await createAlbum({
          payload: {
            title: args.payload.title,
            description: args.payload.description,
            status: args.payload.status,
          },
          coverFile: args.coverFile,
          newFiles: args.newFiles,
          newCaptions: [], // TODO: Add caption support in modal
          existingAssetPublicIds: existingAssetPublicIds.length > 0 ? existingAssetPublicIds : undefined,
          existingCaptions: existingCaptions.length > 0 ? existingCaptions : undefined,
          videoPublicIds: videoPublicIds.length > 0 ? videoPublicIds : undefined,
        })

        addToast({
          color: 'success',
          title: 'Thành công',
          description: 'Tạo album thành công',
        })
      } else {
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
        })

        addToast({
          color: 'success',
          title: 'Thành công',
          description: 'Cập nhật album thành công',
        })
      }

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['admin-album', 'list'] })
      if (args.albumId) {
        queryClient.invalidateQueries({ queryKey: ['admin-album', 'detail', args.albumId] })
      }

      closeModal()
    } catch (error) {
      addToast({
        color: 'danger',
        title: 'Thất bại',
        description: getErrorMessage(error),
      })
      throw error
    }
  }

  const handleDelete = async (album: Album) => {
    try {
      await deleteAlbum({ id: album.id })
      addToast({
        color: 'success',
        title: 'Thành công',
        description: 'Xóa album thành công',
      })
      queryClient.invalidateQueries({ queryKey: ['admin-album', 'list'] })
    } catch (error) {
      addToast({
        color: 'danger',
        title: 'Thất bại',
        description: getErrorMessage(error),
      })
      throw error
    }
  }

  return (
    <section className='space-y-6'>
      {/* Filter header */}
      <AlbumManagementFilter
        searchValue={search}
        onSearchChange={setSearch}
        onCreate={openCreate}
      />

      {/* Table */}
      <div className='mt-6'>
        <AlbumManagementTable
          data={data?.items ?? []}
          paginationResponse={paginationResponse}
          onEdit={openEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      {/* Modal Create/Edit */}
      <ModalCreateEditAlbum
        isOpen={isModalOpen}
        onClose={closeModal}
        albumEdit={albumEdit}
        onSubmit={handleSubmitAlbum}
      />
    </section>
  )
}
