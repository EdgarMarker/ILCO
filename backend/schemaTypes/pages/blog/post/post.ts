import { createSection } from "../../../../utils/helper-createSection";
import {
	HERO,
	image,
	listBlockText,
	SEO,
	slug,
	stringText,
} from "../../../modules/modules";

const SECTIONS = [
	{
		group: { name: "general", title: "General" },
		fields: [
			stringText({
				type: "line",
				context: "general",
				purpose: "title",
				title: "Título del artículo",
			}),
			slug({ value: "general.string_line_general_title" }),
			{
				name: "ref_postCategory",
				title: "Categoría del artículo",
				type: "reference",
				to: [{ type: "postCategory" }],
			},
			{
				name: "ref_postAuthor",
				title: "Autor del artículo",
				type: "reference",
				to: [{ type: "postAuthor" }],
			},
		],
	},
	{
		group: { name: "card", title: "Tarjeta" },
		fields: [
			stringText({
				type: "textarea",
				context: "card",
				purpose: "dsc",
				title: "Descripción breve",
				dsc: "Descripción breve que aparecerá en la tarjeta del artículo",
			}),
			image({
				type: "img",
				context: "card",
				purpose: "img",
				title: "Imagen de la tarjeta",
			}),
		],
	},
	{
		group: { name: "page", title: "Página del artículo" },
		fields: [
			listBlockText({
				type: "post",
				context: "page",
				purpose: "content",
				title: "Contenido del artículo",
			}),
		],
	},
];
export default {
	name: "post",
	type: "document",
	title: "Artículos de Blog",
	groups: [
		{
			name: "hero",
			title: "Hero",
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
};
