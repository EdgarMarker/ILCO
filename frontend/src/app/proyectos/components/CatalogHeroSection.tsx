"use client"
import { CatalogPageModel } from "@/_domain/models/catalog/catalog-page.model";
import RedirectButton from "@/common/components/buttons/RedirectButton";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { startHero, useGSAP } from "@/common/lib/gsap/manager.animation";
import React, { useRef } from "react";

interface Props {
	data: CatalogPageModel;
}

const CatalogHeroSection = ({ data }: Props) => {
	const h1El = useRef<HTMLHeadingElement>(null);
	const portableTextRef = useRef<HTMLDivElement>(null);
	const imgEl = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const h2El = portableTextRef.current?.querySelector("h2");
		const pEl = portableTextRef.current?.querySelector("p");

		startHero({
			h1El: h1El.current,
			h2El: h2El || null,
			pEl: pEl || null,
			imgEl: imgEl.current,
		});
	});
	return (
		<section className="section__hero">
			<div className="column__2">
				<div className="col__left">
					<h1 ref={h1El}>{data.hero.string_h1}</h1>
					<div ref={portableTextRef}>
						<CustomPortableText
							hasImg={false}
							data={data.hero.list_block_title_hero_title}
						/>
					</div>
					<RedirectButton href="/contact" type="primary">
						{data.hero.string_line_hero_button}
					</RedirectButton>
				</div>
				<div className="col__right" ref={imgEl}>
					<video width="1920" height="1080" autoPlay muted preload="none" loop>
						<source src="/videos/prueba.mp4" type="video/mp4" />
						Tu navegador no soporta la etiqueta de video.
					</video>
					<ResponsiveImage
						imageData={data.hero.img_hero_png}
						variant="banner"
						className="subject"
					/>
				</div>
			</div>
		</section>
	);
};

export default CatalogHeroSection;
