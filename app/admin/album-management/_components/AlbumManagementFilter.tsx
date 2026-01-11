'use client'

import React from 'react'
import { Button, Input } from '@heroui/react'
import { Plus, Search } from 'lucide-react'

type Props = {
  title?: string
  searchValue: string
  onSearchChange: (value: string) => void
  onCreate: () => void
}

export default function AlbumManagementFilter({
  title = 'Quản lý ảnh & video',
  searchValue,
  onSearchChange,
  onCreate,
}: Props) {
  return (
    <section className='flex flex-wrap items-center justify-between gap-3'>
      <div>
        <h1 className='text-xl font-semibold text-primary'>{title}</h1>
        <p className='text-sm text-default-500'>Quản lý danh sách ảnh & video</p>
      </div>

      <div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center'>
        <Input
          value={searchValue}
          onValueChange={onSearchChange}
          placeholder='Tìm theo ID hoặc tên album...'
          startContent={<Search className='size-4 text-default-500' />}
          className='w-full sm:w-[320px]'
        />

        <Button color='primary' startContent={<Plus className='size-4' />} onPress={onCreate}>
          Tạo mới album
        </Button>
      </div>
    </section>
  )
}
