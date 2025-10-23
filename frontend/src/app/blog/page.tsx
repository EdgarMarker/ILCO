import { BlogPageModel } from "@/_domain/models/blog/blog-page.model";
import { getBlogPageData } from "@/_domain/services/blog/blog-page.services";
import RedirectButton from "@/common/components/buttons/RedirectButton";
import ScrollButton from "@/common/components/buttons/ScrollButton";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";
import { createMetadata } from "@/common/utils/helper-seo";
import React from "react";
import BlogFilterSection from "./components/BlogFilterSection";
import { serialize } from "@/common/utils/helper-serialize";
import { getAllPostCategories } from "@/_domain/services/blog/post/post.services";
import { PostCategoryModel } from "@/_domain/models/blog/post/post-category.model";
import "./page.css";
import PreFooter from "@/common/components/footer/PreFooter";

export const generateMetadata = async () => {
	const rawData = await getBlogPageData();
	const data = new BlogPageModel(rawData);
	return createMetadata(data.seo);
};

const page = async () => {
	const rawData = await getBlogPageData();
	const rawPostCategories = await getAllPostCategories();

	const data = new BlogPageModel(rawData);
	const allPostCategories = rawPostCategories.map(
		(category: any) => new PostCategoryModel(category),
	);

	return (
		<main id="Blog">
			{/* HERO */}
			<section className="section__hero">
				<div className="column__2">
					<div className="col__left">
						<h3>Articulo Destacado</h3>
						<h1>{data.featured.ref_post.general.string_line_general_title}</h1>
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
							variant="card"
						/>
					</div>
				</div>
			</section>

			{/** BLOG FILTER SECTION */}
			<BlogFilterSection blogPage={serialize(data)} categories={serialize(allPostCategories)} />
			<PreFooter />
		</main>
	);
};

export default page;
