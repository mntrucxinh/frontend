"use client"

import { useState, useRef, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Facebook } from "lucide-react"
import toast from "react-hot-toast"
import { openFacebookOAuthPopup } from "@/utils/facebook-oauth"

interface FacebookLinkButtonProps {
  onSuccess?: () => void
  className?: string
}

export default function FacebookLinkButton({
  onSuccess,
  className,
}: FacebookLinkButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()
  const cleanupRef = useRef<(() => void) | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupRef.current?.()
    }
  }, [])

  const handleLinkFacebook = () => {
    setIsLoading(true)

    const cleanup = openFacebookOAuthPopup({
      onSuccess: () => {
        setIsLoading(false)
        queryClient.invalidateQueries({ queryKey: ["facebook-status"] })
        toast.success("Liên kết Facebook thành công!")
        onSuccess?.()
        cleanupRef.current?.()
        cleanupRef.current = null
      },
      onError: (message) => {
        setIsLoading(false)
        toast.error(message)
        cleanupRef.current?.()
        cleanupRef.current = null
      },
    })

    if (cleanup) {
      cleanupRef.current = cleanup
    } else {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLinkFacebook}
      disabled={isLoading}
      className={className}
      variant="outline"
    >
      <Facebook className="mr-2 size-4" />
      {isLoading ? "Đang xử lý..." : "Liên kết Facebook"}
    </Button>
  )
}

