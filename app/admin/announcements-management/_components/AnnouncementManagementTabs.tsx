'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Archive, FileText, Globe, LayoutGrid, Search, X } from 'lucide-react'
import { Input, Button } from '@heroui/react'

import CustomTabs from '../../_components/CustomTabs'
import type { CustomTabItem } from '../../_components/CustomTabs'
import ModalCreateEditAnnouncement from './ModalCreateEditAnnouncement'

export default function AnnouncementManagementTabs() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '')
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const POST_TABS: CustomTabItem[] = [
    { key: 'all', label: 'Tất cả', icon: LayoutGrid },
    { key: 'draft', label: 'Thông báo nháp', icon: FileText },
    { key: 'published', label: 'Công khai', icon: Globe },
    { key: 'archived', label: 'Lưu trữ', icon: Archive },
  ]

  const BUTTON_PROPS = {
    label: 'Tạo thông báo',
    onPress: () => setIsCreateOpen(true),
  }

  // Sync search value with URL on mount
  useEffect(() => {
    const q = searchParams.get('q') || ''
    setSearchValue(q)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount

  // Debounce search and update URL
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      const currentQ = searchParams.get('q') || ''
      const newQ = searchValue.trim()
      
      // Only update URL if value actually changed
      if (currentQ !== newQ) {
        const params = new URLSearchParams(searchParams.toString())
        
        // Reset to page 1 when searching
        params.set('page', '1')
        
        if (newQ) {
          params.set('q', newQ)
        } else {
          params.delete('q')
        }

        const qs = params.toString()
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
      }
    }, 500) // 500ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchValue, pathname, router, searchParams])

  const handleClearSearch = () => {
    setSearchValue('')
  }

  return (
    <>
      {/* Header Section - Compact Layout */}
      <div className='space-y-3'>
        {/* Row 1: Search + Create Button */}
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <Input
            placeholder='Tìm kiếm theo tiêu đề hoặc slug...'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            startContent={<Search className='size-4 text-default-400' />}
            endContent={
              searchValue ? (
                <button
                  type='button'
                  onClick={handleClearSearch}
                  className='flex items-center justify-center rounded-full p-0.5 hover:bg-default-100 transition-colors'
                  aria-label='Xóa tìm kiếm'
                >
                  <X className='size-4 text-default-400' />
                </button>
              ) : null
            }
            classNames={{
              base: 'w-full sm:max-w-md',
              input: 'text-sm',
              inputWrapper: [
                'border-default-200',
                'bg-white',
                'shadow-sm',
                'hover:shadow-md',
                'transition-all',
                'duration-200',
                'focus-within:border-primary',
                'focus-within:shadow-md',
                'focus-within:ring-2',
                'focus-within:ring-primary/20',
              ].join(' '),
            }}
            radius='lg'
            size='md'
          />
          
          {/* Create Button */}
          <Button color='primary' onPress={BUTTON_PROPS.onPress} size='md' className='w-full sm:w-auto'>
            {BUTTON_PROPS.label}
          </Button>
        </div>

        {/* Row 2: Tabs */}
        <div className='border-b border-default-200'>
          <CustomTabs 
            tabs={POST_TABS} 
            defaultKey='all' 
            queryKey='tab'
            className='w-full'
          />
        </div>
      </div>

      <ModalCreateEditAnnouncement
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        isCreateModal
      />
    </>
  )
}

