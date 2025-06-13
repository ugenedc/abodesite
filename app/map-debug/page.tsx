"use client"

import MapCanvas from "@/components/map-canvas"

export default function MapDebugPage() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#222' }}>
      <h1 style={{ color: "white", textAlign: "center", padding: "20px", position: 'relative', zIndex: 10 }}>
        Map Canvas Debug Page
      </h1>
      <MapCanvas />
    </div>
  )
} 