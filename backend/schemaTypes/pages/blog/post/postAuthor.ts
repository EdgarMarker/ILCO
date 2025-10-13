import { stringText } from "../../../modules/modules";

export default {
	name: "postAuthor",
	type: "document",
	title: "Autores de Artículos",
	fields: [
		stringText({
			type: "line",
			context: "author",
			purpose: "name",
			title: "Nombre del autor",
			dsc: "Nombre completo del autor",
		}),
		stringText({
			type: "line",
			context: "author",
			purpose: "position",
			title: "Puesto del autor",
			dsc: "Puesto o rol del autor",
		}),
		stringText({
			type: "textarea",
			context: "author",
			purpose: "bio",
			title: "Biografía del autor",
			dsc: "Breve biografía del autor",
		}),
	],
	preview: {
		select: {
			title: "string_text_line_primary",
		},
	},
};
