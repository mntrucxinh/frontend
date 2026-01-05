"use client"

/**
 * Example component showing how to use Facebook integration
 * This is a reference implementation - you can integrate these components
 * into your existing pages/components as needed.
 */

import { useState } from "react"
import FacebookStatus from "./FacebookStatus"
import FacebookRelinkModal from "./FacebookRelinkModal"
import { handleFacebookError } from "@/lib/facebook-error-handler"
import { api } from "@/lib/axios"
import toast from "react-hot-toast"
import type { FacebookApiError } from "@/types/errors"

export default function FacebookIntegrationExample() {
  const [showRelinkModal, setShowRelinkModal] = useState(false)

  // Example: Post to Facebook with error handling
  const handlePostToFacebook = async () => {
    try {
      const response = await api.post("/posts/facebook", {
        message: "Hello from Facebook integration!",
        // ... other post data
      })

      toast.success("Đăng bài lên Facebook thành công!")
      return response.data
    } catch (error: unknown) {
      // Handle Facebook-specific errors
      const handled = handleFacebookError(
        error as FacebookApiError,
        () => {
          // Token expired - show relink modal
          setShowRelinkModal(true)
        },
        () => {
          // Not linked - show notification
          toast.error("Vui lòng liên kết Facebook trước khi đăng bài")
        }
      )

      // If not a Facebook error, show generic error
      if (!handled) {
        const apiError = error as FacebookApiError
        toast.error(
          apiError?.response?.data?.message || "Có lỗi xảy ra khi đăng bài"
        )
      }

      throw error
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Trạng thái Facebook</h2>
        <FacebookStatus showLinkButton={true} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Đăng bài lên Facebook</h2>
        <button
          onClick={handlePostToFacebook}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Đăng bài
        </button>
      </div>

      <FacebookRelinkModal
        isOpen={showRelinkModal}
        onClose={() => setShowRelinkModal(false)}
        onSuccess={() => {
          toast.success("Đã liên kết lại Facebook thành công!")
        }}
      />
    </div>
  )
}

