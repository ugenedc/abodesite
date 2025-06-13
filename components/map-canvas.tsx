// @ts-nocheck
"use client"

import React, { useEffect, useRef } from "react"

export default function MapCanvas() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapContainer.current || map.current) return;

      window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

      map.current = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11", // Use a light style for better visibility on gradient
        center: [153.026, -27.4705],
        zoom: 12,
        interactive: false,
      });

      map.current.on('error', (e: any) => {
        console.error('MapCanvas Render Error:', e.error?.message, e);
      });
    };

    const checkMapbox = setInterval(() => {
      if (window.mapboxgl) {
        clearInterval(checkMapbox);
        initializeMap();
      }
    }, 200);

    return () => {
      clearInterval(checkMapbox);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return <div ref={mapContainer} className="absolute inset-0" />;
} 