"use client";

/// <reference types="@types/google.maps" />

import { useEffect, useRef } from "react";
import Script from "next/script";

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
  markerIconUrl,
  markerSize = 48,
  className,
  style,
  mapId,
  markerTitle = "Ubicación",
}: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  // 👉 función que inicializa el mapa cuando ya cargó la API
  const initMap = async () => {
    if (!mapRef.current) return;

    try {
      const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;

      const map = new Map(mapRef.current, {
        center,
        zoom,
        styles,
        mapId,
      });

      const icon = markerIconUrl
        ? {
            url: markerIconUrl,
            scaledSize: new google.maps.Size(markerSize, markerSize),
            anchor: new google.maps.Point(markerSize / 2, markerSize),
          }
        : undefined;

      new google.maps.Marker({
        position: center,
        map,
        title: markerTitle,
        ...(icon ? { icon } : {}),
      });
    } catch (err) {
      console.error("Error al inicializar el mapa:", err);
    }
  };

  return (
    <>
      {/* ✅ Cargamos el script solo aquí, y ejecutamos initMap al terminar */}
      <Script
        id="google-maps-script"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=maps`}
        strategy="afterInteractive"
        onLoad={initMap}
      />

      <div
        ref={mapRef}
        className={className}
        style={{
          width: "100%",
          height: 420,
          borderRadius: 12,
          ...style,
        }}
        aria-label="Mapa de Google"
      />
    </>
  );
}