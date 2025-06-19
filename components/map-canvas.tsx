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
            console.log("Starting animated markers...")
            
            // Define specific property locations across Brisbane
            const propertyLocations = [
              [153.026, -27.4705], // Brisbane CBD
              [153.042, -27.468],  // New Farm
              [153.02, -27.476],   // South Bank
              [153.01, -27.48],    // West End
              [153.035, -27.458],  // Fortitude Valley
              [153.05, -27.475],   // Kangaroo Point
              [153.015, -27.465],  // Spring Hill
              [153.04, -27.485],   // Woolloongabba
              [153.025, -27.455],  // Bowen Hills
              [153.045, -27.47],   // Teneriffe
              [153.035, -27.49],   // East Brisbane
              [153.02, -27.46],    // Paddington
            ]
            
            // Start markers after fade-in
            setTimeout(() => {
              console.log("Marker interval starting...")
              markerInterval.current = setInterval(() => {
                console.log("Creating new marker...")
                
                // Pick a random property location
                const randomLocation = propertyLocations[Math.floor(Math.random() * propertyLocations.length)]
                const [lng, lat] = randomLocation
                
                // Add small random offset to make them feel more natural
                const offsetLng = lng + (Math.random() - 0.5) * 0.005 // Small offset
                const offsetLat = lat + (Math.random() - 0.5) * 0.005 // Small offset

                console.log(`Marker position: [${offsetLng}, ${offsetLat}]`)

                // Random color from brand palette
                const colors = [
                  "#8B5CF6", // Purple
                  "#A855F7", // Purple variant
                  "#FB923C", // Orange
                  "#F97316", // Orange variant
                  "#EC4899", // Pink
                ]
                const randomColor = colors[Math.floor(Math.random() * colors.length)]

                // Create custom SVG marker element
                const el = document.createElement("div")
                el.className = "location-marker-animated"
                el.style.position = "absolute"
                el.style.zIndex = "1000"
                el.innerHTML = `
                  <svg width="32" height="41" viewBox="0 0 62.3 80.6" xmlns="http://www.w3.org/2000/svg" style="display: block;">
                    <defs>
                      <style>
                        .marker-fill { fill: ${randomColor}; }
                        .marker-center { fill: #fff; }
                      </style>
                    </defs>
                    <path class="marker-fill" d="M31.2,11.6c-11.5,0-20.9,9.4-20.9,20.9,0,19.8,20.9,36.6,20.9,36.6,0,0,20.9-16.8,20.9-36.6s-9.4-20.9-20.9-20.9Z"/>
                    <path class="marker-center" d="M22.2,40.3c0-4.9,3.7-8.5,8.9-8.5s8.9,3.5,8.9,8.5-3.8,8.5-8.9,8.5-8.9-3.6-8.9-8.5ZM34.6,40.3c0-2.1-1.4-3.6-3.4-3.6s-3.4,1.4-3.4,3.6,1.4,3.6,3.4,3.6,3.4-1.4,3.4-3.6ZM22.2,29l8.9-2.1,9,2.1v-4.1l-9-2.1-8.9,2.1v4.1Z"/>
                  </svg>
                `

                try {
                  const marker = new window.mapboxgl.Marker({
                    element: el,
                    anchor: 'bottom'
                  }).setLngLat([offsetLng, offsetLat]).addTo(map.current)

                  console.log("Marker created and added to map")

                  // Remove marker after animation completes
                  setTimeout(() => {
                    console.log("Removing marker")
                    marker.remove()
                  }, 6000)
                } catch (error) {
                  console.error("Error creating marker:", error)
                }
              }, 2500) // Spawn every 2.5 seconds
            }, 2000) // Start markers after 2 seconds
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
      className={`absolute inset-0 ${className}`}
      style={{ 
        width: "100%", 
        height: "100%",
        opacity: isFadedIn ? 1 : 0,
        transition: "opacity 3000ms ease-in-out"
      }}
    >
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
} 