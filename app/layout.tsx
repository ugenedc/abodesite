"use client"

import type { Metadata } from 'next'
import './globals.css'
import SiteLayout from '@/components/site-layout'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Abode - Revolutionary Property Management',
  description: 'The complete property ecosystem for tenants, owners, and agents.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isDebugPage = pathname === '/map-debug'

  return (
    <html lang="en">
      <head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css" rel="stylesheet" />
      </head>
      <body>
        {isDebugPage ? (
          children
        ) : (
          <SiteLayout>{children}</SiteLayout>
        )}
        <Script src="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
