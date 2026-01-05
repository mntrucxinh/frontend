"use client"

import { FACEBOOK_MESSAGE_TYPES, FACEBOOK_OAUTH } from "@/constants/facebook"
import type { FacebookMessageType } from "@/constants/facebook"

/**
 * Notify parent window about OAuth result
 */
export function notifyParent(
  type: Extract<
    FacebookMessageType,
    "FACEBOOK_OAUTH_SUCCESS" | "FACEBOOK_OAUTH_ERROR"
  >,
  data: Record<string, unknown>
): void {
  if (window.opener && !window.opener.closed) {
    window.opener.postMessage({ type, ...data }, window.location.origin)
  }
}

/**
 * Extract error message from API error response
 */
export function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const apiError = error as {
      response?: {
        status?: number
        data?: {
          message?: string
          error?: string
        }
      }
      message?: string
    }

    const status = apiError.response?.status
    if (status === 401) {
      return "Lỗi xác thực (401). Token có thể đã hết hạn. Vui lòng đăng nhập lại và thử lại."
    }
    if (status === 403) {
      return "Không có quyền truy cập (403). Vui lòng kiểm tra quyền của tài khoản."
    }
    if (status === 404) {
      return "API endpoint không tồn tại. Vui lòng kiểm tra backend."
    }

    return (
      apiError.response?.data?.message ||
      apiError.response?.data?.error ||
      apiError.message ||
      "Liên kết Facebook thất bại"
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Liên kết Facebook thất bại"
}

/**
 * Request JWT token from parent window via postMessage
 */
export function requestTokenFromParent(): Promise<string | null> {
  return new Promise((resolve) => {
    // Request token from parent window
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(
        { type: FACEBOOK_MESSAGE_TYPES.REQUEST_JWT_TOKEN },
        window.location.origin
      )
    }

    const timeout = setTimeout(() => {
      window.removeEventListener("message", handler)
      resolve(null)
    }, FACEBOOK_OAUTH.TOKEN_REQUEST_TIMEOUT_MS)

    const handler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data.type === FACEBOOK_MESSAGE_TYPES.JWT_TOKEN_RESPONSE) {
        clearTimeout(timeout)
        window.removeEventListener("message", handler)
        resolve(event.data.token || null)
      }
    }

    window.addEventListener("message", handler)
  })
}

