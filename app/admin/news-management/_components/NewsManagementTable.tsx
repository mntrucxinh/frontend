'use client'

import type { TPaginationResponse } from '@/validators/index'
import { Chip } from '@heroui/react'

import CustomTable from '@/components/CustomTable'
import type { CustomTableProps } from '@/components/CustomTable'

import { MOCK_NEWS, type NewsItem } from '../mock-data'

const columns = [
  { uid: 'title', name: 'Tiêu đề', sortable: true },
  { uid: 'status', name: 'Trạng thái', sortable: true },
  { uid: 'excerpt', name: 'Mô tả ngắn', sortable: true },
  { uid: 'files', name: 'Files', sortable: true },
]

const statusChip = (status: NewsItem['status']) => {
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
  const paginationResponse = {
    total_items: MOCK_NEWS.length,
    total_pages: 1,
    page: 1,
    limit: 10,
  } as unknown as TPaginationResponse

  const renderCell: CustomTableProps<NewsItem>['renderCell'] = (item, columnKey) => {
    switch (columnKey) {
      case 'title':
        return <div className='font-medium'>{item.title}</div>

      case 'status':
        return statusChip(item.status)

      case 'excerpt':
        return <div className='max-w-[420px] truncate text-default-500'>{item.excerpt ?? '—'}</div>

      case 'files':
        return <span className='text-default-500'>{item.files?.length ?? 0}</span>

      default:
        return '—'
    }
  }

  return (
    <section className='mt-10'>
      <CustomTable<NewsItem>
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
        data={MOCK_NEWS}
        renderCell={renderCell}
        paginationResponse={paginationResponse}
      />
    </section>
  )
}
