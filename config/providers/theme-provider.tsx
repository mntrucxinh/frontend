'use client'

import { useEffect, useMemo } from 'react'
import { ThemeProvider } from 'next-themes'

type Theme =
  | 'tet'
  | 'womenDay'
  | 'reunificationDay'
  | 'uncleHoBirthday'
  | 'nationalDay'
  | 'teachersDay'
  | 'vietnamPeoplesArmyDay'
  | 'root'

function getSeason(date: Date): Theme {
  const m = date.getMonth() + 1
  const d = date.getDate()

  if (m === 1 || m === 2) return 'tet'

  // 8/3 hoặc 20/10
  if ((m === 3 && d === 8) || (m === 10 && d === 20)) return 'womenDay'

  // 30/4 – 1/5
  if ((m === 4 && d === 30) || (m === 5 && d === 1)) return 'reunificationDay'

  // 19/5
  if (m === 5 && d === 19) return 'uncleHoBirthday'

  // 2/9
  if (m === 9 && d === 2) return 'nationalDay'

  // 20/11
  if (m === 11 && d === 20) return 'teachersDay'

  // 22/12
  if (m === 12 && d === 22) return 'vietnamPeoplesArmyDay'

  return 'root'
}

function computeSeason(): Theme {
  if (typeof window === 'undefined') return getSeason(new Date())

  return getSeason(new Date())
}

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const forcedTheme = useMemo(() => computeSeason(), [])

  useEffect(() => {
    try {
      window.localStorage.setItem('theme', forcedTheme)
    } catch {}
  }, [forcedTheme])

  return (
    <ThemeProvider
      attribute='class'
      enableSystem={false}
      storageKey='theme'
      themes={[
        'tet',
        'womenDay',
        'reunificationDay',
        'uncleHoBirthday',
        'nationalDay',
        'teachersDay',
        'vietnamPeoplesArmyDay',
        'defaultTheme',
      ]}
      forcedTheme={forcedTheme}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
