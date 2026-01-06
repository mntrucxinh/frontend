"use client"

import { useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useMutationLoginWithGoogle } from "@/hook/auth/use-login"

/**
 * Sau khi NextAuth login thành công, component này gọi BE /auth/google/login
 * bằng idToken từ session để lấy JWT của BE và set cookie accessToken.
 */
const GoogleBackendBridge = () => {
  if (typeof window === "undefined") {
    return null
  }

  const { data: session, status } = useSession()
  const router = useRouter()
  const hasSynced = useRef(false)
  const { mutate: loginWithGoogle } = useMutationLoginWithGoogle()

  useEffect(() => {
    if (status !== "authenticated") return
    if (hasSynced.current) return

    const idToken = (session as any)?.idToken
    const accessTokenGoogle = (session as any)?.accessToken

    if (!idToken && !accessTokenGoogle) {
      console.warn("Không có idToken/accessToken từ NextAuth session")
      return
    }

    hasSynced.current = true
    loginWithGoogle(
      { idToken, accessToken: accessTokenGoogle },
      {
        onSuccess: () => {
          console.log("Đã sync Google token sang BE, cookie accessToken đã set")
          // Redirect to news-management page after successful login
          // Use window.location to ensure redirect happens even if router.push doesn't work
          const currentPath = window.location.pathname
          if (currentPath !== "/news-management") {
            window.location.href = "/news-management"
          } else {
            router.push("/news-management")
          }
        },
        onError: (err) => {
          const error: any = err
          console.error("Sync BE thất bại:", error?.response?.data || error?.message)
          hasSynced.current = false // cho phép thử lại nếu cần
        },
      }
    )
  }, [status, session, loginWithGoogle, router])

  return null
}

export default GoogleBackendBridge
