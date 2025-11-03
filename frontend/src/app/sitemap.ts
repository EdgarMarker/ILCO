import type { MetadataRoute } from "next";
import {
	getAllPost,
	getAllPostCategories,
} from "@/_domain/services/blog/post/post.services";
import {
	getAllMachineCategories,
	getAllMachines,
} from "@/_domain/services/catalog/machine/machine.services";
import {
	getAllProductCategories,
	getAllProducts,
} from "@/_domain/services/catalog/product/product.services";

const DOMAIN_URL = "https://www.ilco.mx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	//Obtener datos dinámicos para las rutas dinámicas
	const [
		posts,
		postCategories,
		products,
		productCategories,
		machines,
		machineCategories,
	] = await Promise.all([
		getAllPost(),
		getAllPostCategories(),
		getAllProducts(),
		getAllProductCategories(),
		getAllMachines(),
		getAllMachineCategories(),
	]);

	// Rutas estáticas
	const staticRoutes = [
		{
			url: `${DOMAIN_URL}/`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${DOMAIN_URL}/nosotros`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${DOMAIN_URL}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.7,
		},
		{
			url: `${DOMAIN_URL}/proyectos`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${DOMAIN_URL}/renta-de-maquinas`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${DOMAIN_URL}/contacto`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${DOMAIN_URL}/aviso-de-privacidad`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
	];

	const postRoutes =
		posts?.map((post: any) => ({
			url: `${DOMAIN_URL}/blog/${post.general.slug.current}`,
			lastModified: post.general.date
				? new Date(post.general.date)
				: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		})) || [];

	const postCategoryRoutes =
		postCategories?.map((cat: any) => ({
			url: `${DOMAIN_URL}/blog/categoria/${cat.slug.current}`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		})) || [];

	const productRoutes =
		products?.map((product: any) => ({
			url: `${DOMAIN_URL}/proyectos/${product.general.slug.current}`,
			lastModified: product.general.date
				? new Date(product.general.date)
				: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		})) || [];

	const productCategoryRoutes =
		productCategories?.map((cat: any) => ({
			url: `${DOMAIN_URL}/proyectos/categoria/${cat.slug.current}`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		})) || [];

	const machineRoutes =
		machines?.map((machine: any) => ({
			url: `${DOMAIN_URL}/renta-de-maquinas/${machine.general.slug.current}`,
			lastModified: machine.general.date
				? new Date(machine.general.date)
				: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		})) || [];

	const machineCategoryRoutes =
		machineCategories?.map((cat: any) => ({
			url: `${DOMAIN_URL}/renta-de-maquinas/categoria/${cat.slug.current}`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5,
		})) || [];

	return [
		...staticRoutes,
		...postRoutes,
		...postCategoryRoutes,
		...productRoutes,
		...productCategoryRoutes,
		...machineRoutes,
		...machineCategoryRoutes,
	];
}
