'use client'

import { useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, LayoutGrid, Mail, RotateCw, ShieldAlert } from 'lucide-react'

import CustomTabs from '../../_components/CustomTabs'
import type { CustomTabItem } from '../../_components/CustomTabs'

export default function ContactMessagesTabs() {
  const queryClient = useQueryClient()

  const CONTACT_TABS: CustomTabItem[] = [
    { key: 'all', label: 'Tất cả', icon: LayoutGrid },
    { key: 'new', label: 'Mới', icon: Mail },
    { key: 'handled', label: 'Đã xử lý', icon: CheckCircle2 },
    { key: 'spam', label: 'Thư rác', icon: ShieldAlert },
  ]

  const BUTTON_PROPS = {
    label: 'Làm mới',
    icon: RotateCw,
    onPress: () => queryClient.invalidateQueries({ queryKey: ['admin-contact-messages'] }),
  }

  return <CustomTabs tabs={CONTACT_TABS} defaultKey='all' queryKey='tab' button={BUTTON_PROPS} />
}
