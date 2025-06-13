import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Map Debug",
}

export default function MapDebugLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 