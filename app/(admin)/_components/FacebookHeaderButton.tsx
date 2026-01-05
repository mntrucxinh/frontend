"use client"

import { useState, useMemo } from "react"
import { Button } from "@heroui/react"
import { Facebook, CheckCircle2, XCircle, AlertTriangle, Loader2 } from "lucide-react"
import { useFacebookStatus } from "@/hook/facebook/use-facebook-status"
import FacebookRelinkModal from "@/components/FacebookRelinkModal"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { openFacebookOAuthPopup } from "@/utils/facebook-oauth"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react"

export default function FacebookHeaderButton() {
  const { data, isLoading, error } = useFacebookStatus()
  const [showRelinkModal, setShowRelinkModal] = useState(false)
  const [isLinking, setIsLinking] = useState(false)
  const queryClient = useQueryClient()

  const isLinked = data?.linked ?? false
  const tokenExpired = data?.tokenExpired ?? false
  const pageName = data?.pageName

  // Determine status color and icon - memoized for performance
  const statusConfig = useMemo(() => {
    if (isLoading) {
      return {
        icon: Loader2,
        color: "default" as const,
        text: "Đang kiểm tra...",
        className: "animate-spin",
      }
    }
    if (error) {
      return {
        icon: XCircle,
        color: "danger" as const,
        text: "Lỗi",
        className: "",
      }
    }
    if (isLinked && !tokenExpired) {
      return {
        icon: CheckCircle2,
        color: "success" as const,
        text: "Đã liên kết",
        className: "",
      }
    }
    if (tokenExpired) {
      return {
        icon: AlertTriangle,
        color: "warning" as const,
        text: "Token hết hạn",
        className: "",
      }
    }
    return {
      icon: XCircle,
      color: "default" as const,
      text: "Chưa liên kết",
      className: "",
    }
  }, [isLoading, error, isLinked, tokenExpired])

  const StatusIcon = statusConfig.icon

  const handleLinkFacebook = () => {
    setIsLinking(true)

    const cleanup = openFacebookOAuthPopup({
      onSuccess: () => {
        setIsLinking(false)
        queryClient.invalidateQueries({ queryKey: ["facebook-status"] })
        toast.success("Liên kết Facebook thành công!")
        cleanup?.()
      },
      onError: (message) => {
        setIsLinking(false)
        toast.error(message)
        cleanup?.()
      },
    })

    if (!cleanup) {
      setIsLinking(false)
    }
  }

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button
            variant="flat"
            className="h-10 gap-2 rounded-xl border border-black/10 bg-white px-3 hover:bg-black/[0.03]"
            startContent={
              <StatusIcon
                className={`h-4 w-4 ${
                  statusConfig.color === "success"
                    ? "text-green-600"
                    : statusConfig.color === "warning"
                    ? "text-amber-500"
                    : statusConfig.color === "danger"
                    ? "text-red-600"
                    : "text-gray-400"
                } ${statusConfig.className}`}
              />
            }
          >
            <Facebook className="h-4 w-4 text-blue-600" />
            <span className="hidden text-sm font-medium md:inline">
              Facebook
            </span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Facebook Actions">
          <DropdownItem
            key="status"
            textValue="status"
            className="cursor-default"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <StatusIcon
                  className={`h-4 w-4 ${
                    statusConfig.color === "success"
                      ? "text-green-600"
                      : statusConfig.color === "warning"
                      ? "text-amber-500"
                      : statusConfig.color === "danger"
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                />
                <span className="text-sm font-medium">{statusConfig.text}</span>
              </div>
              {pageName && (
                <span className="text-xs text-foreground/70">
                  Page: {pageName}
                </span>
              )}
              {!isLinked && (
                <span className="text-xs text-foreground/70">
                  Chưa liên kết Facebook Page
                </span>
              )}
              {tokenExpired && (
                <span className="text-xs text-foreground/70">
                  Token đã hết hạn, cần liên kết lại
                </span>
              )}
            </div>
          </DropdownItem>
          <DropdownItem
            key="divider"
            className="h-px bg-divider p-0"
            textValue="divider"
            isReadOnly
          />
          {!isLinked || tokenExpired ? (
            <DropdownItem
              key="link"
              textValue="link"
              onPress={() => {
                if (tokenExpired) {
                  setShowRelinkModal(true)
                } else {
                  handleLinkFacebook()
                }
              }}
              isDisabled={isLinking}
            >
              {isLinking
                ? "Đang xử lý..."
                : tokenExpired
                ? "Liên kết lại"
                : "Liên kết Facebook"}
            </DropdownItem>
          ) : (
            <DropdownItem
              key="relink"
              textValue="relink"
              onPress={() => {
                setShowRelinkModal(true)
              }}
            >
              Liên kết lại
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>

      <FacebookRelinkModal
        isOpen={showRelinkModal}
        onClose={() => setShowRelinkModal(false)}
      />
    </>
  )
}

