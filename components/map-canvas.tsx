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
          style: style, // Using a simpler default style for debugging
          center: [133.7751, -25.2744], // Australia center
          zoom: 3, // Default zoom
          interactive: interactive,
        })
        console.log("Map object created successfully.")

        map.current.on("load", () => {
          console.log("Map loaded successfully.")
          if (animate) {
            const locationKeys = Object.keys(locations)
            let currentKey: string | null = null

            const panToRandom = () => {
              let nextLocationKey: string
              do {
                nextLocationKey = locationKeys[Math.floor(Math.random() * locationKeys.length)]
              } while (nextLocationKey === currentKey) // Don't pick the same one twice in a row

              currentKey = nextLocationKey
              const nextLocation = locations[nextLocationKey]

              map.current.flyTo({
                center: nextLocation.center,
                zoom: nextLocation.zoom,
                duration: 15000, // 15 seconds for a slow pan
                essential: true, // Prevents users from interrupting the animation
              })
            }

            // Pan to the first location immediately
            panToRandom()
            // Then pan to a new location every 20 seconds
            animationInterval.current = setInterval(panToRandom, 20000)
          }

          if (animateMarkers) {
            markerInterval.current = setInterval(() => {
              const bounds = map.current.getBounds()
              const lng = Math.random() * (bounds.getEast() - bounds.getWest()) + bounds.getWest()
              const lat = Math.random() * (bounds.getNorth() - bounds.getSouth()) + bounds.getSouth()

              const el = document.createElement("div")
              el.className = "fading-marker"

              const marker = new window.mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map.current)

              setTimeout(() => {
                marker.remove()
              }, 4000) // Corresponds to animation duration
            }, 1000) // Add a new marker every second
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

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} className={`absolute inset-0 ${className}`} />
} 