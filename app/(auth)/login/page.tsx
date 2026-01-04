'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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
    <main
      className='relative min-h-screen flex items-center justify-center px-4'
      style={{
        background: 'linear-gradient(135deg, #d7f5e0 0%, #a7e7bd 100%)',
      }}
    >
      <div className='w-full max-w-2xl bg-white rounded-3xl shadow-2xl px-10 pb-10 pt-5 flex flex-col'>
        <button onClick={() => router.push('/')} className='self-center flex items-center gap-2'>
          <Image
            src='/assets/images/logo_truc_xinh.png'
            alt='Truc Xinh logo'
            width={260}
            height={78}
            priority
            className='h-auto w-auto'
          />
        </button>

        <LoginForm />
      </div>
    </main>
  )
}
