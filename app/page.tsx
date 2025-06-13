// @ts-nocheck
"use client"

import React, { useEffect, useRef } from "react"

export default function HomePage() {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<any>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    const initializeMap = () => {
      if (!window.mapboxgl) {
         console.error("Homepage Test: Mapbox GL JS not loaded.");
         return;
      }
      console.log("Homepage Test: Initializing map...")
      window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!
      map.current = new window.mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [153.026, -27.4705],
        zoom: 12,
      })
    }

    const checkMapbox = setInterval(() => {
      if (window.mapboxgl) {
        clearInterval(checkMapbox);
        initializeMap();
      }
    }, 100);

     return () => {
      clearInterval(checkMapbox);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [])

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
