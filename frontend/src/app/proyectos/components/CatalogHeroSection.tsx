"use client"
import { CatalogPageModel } from "@/_domain/models/catalog/catalog-page.model";
import ScrollButton from "@/common/components/buttons/ScrollButton";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { startHero, useGSAP } from "@/common/lib/gsap/manager.animation";
import React, { useRef } from "react";
import gsap from "gsap";

interface Props {
	data: CatalogPageModel;
}

const CatalogHeroSection = ({ data }: Props) => {
	const sectionRef = useRef<HTMLElement>(null);
	const h1El = useRef<HTMLHeadingElement>(null);
	const portableTextRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const h2El = portableTextRef.current?.querySelector("h2");
		const pEl  = portableTextRef.current?.querySelector("p");
		const q    = gsap.utils.selector(sectionRef);

		const videoEl = q("video")[0] as HTMLVideoElement | undefined;
		const imageEl = q(".subject")[0] as HTMLElement | undefined;
		const leftEl  = q(".col__left")[0] as HTMLElement | undefined;
		const btnEl  = q(".btn")[0] as HTMLElement | undefined;

		startHero({
		containerEl: sectionRef.current, // 👈 para controlar visibility sin FOUC
		h1El: h1El.current,
		h2El: h2El || null,
		pEl:  pEl  || null,
		imgEl: imageEl || null,
		vidEl: videoEl || null,
		leftEl: leftEl || null,
		btnEl: btnEl || null,
		});
	}, { scope: sectionRef });
	return (
		<section
		className="section__hero"
		ref={sectionRef}
		style={{ visibility: "hidden" }}   // 👈 evita flash antes de GSAP
		>
			<div className="column__2">
				<div className="col__left">
					<h1 ref={h1El}>{data.hero.string_h1}</h1>
					<div ref={portableTextRef}>
						<CustomPortableText
							hasImg={false}
							data={data.hero.list_block_title_hero_title}
						/>
					</div>
					
					<ScrollButton type="secondary" scrollTo="#Intro">
							Ver nuestros proyectos
					</ScrollButton>
				</div>
				<div className="col__right">
					<video
					width="1920"
					height="1080"
					autoPlay
					muted
					loop
					playsInline
					webkit-playsinline="true"
					preload="none"
					>
						<source src="/videos/proyects_ilco.mp4" type="video/mp4" />
						Tu navegador no soporta la etiqueta de video.
					</video>
					<ResponsiveImage
						imageData={data.hero.img_hero_png}
						variant="banner"
						className="subject"
						dataSpeed="clamp(0.95)"
					/>
				</div>
			</div>
		</section>
	);
};

export default CatalogHeroSection;
