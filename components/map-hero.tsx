// @ts-nocheck
"use client"

import React, { useEffect, useRef } from "react"
import WaitlistForm from "./waitlist-form"
import { Badge } from "@/components/ui/badge"
import MapCanvas from "./map-canvas"

export default function MapHero() {
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
    <>
      {/* Map container is now outside the hero section to avoid CSS conflicts */}
      <div className="fixed inset-0 mix-blend-mode-screen z-0">
        <MapCanvas />
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-400 via-purple-400 to-orange-300 animate-gradient-shift">
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
                className="w-full flex-col sm:flex-row"
                inputClass="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl h-14 font-light backdrop-blur-sm text-center text-lg"
                buttonClass="w-full sm:w-auto h-14 bg-white hover:bg-white/90 text-gray-800 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl"
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
    </>
  )
} 