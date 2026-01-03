// src/components/GoogleLoginButton.tsx
"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

const GoogleLoginButton = () => {
  const login = () => {
    // Dùng NextAuth redirect tới Google
    signIn("google", { callbackUrl: "/testing" })
  }

  return (
    <Button
      onClick={() => login()}
      className="rounded-full bg-white text-black border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 w-full py-3 font-medium text-sm"
    >
      <span className="text-lg">🔑</span>
      <span>Sign in with Google</span>
    </Button>
  )
}

export default GoogleLoginButton
