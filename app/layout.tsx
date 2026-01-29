import '@/styles/globals.css'

import { Metadata, Viewport } from 'next'
import { HeroUIProvider } from '@heroui/react'
import { Toaster } from 'react-hot-toast'

import AppThemeProvider from '@/config/providers/theme-provider'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import Providers from '@/app/provider'
import PushSubscriptionManager from '@/components/PushSubscriptionManager'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#33B54A',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-white font-sans antialiased', fontSans.variable)}>
        <Toaster />
        <AppThemeProvider>
          <HeroUIProvider>
            <div className='relative flex min-h-screen flex-col'>
              <div className='flex-1'>
                <Providers>
                  <PushSubscriptionManager />
                  <div className=''>{children}</div>
                </Providers>
              </div>
            </div>
          </HeroUIProvider>
        </AppThemeProvider>
      </body>
    </html>
  )
}
