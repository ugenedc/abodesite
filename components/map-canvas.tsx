// @ts-nocheck
"use client"

import React, { useEffect, useRef, useState } from "react"

const locations = {
  brisbaneCBD: { center: [153.026, -27.4705], zoom: 12.5 },
  newFarm: { center: [153.042, -27.468], zoom: 12.8 },
  southBank: { center: [153.02, -27.476], zoom: 12.6 },
  westEnd: { center: [153.01, -27.48], zoom: 12.4 },
  fortitudeValley: { center: [153.035, -27.458], zoom: 12.7 },
  kangarooPoint: { center: [153.05, -27.475], zoom: 12.5 },
  paddington: { center: [153.02, -27.46], zoom: 12.6 },
  woolloongabba: { center: [153.04, -27.485], zoom: 12.4 },
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
        console.error("Mapbox token is not configured. Using fallback background.")
        // Set fallback background when no token is available
        setTimeout(() => {
          setIsFadedIn(true)
        }, 1000)
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
          attributionControl: false, // Remove attribution watermark
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
                  duration: 8000,
                  essential: true,
                })
              }

              // Start the cycling animation
              panToRandom()
              // Then pan to a new location every 8 seconds
              animationInterval.current = setInterval(panToRandom, 8000)
            }, 2000) // Start location cycling after fade completes
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

  // Check if we have a Mapbox token
  const hasMapboxToken = !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{ 
        width: "100%", 
        height: "100%",
        opacity: isFadedIn ? 1 : 0,
        transition: "opacity 3000ms ease-in-out"
      }}
    >
      {hasMapboxToken ? (
        <div
          ref={mapContainer}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        // Beautiful fallback background when Mapbox is not configured
        <div 
          className="w-full h-full bg-gradient-to-br from-purple-900 via-purple-800 to-orange-800 relative overflow-hidden"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Animated background patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-orange-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          ></div>
          
          {/* Subtle dots pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>
      )}
    </div>
  )
} 