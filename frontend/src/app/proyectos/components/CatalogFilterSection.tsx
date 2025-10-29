"use client";
import { useEffect, useState } from "react";
import type { CatalogPageModel } from "@/_domain/models/catalog/catalog-page.model";
import { ProductModel } from "@/_domain/models/catalog/product/product.model";
import type { ProductCategoryModel } from "@/_domain/models/catalog/product/product-category.model";
import {
	getAllProducts,
	getProductsByCategory,
} from "@/_domain/services/catalog/product/product.services";
import ProductCard from "@/common/components/cards/ProductCard";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";

interface Props {
	dataPage: CatalogPageModel;
	categories: ProductCategoryModel[];
}

const CatalogFilterSection = ({ dataPage, categories }: Props) => {
	const [category, setCategory] = useState("all");
	const [products, setProducts] = useState<ProductModel[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	const itemsPerPage = 9;
	const totalPages = Math.ceil(products.length / itemsPerPage);
	const currentProducts = products.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage,
	);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setPage(1);

			const rawData =
				category === "all"
					? await getAllProducts()
					: await getProductsByCategory({slug: category});

			const productData = rawData.map((item: any) => new ProductModel(item));
			setProducts(productData);
			setLoading(false);
		};

		fetchData();
	}, [category]);

	return (
		<section className="section__projects fadeInOut">
			<div className="column__2">
				<div className="col__left">
					<CustomPortableText
						hasImg={false}
						data={dataPage.products.list_block_title_products_title}
					/>
				</div>
				<div className="col__right">
					<label htmlFor="filterProyect">
						Filtrar por tipo de proyecto:{" "}
						<select
							id="filterProyect"
							name="filterProyect"
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
					<div>Cargando proyectos...</div>
				) : (
					<>
						<ul role="list" className="listado">
							{currentProducts.map((product, idx) => (
								<ProductCard key={idx ?? ""} data={product} variant="primary" />
							))}
						</ul>
						

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
					</>
				)}
			</div>
		</section>
	);
};

export default CatalogFilterSection;
