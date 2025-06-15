"use client"

import MapCanvas from "@/components/map-canvas"

export default function MapDebugPage() {
  return (
    <div className="bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <MapCanvas
        interactive={true}
        style="mapbox://styles/mapbox/light-v11"
        className="mix-blend-overlay"
        animate={true}
      />
    </div>
  )
} 