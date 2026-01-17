'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

type Props = {
  color?: string
  height?: number
}

const MAX_PROGRESS = 90
const INTERVAL_MS = 200

const getSafeUrl = (href: string) => {
  try {
    return new URL(href, window.location.href)
  } catch {
    return null
  }
}

export default function RouteProgressBar({ color = '#33B54A', height = 3 }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const progressRef = useRef(0)
  const activeRef = useRef(false)
  const intervalRef = useRef<number | null>(null)
  const finishTimeoutRef = useRef<number | null>(null)

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const clearFinishTimeout = () => {
    if (finishTimeoutRef.current !== null) {
      window.clearTimeout(finishTimeoutRef.current)
      finishTimeoutRef.current = null
    }
  }

  const start = () => {
    if (activeRef.current) return
    activeRef.current = true
    clearFinishTimeout()
    stopTimer()

    progressRef.current = 12
    setProgress(progressRef.current)
    setIsActive(true)

    intervalRef.current = window.setInterval(() => {
      if (progressRef.current >= MAX_PROGRESS) {
        stopTimer()
        return
      }
      const step = Math.floor(Math.random() * 8) + 4
      progressRef.current = Math.min(progressRef.current + step, MAX_PROGRESS)
      setProgress(progressRef.current)
    }, INTERVAL_MS)
  }

  const complete = () => {
    if (!activeRef.current) return
    activeRef.current = false
    stopTimer()
    clearFinishTimeout()

    progressRef.current = 100
    setProgress(100)

    finishTimeoutRef.current = window.setTimeout(() => {
      setIsActive(false)
      progressRef.current = 0
      setProgress(0)
    }, 250)
  }

  useEffect(() => {
    complete()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href') || ''
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return
      }

      if (anchor.getAttribute('target') && anchor.getAttribute('target') !== '_self') return
      if (anchor.hasAttribute('download')) return
      if (anchor.dataset.noProgress === 'true') return

      const nextUrl = getSafeUrl(href)
      if (!nextUrl) return
      if (nextUrl.origin !== window.location.origin) return

      const currentUrl = `${window.location.pathname}${window.location.search}`
      const nextPath = `${nextUrl.pathname}${nextUrl.search}`
      if (currentUrl === nextPath) return

      start()
    }

    const handlePopState = () => {
      start()
    }

    const originalPushState = window.history.pushState.bind(window.history)
    const originalReplaceState = window.history.replaceState.bind(window.history)

    window.history.pushState = (state, title, url) => {
      if (typeof url === 'string') {
        const nextUrl = getSafeUrl(url)
        if (nextUrl) {
          const currentUrl = `${window.location.pathname}${window.location.search}`
          const nextPath = `${nextUrl.pathname}${nextUrl.search}`
          if (currentUrl !== nextPath) start()
        }
      }
      return originalPushState(state, title, url)
    }

    window.history.replaceState = (state, title, url) => {
      if (typeof url === 'string') {
        const nextUrl = getSafeUrl(url)
        if (nextUrl) {
          const currentUrl = `${window.location.pathname}${window.location.search}`
          const nextPath = `${nextUrl.pathname}${nextUrl.search}`
          if (currentUrl !== nextPath) start()
        }
      }
      return originalReplaceState(state, title, url)
    }

    document.addEventListener('click', handleClick, true)
    window.addEventListener('popstate', handlePopState)

    return () => {
      document.removeEventListener('click', handleClick, true)
      window.removeEventListener('popstate', handlePopState)
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
      stopTimer()
      clearFinishTimeout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='pointer-events-none fixed inset-x-0 top-0 z-[9999]' aria-hidden>
      <div
        style={{
          height: `${height}px`,
          width: `${progress}%`,
          backgroundColor: color,
          opacity: isActive ? 1 : 0,
          transition: isActive
            ? 'width 200ms ease-out, opacity 200ms ease-out'
            : 'opacity 200ms ease-out',
          boxShadow: isActive ? `0 0 10px ${color}` : undefined,
        }}
      />
    </div>
  )
}
