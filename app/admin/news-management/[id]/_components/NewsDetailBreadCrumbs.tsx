import CustomBreadCrumbs, { Crumb } from '@/components/CustomBreadCrumbs'

type Props = {
  id: string | number
  metaTitle: string
}

export default function NewsDetailBreadCrumbs({ id, metaTitle }: Props) {
  const crumbs: Crumb[] = [
    {
      label: 'Quản lý tin tức',
      href: '/admin/news-management',
    },
    {
      label: metaTitle,
    },
  ]

  return (
    <div>
      <CustomBreadCrumbs crumbs={crumbs} />
    </div>
  )
}
