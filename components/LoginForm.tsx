"use client"

import GoogleLoginButton from "@/components/GoogleLoginButton"
import GoogleBackendBridge from "@/components/GoogleBackendBridge"

export default function LoginForm() {
  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <GoogleBackendBridge />
      <h2 className="text-2xl font-bold text-gray-900">Đăng nhập quản trị</h2>
      <p className="text-sm text-green-700">
        Sử dụng tài khoản google{" "}
        <span className="font-semibold text-green-800">trucxinh@gmail.com</span>{" "}
        để truy cập bảng điều khiển trường mầm non Trúc Xinh.
      </p>
      <GoogleLoginButton />
    </div>
  )
}
