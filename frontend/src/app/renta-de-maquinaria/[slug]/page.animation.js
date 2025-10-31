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

    const Left = document.querySelector(".section__hero .col__left");
    const Right = document.querySelector(".section__hero .col__right");
    const Bread = document.querySelector(".breadcrumbs");
    const H1 = document.querySelector(".section__hero .col__left h1");
    const Btn = document.querySelector(".section__hero .col__left .btn__wrapper");
    
    if (!Left || !Right) return;

	

    tl.to(Left, { x: 0, opacity: 1, duration: 1 })
    .to(Bread, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
    .to(H1, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
    .to(Btn, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
    .to(Right, { x: 0, opacity: 1, duration: 1 }, "-=1");
  }, { scope: scopeRef });

  // Para que useGSAP tenga un scope real (y cleanup automático), renderiza un wrapper “invisible”
  return <div ref={scopeRef} style={{ display: "contents" }} />;
}