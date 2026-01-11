'use client'

import { useState } from 'react'
import { useFacebookStatus } from '@/hook/facebook/use-facebook-status'
import { AlertTriangle, CheckCircle2, Loader2, XCircle } from 'lucide-react'

import FacebookLinkButton from './FacebookLinkButton'
import FacebookRelinkModal from './FacebookRelinkModal'

interface FacebookStatusProps {
  showLinkButton?: boolean
  className?: string
}

export default function FacebookStatus({
  showLinkButton = true,
  className = '',
}: FacebookStatusProps) {
  const { data, isLoading, error } = useFacebookStatus()
  const [showRelinkModal, setShowRelinkModal] = useState(false)

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Loader2 className='size-4 animate-spin text-gray-400' />
        <span className='text-sm text-gray-500'>Đang kiểm tra...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex items-center gap-2 text-red-600 ${className}`}>
        <XCircle className='size-4' />
        <span className='text-sm'>Lỗi khi kiểm tra trạng thái</span>
      </div>
    )
  }

  const isLinked = data?.linked ?? false
  const tokenExpired = data?.tokenExpired ?? false
  const pageName = data?.pageName

  return (
    <>
      <div className={`flex items-center gap-3 ${className}`}>
        {isLinked && !tokenExpired ? (
          <>
            <CheckCircle2 className='size-5 text-green-600' />
            <div className='flex-1'>
              <p className='text-sm font-medium text-green-600'>Đã liên kết</p>
              {pageName && <p className='text-xs text-gray-500'>Page: {pageName}</p>}
            </div>
          </>
        ) : tokenExpired ? (
          <>
            <AlertTriangle className='size-5 text-amber-500' />
            <div className='flex-1'>
              <p className='text-sm font-medium text-amber-600'>Token đã hết hạn</p>
              <p className='text-xs text-gray-500'>Vui lòng liên kết lại Facebook</p>
            </div>
            {showLinkButton && (
              <button
                onClick={() => setShowRelinkModal(true)}
                className='text-xs text-blue-600 underline hover:text-blue-700'
              >
                Liên kết lại
              </button>
            )}
          </>
        ) : (
          <>
            <XCircle className='size-5 text-gray-400' />
            <div className='flex-1'>
              <p className='text-sm font-medium text-gray-600'>Chưa liên kết</p>
              <p className='text-xs text-gray-500'>Liên kết Facebook để đăng bài</p>
            </div>
            {showLinkButton && <FacebookLinkButton />}
          </>
        )}
      </div>

      <FacebookRelinkModal isOpen={showRelinkModal} onClose={() => setShowRelinkModal(false)} />
    </>
  )
}
