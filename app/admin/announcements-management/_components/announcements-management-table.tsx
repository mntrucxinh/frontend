'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button, Chip } from '@heroui/react'
import { Send } from 'lucide-react'
import toast from 'react-hot-toast'

import CustomTable from '@/components/CustomTable'
import type { CustomTableProps } from '@/components/CustomTable'
import { useAnnouncementsList } from '@/hook/announcement/use-announcements-list'
import announcementService from '@/service/announcement-service'
import type { Announcement } from '@/types/announcement'
import type { TPaginationResponse } from '@/validators/index'
import { formatVietnameseDate } from '@/utils/date'

type AnnouncementRow = Announcement & { id: string }

const columns = [
  { uid: 'title', name: 'Tieu de', sortable: true },
  { uid: 'block', name: 'Khoi', sortable: true },
  { uid: 'published_at', name: 'Ngay dang', sortable: true },
  { uid: 'slug', name: 'Slug', sortable: false },
  { uid: 'actions', name: 'Push', sortable: false },
]

const blockColorMap: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'default'> = {
  bee: 'warning',
  mouse: 'primary',
  bear: 'secondary',
  dolphin: 'success',
}

export default function AnnouncementsManagementTable() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const [pushingSlug, setPushingSlug] = useState<string | null>(null)

  const { data, isLoading } = useAnnouncementsList({
    page,
    pageSize: limit,
  })

  const tableData: AnnouncementRow[] = useMemo(() => {
    return (data?.items ?? []).map((item) => ({
      ...item,
      id: item.public_id,
    }))
  }, [data])

  const paginationResponse: TPaginationResponse | undefined = useMemo(() => {
    if (!data?.meta) return undefined
    return {
      page: data.meta.page,
      limit: data.meta.page_size,
      total_items: data.meta.total_items,
      total_pages: data.meta.total_pages,
    }
  }, [data])

  const handlePush = async (slug: string, title?: string) => {
    if (!slug) return
    setPushingSlug(slug)
    try {
      const result = await announcementService.pushAnnouncement(slug)
      const summary = `Da gui: ${result.sent}, that bai: ${result.failed}, xoa: ${result.removed}`
      toast.success(title ? `${title} - ${summary}` : summary)
    } catch (error: any) {
      toast.error(error?.message || 'Gui thong bao that bai')
    } finally {
      setPushingSlug(null)
    }
  }

  const renderCell: CustomTableProps<AnnouncementRow>['renderCell'] = (item, columnKey) => {
    switch (columnKey) {
      case 'title':
        return <div className='font-medium'>{item.title}</div>

      case 'block': {
        const color = blockColorMap[item.block_code] ?? 'default'
        return (
          <Chip color={color} size='sm' variant='flat'>
            {item.block_name || item.block_code || '-'}
          </Chip>
        )
      }

      case 'published_at': {
        const formatted = formatVietnameseDate(item.published_at)
        return <span className='text-default-500'>{formatted || '-'}</span>
      }

      case 'slug':
        return <span className='text-default-500'>{item.slug}</span>

      case 'actions': {
        const isPushing = pushingSlug === item.slug
        return (
          <Button
            color='primary'
            size='sm'
            variant='flat'
            isLoading={isPushing}
            isDisabled={!!pushingSlug && !isPushing}
            startContent={!isPushing ? <Send className='size-4' /> : undefined}
            onPress={() => handlePush(item.slug, item.title)}
          >
            Gui push
          </Button>
        )
      }

      default:
        return '-'
    }
  }

  return (
    <section>
      <CustomTable<AnnouncementRow>
        tableClassNames={{
          tr: 'h-14',
          th: 'text-primary text-md bg-white',
          wrapper: 'h-[520px] p-0',
        }}
        selectionMode='none'
        columns={columns}
        data={tableData}
        renderCell={renderCell}
        paginationResponse={paginationResponse}
        isLoading={isLoading}
      />
    </section>
  )
}
