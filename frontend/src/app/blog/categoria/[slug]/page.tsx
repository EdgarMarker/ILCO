import "./page.css";
import React from "react";
import { PostModel } from "@/_domain/models/blog/post/post.model";
import { getPostsByCategory } from "@/_domain/services/blog/post/post.services";
import PostCard from "@/common/components/cards/PostCard";

const page = async ({ params }: { params: { slug: string } }) => {
	const rawData = await getPostsByCategory({ slug: params.slug });
	const data = rawData.map((item: any) => new PostModel(item));

	return (
		<>
			<section className="section__hero">
				<div className="column__1">
					<h1>{params.slug.toUpperCase()}</h1>
				</div>
			</section>
			<section>
				<div className="column__1">
					<div className="listado">
						{data.map((post: PostModel, idx: number) => (
							<PostCard key={idx ?? ""} postData={post} />
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default page;
