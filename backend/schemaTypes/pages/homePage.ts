import { createSection } from "../../utils/helper-createSection";
import {
	HERO,
	image,
	listBlockText,
	number,
	SEO,
	stringText,
} from "../modules/modules";
import { MAGIC_TITLE } from "./catalog/product/product";

const SECTIONS = [
	{
		group: { name: "about", title: "Sobre nosotros" },
		fields: [
			listBlockText({
				type: "title",
				context: "about",
				purpose: "title",
				title: "Título y introducción",
			}),
			stringText({
				type: "line",
				context: "about",
				purpose: "btn",
				title: "Texto del botón (CTA)",
			}),
			image({
				type: "img",
				context: "about",
				purpose: "banner",
				title: "Imagen de la sección sobre nosotros",
			}),
		],
	},
	{
		group: { name: "experience", title: "Nuestra experiencia" },
		fields: [
			listBlockText({
				type: "title",
				context: "experience",
				purpose: "title",
				title: "Título y introducción",
			}),
			{
				name: "list_stats",
				title: "Estadísticas",
				type: "array",
				of: [
					{
						type: "object",
						fields: [
							number({
								context: "experience",
								purpose: "metric",
								title: "Número de la métrica",
							}),
							stringText({
								type: "line",
								context: "experience",
								purpose: "label",
								title: "Descripción de la métrica",
							}),
						],
					},
				],
				validation: (rule: any) =>
					rule
						.max(3)
						.error("Por diseño no se pueden agregar más de 3 estadísticas"),
			},
		],
	},
	{
		group: { name: `products`, title: `Sección de ${MAGIC_TITLE}s` },
		fields: [
			listBlockText({
				type: "title",
				context: "products",
				purpose: "title",
				title: "Título y introducción",
			}),
			stringText({
				type: "line",
				context: "products",
				purpose: "btn",
				title: "Texto del botón (CTA)",
			}),
			{
				name: `list_ref_products`,
				title: `Lista de ${MAGIC_TITLE}s`,
				type: "array",
				of: [
					{
						type: "reference",
						to: [{ type: "product" }],
					},
				],
				options: {
					layout: "grid",
				},
			},
		],
	},
	{
		group: { name: "blog", title: "Sección de blog" },
		fields: [
			listBlockText({
				type: "title",
				context: "blog",
				purpose: "title",
				title: "Título y introducción",
			}),
			{
				name: `list_ref_posts`,
				title: `Lista de artículos`,
				type: "array",
				of: [
					{
						type: "reference",
						to: [{ type: "post" }],
					},
				],
				options: {
					layout: "grid",
				},
			},
		],
	},
	{
		group: { name: "machines", title: "Sección de máquinas" },
		fields: [
			listBlockText({
				type: "title",
				context: "machines",
				purpose: "title",
				title: "Título y introducción",
			}),
			stringText({
				type: "line",
				context: "machines",
				purpose: "btn",
				title: "Texto del botón (CTA)",
			}),
			image({
				type: "img",
				context: "machines",
				purpose: "banner",
				title: "Imagen de la sección de máquinas",
			}),
		],
	},
	{
		group: { name: "testimonials", title: "Sección de testimonios" },
		fields: [
			listBlockText({
				type: "title",
				context: "testimonials",
				purpose: "title",
				title: "Título y introducción",
			}),
			{
				name: "list_ref_testimonials",
				title: "Testimonios",
				type: "array",
				of: [
					{
						type: "reference",
						to: [{ type: "testimonial" }],
					},
				],
			},
		],
	},
];

export default {
	name: "homePage",
	type: "document",
	groups: [
		{ name: "hero", title: "Cabecera" },
		...SECTIONS.map(({ group }) => group),
		{ name: "seo", title: "SEO" },
	],
	fields: [
		HERO(),
		...SECTIONS.map(({ group, fields }) => createSection(group, fields)),
		SEO(),
	],
	preview: {
		select: {
			title: "seo.string_titleSeo",
		},
	},
};
