import { CatalogPageModel } from "@/_domain/models/catalog/catalog-page.model";
import { ProductCategoryModel } from "@/_domain/models/catalog/product/product-category.model";
import { getCatalogPageData } from "@/_domain/services/catalog/catalog-page.services";
import { getAllProductCategories} from "@/_domain/services/catalog/product/product.services";
import RedirectButton from "@/common/components/buttons/RedirectButton";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { createMetadata } from "@/common/utils/helper-seo";
import { serialize } from "@/common/utils/helper-serialize";
import CatalogFilterSection from "./components/CatalogFilterSection";
import "./page.css";
import PreFooter from "@/common/components/footer/PreFooter";
import CatalogHeroSection from "./components/CatalogHeroSection";

export const generateMetadata = async () => {
	const rawData = await getCatalogPageData();
	const data = new CatalogPageModel(rawData);
	return createMetadata(data.seo);
};

const page = async () => {
	const rawData = await getCatalogPageData();
	const rawProductCategories = await getAllProductCategories();

	const data = new CatalogPageModel(rawData);
	const allProductCategories = rawProductCategories.map(
		(category: any) => new ProductCategoryModel(category),
	);

	return (
		<main id="Projects">
			{/* HERO */}
			<CatalogHeroSection data={serialize(data)} />

			{/** PROJECTS */}
			<CatalogFilterSection
				dataPage={serialize(data)}
				categories={serialize(allProductCategories)}
				
			/>

			{/** MACHINES */}
			<section className="section__machines">
				<div className="column__2">
					<div className="col__left">
						<div className="portable__wrapper">
							<CustomPortableText
								hasImg={false}
								data={data.machines.list_block_title_machines_title}
							/>
							<RedirectButton href="/contacto" type="primary">
								{data.machines.string_line_machines_btn}
							</RedirectButton>
						</div>
					</div>
					<div className="col__right">
						<ResponsiveImage
							imageData={data.machines.img_machines_banner}
							variant="banner"
						/>
					</div>
				</div>
			</section>
			<PreFooter />
		</main>
	);
};

export default page;
