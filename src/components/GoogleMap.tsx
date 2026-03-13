import { useEffect, useState } from "react";
import { latLng } from "../lib/constants";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) return;

    let mounted = true;
    const mapId = "map";
    const existingScript = document.querySelector(
      'script[data-t4s-google-maps="true"]',
    );
    if (existingScript) {
      existingScript.remove();
    }
    // Delete the global google object so the new script can re-initialize it
    if (window.google) {
      // @ts-ignore
      delete window.google.maps;
    }

    function initializeMap() {
      const mapRoot = document.getElementById(mapId);
      // Ensure we are still mounted and the element exists
      if (!mounted || !mapRoot || !window.google?.maps?.Map) return;

      const map = new window.google.maps.Map(mapRoot, {
        center: latLng,
        zoom: 16,
        mapId: GOOGLE_MAP_ID || undefined,
      });

      if (window.google.maps.marker?.AdvancedMarkerElement) {
        const iconImg = document.createElement("img");
        iconImg.src = "../src/assets/img/logo.png";
        iconImg.style.width = "40px";
        iconImg.style.height = "40px";
        iconImg.style.transform = "translate(-50%, -50%)";
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

    const script = document.createElement("script");
    const lang = i18n.resolvedLanguage || i18n.language;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker&language=${lang}`;
    script.async = true;
    script.defer = true;
    script.dataset.t4sGoogleMaps = "true";
    script.onload = () => {
      if (mounted) initializeMap();
    };
    script.onerror = () => {
      if (mounted) setScriptError(true);
    };

    document.head.appendChild(script);

    return () => {
      mounted = false;
    };
  }, [i18n.language]); // Triggered whenever the language changes

  if (!GOOGLE_MAPS_API_KEY || scriptError) {
    return (
      <iframe
        title="Tools-4-Schools location"
        src={`https://maps.google.com/maps?q=${latLng.lat},${latLng.lng}&z=15&output=embed&language=${i18n.language}`}
        className="h-full min-h-100 w-full min-w-50 rounded-lg"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div id="map" className="h-full min-h-100 w-full min-w-50 rounded-lg" />
  );
}
