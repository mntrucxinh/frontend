"use client"

import { useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useMutationLoginWithGoogle } from "@/hook/auth/use-login"

/**
 * Sau khi NextAuth login thành công, component này gọi BE /auth/google/login
 * bằng idToken từ session để lấy JWT của BE và set cookie accessToken.
 */
const GoogleBackendBridge = () => {
  const { data: session, status } = useSession()
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
        },
        onError: (err) => {
          const error: any = err
          console.error("Sync BE thất bại:", error?.response?.data || error?.message)
          hasSynced.current = false // cho phép thử lại nếu cần
        },
      }
    )
  }, [status, session, loginWithGoogle])

  return null
}

export default GoogleBackendBridge
