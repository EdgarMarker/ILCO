import { createSection } from "../../../../utils/helper-createSection";
import {
	bool,
	image,
	listBlockText,
	SEO,
	slug,
	stringText,
} from "../../../modules/modules";

const MAGIC_TITLE = "Máquina";

const SECTIONS = [
	{
		group: { name: "general", title: "General" },
		fields: [
			stringText({
				type: "line",
				context: "general",
				purpose: "title",
				title: `Titulo de la ${MAGIC_TITLE}`,
			}),
			slug({ value: "general.string_line_general_title" }),
			{
				name: "ref_machineCategory",
				title: `Categorías de la ${MAGIC_TITLE}`,
				type: "reference",
				to: [{ type: "machineCategory" }],
			},
			{
				name: "file_general_brochure",
				title: `Folleto de la ${MAGIC_TITLE}`,
				type: "file",
				accept: ".pdf",
				description: "Archivo PDF",
			},
			listBlockText({
				type: "title",
				context: "general",
				purpose: "title",
				title: `Titulo de la descripción "Completa" de la ${MAGIC_TITLE}`,
			}),
			stringText({
				type: "textarea",
				context: "general",
				purpose: "fullDsc",
				title: `Descripción "Completa" de la ${MAGIC_TITLE}`,
			}),
			image({
				type: "img",
				context: "general",
				purpose: "primaryImg",
				title: `Imagen de la ${MAGIC_TITLE}`,
			}),
		],
	},
	{
		group: { name: "page", title: "Página de detalle" },
		fields: [
			{
				name: "list_img",
				title: `Imágenes de la galería de la ${MAGIC_TITLE}`,
				type: "array",
				of: [
					image({
						type: "img",
						context: "page",
						purpose: "gallery",
						title: `Imagen de la galería`,
					}),
				],
				options: {
					layout: "grid",
				}
			},
			listBlockText({
				type: "title",
				context: "page",
				purpose: "specifications",
				title: `Titulo de la sección de especificaciones de la ${MAGIC_TITLE}`,
			}),
			{
				name: "list_obj_specifications",
				title: `Especificaciones de la ${MAGIC_TITLE}`,
				type: "array",
				of: [
					{
						type: "object",
						fields: [
							stringText({
								type: "line",
								context: "specification",
								purpose: "title",
								title: "Título/descripción de la especificación",
							}),
							stringText({
								type: "line",
								context: "specification",
								purpose: "value",
								title: "Valor de la especificación",
							}),
						],
					},
				],
			},
			image({
				type: "img",
				context: "page",
				purpose: "divider",
				title: `Imagen/divisor de sección`,
			}),
		],
	},
];

export default {
	name: "machine",
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
		select: {
			title: "general.string_line_general_title",
			media: "card.img_card_img",
		},
	},
};
