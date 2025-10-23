"use client";

/// <reference types="@types/google.maps" />

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type LatLng = { lat: number; lng: number };

type Props = {
  center: LatLng;
  zoom?: number;
  styles?: google.maps.MapTypeStyle[];
  markerIconUrl?: string;
  markerSize?: number;
  className?: string;
  style?: React.CSSProperties;
  mapId?: string;
  markerTitle?: string;
};

export default function GoogleMap({
  center,
  zoom = 15,
  styles,
  markerIconUrl = "/icons/pin.svg",
  markerSize = 80,
  className,
  style,
  mapId,
  markerTitle = "Ubicación",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef =
    useRef<google.maps.marker.AdvancedMarkerElement | google.maps.Marker | null>(
      null
    );

  useEffect(() => {
    let canceled = false;

    // Validación de center
    if (!Number.isFinite(center?.lat) || !Number.isFinite(center?.lng)) {
      console.error("Centro inválido para Google Maps:", center);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("Falta NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en .env.local");
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    // Evita crear mapa si el contenedor no tiene tamaño aún
    if (el.clientWidth === 0 || el.clientHeight === 0) {
      const t = setTimeout(() => {
        // reintenta en el siguiente tick
      }, 50);
      return () => clearTimeout(t);
    }

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["marker"], // para AdvancedMarker
    });

    (async () => {
      try {
        await loader.load(); // carga Maps JS API + libs

        if (canceled || !containerRef.current) return;

        // Crea o actualiza el mapa
        const options: google.maps.MapOptions = {
          center,
          zoom,
          styles,
          mapId,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        };

        if (!mapRef.current) {
          mapRef.current = new google.maps.Map(containerRef.current, options);
        } else {
          mapRef.current.setOptions(options);
        }

        // Limpia marker previo
        if (markerRef.current) {
          // @ts-ignore
          markerRef.current.setMap?.(null);
          // @ts-ignore
          markerRef.current.map = null;
          markerRef.current = null;
        }

        // Si AdvancedMarker está disponible, úsalo; si no, fallback a Marker
        const hasAdvanced =
          !!google.maps.marker?.AdvancedMarkerElement && !!mapId; // 👈 exige mapId

        if (hasAdvanced) {
          const img = document.createElement("img");
          img.src = markerIconUrl;
          img.width = markerSize;
          img.height = markerSize;
          img.style.transform = "translate(-50%, -100%)";

          markerRef.current = new google.maps.marker.AdvancedMarkerElement({
            map: mapRef.current!,
            position: center,
            content: img,
            title: markerTitle,
          });
        } else {
          const icon = markerIconUrl
            ? {
                url: markerIconUrl,
                scaledSize: new google.maps.Size(80, 80),
                anchor: new google.maps.Point(40, 80),
              }
            : undefined;

          markerRef.current = new google.maps.Marker({
            position: center,
            map: mapRef.current!,
            title: markerTitle,
            ...(icon ? { icon } : {}),
          });
        }
      } catch (err) {
        console.error("Error cargando/creando Google Maps:", err);
      }
    })();

    return () => {
      canceled = true;
      try {
        if (markerRef.current) {
          // @ts-ignore
          markerRef.current.setMap?.(null);
          // @ts-ignore
          markerRef.current.map = null;
          markerRef.current = null;
        }
        mapRef.current = null;
      } catch {}
    };
  }, [center, zoom, styles, markerIconUrl, markerSize, mapId, markerTitle]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: 420,
        ...style,
      }}
      aria-label="Mapa de Google"
    />
  );
}