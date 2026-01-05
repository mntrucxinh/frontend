"use client"

import { getAccessToken } from "./storage"
import toast from "react-hot-toast"
import {
  FACEBOOK_OAUTH,
  FACEBOOK_SCOPES,
  FACEBOOK_OAUTH_VERSION,
  FACEBOOK_MESSAGE_TYPES,
} from "@/constants/facebook"
import type { FacebookMessageType } from "@/constants/facebook"

export interface FacebookOAuthConfig {
  onSuccess?: () => void
  onError?: (message: string) => void
}

interface FacebookOAuthMessage {
  type: FacebookMessageType
  message?: string
  accessToken?: string
  error?: string
  token?: string | null
}

/**
 * Opens Facebook OAuth popup and handles the authentication flow
 * @param config Configuration object with callbacks
 * @returns Function to cleanup event listeners (call when component unmounts or popup closes)
 */
export function openFacebookOAuthPopup(
  config: FacebookOAuthConfig = {}
): (() => void) | null {
  // Check if user has JWT token before opening popup
  const token = getAccessToken()
  if (!token) {
    toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.")
    return null
  }

  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
  if (!appId) {
    toast.error("Facebook App ID chưa được cấu hình")
    return null
  }

  // Facebook OAuth configuration
  const redirectUri = `${window.location.origin}/auth/facebook/callback`
  const authUrl = `https://www.facebook.com/${FACEBOOK_OAUTH_VERSION}/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${FACEBOOK_SCOPES}&response_type=token`

  // Open popup centered on screen
  const left = window.screen.width / 2 - FACEBOOK_OAUTH.POPUP_WIDTH / 2
  const top = window.screen.height / 2 - FACEBOOK_OAUTH.POPUP_HEIGHT / 2

  const popup = window.open(
    authUrl,
    "Facebook Login",
    `width=${FACEBOOK_OAUTH.POPUP_WIDTH},height=${FACEBOOK_OAUTH.POPUP_HEIGHT},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
  )

  if (!popup) {
    toast.error("Vui lòng cho phép popup để đăng nhập Facebook")
    return null
  }

  // Handle messages from popup
  const handleMessage = (event: MessageEvent<FacebookOAuthMessage>) => {
    if (event.origin !== window.location.origin) return

    const { type, message, error, token } = event.data

    if (type === FACEBOOK_MESSAGE_TYPES.OAUTH_SUCCESS) {
      config.onSuccess?.()
    } else if (type === FACEBOOK_MESSAGE_TYPES.OAUTH_ERROR) {
      config.onError?.(message || error || "Liên kết Facebook thất bại")
    } else if (type === FACEBOOK_MESSAGE_TYPES.REQUEST_JWT_TOKEN) {
      // Respond to token request from popup
      const currentToken = getAccessToken()
      if (event.source && "postMessage" in event.source) {
        ;(event.source as Window).postMessage(
          {
            type: FACEBOOK_MESSAGE_TYPES.JWT_TOKEN_RESPONSE,
            token: currentToken || null,
          } satisfies FacebookOAuthMessage,
          event.origin
        )
      }
    }
  }

  window.addEventListener("message", handleMessage)

  // Cleanup function
  let timeoutId: NodeJS.Timeout | null = null
  let intervalId: NodeJS.Timeout | null = null

  const cleanup = () => {
    window.removeEventListener("message", handleMessage)
    if (timeoutId) clearTimeout(timeoutId)
    if (intervalId) clearInterval(intervalId)
  }

  // Check if popup is closed manually
  intervalId = setInterval(() => {
    if (popup.closed) {
      cleanup()
    }
  }, FACEBOOK_OAUTH.CHECK_INTERVAL_MS)

  // Timeout after configured duration
  timeoutId = setTimeout(() => {
    if (!popup.closed) {
      popup.close()
      cleanup()
      toast.error("Đăng nhập Facebook quá thời gian")
    }
  }, FACEBOOK_OAUTH.TIMEOUT_MS)

  return cleanup
}

