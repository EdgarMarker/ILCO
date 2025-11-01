"use client"
import { BlogPageModel } from "@/_domain/models/blog/blog-page.model";
import RedirectButton from "@/common/components/buttons/RedirectButton";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import { startHero, useGSAP } from "@/common/lib/gsap/manager.animation";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";
import React, { useRef } from "react";
import gsap from "gsap";
interface Props {
	data: BlogPageModel;
}
const BlogHeroSection = ({ data }: Props) => {
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
		const btnEl  = q(".btn__wrapper")[0] as HTMLElement | undefined;

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
	});
	return (
		<section
		className="section__hero"
		ref={sectionRef}
		style={{ visibility: "hidden" }}   // 👈 evita flash antes de GSAP
		>
			<div className="column__2">
				<div className="col__left">
					<h3>Articulo Destacado</h3>
					<h1 ref={h1El}>{data.featured.ref_post.general.string_line_general_title}</h1>
					<span className="featured__cat">
						Categoría:{" "}
						{
							data.featured.ref_post.general.ref_postCategory
								.string_line_category_name
						}
					</span>
					<p>
						{data.featured.ref_post.general.string_textarea_general_cardExcerpt}
					</p>
					<RedirectButton
						href={`/blog/${data.featured.ref_post.general.slug.current}`}
						type="primary"
					>
						{BUTTONS_TEXT.readPost}
					</RedirectButton>
				</div>
				<div className="col__right">
					<ResponsiveImage
						imageData={data.featured.ref_post.general.img_general_primaryImg}
						variant="hero"
						className="subject"
						dataSpeed="clamp(0.8)"
					/>
				</div>
			</div>
		</section>
	);
};

export default BlogHeroSection;
