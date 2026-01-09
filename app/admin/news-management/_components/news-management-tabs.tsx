'use client'

import { Archive, FileText, Globe, LayoutGrid } from 'lucide-react'

import CustomTabs from '../../_components/CustomTabs'
import type { CustomTabItem } from '../../_components/CustomTabs'

export default function NewsManagementTabs() {
  const POST_TABS: CustomTabItem[] = [
    { key: 'all', label: 'Tất cả', icon: LayoutGrid },
    { key: 'draft', label: 'Tin nháp', icon: FileText },
    { key: 'published', label: 'Công khai', icon: Globe },
    { key: 'archived', label: 'Lưu trữ', icon: Archive },
  ]

  return <CustomTabs tabs={POST_TABS} defaultKey='all' queryKey='tab' />
}
