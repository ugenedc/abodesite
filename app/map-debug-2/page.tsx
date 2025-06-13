"use client"

import MapCanvas from "@/components/map-canvas"

export default function MapDebugPage() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <MapCanvas interactive={true} />
    </div>
  )
} 