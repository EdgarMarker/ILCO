import { createSection } from "../../../utils/helper-createSection";
import { HERO, image, listBlockText, SEO, stringText } from "../../modules/modules";
import { MAGIC_TITLE } from "./product/product";

const SECTIONS = [
	{
		group: { name: "products", title: `Sección de ${MAGIC_TITLE}s` },
		fields: [
			listBlockText({
				type: "title",
				context: "products",
				purpose: "title",
				title: "Título y introducción",
			}),
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
	name: "catalogPage",
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
