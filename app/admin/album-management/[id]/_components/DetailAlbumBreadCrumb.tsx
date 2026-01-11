'use client'

import React from 'react'
import { Button } from '@heroui/react'
import { Pencil, Trash2 } from 'lucide-react'

import CustomBreadCrumbs, { type Crumb } from '@/components/CustomBreadCrumbs'

type Props = {
  crumbs: Crumb[]
  onEdit: () => void
  onDelete: () => void
}

export default function DetailAlbumBreadCrumb({ crumbs, onEdit, onDelete }: Props) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-3'>
      <div className='min-w-0'>
        <CustomBreadCrumbs crumbs={crumbs} />
      </div>

      <div className='flex items-center gap-2'>
        <Button
          color='primary'
          variant='flat'
          startContent={<Pencil className='size-4' />}
          onPress={onEdit}
        >
          Sửa
        </Button>

        <Button
          color='danger'
          variant='flat'
          startContent={<Trash2 className='size-4' />}
          onPress={onDelete}
        >
          Xóa
        </Button>
      </div>
    </div>
  )
}
