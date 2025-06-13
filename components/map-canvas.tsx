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

export default function MapCanvas() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapContainer.current || map.current) return;

      window.mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

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

      const mapInstance = map.current;

      mapInstance.on("load", () => {
        const animate = async () => {
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