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
import PreFooter from "@/common/components/footer/PreFooter";
import CatalogMachinesHeroSection from "./components/CatalogMachinesHeroSection";

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
			<CatalogMachinesHeroSection data={serialize(data)} />

			{/** PROJECTS */}
			<CatalogMachinesFilterSection
				dataPage={serialize(data)}
				categories={serialize(allMachineCategories)}
			/>
			<PreFooter />
		</main>
	);
};

export default page;
