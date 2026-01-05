"use client"

import { useEffect, useState, Suspense, useCallback, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { useLinkFacebook } from "@/hook/facebook/use-link-facebook"
import { getAccessToken } from "@/utils/storage"
import {
  notifyParent,
  getErrorMessage,
  requestTokenFromParent,
} from "@/utils/facebook-callback-helpers"
import { FACEBOOK_MESSAGE_TYPES, FACEBOOK_OAUTH } from "@/constants/facebook"

function FacebookCallbackContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  )
  const [errorMessage, setErrorMessage] = useState<string>("")
  const linkFacebook = useLinkFacebook()
  const [processed, setProcessed] = useState(false)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  const proceedWithLink = useCallback(
    async (fbAccessToken: string) => {
      let jwtToken = getAccessToken()

      // If no token in popup, try to get from parent window
      if (!jwtToken && window.opener && !window.opener.closed) {
        jwtToken = (await requestTokenFromParent()) || undefined
      }

      if (!jwtToken) {
        const message =
          "Bạn chưa đăng nhập. Vui lòng đăng nhập vào hệ thống trước khi liên kết Facebook."
        setErrorMessage(message)
        setStatus("error")
        notifyParent(FACEBOOK_MESSAGE_TYPES.OAUTH_ERROR, {
          error: "not_authenticated",
          message: "Bạn chưa đăng nhập. Vui lòng đăng nhập trước.",
        })
        const timeoutId = setTimeout(
          () => window.close(),
          FACEBOOK_OAUTH.CLOSE_DELAY_ERROR_MS
        )
        timeoutRefs.current.push(timeoutId)
        return
      }

      linkFacebook.mutate(
        { user_access_token: fbAccessToken },
        {
          onSuccess: () => {
            setStatus("success")
            notifyParent(FACEBOOK_MESSAGE_TYPES.OAUTH_SUCCESS, {
              accessToken: fbAccessToken,
            })
            const timeoutId = setTimeout(
              () => window.close(),
              FACEBOOK_OAUTH.CLOSE_DELAY_SUCCESS_MS
            )
            timeoutRefs.current.push(timeoutId)
          },
          onError: (error: unknown) => {
            const errorMsg = getErrorMessage(error)
            setErrorMessage(errorMsg)
            setStatus("error")
            notifyParent(FACEBOOK_MESSAGE_TYPES.OAUTH_ERROR, {
              error: "link_failed",
              message: errorMsg,
            })
            const timeoutId = setTimeout(
              () => window.close(),
              FACEBOOK_OAUTH.CLOSE_DELAY_ERROR_MS
            )
            timeoutRefs.current.push(timeoutId)
          },
        }
      )
    },
    [linkFacebook]
  )

  useEffect(() => {
    if (processed) return

    // Extract access_token from hash fragment or query params
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const accessToken =
      params.get("access_token") || searchParams.get("access_token")
    const error = params.get("error") || searchParams.get("error")
    const errorDescription =
      params.get("error_description") || searchParams.get("error_description")

    setProcessed(true)

    // Handle Facebook OAuth error
    if (error) {
      setStatus("error")
      const message = errorDescription || "Đăng nhập Facebook thất bại"
      setErrorMessage(message)
      notifyParent(FACEBOOK_MESSAGE_TYPES.OAUTH_ERROR, {
        error: error,
        message,
      })
      const timeoutId = setTimeout(
        () => window.close(),
        FACEBOOK_OAUTH.CLOSE_DELAY_SUCCESS_MS
      )
      timeoutRefs.current.push(timeoutId)
      return
    }

    // Handle missing access token
    if (!accessToken) {
      setStatus("error")
      setErrorMessage("Không nhận được access token từ Facebook")
      notifyParent(FACEBOOK_MESSAGE_TYPES.OAUTH_ERROR, {
        error: "no_token",
        message: "Không nhận được access token từ Facebook",
      })
      const timeoutId = setTimeout(
        () => window.close(),
        FACEBOOK_OAUTH.CLOSE_DELAY_SUCCESS_MS
      )
      timeoutRefs.current.push(timeoutId)
      return
    }

    // Proceed with linking
    proceedWithLink(accessToken)
  }, [processed, searchParams, proceedWithLink])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId))
      timeoutRefs.current = []
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang xử lý...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-green-600 text-4xl mb-4">✓</div>
            <p className="text-gray-600">Liên kết Facebook thành công!</p>
            <p className="text-sm text-gray-500 mt-2">Đang đóng cửa sổ...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-red-600 text-4xl mb-4">✗</div>
            <p className="text-gray-600 font-semibold text-lg mb-2">
              Có lỗi xảy ra
            </p>
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto mb-4">
                <p className="text-sm text-red-800 font-medium">
                  {errorMessage}
                </p>
              </div>
            )}
            {errorMessage?.includes("chưa đăng nhập") && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-md mx-auto mb-4">
                <p className="text-xs text-blue-800">
                  💡 <strong>Hướng dẫn:</strong> Vui lòng đăng nhập vào hệ thống
                  trước, sau đó quay lại liên kết Facebook.
                </p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-4">
              Cửa sổ sẽ tự động đóng sau vài giây...
            </p>
            <button
              onClick={() => window.close()}
              className="mt-4 px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              Đóng cửa sổ ngay
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function FacebookCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
      }
    >
      <FacebookCallbackContent />
    </Suspense>
  )
}
