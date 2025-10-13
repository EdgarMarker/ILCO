import { SEO, slug, stringText } from "../../../modules/modules";

export default {
	name: "productCategory",
	type: "document",
	groups: [
		{
			name: "seo",
			title: "SEO",
		},
	],
	fields: [
		stringText({
			type: "line",
			context: "category",
			purpose: "name",
			title: "Nombre de la categoría",
			dsc: "Nombre descriptivo de la categoría",
		}),
		slug({ value: "string_line_category_name" }),
		SEO(),
	],
	preview: {
		select: {
			title: "string_line_category_name",
		},
	},
};
