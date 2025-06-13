// @ts-nocheck
"use client"

import React, { useEffect, useRef } from "react"
// import mapboxgl from "mapbox-gl" // We load this from the CDN
import "mapbox-gl/dist/mapbox-gl.css"
import WaitlistForm from "./waitlist-form"
import { Badge } from "@/components/ui/badge"

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
  window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
}

const locations = {
  brisbaneCBD: { center: [153.026, -27.4705], zoom: 14.5 },
  newFarm: { center: [153.042, -27.468], zoom: 15 },
  southBank: { center: [153.02, -27.476], zoom: 15.2 },
  westEnd: { center: [153.01, -27.48], zoom: 14.8 },
  fortitudeValley: { center: [153.035, -27.458], zoom: 15.5 },
}

const markers = [
  { lngLat: [153.026, -27.4705], name: "Central Station" },
  { lngLat: [153.042, -27.468], name: "New Farm Park" },
  { lngLat: [153.02, -27.476], name: "South Bank Parklands" },
  { lngLat: [153.01, -27.48], name: "Davies Park" },
  { lngLat: [153.035, -27.458], name: "James Street" },
]

export default function MapHero() {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current || !mapContainer.current || !window.mapboxgl) return // initialize map only once

    map.current = new window.mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11", // Dark, elegant style
      center: locations.brisbaneCBD.center as [number, number],
      zoom: locations.brisbaneCBD.zoom,
      interactive: false, // Disable user interaction
      pitch: 45, // Tilted view
      bearing: -17.6, // Starting bearing
    })

    const mapInstance = map.current

    mapInstance.on("load", () => {
      // Animation sequence
      const animate = async () => {
        const locationKeys = Object.keys(locations)
        let i = 0
        while (true) {
          const key = locationKeys[i % locationKeys.length] as keyof typeof locations
          mapInstance.flyTo({
            ...locations[key],
            duration: 12000,
            essential: true,
            easing: (t: number) => t,
          })
          await new Promise((resolve) => setTimeout(resolve, 13000))
          i++
        }
      }

      animate()

      // Add and remove markers
      let markerIndex = 0
      setInterval(() => {
        const markerData = markers[markerIndex % markers.length]
        const el = document.createElement("div")
        el.className = "marker"
        const marker = new window.mapboxgl.Marker(el)
          .setLngLat(markerData.lngLat as [number, number])
          .addTo(mapInstance)

        setTimeout(() => marker.remove(), 5000) // Marker stays for 5 seconds
        markerIndex++
      }, 3000) // New marker every 3 seconds
    })

    return () => mapInstance.remove()
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay for readability */}
      
      <div className="relative z-10 container mx-auto px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 inline-block bg-white/20 text-white border-white/20 rounded-full px-4 py-1 backdrop-blur-sm">
            Coming Soon - Property Management Reimagined
          </Badge>
          <h1 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight tracking-wide text-white drop-shadow-lg">
            The Future of Property Management
            <br />
            <span className="text-white/90">Is Almost Here</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Be the first to experience the revolutionary platform that will connect tenants, property owners, and agents
            in one seamless ecosystem.
          </p>
          <div className="max-w-xl mx-auto mb-16">
            <WaitlistForm
              inputClass="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl h-14 font-light backdrop-blur-sm text-center text-lg pl-6"
              buttonClass="w-full bg-white hover:bg-white/90 text-gray-800 px-8 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              placeholder="Enter your email to join waitlist"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-white/90">
            <div className="flex items-center">
              <span className="text-3xl font-medium text-white mr-3 drop-shadow-md">500+</span>
              <span className="text-lg">Early Adopters</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30" />
            <div className="flex items-center">
              <span className="text-3xl font-medium text-white mr-3 drop-shadow-md">Q2 2024</span>
              <span className="text-lg">Launch</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30" />
            <div className="flex items-center">
              <span className="text-3xl font-medium text-white mr-3 drop-shadow-md">Free</span>
              <span className="text-lg">Early Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 