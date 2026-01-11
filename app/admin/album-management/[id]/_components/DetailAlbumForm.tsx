'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import ConfirmModal from '@/components/ConfirmModal'

import ModalCreateEditAlbum from '../../_components/ModalCreateEditAlbum'
import { mockAlbumDetail } from '../mock-data'
import DetailAlbumBreadCrumb from './DetailAlbumBreadCrumb'
import DetailAlbumContent, { type AlbumDetail } from './DetailAlbumContent'

export default function DetailAlbumForm({ albumId }: { albumId: string }) {
  const router = useRouter()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const album: AlbumDetail = useMemo(() => {
    return { ...mockAlbumDetail, id: Number(albumId) || albumId }
  }, [albumId])

  const crumbs = useMemo(
    () => [
      { label: 'Quản lý ảnh & video ', href: '/admin/album-management' },
      { label: album.title },
    ],
    [album.title]
  )

  const handleEdit = () => setIsEditOpen(true)
  const handleDelete = () => setIsDeleteOpen(true)

  const confirmDelete = async () => {
    setIsDeleteOpen(false)
    router.push('/admin/album-management')
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
        onSubmit={async () => {
          // TODO: update album
          setIsEditOpen(false)
        }}
      />

      {/* Confirm delete */}
      {isDeleteOpen && (
        <ConfirmModal
          modalHeader='Xóa album'
          modalBody={`Bạn có chắc chắn muốn xóa album “${album.title}” không?`}
          confirmButtonText='Xóa'
          cancelButtonText='Hủy'
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={confirmDelete as any}
        />
      )}
    </section>
  )
}
