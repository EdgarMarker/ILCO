import { HomePageModel } from "@/_domain/models/home-page.model";
import { getHomePageData } from "@/_domain/service/home-page.fetch";
import RedirectButton from "@/common/components/buttons/RedirectButton";
import ScrollButton from "@/common/components/buttons/ScrollButton";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";
import { createMetadata } from "@/common/utils/helper-seo";

export const generateMetadata = async () => {
	const rawData = await getHomePageData();
	const data = new HomePageModel(rawData);
	return createMetadata(data.seo);
};

export default async function Home() {
	const rawData = await getHomePageData();
	const data = new HomePageModel(rawData);
	return (
		<>
			<section className="section__hero">
				<div className="column__2">
					<div className="col__left">
						<h1>{data.hero.string_h1}</h1>
						<CustomPortableText
							hasImg={false}
							data={data.hero.list_block_title_section}
						/>
						<CustomPortableText
							hasImg={false}
							data={data.hero.list_block_text_info}
						/>
						<RedirectButton type="primary">
							{data.hero.string_line_button}
						</RedirectButton>
						<ScrollButton type="primary" scrollTo="#intro">
							{BUTTONS_TEXT.scroll_home}
						</ScrollButton>
					</div>
					<div className="col__right">
						<ResponsiveImage imageData={data.hero.img_section} variant="hero" />
						<ul>
							{data.hero.list_obj_items.map((item, index) => (
								<li key={index || index}>
									<ResponsiveImage
										imageData={item.img_icon_item}
										variant="icon"
									/>
									<CustomPortableText
										hasImg={false}
										data={item.list_block_title_item}
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section className="section__reward">
				<div className="column__1">
					<h2>Gana Hasta: {data.number_reward}</h2>
				</div>
			</section>

			<section id="intro" className="section__intro">
				{data.intro.map((item, index) => (
					<div className="column__2" key={index}>
						<div className="col__left">
							<h3>/PASO {index + 1}</h3>
							<CustomPortableText
								hasImg={false}
								data={item.list_block_title_section}
							/>
							<div>
								<p>{item.string_text_info}</p>
								<ResponsiveImage
									imageData={item.img_icon_section}
									variant="icon"
								/>
							</div>
							<div>
								<RedirectButton type="secondary">
									{BUTTONS_TEXT.register_primary}
								</RedirectButton>
								<RedirectButton type="primary">
									{BUTTONS_TEXT.know_primary}
								</RedirectButton>
							</div>
						</div>
						<div className="col__right">
							<ResponsiveImage imageData={item.img_section} variant="banner" />
						</div>
					</div>
				))}
			</section>

			<section className="section__benefits">
				<div className="column__1">
					<CustomPortableText
						hasImg={false}
						data={data.benefits.list_block_title_section}
					/>
				</div>
				<div className="column__2">
					<div className="col__left">
						<CustomPortableText
							hasImg={false}
							data={data.benefits.list_block_title_benefits}
						/>
						<p>{data.benefits.string_text_info}</p>
						<RedirectButton type="tertiary">
							{BUTTONS_TEXT.register_primary}
						</RedirectButton>
						<ul role="list">
							{data.benefits.list_obj_faqs.map((faq, index) => (
								<li key={index}>
									<CustomPortableText
										hasImg={false}
										data={faq.list_block_title_question}
									/>
									<CustomPortableText
										hasImg={false}
										data={faq.list_block_text_answer}
									/>
								</li>
							))}
						</ul>
					</div>
					<div className="col__right">
						<ResponsiveImage
							imageData={data.benefits.img_section}
							variant="banner"
						/>
					</div>
				</div>
			</section>

			<section className="section__join-us">
				<div className="column__1">
					<CustomPortableText
						hasImg={false}
						data={data.joinUs.list_block_title_section}
					/>
				</div>
				<div className="column__2">
					<div className="col__left">
						<CustomPortableText
							hasImg={false}
							data={data.joinUs.list_block_title_joinUs}
						/>
						<ul role="list">
							{data.joinUs.list_obj_items.map((item, index) => (
								<li key={index}>
									<ResponsiveImage
										imageData={item.img_icon_item}
										variant="icon"
									/>
									<p>{item.string_line_item}</p>
								</li>
							))}
						</ul>
						<div>
							<RedirectButton type="secondary">
								{BUTTONS_TEXT.register_primary}
							</RedirectButton>
							<RedirectButton type="primary">
								{BUTTONS_TEXT.know_secondary}
							</RedirectButton>
						</div>
					</div>
					<div className="col__right">
						<ResponsiveImage
							imageData={data.joinUs.img_section}
							variant="banner"
						/>
					</div>
				</div>
			</section>
		</>
	);
}
