import { createSection } from "../../../utils/helper-createSection";
import { listBlockText, SEO } from "../../modules/modules";

const SECTIONS = [
	{
		group: { name: "featured", title: "Articulo Destacado" },
		fields: [
			{
				name: "ref_post",
				title: "Artículo Destacado",
				type: "reference",
				to: [{ type: "post" }],
			},
		],
	},
	{
		group: { name: "post", title: "Artículos" },
		fields: [
			listBlockText({
				type: "title",
				context: "blogPage",
				purpose: "title",
			}),
		],
	},
];
export default {
	name: "blogPage",
	type: "document",
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
		prepare() {
			return {
				title: "Blog",
			};
		},
	},
};
