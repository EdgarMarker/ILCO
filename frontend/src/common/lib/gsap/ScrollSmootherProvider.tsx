"use client";

import { useId, useRef } from "react";

import {
	initBatchAnimation,
	initScrollSmoother,
	useGSAP,
} from "./manager.animation";

const ScrollSmootherProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const content = useRef<HTMLDivElement>(null);
	const wrapper = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			initScrollSmoother({
				wrapper: wrapper.current,
				content: content.current,
			});
			initBatchAnimation({ wrapperRef: wrapper.current });
		},
		{ scope: wrapper.current as HTMLElement },
	);
	return (
		<div ref={wrapper}>
			<div ref={content}>
				{children}
			</div>
		</div>
	);
};

export default ScrollSmootherProvider;
