"use client";

import React from "react";
import { ScrollSmoother } from "@/common/lib/gsap/manager.animation";

interface Props {
  type: "primary" | "secondary" | "tertiary";
  scrollTo: string | number;     // "#intro" | ".clase" | 0 | "200"
  children: React.ReactNode;
  offset?: number;               // px a restar (header fijo)
}

/** Devuelve un HTMLElement, un número (px) o null */
function resolveTarget(scrollTo: string | number): HTMLElement | number | null {
  if (typeof scrollTo === "number") return scrollTo;

  const asNum = Number(scrollTo);
  if (!Number.isNaN(asNum)) return asNum;

  // Selector: tipamos el querySelector para obtener HTMLElement
  const el = document.querySelector<HTMLElement>(scrollTo);
  return el ?? null;
}

const ScrollButton = ({ type, scrollTo, children, offset = 0 }: Props) => {
  const handleButton = () => {
    if (typeof window === "undefined") return;

    const target = resolveTarget(scrollTo);
    const smoother =
      (ScrollSmoother as any)?.get?.() ? (ScrollSmoother as any).get() : null;

    if (target instanceof HTMLElement) {
      if (smoother) {
        smoother.scrollTo(target, true, offset);
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
      return;
    }

    if (typeof target === "number") {
      const top = Math.max(0, target - offset);
      if (smoother) {
        smoother.scrollTo(top, true);
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleButton}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleButton();
      }}
      className={`btn btn__scroll--${type}`}
    >
      {children}
    </button>
  );
};

export default ScrollButton;