import { createSection } from "../../../utils/helper-createSection";
import {
	HERO,
	image,
	listBlockText,
	SEO,
	stringText,
} from "../../modules/modules";

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
			image({
				type: "img",
				context: "about",
				purpose: "banner",
				title: "Imagen de la sección sobre nosotros",
			}),
		],
	},
	{
		group: { name: "philosophy", title: "Nuestra filosofía" },
		fields: [
			listBlockText({
				type: "title",
				context: "philosophy",
				purpose: "title",
				title: "Título y introducción",
			}),
			image({
				type: "img",
				context: "philosophy",
				purpose: "banner",
				title: "Imagen de la sección nuestra filosofía",
			}),
		],
	},
	{
		group: { name: "history", title: "Nuestra historia" },
		fields: [
			listBlockText({
				type: "title",
				context: "history",
				purpose: "title",
				title: "Título y introducción",
			}),
			image({
				type: "img",
				context: "history",
				purpose: "banner",
				title: "Imagen de la sección nuestra historia",
			}),
		],
	},
	{
		group: { name: "values", title: "Nuestros valores" },
		fields: [
			listBlockText({
				type: "title",
				context: "values",
				purpose: "title",
				title: "Título y introducción",
			}),
			{
				name: "list_values",
				title: "Valores",
				description: "Lista de valores de la empresa",
				type: "array",
				of: [
					{
						type: "object",
						fields: [
							stringText({
								type: "line",
								context: "values",
								purpose: "title",
							}),
							stringText({
								type: "textarea",
								context: "values",
								purpose: "description",
							}),
							image({
								type: "img",
								context: "values",
								purpose: "image",
							}),
						],
					},
				],
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
];
export default {
	name: "aboutPage",
	type: "document",
	groups: [
		{
			name: "hero",
			title: "Cabecera",
		},
		...SECTIONS.map(({ group }) => group),
		{
			name: "seo",
			title: "SEO",
		},
	],
	fields: [
		HERO(),
		...SECTIONS.map(({ group, fields }) => createSection(group, fields)),
		SEO(),
	],
	preview: {
		select: {
			title: "hero.string_h1",
		},
	},
};
