import "./page.css";
import React from "react";
import { PostModel } from "@/_domain/models/blog/post/post.model";
import { getPostsByCategory } from "@/_domain/services/blog/post/post.services";
import PostCard from "@/common/components/cards/PostCard";

const page = async ({ params }: { params: { slug: string } }) => {
	const { slug } = await params;
	const rawData = await getPostsByCategory({ slug });
	const data = rawData.map((item: any) => new PostModel(item));

	console.log(data.general)

	return (
		<main id="CatBlog">
			<section className="section__hero">
				<div className="column__1">
					<span className="breadcrumbs">
						<a href="/blog">Blog</a>
						{" "}/{" "}
						Categoría /
					</span>
					<h1>{data[0].general.ref_postCategory?.string_line_category_name}</h1>
				</div>
			</section>
			<section className="section__content">
				<div className="column__1">
					<ul role="list" className="listado">
						{data.map((post: PostModel, idx: number) => (
							<PostCard key={idx ?? ""} postData={post} />
						))}
					</ul>
				</div>
			</section>
		</main>
	);
};

export default page;
