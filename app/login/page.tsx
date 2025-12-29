'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  if (!mounted) return null // Ngăn server render trước

  return (
    <main className='fixed inset-0 flex flex-col items-center justify-center gap-4 bg-primary'>
      <header className='absolute left-0 top-0 flex w-full items-center px-6 py-4'>
        <button onClick={() => router.push('/')} className='flex items-center gap-2'>
          <span className='text-lg font-semibold text-white'>Trúc Xinh</span>
        </button>
      </header>
      <LoginForm />

      <p className='text-sm text-white'>
        Not registered?{' '}
        <Link href='/register' className='text-white underline hover:text-gray-300'>
          Create an account
        </Link>
      </p>
    </main>
  )
}
