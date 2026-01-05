import toast from "react-hot-toast"
import type { FacebookApiError } from "@/types/errors"

/**
 * Handle Facebook-related errors from API calls
 * @param error - The error object from API call
 * @param onTokenExpired - Callback when token is expired
 * @param onNotLinked - Callback when Facebook is not linked
 * @returns true if error was handled, false otherwise
 */
export function handleFacebookError(
  error: FacebookApiError,
  onTokenExpired?: () => void,
  onNotLinked?: () => void
): boolean {
  const errorCode =
    error?.code ||
    error?.response?.data?.code ||
    error?.response?.data?.message

  if (errorCode === "facebook_token_expired") {
    toast.error("Token Facebook đã hết hạn. Vui lòng liên kết lại.")
    onTokenExpired?.()
    return true
  }

  if (errorCode === "facebook_not_linked") {
    toast.error("Chưa liên kết Facebook. Vui lòng liên kết để tiếp tục.")
    onNotLinked?.()
    return true
  }

  return false
}

