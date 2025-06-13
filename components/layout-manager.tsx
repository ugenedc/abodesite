"use client"

import { usePathname } from "next/navigation"
import SiteLayout from "./site-layout"

export default function LayoutManager({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDebugPage = pathname === "/map-debug"

  if (isDebugPage) {
    return <>{children}</>
  }

  return <SiteLayout>{children}</SiteLayout>
} 