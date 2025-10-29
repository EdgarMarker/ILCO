"use client"
import { BlogPageModel } from "@/_domain/models/blog/blog-page.model";
import RedirectButton from "@/common/components/buttons/RedirectButton";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import { startHero, useGSAP } from "@/common/lib/gsap/manager.animation";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";
import React, { useRef } from "react";
interface Props {
	data: BlogPageModel;
}
const BlogHeroSection = ({ data }: Props) => {
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
				<div className="col__right" ref={imgEl}>
					<ResponsiveImage
						imageData={data.featured.ref_post.general.img_general_primaryImg}
						variant="card"
					/>
				</div>
			</div>
		</section>
	);
};

export default BlogHeroSection;
