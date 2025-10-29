"use client";
import type { HomePageModel } from "@/_domain/models/home-page.model";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import RedirectButton from "@/common/components/buttons/RedirectButton";
import ScrollButton from "@/common/components/buttons/ScrollButton";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { startHero } from "@/common/lib/gsap/manager.animation";

interface Props {
	data: HomePageModel;
}

const HomeHeroSection = ({ data }: Props) => {
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
					<h1  ref={h1El}>{data.hero.string_h1}</h1>
					<div ref={portableTextRef}>
						<CustomPortableText
							hasImg={false}
							data={data.hero.list_block_title_hero_title}
						/>
					</div>
					<div className="btn__wrapper">
						<RedirectButton href="/proyectos" type="secondary">
							{data.hero.string_line_hero_button}
						</RedirectButton>
						<ScrollButton type="primary" scrollTo="#intro">
							{BUTTONS_TEXT.scrollDown}
						</ScrollButton>
					</div>
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

export default HomeHeroSection;
