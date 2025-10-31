"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger, useGSAP };

export default function Animations() {
  const scopeRef = useRef(null);

  useGSAP(() => {
    const ProyGal = document.getElementById("ProyGal");
    const ProyGalSection = document.querySelector("#ProyGal .proy__slider");
    if (!ProyGal || !ProyGalSection) return;

	

    gsap.from(ProyGal, {
      x: "50%",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ProyGalSection,
        start: "top bottom",
        end: "top 50%",
        scrub: true,
      },
    });
  }, { scope: scopeRef });

  // Para que useGSAP tenga un scope real (y cleanup automático), renderiza un wrapper “invisible”
  return <div ref={scopeRef} style={{ display: "contents" }} />;
}