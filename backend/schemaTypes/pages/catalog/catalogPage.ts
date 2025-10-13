import { createSection } from "../../../utils/helper-createSection";
import { HERO, SEO, stringText } from "../../modules/modules";

const SECTIONS = [
	{
		group: { name: "intro", title: "Introducción" },
		fields: [
			stringText({
				type: "line",
				context: "intro",
				purpose: "title",
				title: "Título de introducción",
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
