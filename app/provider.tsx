"use client"

import { useState } from "react"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { AuthProvider } from "@/components/context/auth-context"
import RouteProgressBar from "@/components/RouteProgressBar"

interface Props {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  const pathname = usePathname()
  const needsSession =
    pathname?.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/auth-loading"

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  const appTree = <AuthProvider>{children}</AuthProvider>

  return (
    <QueryClientProvider client={queryClient}>
      <RouteProgressBar color="#33B54A" height={3} />
      {needsSession ? (
        <SessionProvider
          refetchOnWindowFocus={false}
          refetchInterval={0}
          refetchWhenOffline={false}
        >
          {appTree}
        </SessionProvider>
      ) : (
        appTree
      )}
    </QueryClientProvider>
  )
}
