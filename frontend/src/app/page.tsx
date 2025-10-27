import { HomePageModel } from "@/_domain/models/home-page.model";
import { getHomePageData } from "@/_domain/services/home-page.services";
import RedirectButton from "@/common/components/buttons/RedirectButton";
import ScrollButton from "@/common/components/buttons/ScrollButton";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";
import { createMetadata } from "@/common/utils/helper-seo";
import { serialize } from "@/common/utils/helper-serialize";
import HomeBlogSection from "./components/HomeBlogSection";
import HomeProjectSlider from "./components/HomeProjectSlider";
import HomeTestimonialSection from "./components/HomeTestimonialSection";
import "./page.css";
import PreFooter from "@/common/components/footer/PreFooter";

export const generateMetadata = async () => {
	const rawData = await getHomePageData();
	const data = new HomePageModel(rawData);
	return createMetadata(data.seo);
};

export default async function Home() {
	const rawData = await getHomePageData();
	const data = new HomePageModel(rawData);

	return (
		<main id="Home">
			{/* HERO */}
			<section className="section__hero fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<h1>{data.hero.string_h1}</h1>
						<CustomPortableText
							hasImg={false}
							data={data.hero.list_block_title_hero_title}
						/>
						<div className="btn__wrapper">
							<RedirectButton href="/proyectos" type="secondary">
								{data.hero.string_line_hero_button}
							</RedirectButton>
							<ScrollButton type="primary" scrollTo="#intro">
								{BUTTONS_TEXT.scrollDown}
							</ScrollButton>
						</div>
					</div>
					<div className="col__right">
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

			{/* ABOUT US */}
			<section className="section__about fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<div className="portable__wrapper">
							<CustomPortableText
								hasImg={false}
								data={data.about.list_block_title_about_title}
							/>
							<RedirectButton href="/nosotros" type="primary">
								{data.about.string_line_about_btn}
							</RedirectButton>
						</div>
						
					</div>
					<div className="col__right">
						<ResponsiveImage
							imageData={data.about.img_about_banner}
							variant="banner"
						/>
					</div>
				</div>
			</section>

			{/**Experience */}
			<section className="section__experience fadeInOut">
				<div className="column__1">
						<div className="portable__wrapper">
							<CustomPortableText
								hasImg={false}
								data={data.experience.list_block_title_experience_title}
								/>
						</div>
						<div className="bloques__anim">

						</div>
						<ul>
							{data.experience.list_stats.map((item, index) => (
								<li key={index ?? ""}>
									<span>{item.string_line_experience_label}</span>
									<h3>+{item.number_experience_metric}</h3>
								</li>
							))}
						</ul>
				</div>
			</section>

			{/* PROJECTS */}
			<section className="section__projects fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<div className="portable__wrapper">
							<CustomPortableText
								hasImg={false}
								data={data.products.list_block_title_products_title}
								/>
							<RedirectButton href="/proyectos" type="primary">
								{data.products.string_line_products_btn}
							</RedirectButton>
						</div>
					</div>
					<div className="col__right">
						<HomeProjectSlider projectData={serialize(data)} />
					</div>
				</div>
			</section>

			{/* POST */}
			<HomeBlogSection blogData={serialize(data)} />

			{/** MACHINES */}
			<section className="section__machines fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<div className="portable__wrapper">
							<CustomPortableText
								hasImg={false}
								data={data.machines.list_block_title_machines_title}
							/>
							<RedirectButton href="/contacto" type="primary">
								{data.machines.string_line_machines_btn}
							</RedirectButton>
						</div>
					</div>
					<div className="col__right">
						<ResponsiveImage
							imageData={data.machines.img_machines_banner}
							variant="banner"
						/>
					</div>
				</div>
			</section>

			{/* TESTIMONIALS */}
			<HomeTestimonialSection testyData={serialize(data)} />
			<PreFooter />
		</main>
	);
}
