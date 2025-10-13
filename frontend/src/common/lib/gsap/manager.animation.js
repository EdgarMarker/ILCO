"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollSmoother from "gsap/src/ScrollSmoother";
import ScrollTrigger from "gsap/src/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
export { useGSAP };

export const initScrollSmoother = ({ wrapper, content }) => {
	if ((!wrapper && wrapper === null) || (!content && content === null)) {
		console.log("Wrapper or content element not found");
		return;
	}

	const mm = gsap.matchMedia();
	mm.add("(min-width: 1024px)", () => {
		ScrollSmoother.create({
			wrapper: wrapper,
			content: content,
			smooth: 1,
			effects: true,
		});
	});

	mm.add("(max-width: 1023px)", () => {});
};

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
	if (!wrapperRef) return;

	const ctx = gsap.context(() => {
		const validElements = selectors
			.flatMap((sel) => gsap.utils.toArray(wrapperRef.querySelectorAll(sel)))
			.filter((el) => el);

		if (validElements.length === 0) {
			console.warn("No se encontraron elementos para animar.");
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

	return ctx;
};
