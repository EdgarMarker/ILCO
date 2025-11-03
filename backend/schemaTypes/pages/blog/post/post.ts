import { createSection } from "../../../../utils/helper-createSection";
import {
	date,
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
			date(),
			stringText({
				type: "textarea",
				context: "general",
				purpose: "cardExcerpt",
				title: `Descripción breve del artículo`,
			}),
			image({
				type: "img",
				context: "general",
				purpose: "primaryImg",
				title: `Imagen del artículo`,
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
		...SECTIONS.map(({ group }) => group),
		{
			name: "seo",
			title: "SEO",
		},
	],
	fields: [
		...SECTIONS.map(({ group, fields }) => createSection(group, fields)),
		SEO(),
	],
	preview: {
		select: {
			title: "general.string_line_general_title",
			media: "card.img_card_img",
		},
	},
};
