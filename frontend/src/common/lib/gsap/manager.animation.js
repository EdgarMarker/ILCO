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

export const safeRefresh = () => {
  // refresca smoother primero, luego ScrollTrigger
  const s = ScrollSmoother.get && ScrollSmoother.get();
  if (s) s.refresh(true);
  ScrollTrigger.refresh(true);
};

gsap.delayedCall(0.25, safeRefresh);

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
    ".fadeInOut img",
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
      start: "-50px 85%",
      end: "-50px 85%",
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


export const startHero = ({ containerEl, h1El, h2El, pEl, imgEl, vidEl, leftEl, btnEl }) => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  // helper para añadir tweens solo si existe el target
  const add = (target, vars, at) => (target ? tl.to(target, vars, at) : tl);

  // 0) Evita FOUC: muestra el contenedor ya en layout effect
  if (containerEl) gsap.set(containerEl, { visibility: "visible" });

  // 1) Estados iniciales (solo los presentes)
  const textEls = [h1El, h2El, pEl].filter(Boolean);
  if (textEls.length) gsap.set(textEls, { opacity: 0, y: 50, willChange: "transform" });
  if (imgEl) gsap.set(imgEl, { opacity: 0, x: 50, willChange: "transform" });
  if (vidEl) gsap.set(vidEl, { opacity: 0, y: 0, x: "30%", willChange: "transform" });
  if (leftEl) gsap.set(leftEl, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });
  if (btnEl) gsap.set(btnEl, { opacity: 0, y: 50, x: 0, willChange: "transform" });

  // 2) Timeline condicional
  add(leftEl, { clipPath: "polygon(0 0, 101% 0, 101% 100%, 0% 100%)", duration: 0.8, ease: "power2.inOut" }, 0);
  add(vidEl,  { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power2.inOut", clearProps: "x,y,willChange" }, "-=0.6");

  if (textEls.length) {
    tl.to(textEls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, clearProps: "y,willChange" }, "-=0.3");
  } else {
    add(h1El, { opacity: 1, y: 0, duration: 0.4, clearProps: "y,willChange" }, "-=0.3");
    add(h2El, { opacity: 1, y: 0, duration: 0.4, clearProps: "y,willChange" }, "-=0.3");
    add(pEl,  { opacity: 1, y: 0, duration: 0.4, clearProps: "y,willChange" }, "-=0.3");
  }

  add(btnEl,  { opacity: 1, y: 0, duration: 0.4, clearProps: "y,willChange" }, "-=0.3");
  add(imgEl, { opacity: 1, x: 0, duration: 0.5, ease: "power2.inOut", clearProps: "x,y,willChange" }, "-=0.2");

  // 3) Limpieza final (NO borres opacity)
  tl.add(() => {
    // si quieres, limpia solo clipPath del left
    if (leftEl) gsap.set(leftEl, { clearProps: "clipPath" });
  });

  return tl;
};