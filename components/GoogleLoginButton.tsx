// src/components/GoogleLoginButton.tsx
"use client"

import Image from "next/image"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

const GoogleLoginButton = () => {
  const login = () => {
    // Dùng NextAuth redirect tới Google
    // callbackUrl sẽ được NextAuth sử dụng, nhưng GoogleBackendBridge sẽ override sau khi sync token
    signIn("google", { callbackUrl: "/news-management" })
  }

  return (
    <Button
      onClick={() => login()}
      className="rounded-full bg-white text-black border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 w-full py-3 font-medium text-sm"
    >
      <Image
        src="/assets/images/GoogleIcon.png"
        alt="Google"
        width={20}
        height={20}
      />
      <span>Sign in with Google</span>
    </Button>
  )
}

export default GoogleLoginButton
