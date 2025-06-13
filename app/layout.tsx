import type { Metadata } from 'next'
import './globals.css'
import SiteLayout from '@/components/site-layout'
import Head from 'next/head'

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
      <Head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  )
}
