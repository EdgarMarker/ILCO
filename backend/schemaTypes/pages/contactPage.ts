import { HERO, SEO } from "../modules/modules";

export default {
	name: "contactPage",
	type: "document",
	groups: [
		{ name: "hero", title: "Cabecera" },
		{ name: "seo", title: "SEO" },
	],
	fields: [HERO(), SEO()],
	preview: {
		select: {
			title: "seo.string_titleSeo",
		},
	},
};
