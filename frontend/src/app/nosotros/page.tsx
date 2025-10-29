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
import "./page.css";
import PreFooter from "@/common/components/footer/PreFooter";
import AboutHeroSection from "./components/AboutHeroSection";

export const generateMetadata = async () => {
	const rawData = await getAboutPageData();
	const data = new AboutPageModel(rawData);
	return createMetadata(data.seo);
};

const page = async () => {
	const rawData = await getAboutPageData();
	const data = new AboutPageModel(rawData);

	return (
		<main id="About">
			{/* HERO */}
			<AboutHeroSection data={serialize(data)} />

			{/* ABOUT US */}
			<section className="section__about fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<ResponsiveImage
							imageData={data.about.img_about_banner}
							variant="banner"
						/>
					</div>
					<div className="col__right">
						<div className="portable__wrapper">
							<CustomPortableText
								hasImg={false}
								data={data.about.list_block_title_about_title}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* PHILOSOPHY */}
			<section className="section__philosophy fadeInOut">
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
			<section className="section__history fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<div className="portable__wrapper">
							<CustomPortableText
								hasImg={false}
								data={data.history.list_block_title_history_title}
							/>
						</div>
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
			<section className="section__machines fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<ResponsiveImage
							imageData={data.machines.img_machines_banner}
							variant="banner"
						/>
					</div>
					<div className="col__right">
						<div className="portable__wrapper">
							<CustomPortableText
								hasImg={false}
								data={data.machines.list_block_title_machines_title}
							/>
						</div>
						<div className="btn__wrapper">
							<RedirectButton href="/proyectos" type="primary">
								{BUTTONS_TEXT.viewProject}
							</RedirectButton>
							<RedirectButton href="/contacto" type="primary">
								{data.machines.string_line_machines_btn}
							</RedirectButton>
						</div>
					</div>
				</div>
			</section>
			<PreFooter />
		</main>
	);
};

export default page;
