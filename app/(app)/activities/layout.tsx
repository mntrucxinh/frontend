import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hoạt động',
  description: 'Khám phá những hoạt động, sự kiện và khoảnh khắc đáng nhớ tại trường mầm non Trúc Xinh',
}

export default function ActivitiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='flex-1'>{children}</main>
    </>
  )
}
