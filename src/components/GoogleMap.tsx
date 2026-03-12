import { useEffect, useState } from "react";
import { latLng } from "../lib/constants";

declare global {
  interface Window {
    google?: {
      maps?: {
        Map: new (element: HTMLElement, options: unknown) => unknown;
        marker?: {
          AdvancedMarkerElement: new (options: unknown) => unknown;
        };
      };
    };
  }
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? "";
const GOOGLE_MAP_ID = import.meta.env.VITE_PUBLIC_MAP_ID ?? "";

export default function GoogleMap() {
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      return;
    }

    let mounted = true;
    const mapId = "map";
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-t4s-google-maps="true"]',
    );

    function initializeMap() {
      const mapRoot = document.getElementById(mapId);
      if (!mapRoot || !window.google?.maps?.Map) {
        return;
      }

      const map = new window.google.maps.Map(mapRoot, {
        center: latLng,
        zoom: 16,
        mapId: GOOGLE_MAP_ID || undefined,
      });

      if (window.google.maps.marker?.AdvancedMarkerElement) {
        const iconImg = document.createElement("img");
        iconImg.src = "../src/assets/img/logo.png"; // ✅ Place this in your public folder
        iconImg.style.width = "40px";
        iconImg.style.height = "40px";
        iconImg.style.transform = "translate(-50%, -50%)"; // 👈 Center horizontally, align bottom vertically
        iconImg.style.position = "absolute";
        iconImg.loading = "eager";

        new window.google.maps.marker.AdvancedMarkerElement({
          map,
          position: latLng,
          title: "T4S Location",
          content: iconImg,
        });
      }
    }

    if (existingScript) {
      initializeMap();
      return () => {
        mounted = false;
      };
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.dataset.t4sGoogleMaps = "true";
    script.onload = initializeMap;
    script.onerror = () => {
      if (mounted) {
        setScriptError(true);
      }
    };
    document.head.appendChild(script);

    return () => {
      mounted = false;
    };
  }, []);

  if (!GOOGLE_MAPS_API_KEY || scriptError) {
    return (
      <iframe
        title="Tools-4-Schools location"
        src={`https://maps.google.com/maps?q=${latLng.lat},${latLng.lng}&z=15&output=embed`}
        className="h-full min-h-100 w-full min-w-50 rounded-lg"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div id="map" className="h-full min-h-100 w-full min-w-50 rounded-lg" />
  );
}
