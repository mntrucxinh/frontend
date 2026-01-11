'use client'

import { useEffect, useRef, useState } from 'react'

type Options = IntersectionObserverInit

const normalizeThreshold = (t: Options['threshold']) => {
  if (Array.isArray(t)) return t.join(',')
  if (typeof t === 'number') return String(t)
  return '0'
}

export function useInView<T extends HTMLElement>(options?: Options) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  const root = options?.root ?? null
  const rootMargin = options?.rootMargin ?? '0px'
  const threshold = options?.threshold ?? 0
  const thresholdKey = normalizeThreshold(threshold)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root, rootMargin, threshold }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [root, rootMargin, threshold, thresholdKey])

  return { ref, inView }
}
