'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { NAV_ITEMS } from '@/config/route'

type IdleDeadline = {
  didTimeout: boolean
  timeRemaining: () => number
}

const EXTRA_ROUTES = ['/notice', '/news', '/recruit', '/library/gallery', '/introduce/general']

const getRoutesToPrefetch = () => {
  const navRoutes = NAV_ITEMS.flatMap((item) => [
    item.href,
    ...(item.children?.map((child) => child.href) ?? []),
  ])
  const routes = [...navRoutes, ...EXTRA_ROUTES]

  return Array.from(new Set(routes)).filter((href) => href && !href.startsWith('#'))
}

export default function RoutePrefetcher() {
  const router = useRouter()

  useEffect(() => {
    const routes = getRoutesToPrefetch()

    const runPrefetch = () => {
      routes.forEach((href) => router.prefetch(href))
    }

    if (typeof window === 'undefined') return

    let handle: number | null = null
    if ('requestIdleCallback' in window) {
      handle = (
        window as unknown as {
          requestIdleCallback: (cb: (deadline: IdleDeadline) => void) => number
        }
      ).requestIdleCallback(() => runPrefetch())
    } else {
      handle = (
        window as unknown as {
          setTimeout: (fn: () => void, ms: number) => number
        }
      ).setTimeout(runPrefetch, 200)
    }

    return () => {
      if (handle === null) return
      if ('cancelIdleCallback' in window) {
        ;(window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(
          handle
        )
      } else {
        ;(window as unknown as { clearTimeout: (id: number) => void }).clearTimeout(handle)
      }
    }
  }, [router])

  return null
}
