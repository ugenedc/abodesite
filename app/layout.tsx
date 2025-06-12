import type { Metadata } from 'next'
import './globals.css'
import SiteLayout from '@/components/site-layout'

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
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  )
}
