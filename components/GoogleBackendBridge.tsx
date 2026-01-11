'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutationLoginWithGoogle } from '@/hook/auth/use-login'
import { useSession } from 'next-auth/react'

/**
 * Sau khi NextAuth login thành công, component này gọi BE /auth/google/login
 * bằng idToken từ session để lấy JWT của BE và set cookie accessToken.
 */
type GoogleBackendBridgeProps = {
  showStatus?: boolean
}

const GoogleBackendBridge = ({ showStatus = false }: GoogleBackendBridgeProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const hasSynced = useRef(false)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing'>('idle')
  const { mutate: loginWithGoogle } = useMutationLoginWithGoogle()

  useEffect(() => {
    if (status !== 'authenticated') {
      setSyncStatus('idle')
      return
    }
    if (hasSynced.current) return

    const idToken = (session as any)?.idToken
    const accessTokenGoogle = (session as any)?.accessToken

    if (!idToken && !accessTokenGoogle) {
      console.warn('Không có idToken/accessToken từ NextAuth session')
      setSyncStatus('idle')
      return
    }

    hasSynced.current = true
    setSyncStatus('syncing')
    loginWithGoogle(
      { idToken, accessToken: accessTokenGoogle },
      {
        onSuccess: () => {
          console.log('Đã sync Google token sang BE, cookie accessToken đã set')
          setSyncStatus('idle')
          // Redirect to news-management page after successful login
          // Use window.location to ensure redirect happens even if router.push doesn't work
          const currentPath = window.location.pathname
          if (currentPath !== '/admin/news-management') {
            window.location.href = '/admin/news-management'
          } else {
            router.push('/admin/news-management')
          }
        },
        onError: (err) => {
          const error: any = err
          console.error('Sync BE thất bại:', error?.response?.data || error?.message)
          hasSynced.current = false // cho phép thử lại nếu cần
          setSyncStatus('idle')
        },
      }
    )
  }, [status, session, loginWithGoogle, router])

  if (!showStatus || syncStatus !== 'syncing') {
    return null
  }

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center px-4'>
      <div className='absolute inset-0 animate-[fadeIn_0.4s_ease-out] bg-gradient-to-br from-emerald-50 via-green-50 to-lime-100'>
        <div className='absolute -right-16 -top-24 size-72 rounded-full bg-emerald-300/40 blur-3xl' />
        <div className='absolute -bottom-24 -left-10 size-72 rounded-full bg-lime-300/40 blur-3xl' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),rgba(255,255,255,0))]' />
      </div>

      <div
        role='status'
        aria-live='polite'
        className='relative z-10 w-full max-w-md animate-[fadeInUp_0.45s_ease-out] rounded-3xl border border-emerald-100/80 bg-white/90 p-8 text-center shadow-[0_30px_80px_-40px_rgba(16,185,129,0.65)] backdrop-blur'
      >
        <div className='mx-auto flex size-12 items-center justify-center'>
          <div className='relative size-12'>
            <div className='absolute inset-0 rounded-full border-2 border-emerald-200' />
            <div className='absolute inset-0 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent' />
            <div className='absolute inset-0 m-auto size-2.5 rounded-full bg-emerald-500' />
          </div>
        </div>

        <h2 className='mt-5 text-xl font-semibold text-emerald-900'>Đang hoàn tất đăng nhập</h2>
        <p className='mt-2 text-sm text-emerald-800/70'>
          Hệ thống đang đồng bộ token từ Google. Vui lòng giữ nguyên trang này.
        </p>

        <div className='mt-6 h-2 w-full overflow-hidden rounded-full bg-emerald-100'>
          <div className='size-full animate-[slide_4s_linear_infinite] bg-[linear-gradient(110deg,#10b981,rgba(16,185,129,0.35),#a3e635)] bg-[length:200%_200%]' />
        </div>

        <div className='mt-4 flex items-center justify-center gap-2 text-xs text-emerald-700'>
          <span className='relative flex size-2.5'>
            <span className='absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60' />
            <span className='relative inline-flex size-2.5 rounded-full bg-emerald-600' />
          </span>
          <span>Đang kết nối máy chủ</span>
        </div>
      </div>
    </div>
  )
}

export default GoogleBackendBridge
