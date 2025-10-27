"use client";

import { useEffect, useState } from "react";
import type { BlogPageModel } from "@/_domain/models/blog/blog-page.model";
import { PostModel } from "@/_domain/models/blog/post/post.model";
import {
	getAllPost,
	getPostsByCategory,
} from "@/_domain/services/blog/post/post.services";
import PostCard from "@/common/components/cards/PostCard";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { PostCategoryModel } from "@/_domain/models/blog/post/post-category.model";

interface Props {
	blogPage: BlogPageModel;
	categories: PostCategoryModel[];
}

const BlogFilterSection = ({ blogPage, categories }: Props) => {
	const [category, setCategory] = useState("all");
	const [posts, setPosts] = useState<PostModel[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	const itemsPerPage = 9;
	const totalPages = Math.ceil(posts.length / itemsPerPage);
	const currentPosts = posts.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage,
	);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setPage(1);

			const rawData =
				category === "all"
					? await getAllPost()
					: await getPostsByCategory({slug: category});

			const postData = rawData.map((item: any) => new PostModel(item));
			setPosts(postData);
			setLoading(false);
		};

		fetchData();
	}, [category]);

	return (
		<section className="section__projects">
			<div className="column__2">
				<div className="col__left">
					<CustomPortableText
						hasImg={false}
						data={blogPage.post.list_block_title_blogPage_title}
					/>
				</div>
				<div className="col__right">
					<label htmlFor="filterTopic">
						Filtrar por tema:{" "}
						<select
							id="filterTopic"
							name="filterTopic"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							disabled={loading}
						>
							<option value="all">Seleccione una opción</option>
							{categories.map((cat) => (
								<option key={cat._id} value={cat.slug.current}>
									{cat.string_line_category_name}
								</option>
							))}
						</select>
					</label>
				</div>
			</div>

			<div className="column__1">
				{loading ? (
					<div>Cargando artículos...</div>
				) : (
					<>
						<div role="list" className="listado">
							{currentPosts.map((post, idx) => (
								<PostCard key={idx ?? ""} postData={post} />
							))}

							{totalPages > 1 && (
								<div className="pagination">
									<button
										type="submit"
										onClick={() => setPage(page - 1)}
										disabled={page === 1}
									>
										‹
									</button>

									{Array.from({ length: totalPages }, (_, i) => i + 1).map(
										(num) => (
											<button
												type="submit"
												key={num}
												onClick={() => setPage(num)}
												className={page === num ? "active" : ""}
											>
												{num}
											</button>
										),
									)}

									<button
										type="submit"
										onClick={() => setPage(page + 1)}
										disabled={page === totalPages}
									>
										›
									</button>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default BlogFilterSection;
