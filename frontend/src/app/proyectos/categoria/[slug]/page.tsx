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
			<section className="section__hero">
				<div className="column__1">
					<h1>{params.slug.toUpperCase()}</h1>
				</div>
			</section>
			<section>
				<div className="column__1">
					<div className="listado">
						{data.map((post: ProductModel, idx: number) => (
							<ProductCard key={idx ?? ""} data={post} />
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default page;
