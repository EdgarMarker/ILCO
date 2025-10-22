import { CatalogMachinesPageModel } from "@/_domain/models/catalog/catalogMachine-page.model";
import { MachineCategoryModel } from "@/_domain/models/catalog/machine/machine-category.model";
import { getCatalogMachinesPageData } from "@/_domain/services/catalog/catalogMachine-page.services";
import { getAllMachineCategories } from "@/_domain/services/catalog/machine/machine.services";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { createMetadata } from "@/common/utils/helper-seo";
import { serialize } from "@/common/utils/helper-serialize";
import CatalogMachinesFilterSection from "./components/CatalogMachinesFilterSection";
import "./page.css";

export const generateMetadata = async () => {
	const rawData = await getCatalogMachinesPageData();
	const data = new CatalogMachinesPageModel(rawData);
	return createMetadata(data.seo);
};

const page = async () => {
	const rawData = await getCatalogMachinesPageData();
	const rawMachineCategories = await getAllMachineCategories();

	const data = new CatalogMachinesPageModel(rawData);
	const allMachineCategories = rawMachineCategories.map(
		(category: any) => new MachineCategoryModel(category),
	);

	return (
		<main id="Machines">
			{/* HERO */}
			<section className="section__hero">
				<div className="column__2">
					<div className="col__left">
						<h1>{data.hero.string_h1}</h1>
						<CustomPortableText
							hasImg={false}
							data={data.hero.list_block_title_hero_title}
						/>
					</div>
					<div className="col__right">
						<video width="1920" height="1080" autoPlay muted preload="none" loop>
							<source src="/videos/prueba.mp4" type="video/mp4" />
							Tu navegador no soporta la etiqueta de video.
						</video>
						<ResponsiveImage
							imageData={data.hero.img_hero_png}
							variant="banner"
							className="subject"
						/>
					</div>
				</div>
			</section>

			{/** PROJECTS */}
			<CatalogMachinesFilterSection
				dataPage={serialize(data)}
				categories={serialize(allMachineCategories)}
			/>
		</main>
	);
};

export default page;
