'use client'

import Link from 'next/link'
import { BreadcrumbItem, Breadcrumbs, cn } from '@heroui/react'

export type Crumb = {
  label: string
  href?: string
}

type Props = {
  crumbs: Crumb[]
}

export default function CustomBreadCrumbs({ crumbs }: Props) {
  return (
    <Breadcrumbs
      separator='/'
      size='lg'
      classNames={{
        separator: 'px-1 text-primary',
      }}
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1

        return (
          <BreadcrumbItem key={index}>
            {crumb.href && !isLast ? (
              <Link
                href={crumb.href}
                className='font-semibold text-default-500 transition hover:text-primary/85'
              >
                {crumb.label}
              </Link>
            ) : (
              <span className={cn('font-semibold', isLast ? 'text-primary' : 'text-default-500')}>
                {crumb.label}
              </span>
            )}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumbs>
  )
}
