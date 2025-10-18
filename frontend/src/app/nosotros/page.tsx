import React from "react";
import { createMetadata } from "@/common/utils/helper-seo";
import { getAboutPageData } from "@/_domain/services/about-page.services";
import { AboutPageModel } from "@/_domain/models/about-page.model";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import RedirectButton from "@/common/components/buttons/RedirectButton";
import ScrollButton from "@/common/components/buttons/ScrollButton";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";
import AboutValuesSection from "./components/AboutValuesSection";
import { serialize } from "@/common/utils/helper-serialize";

export const generateMetadata = async () => {
	const rawData = await getAboutPageData();
	const data = new AboutPageModel(rawData);
	return createMetadata(data.seo);
};

const page = async () => {
	const rawData = await getAboutPageData();
	const data = new AboutPageModel(rawData);

	return (
		<>
			{/* HERO */}
			<section className="section__hero">
				<div className="column__2">
					<div className="col__left">
						<h1>{data.hero.string_h1}</h1>
						<CustomPortableText
							hasImg={false}
							data={data.hero.list_block_title_hero_title}
						/>
						<RedirectButton href="/proyectos" type="primary">
							{data.hero.string_line_hero_button}
						</RedirectButton>
						<ScrollButton type="secondary" scrollTo="#intro">
							{BUTTONS_TEXT.scrollDown}
						</ScrollButton>
					</div>
					<div className="col__right">
						<ResponsiveImage
							imageData={data.hero.img_hero_banner}
							variant="hero"
						/>
						<ResponsiveImage
							imageData={data.hero.img_hero_png}
							variant="banner"
						/>
					</div>
				</div>
			</section>

			{/* ABOUT US */}
			<section className="section__about">
				<div className="column__2">
					<div className="col__left">
						<CustomPortableText
							hasImg={false}
							data={data.about.list_block_title_about_title}
						/>
					</div>
					<div className="col__right">
						<ResponsiveImage
							imageData={data.about.img_about_banner}
							variant="banner"
						/>
					</div>
				</div>
			</section>

			{/* PHILOSOPHY */}
			<section className="section__philosophy">
				<div className="column__1">
					<CustomPortableText
						hasImg={false}
						data={data.philosophy.list_block_title_philosophy_title}
					/>
					<ResponsiveImage
						imageData={data.philosophy.img_philosophy_banner}
						variant="banner"
					/>
				</div>
			</section>

			{/* HISTORY */}
			<section className="section__history">
				<div className="column__2">
					<div className="col__left">
						<CustomPortableText
							hasImg={false}
							data={data.history.list_block_title_history_title}
						/>
					</div>
					<div className="col__right">
						<ResponsiveImage
							imageData={data.history.img_history_banner}
							variant="banner"
						/>
					</div>
				</div>
			</section>

			{/** VALUES */}
			<AboutValuesSection aboutData={serialize(data)} />

			{/** MACHINES */}
			<section className="section__machines">
				<div className="column__2">
					<div className="col__left">
						<ResponsiveImage
							imageData={data.machines.img_machines_banner}
							variant="banner"
						/>
					</div>
					<div className="col__right">
						<CustomPortableText
							hasImg={false}
							data={data.machines.list_block_title_machines_title}
						/>
						<RedirectButton href="/proyectos" type="primary">
							{BUTTONS_TEXT.viewProject}
						</RedirectButton>
						<RedirectButton href="/contacto" type="primary">
							{data.machines.string_line_machines_btn}
						</RedirectButton>
					</div>
				</div>
			</section>
		</>
	);
};

export default page;
