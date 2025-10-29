import "./page.css"
import React from "react";
import { ProductModel } from "@/_domain/models/catalog/product/product.model";
import { getProductsByCategory } from "@/_domain/services/catalog/product/product.services";
import ProductCard from "@/common/components/cards/ProductCard";

const page = async ({ params }: { params: { slug: string } }) => {
	const rawData = await getProductsByCategory({ slug: params.slug });
	const data = rawData.map((item: any) => new ProductModel(item));
	return (
		<>
			<section className="section__hero fadeInOut">
				<div className="column__1">
					<h1>{params.slug.toUpperCase()}</h1>
				</div>
			</section>
			<section className="section__projects fadeInOut">
				<div className="column__1">

					<ul className="listado" role="list">
						{data.map((post: ProductModel, idx: number) => (
							<ProductCard key={idx ?? ""} data={post} />
						))}
					</ul>
				</div>
			</section>
		</>
	);
};

export default page;
