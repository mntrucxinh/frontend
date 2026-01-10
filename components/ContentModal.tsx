'use client'

import { ReactNode, useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Đóng modal khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300'>
      <div
        ref={modalRef}
        className='relative w-[85%] max-w-2xl scale-100 transform rounded-xl bg-white p-6 shadow-2xl transition-transform duration-300'
      >
        <button
          className='absolute right-4 top-3 text-2xl font-bold text-gray-600 hover:text-gray-900'
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
