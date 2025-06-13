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

const markers = [
  { lngLat: [153.026, -27.4705], name: "Central Station" },
  { lngLat: [153.042, -27.468], name: "New Farm Park" },
  { lngLat: [153.02, -27.476], name: "South Bank Parklands" },
  { lngLat: [153.01, -27.48], name: "Davies Park" },
  { lngLat: [153.035, -27.458], name: "James Street" },
]

export default function MapCanvas() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    console.log("MapCanvas: useEffect triggered.");

    const initializeMap = () => {
      console.log("MapCanvas: initializeMap function called.");

      if (!mapContainer.current) {
        console.error("MapCanvas Error: mapContainer ref is not available.");
        return;
      }
      console.log("MapCanvas: mapContainer ref is available.");

      if (map.current) {
        console.warn("MapCanvas Warning: Map is already initialized.");
        return;
      }

      console.log("MapCanvas: Setting Mapbox access token.");
      window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

      try {
        console.log("MapCanvas: Creating new Mapbox map instance...");
        map.current = new window.mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/light-v11",
          projection: 'mercator',
          center: locations.brisbaneCBD.center as [number, number],
          zoom: locations.brisbaneCBD.zoom,
          interactive: false,
          pitch: 45,
          bearing: -17.6,
        });
        console.log("MapCanvas: Mapbox map instance created successfully.");

        const mapInstance = map.current;

        mapInstance.on("load", () => {
          console.log("MapCanvas: Map 'load' event fired.");
          const animate = async () => {
            console.log("MapCanvas: Starting animation sequence.");
            const locationKeys = Object.keys(locations);
            let i = 0;
            while (true) {
              const key = locationKeys[i % locationKeys.length] as keyof typeof locations;
              mapInstance.flyTo({
                ...locations[key],
                duration: 12000,
                essential: true,
                easing: (t: number) => t,
              });
              await new Promise((resolve) => setTimeout(resolve, 13000));
              i++;
            }
          };
          animate();
        });

        mapInstance.on('error', (e: any) => {
          console.error('MapCanvas Map Error:', e.error?.message, e);
        });

      } catch (error) {
        console.error("MapCanvas CRITICAL: Failed to create Mapbox instance.", error);
      }
    };

    const checkMapbox = setInterval(() => {
      console.log("MapCanvas: Checking for window.mapboxgl...");
      if (window.mapboxgl) {
        console.log("MapCanvas: window.mapboxgl found!");
        clearInterval(checkMapbox);
        initializeMap();
      } else {
        console.log("MapCanvas: window.mapboxgl not found yet.");
      }
    }, 200);

    return () => {
      console.log("MapCanvas: Cleanup function running.");
      clearInterval(checkMapbox);
      if (map.current) {
        console.log("MapCanvas: Removing map instance.");
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return <div ref={mapContainer} className="absolute inset-0" />;
} 