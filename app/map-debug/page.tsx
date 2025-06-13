// @ts-nocheck
"use client"

import React, { useEffect, useRef } from "react"

export default function MapDebugPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<any>(null)

  useEffect(() => {
    if (!mapContainer.current) {
      console.log("Debug: No map container")
      return
    }
    if (map.current) {
      console.log("Debug: Map already exists")
      return
    }
    if (!window.mapboxgl) {
      console.log("Debug: Mapbox script not loaded yet")
      // Retry after a short delay
      setTimeout(() => {
         // This is a simplified retry, in a real app a more robust solution would be better
         if(window.mapboxgl) initializeMap();
      }, 500)
      return
    }
    
    const initializeMap = () => {
        console.log("Debug: Initializing map...")
        window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!
        map.current = new window.mapboxgl.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [153.026, -27.4705],
          zoom: 12,
        })
    }

    initializeMap();

  }, [])

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  )
} 