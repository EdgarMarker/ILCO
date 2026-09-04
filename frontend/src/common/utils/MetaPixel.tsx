"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
	interface Window {
		fbq?: (...args: any[]) => void;
		_fbq?: unknown;
	}
}

interface MetaPixelProps {
	pixelId?: string;
}

export default function MetaPixel({ pixelId }: MetaPixelProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const initialized = useRef(false);
	const firstPageViewTracked = useRef(false);

	useEffect(() => {
		if (!pixelId || !window.fbq) return;

		// El primer PageView ya se dispara al inicializar el Pixel.
		if (!firstPageViewTracked.current) {
			firstPageViewTracked.current = true;
			return;
		}

		// PageView para navegaciones internas de Next.js
		window.fbq("track", "PageView");
	}, [pathname, searchParams, pixelId]);

	if (!pixelId) {
		return null;
	}

	return (
		<>
			<Script
				id="meta-pixel"
				strategy="afterInteractive"
				onReady={() => {
					if (initialized.current || window.fbq) {
						return;
					}

					(function (
						f: Window,
						b: Document,
						e: string,
						v: string,
						n?: any,
						t?: HTMLScriptElement,
						s?: HTMLScriptElement
					) {
						if (f.fbq) return;

						n = f.fbq = function (...args: any[]) {
							if (n.callMethod) {
								n.callMethod.apply(n, args);
							} else {
								n.queue.push(args);
							}
						};

						if (!f._fbq) {
							f._fbq = n;
						}

						n.push = n;
						n.loaded = true;
						n.version = "2.0";
						n.queue = [];

						t = b.createElement(e) as HTMLScriptElement;
						t.async = true;
						t.src = v;

						s = b.getElementsByTagName(e)[0] as HTMLScriptElement;

						s.parentNode?.insertBefore(t, s);
					})(
						window,
						document,
						"script",
						"https://connect.facebook.net/en_US/fbevents.js"
					);

					window.fbq?.("init", pixelId);
					window.fbq?.("track", "PageView");

					initialized.current = true;
					firstPageViewTracked.current = true;
				}}
			/>

			<noscript>
				<img
					height="1"
					width="1"
					style={{ display: "none" }}
					src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
					alt=""
				/>
			</noscript>
		</>
	);
}
