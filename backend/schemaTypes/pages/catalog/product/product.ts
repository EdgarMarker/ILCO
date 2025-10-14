import { createSection } from "../../../../utils/helper-createSection";
import { HERO, image, SEO, slug, stringText } from "../../../modules/modules";

export const MAGIC_TITLE = "Proyecto";

const SECTIONS = [
	{
		group: { name: "general", title: "General" },
		fields: [
			stringText({
				type: "line",
				context: "general",
				purpose: "title",
				title: `Titulo del ${MAGIC_TITLE}`,
			}),
			slug({ value: "general.string_line_general_title" }),
			{
				name: "ref_productCategory",
				title: `Categorías del ${MAGIC_TITLE}`,
				type: "reference",
				to: [{ type: "productCategory" }],
			},
		],
	},
	{
		group: { name: "card", title: "Tarjeta" },
		fields: [
			image({
				type: "img",
				context: "card",
				purpose: "img",
				title: `Imagen de ${MAGIC_TITLE}`,
			}),
			stringText({
				type: "textarea",
				context: "card",
				purpose: "excerpt",
				title: `Descripción breve de ${MAGIC_TITLE}`,
			}),
		],
	},
];

export default {
	name: "product",
	type: "document",
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
	preview: {
		select: {
			title: "general.string_line_general_title",
			media: "card.img_card_img",
		},
	},
};
