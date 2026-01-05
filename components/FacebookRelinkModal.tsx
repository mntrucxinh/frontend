"use client"

import { AnimatePresence, motion } from "framer-motion"
import { createPortal } from "react-dom"
import FacebookLinkButton from "./FacebookLinkButton"
import { AlertCircle, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useFacebookStatus } from "@/hook/facebook/use-facebook-status"
import { useQueryClient } from "@tanstack/react-query"

interface FacebookRelinkModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function FacebookRelinkModal({
  isOpen,
  onClose,
  onSuccess,
}: FacebookRelinkModalProps) {
  const queryClient = useQueryClient()
  const { data } = useFacebookStatus({ enabled: isOpen })
  const isLinked = data?.linked ?? false
  const tokenExpired = data?.tokenExpired ?? false
  const [mounted, setMounted] = useState(false)

  // Ensure we're on client side before using portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Refetch status when modal opens
  useEffect(() => {
    if (isOpen) {
      queryClient.invalidateQueries({ queryKey: ["facebook-status"] })
    }
  }, [isOpen, queryClient])

  // Note: We don't auto-close here because the modal should stay open
  // until user explicitly closes it or successfully links via the button

  const handleSuccess = () => {
    onSuccess?.()
    onClose()
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-[9999] flex justify-center items-center p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-800 z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {tokenExpired ? (
                  <AlertCircle className="h-6 w-6 text-amber-500" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-blue-500" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {tokenExpired
                    ? "Token Facebook đã hết hạn"
                    : "Liên kết lại Facebook"}
                </h2>
                <p className="text-gray-600 mb-4">
                  {tokenExpired
                    ? "Vui lòng liên kết lại Facebook Page để tiếp tục đăng bài."
                    : "Bạn có muốn liên kết lại Facebook Page không?"}
                </p>
                <div className="flex gap-2">
                  <FacebookLinkButton
                    onSuccess={handleSuccess}
                    className="flex-1"
                  />
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Use portal to render modal at document body level
  if (!mounted) return null

  return createPortal(modalContent, document.body)
}

