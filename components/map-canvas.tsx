// @ts-nocheck
"use client"

import React, { useEffect, useRef, useState } from "react"

const locations = {
  brisbaneCBD: { center: [153.026, -27.4705], zoom: 13.5 },
  newFarm: { center: [153.042, -27.468], zoom: 13.8 },
  southBank: { center: [153.02, -27.476], zoom: 13.6 },
  westEnd: { center: [153.01, -27.48], zoom: 13.4 },
  fortitudeValley: { center: [153.035, -27.458], zoom: 13.7 },
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
  const [isLoaded, setIsLoaded] = useState(false)

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
          zoom: 11, // Start at a mid-level over Brisbane
          minZoom: 10, // Allow zooming out a bit
          maxZoom: 14, // Prevent zooming in too far (street names appear around 15+)
          interactive: interactive,
        })
        console.log("Map object created successfully.")

        map.current.on("load", () => {
          console.log("Map loaded successfully.")
          
          // Start fade-in effect after a brief delay
          setTimeout(() => {
            setIsLoaded(true)
          }, 500) // Small delay to ensure everything is ready
          
          if (animate) {
            // Start with a gentle zoom to a slightly closer view
            setTimeout(() => {
              map.current.flyTo({
                center: [153.026, -27.4705], // Brisbane CBD
                zoom: 12.5,
                duration: 3000, // 3 seconds for gentle zoom
                essential: true,
              })
            }, 2000) // Wait 2 seconds before starting the gentle zoom

            // After the initial gentle zoom, start the location cycling
            setTimeout(() => {
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
                  duration: 15000, // 15 seconds for location-to-location pans
                  essential: true,
                })
              }

              // Start the cycling animation
              panToRandom()
              // Then pan to a new location every 15 seconds
              animationInterval.current = setInterval(panToRandom, 15000)
            }, 6000) // Start location cycling after initial fade + zoom completes
          }

          if (animateMarkers) {
            // Start markers after the fade-in and initial zoom
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
                }, 4000) // Corresponds to animation duration
              }, 1000) // Add a new marker every second
            }, 3000) // Start markers after fade-in completes
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
      ref={mapContainer}
      style={{ width: "100%", height: "100%" }}
      className={`absolute inset-0 transition-opacity duration-3000 ease-in-out ${className} ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    />
  )
} 