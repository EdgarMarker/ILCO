"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

// Registra plugins SOLO en cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}

export { useGSAP, gsap, ScrollTrigger, ScrollSmoother };

/**
 * Inicializa ScrollSmoother de forma segura para SSR/hidratación.
 * - Evita crear múltiples instancias.
 * - Usa matchMedia para desktop.
 * - Devuelve cleanup.
 */
export const initScrollSmoother = ({ wrapper, content }) => {
  if (typeof window === "undefined") return;
  if (!wrapper || !content) return;

  // Evita duplicados (por hot reload o re-montajes)
  const existing = ScrollSmoother.get && ScrollSmoother.get();
  if (existing) {
    try { existing.kill(); } catch (_) {}
  }

  const mm = gsap.matchMedia();

  // Desktop
  mm.add("(min-width: 1024px)", () => {
    // Por si había quedado alguno vivo
    const prev = ScrollSmoother.get && ScrollSmoother.get();
    if (prev) try { prev.kill(); } catch (_) {}

    ScrollSmoother.create({
      wrapper,
      content,
      smooth: 1,
      effects: true,
    });

    // cleanup de esta query
    return () => {
      const s = ScrollSmoother.get && ScrollSmoother.get();
      if (s) try { s.kill(); } catch (_) {}
    };
  });

  // Mobile (si necesitas lógica especial, ponla aquí)
  mm.add("(max-width: 1023px)", () => {
    // No creamos smoother; si existiera, lo matamos
    const s = ScrollSmoother.get && ScrollSmoother.get();
    if (s) try { s.kill(); } catch (_) {}

    return () => {
      const s2 = ScrollSmoother.get && ScrollSmoother.get();
      if (s2) try { s2.kill(); } catch (_) {}
    };
  });

  // cleanup general (revertir matchMedia)
  return () => {
    try { mm.revert(); } catch (_) {}
    const s = ScrollSmoother.get && ScrollSmoother.get();
    if (s) try { s.kill(); } catch (_) {}
  };
};

/**
 * Batch de animaciones con ScrollTrigger.
 * - Valida elementos
 * - Usa gsap.context para cleanup automático
 */
export const initBatchAnimation = ({
  wrapperRef,
  selectors = [
    ".fadeInOut h3",
    ".fadeInOut h2",
    ".fadeInOut p",
    ".fadeInOut li",
    ".fadeInOut picture",
    ".fadeInOut .btn",
  ],
}) => {
  if (typeof window === "undefined") return;
  if (!wrapperRef) return;

  const ctx = gsap.context(() => {
    const validElements = selectors
      .flatMap((sel) => gsap.utils.toArray(wrapperRef.querySelectorAll(sel)))
      .filter(Boolean);

    if (validElements.length === 0) {
      // No es error; simplemente no hay elementos coincidentes
      return;
    }

    validElements.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 50 });
    });

    ScrollTrigger.batch(validElements, {
      start: "top 80%",
      end: "top 80%",
      stagger: 0.1,
      overwrite: true,
      force3D: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, x: 0 }),
      onLeave: (batch) => gsap.to(batch, { opacity: 1, y: 0, x: 0 }),
      onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, x: 0 }),
      onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 50 }),
    });
  }, wrapperRef);

  // Devuelve cleanup explícito por si quieres llamarlo
  return () => {
    try { ctx.revert(); } catch (_) {}
  };
};


export const startHero = ({ h1El, h2El, pEl, imgEl }) => {
	const tl = gsap.timeline();

	tl.to(imgEl, {
		opacity: 1,
		y: 0,
		duration: 1,
		ease: "power2.out",
	})
	.to(h1El, {
		opacity: 1,
		y: 0,
		duration: 0.8,
		ease: "power2.out",
	}, "+=0.1") 
	.to(h2El, {
		opacity: 1,
		y: 0,
		duration: 0.7,
		ease: "power2.out",
	}, "+=0.05")
	.to(pEl, {
		opacity: 1,
		y: 0,
		duration: 0.7,
		ease: "power2.out",
	}, "+=0.05");
};