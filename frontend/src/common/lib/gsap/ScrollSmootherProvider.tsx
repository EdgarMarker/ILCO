"use client";

import { useId, useRef } from "react";
import { usePathname } from "next/navigation";

import {
	initBatchAnimation,
	initScrollSmoother,
	useGSAP,
} from "./manager.animation";

const ScrollSmootherProvider = ({ children }: { children: React.ReactNode }) => {
	const content = useRef<HTMLDivElement>(null);
	const wrapper = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	useGSAP(
		() => {
			initScrollSmoother({
				wrapper: wrapper.current,
				content: content.current,
			});
			const cleanup = initBatchAnimation({ wrapperRef: wrapper.current });
			return cleanup;
		},
		{ scope: wrapper.current as HTMLElement, dependencies: [pathname] },
	);

	return (
		<div ref={wrapper}>
			<div ref={content}>{children}</div>
		</div>
	);
};

export default ScrollSmootherProvider;
