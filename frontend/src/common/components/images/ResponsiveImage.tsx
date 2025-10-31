import Image from "next/image";
import type { Image as ImageType } from "@/_domain/models/modules/modules.model";

interface ResponsiveImageProps {
  imageData: ImageType & {
    asset?: {
      url?: string;
      mimeType?: string;
      metadata?: {
        lqip?: string;
        dimensions?: { width?: number; height?: number; aspectRatio?: number };
      };
    };
    alt?: { altText?: string } | string;
    media?: { url?: string };
  };
  width?: number;
  height?: number;
  quality?: number;
  dataSpeed?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  variant?: "hero" | "card" | "thumbnail" | "gallery" | "icon" | "banner";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

const VARIANT_CONFIG = {
  hero: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw",
    dimensions: { width: 1920, height: 1080 },
    quality: 90,
    priority: true,
  },
  banner: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw",
    dimensions: { width: 1440, height: 400 },
    quality: 85,
    priority: false,
  },
  card: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
    dimensions: { width: 600, height: 400 }, // 👉 versión reducida
    quality: 80,
    priority: false,
  },
  gallery: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw",
    dimensions: { width: 800, height: 600 },
    quality: 85,
    priority: false,
  },
  thumbnail: {
    sizes: "(max-width: 768px) 150px, 200px",
    dimensions: { width: 200, height: 200 },
    quality: 75,
    priority: false,
  },
  icon: {
    sizes: "64px",
    dimensions: { width: 64, height: 64 },
    quality: 90,
    priority: false,
  },
} as const;

function getAlt(altField: any): string {
  if (!altField) return "";
  if (typeof altField === "string") return altField;
  return altField?.altText || "";
}

// Solo agrega parámetros de Sanity cuando el dominio es cdn.sanity.io
function isSanityCdn(url: string) {
  try {
    const u = new URL(url);
    return u.hostname.endsWith("cdn.sanity.io");
  } catch {
    return false;
  }
}

// Añade ?w=<ancho>&auto=format&fit=max a la URL (sin cropear)
function withWidthParam(url: string, w: number) {
  try {
    const u = new URL(url);
    // Si ya hay w, respétalo; si no, lo añadimos
    if (!u.searchParams.has("w")) u.searchParams.set("w", String(w));
    if (!u.searchParams.has("auto")) u.searchParams.set("auto", "format");
    if (!u.searchParams.has("fit")) u.searchParams.set("fit", "max");
    return u.toString();
  } catch {
    // Si por alguna razón no parsea, devuelve la original
    return url;
  }
}

export default function ResponsiveImage({
  imageData,
  width,
  height,
  quality,
  sizes,
  priority,
  className,
  dataSpeed,
  variant = "card",
}: ResponsiveImageProps) {
  const config = VARIANT_CONFIG[variant];
  const altText = getAlt(imageData?.alt);

  const baseUrl = imageData?.asset?.url || imageData?.media?.url || "";
  if (!baseUrl) return null;

  const isSVG =
    baseUrl.toLowerCase().endsWith(".svg") ||
    imageData?.asset?.mimeType === "image/svg+xml";

  const finalWidth = width ?? config.dimensions.width;
  const finalHeight = height ?? config.dimensions.height;
  const finalSizes = sizes || config.sizes;
  const finalPriority = priority ?? config.priority;
  const finalQuality = quality ?? config.quality;

  const blurDataURL = imageData?.asset?.metadata?.lqip;
  const hasLqip = Boolean(blurDataURL);

  // 👉 Para SVG: usa <img> directo
  if (isSVG) {
    return (
      <img
        src={baseUrl}
        alt={altText}
        className={className}
        data-speed={dataSpeed}
        loading={finalPriority ? "eager" : "lazy"}
      />
    );
  }

  // ✨ Solo para variant="card", pedimos a Sanity una versión más chica
  const srcForCard =
    variant === "card" && isSanityCdn(baseUrl)
      ? withWidthParam(baseUrl, finalWidth) // p.ej. ?w=600&auto=format&fit=max
      : baseUrl;

  return (
    <Image
      src={srcForCard}
      alt={altText}
      width={finalWidth}
      height={finalHeight}
      sizes={finalSizes}
      priority={finalPriority}
      quality={finalQuality}
      className={className}
      data-speed={dataSpeed}
      placeholder={hasLqip ? "blur" : "empty"}
      blurDataURL={hasLqip ? blurDataURL : undefined}
    />
  );
}