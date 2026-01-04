import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tin tức',
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='flex-1'>{children}</main>
    </>
  )
}
