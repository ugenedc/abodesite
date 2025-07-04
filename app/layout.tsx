import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import LayoutManager from '@/components/layout-manager'

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
  return (
    <html lang="en">
      <head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css" rel="stylesheet" />
      </head>
      <body>
        <LayoutManager>{children}</LayoutManager>
        <Script src="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
