"use client"

import Image from "next/image"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import GoogleBackendBridge from "@/components/GoogleBackendBridge"

export default function AuthLoadingPage() {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  }, [status, router])

  const statusLabel =
    status === "authenticated" ? "Đang đồng bộ token" : "Đang xác thực Google"
  const statusHint =
    status === "authenticated"
      ? "Đang chuẩn bị trang quản trị, vui lòng chờ trong giây lát."
      : "Đang kiểm tra phiên đăng nhập với Google."

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GoogleBackendBridge />

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-100" />
      <div className="absolute -left-20 -top-24 size-72 rounded-full bg-emerald-300/40 blur-3xl" />
      <div className="absolute -bottom-28 -right-16 size-80 rounded-full bg-lime-300/40 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),rgba(255,255,255,0))]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg animate-[fadeInUp_0.5s_ease-out] rounded-3xl border border-emerald-100/80 bg-white/90 p-8 text-center shadow-[0_30px_80px_-40px_rgba(16,185,129,0.65)] backdrop-blur">
          <div className="mx-auto w-fit rounded-full bg-emerald-100/80 p-3">
            <Image
              src="/assets/images/logo_truc_xinh.png"
              alt="Truc Xinh logo"
              width={140}
              height={42}
              priority
              className="size-auto"
            />
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/70">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
            </span>
            {statusLabel}
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-emerald-900">
            Đang chuẩn bị trang quản trị
          </h1>
          <p className="mt-2 text-sm text-emerald-800/70">{statusHint}</p>

          <div className="mt-6 space-y-3 text-left text-sm text-emerald-800/80">
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700">
                <span className="text-base">1</span>
              </div>
              <div>
                <p className="font-medium text-emerald-900">Xác nhận tài khoản</p>
                <p className="text-xs text-emerald-700/70">Đang lấy thông tin từ Google</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700">
                <span className="text-base">2</span>
              </div>
              <div>
                <p className="font-medium text-emerald-900">Đồng bộ token</p>
                <p className="text-xs text-emerald-700/70">Thiết lập phiên đăng nhập</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700">
                <span className="text-base">3</span>
              </div>
              <div>
                <p className="font-medium text-emerald-900">Chuẩn bị trang quản trị</p>
                <p className="text-xs text-emerald-700/70">Sắp điều hướng đến dashboard</p>
              </div>
            </div>
          </div>

          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-emerald-100">
            <div className="size-full bg-[linear-gradient(110deg,#10b981,rgba(16,185,129,0.35),#a3e635)] bg-[length:200%_200%] animate-[slide_4s_linear_infinite]" />
          </div>

          <p className="mt-4 text-xs text-emerald-700/70">
            Nếu mất quá lâu, vui lòng kiểm tra kết nối và thử lại.
          </p>
        </div>
      </div>
    </main>
  )
}
