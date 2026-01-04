import '@/styles/globals.css'

import { Metadata, Viewport } from 'next'
import { HeroUIProvider } from '@heroui/react'
import { Toaster } from 'react-hot-toast'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Providers from '@/app/provider'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Toaster />
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false}>
          <HeroUIProvider>
            <div className='relative flex min-h-screen flex-col'>
              <div className='flex-1'>
                <Providers>
                  <div className=''>{children}</div>
                </Providers>
              </div>
            </div>
          </HeroUIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
