// app/layout.tsx
import type { Metadata } from 'next'

import Footer from '@/app/(app)/_components/Footer'
import Header from '@/app/(app)/_components/Header'

export const metadata: Metadata = {
  title: 'Landing Page',
  description: 'Demo Landing Page layout with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className='flex-1'>{children}</main>
      {/* <Footer /> */}
    </>
  )
}
