"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import lottie, { AnimationItem } from "lottie-web";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** Ruta al JSON (ej. /animations/home-hero.json) o URL absoluta */
  src: string;
  /** alto en px (puedes pasar via style también) */
  height?: number;
  /** ancho en px */
  width?: number;
  /** limitar frames (opcional) */
  startFrame?: number; // por defecto 0
  endFrame?: number;   // por defecto totalFrames
  /** activar en desktop sólo (opcional) */
  desktopOnly?: boolean;
};

export default function LottieScroll({
  src,
  height = 500,
  width = 500,
  startFrame = 0,
  endFrame,
  desktopOnly = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (desktopOnly && window.matchMedia("(max-width: 1023px)").matches) {
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    // 1) Inicializa Lottie (sin autoplay/loop)
    const anim = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: src,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet", 
        progressiveLoad: true,
      },
    });
    animRef.current = anim;

    

    const onDOMLoaded = () => {
  const total = anim.totalFrames || 1;
  const from = Math.max(0, Math.min(startFrame, total - 1));
  const to   = Math.min(endFrame ?? total - 1, total - 1);

  const state = { t: 0 }; // 0..1
  // Muy recomendable para que escale desde el centro
  gsap.set(containerRef.current, { transformOrigin: "center center", willChange: "transform" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current!,
      start: "top 75%",   
      end: "top 10%",
      scrub: true,        // <— scrub
      onLeave: () => anim.pause(),
      onLeaveBack: () => anim.pause(),
    },
  });

  // 1) Lottie: progreso 0→1 con ease suave
  tl.to(state, {
    t: 1,
    ease: "none",   // <— ease ligero
    onUpdate: () => {
      const frame = Math.round(from + (to - from) * state.t);
      anim.goToAndStop(frame, true);
    },
  }, 0);

  // 2) Escala del contenedor en el mismo rango (0 = inicio del timeline)
  tl.to(containerRef.current, {
    scale: 1.15,          // <— ajusta a tu gusto
    ease: "power1.in",   // <— ease del escalado
    transformOrigin: "bottom"
  }, 0);
};

    anim.addEventListener("DOMLoaded", onDOMLoaded);

    // Accesibilidad: respeta reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onReduce = () => {
      if (mq.matches) {
        // mostrar primer frame fijo
        anim.goToAndStop(startFrame, true);
        stRef.current?.disable();
      } else {
        stRef.current?.enable();
      }
    };
    onReduce();
    mq.addEventListener?.("change", onReduce);

    // 3) Cleanup
    return () => {
      try {
        mq.removeEventListener?.("change", onReduce);
      } catch {}
      try {
        anim.removeEventListener("DOMLoaded", onDOMLoaded);
        anim.destroy();
      } catch {}
      try {
        stRef.current?.kill();
      } catch {}
    };
  }, [mounted, src, startFrame, endFrame, desktopOnly]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        // evita saltos si el SVG tarda en cargar
        display: "block",
      }}
      role="img"
      aria-label="Animación Lottie controlada por scroll"
    />
  );
}