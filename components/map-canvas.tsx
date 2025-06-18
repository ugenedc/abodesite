// @ts-nocheck
"use client"

import React, { useEffect, useRef, useState } from "react"

const locations = {
  brisbaneCBD: { center: [153.026, -27.4705], zoom: 12.5 },
  newFarm: { center: [153.042, -27.468], zoom: 12.8 },
  southBank: { center: [153.02, -27.476], zoom: 12.6 },
  westEnd: { center: [153.01, -27.48], zoom: 12.4 },
  fortitudeValley: { center: [153.035, -27.458], zoom: 12.7 },
}

export default function MapCanvas({
  interactive = true,
  className,
  style = "mapbox://styles/mapbox/streets-v12",
  animate = false,
  animateMarkers = false,
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<any>(null)
  const animationInterval = useRef<NodeJS.Timeout | null>(null)
  const markerInterval = useRef<NodeJS.Timeout | null>(null)
  const [isFadedIn, setIsFadedIn] = useState(false)

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
          style: style,
          center: [153.026, -27.4705], // Brisbane CBD
          zoom: 12, // Start at a good level over Brisbane
          minZoom: 10,
          maxZoom: 13, // Lower max zoom to prevent street names
          interactive: interactive,
        })
        console.log("Map object created successfully.")

        map.current.on("load", () => {
          console.log("Map loaded successfully.")
          
          // Start fade-in effect after map is ready
          setTimeout(() => {
            setIsFadedIn(true)
          }, 1000) // Wait 1 second, then start fade
          
          if (animate) {
            // Start location cycling after fade-in completes
            setTimeout(() => {
              const locationKeys = Object.keys(locations)
              let currentKey: string | null = null

              const panToRandom = () => {
                let nextLocationKey: string
                do {
                  nextLocationKey = locationKeys[Math.floor(Math.random() * locationKeys.length)]
                } while (nextLocationKey === currentKey)

                currentKey = nextLocationKey
                const nextLocation = locations[nextLocationKey]

                map.current.flyTo({
                  center: nextLocation.center,
                  zoom: nextLocation.zoom,
                  duration: 15000,
                  essential: true,
                })
              }

              // Start the cycling animation
              panToRandom()
              // Then pan to a new location every 15 seconds
              animationInterval.current = setInterval(panToRandom, 15000)
            }, 4000) // Start location cycling after fade completes
          }

          if (animateMarkers) {
            // Start markers after fade-in
            setTimeout(() => {
              markerInterval.current = setInterval(() => {
                const bounds = map.current.getBounds()
                const lng = Math.random() * (bounds.getEast() - bounds.getWest()) + bounds.getWest()
                const lat = Math.random() * (bounds.getNorth() - bounds.getSouth()) + bounds.getSouth()

                const el = document.createElement("div")
                el.className = "fading-marker"

                const marker = new window.mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map.current)

                setTimeout(() => {
                  marker.remove()
                }, 4000)
              }, 1000)
            }, 4000) // Start markers after fade completes
          }
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
      if (animationInterval.current) {
        clearInterval(animationInterval.current)
      }
      if (markerInterval.current) {
        clearInterval(markerInterval.current)
      }
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [interactive, style, animate, animateMarkers])

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-3000 ease-in-out ${className} ${
        isFadedIn ? "opacity-100" : "opacity-0"
      }`}
      style={{ width: "100%", height: "100%" }}
    >
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
} 