import CustomBreadCrumbs, { Crumb } from '@/components/CustomBreadCrumbs'

type Props = {
  id: string | number
  slug: string
}

export default function NewsDetailBreadCrumbs({ id, slug }: Props) {
  const crumbs: Crumb[] = [
    {
      label: 'Quản lý tin tức',
      href: '/admin/news-management',
    },
    {
      label: slug,
    },
  ]

  return (
    <div>
      <CustomBreadCrumbs crumbs={crumbs} />
    </div>
  )
}
