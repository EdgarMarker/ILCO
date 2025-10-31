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

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    const Img = document.querySelector(".section__hero img");
    const Title = document.querySelector(".section__hero .proyect__title");
    
    if (!Img || !Title) return;

	

    tl.to(Img, { scale: 1, opacity: 1, duration: 1 })
    .to(Title, { y: 0, duration: 1.2 }, "-=0.7");
  }, { scope: scopeRef });

  // Para que useGSAP tenga un scope real (y cleanup automático), renderiza un wrapper “invisible”
  return <div ref={scopeRef} style={{ display: "contents" }} />;
}