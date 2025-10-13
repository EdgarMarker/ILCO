import { createSection } from "../../utils/helper-createSection";
import { HERO, SEO, stringText } from "../modules/modules";

const SECTIONS = [
	{
		group: { name: "gallery", title: "Galería" },
		fields: [
			stringText({
				type: "line",
				context: "gallery",
				purpose: "title",
				title: "Título de galería",
			}),
		],
	},
];

export default {
	name: "homePage",
	type: "document",
	groups: [
		{ name: "hero", title: "Hero" },
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
