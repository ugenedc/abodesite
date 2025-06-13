// @ts-nocheck
"use client"

import React, { useEffect, useRef } from "react"

const locations = {
  brisbaneCBD: { center: [153.026, -27.4705], zoom: 14.5 },
  newFarm: { center: [153.042, -27.468], zoom: 15 },
  southBank: { center: [153.02, -27.476], zoom: 15.2 },
  westEnd: { center: [153.01, -27.48], zoom: 14.8 },
  fortitudeValley: { center: [153.035, -27.458], zoom: 15.5 },
}

export default function MapCanvas({ interactive = true }) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<any>(null)

  useEffect(() => {
    const initializeMap = () => {
      console.log("Attempting to initialize map...")
      if (map.current) {
        console.log("Map already initialized.")
        return
      }

      if (!mapContainer.current) {
        console.error("Map container is not available.")
        return
      }

      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      console.log("Mapbox Token:", token ? `Token found (ends with ...${token.slice(-4)})` : "Token NOT found")

      if (!token) {
        console.error("Mapbox token is not configured.")
        return
      }

      try {
        window.mapboxgl.accessToken = token
        map.current = new window.mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12", // Using a simpler default style for debugging
          center: [-74.5, 40], // Default coords
          zoom: 9, // Default zoom
          interactive: interactive,
        })
        console.log("Map object created successfully.")

        map.current.on("load", () => {
          console.log("Map loaded successfully.")
        })

        map.current.on("error", (e: any) => {
          console.error("A Mapbox error occurred:", e.error?.message, e)
        })
      } catch (error) {
        console.error("Failed to initialize Mapbox map:", error)
      }
    }

    const checkMapbox = setInterval(() => {
      console.log("Checking for window.mapboxgl...")
      if (window.mapboxgl) {
        console.log("window.mapboxgl found.")
        clearInterval(checkMapbox)
        initializeMap()
      }
    }, 200)

    return () => {
      console.log("Cleaning up MapCanvas component.")
      clearInterval(checkMapbox)
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [interactive])

  return <div ref={mapContainer} className="absolute inset-0" />
} 