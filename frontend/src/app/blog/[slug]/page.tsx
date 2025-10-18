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
		<>
			<section className="section__hero">
				<ResponsiveImage
					imageData={data.general.img_general_primaryImg}
					variant="hero"
				/>
				<div className="column__1">
					<h3>
						CATEGORÍA:{data.general.ref_postCategory.string_line_category_name}
					</h3>
					<h1>{data.general.string_line_general_title}</h1>
					<p>AUTHOR: {data.general.ref_postAuthor.string_line_author_name}</p>
				</div>
			</section>

			<section className="section__content">
				<div>
					<CustomPortableText
						hasImg={true}
						data={data.page.list_block_post_page_content}
					/>
				</div>
				<nav>
					<ul>
						<h3>CATEGORÍAS DE LOS ARTÍCULOS</h3>

						{allCategory.map((category: PostCategoryModel, idx: number) => (
							<li key={idx ?? ""}>
								<a href={`/blog/categoria/${category.slug.current}`}>
									{category.string_line_category_name}
								</a>
							</li>
						))}
					</ul>

					<ul>
						<h3>ARTÍCULOS RECIENTES</h3>

						<ul>
							{allPosts.slice(0, 5).map((post: PostModel, idx: number) => (
								<li key={idx ?? ""}>
									<a href={`/blog/${post.general.slug.current}`}>
										{post.general.string_line_general_title}
									</a>
								</li>
							))}
						</ul>
					</ul>
				</nav>
			</section>
		</>
	);
};

export default page;
