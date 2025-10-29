import React from "react";
import { PostModel } from "@/_domain/models/blog/post/post.model";
import { PostCategoryModel } from "@/_domain/models/blog/post/post-category.model";
import {
	getAllPost,
	getAllPostCategories,
	getPostData,
} from "@/_domain/services/blog/post/post.services";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { createMetadata } from "@/common/utils/helper-seo";
import "./page.css";
import PreFooter from "@/common/components/footer/PreFooter";

interface Props {
	params: {
		slug: string;
	};
}

export const generateMetadata = async ({ params }: Props) => {
	const rawData = await getPostData({ slug: params.slug });
	const data = new PostModel(rawData);
	return createMetadata(data.seo);
};

const page = async ({ params }: Props) => {
	const rawData = await getPostData({ slug: params.slug });
	const rawAllCategory = await getAllPostCategories();
	const rawAllPost = await getAllPost();

	const data = new PostModel(rawData);
	const allCategory = rawAllCategory.map(
		(cat: any) => new PostCategoryModel(cat),
	);
	const allPosts = rawAllPost.map((post: any) => new PostModel(post));

	return (
		<main id="BlogPost">
			<section className="section__hero fadeInOut">
				<ResponsiveImage
					imageData={data.general.img_general_primaryImg}
					variant="hero"
				/>
				<div className="column__1">
					<h3>
						Categoría: {data.general.ref_postCategory.string_line_category_name}
					</h3>
					<h1>{data.general.string_line_general_title}</h1>
					<p>Autor: {data.general.ref_postAuthor.string_line_author_name}</p>
				</div>
			</section>

			<section className="section__content fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<CustomPortableText
							hasImg={true}
							data={data.page.list_block_post_page_content}
						/>
					</div>
					<div className="col__right">
						<div className="sidebar__block">
							<h3>Categorías de los artículos</h3>
							<ul role="list">
								{allCategory.map((category: PostCategoryModel, idx: number) => (
									<li key={idx ?? ""}>
										<a href={`/blog/categoria/${category.slug.current}`}>
											{category.string_line_category_name}
										</a>
									</li>
								))}
							</ul>
						</div>
						<div className="sidebar__block">
							<h3>Artículos recientes</h3>
							<ul role="list">
								{allPosts.slice(0, 5).map((post: PostModel, idx: number) => (
									<li key={idx ?? ""}>
										<a href={`/blog/${post.general.slug.current}`}>
											{post.general.string_line_general_title}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>
			<PreFooter />
		</main>
	);
};

export default page;
