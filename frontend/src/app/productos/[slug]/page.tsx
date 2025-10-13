import React from "react";
import { ProductModel } from "@/_domain/models/product.model";
import { getProductData } from "@/_domain/service/product.fetch";
import ProductCard from "@/common/components/cards/ProductCard";
import { createMetadata } from "@/common/utils/helper-seo";

interface Props {
	params: {
		slug: string;
	};
}

export const generateMetadata = async ({ params }: Props) => {
	const rawData = await getProductData(params.slug);
	const data = new ProductModel(rawData);
	return createMetadata(data.seo);
};

const page = async ({ params }: Props) => {
	const rawData = await getProductData(params.slug);
	const data = new ProductModel(rawData);
	return (
		<div>
			Hola soy la pagina de la ruta productos/{data.general.slug.current}
			<ProductCard data={data} />
		</div>
	);
};

export default page;
