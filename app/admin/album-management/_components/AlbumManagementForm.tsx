'use client'

import React, { useMemo, useState } from 'react'
import type { TPaginationResponse } from '@/validators'

import AlbumManagementFilter from '../_components/AlbumManagementFilter'
import AlbumManagementTable, { type Album } from '../_components/AlbumManagementTable'
import ModalCreateEditAlbum from '../_components/ModalCreateEditAlbum'
import { mockAlbumListResponse } from '../mock-data'

export default function AlbumManagementForm() {
  const rawData: Album[] = mockAlbumListResponse.items

  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [albumEdit, setAlbumEdit] = useState<Album | null>(null)

  const filteredData = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return rawData
    return rawData.filter((a) => {
      const idMatch = String(a.id).toLowerCase().includes(q)
      const titleMatch = (a.title ?? '').toLowerCase().includes(q)
      return idMatch || titleMatch
    })
  }, [rawData, search])

  const paginationResponse: TPaginationResponse = useMemo(
    () => ({
      total_items: mockAlbumListResponse.meta.total_items,
      total_pages: mockAlbumListResponse.meta.total_pages,
      page: mockAlbumListResponse.meta.page,
      limit: mockAlbumListResponse.meta.page_size,
    }),
    []
  )

  const openCreate = () => {
    setAlbumEdit(null)
    setIsModalOpen(true)
  }

  const openEdit = (album: Album) => {
    setAlbumEdit(album)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  const handleSubmitAlbum = async (args: {
    isCreate: boolean
    albumId?: Album['id']
    payload: { title: string; description?: string; status: 'draft' | 'published' | 'archived' }
    coverFile?: File | null
    newFiles: File[]
  }) => {
    // TODO: khi có API thật thì thay bằng create/update
    console.log('Album submitted:', args)
  }

  const handleDelete = async (album: Album) => {
    // TODO: gọi API xóa album thật
    console.log('Album deleted:', album.id)
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
          data={filteredData}
          paginationResponse={paginationResponse}
          onEdit={openEdit}
          onDelete={handleDelete}
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
