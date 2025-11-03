import { createSection } from "../../../../utils/helper-createSection";
import {
	bool,
	date,
	image,
	listBlockText,
	SEO,
	slug,
	stringText,
} from "../../../modules/modules";

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
			date(),
			stringText({
				type: "line",
				context: "general",
				purpose: "location",
				title: `Ubicación del ${MAGIC_TITLE}`,
			}),
			stringText({
				type: "textarea",
				context: "general",
				purpose: "cardExcerpt",
				title: `Descripción breve de ${MAGIC_TITLE}`,
			}),
			listBlockText({
				type: "title",
				context: "general",
				purpose: "description",
				title: `Descripción "Completa" de ${MAGIC_TITLE}`,
			}),
			image({
				type: "img",
				context: "general",
				purpose: "primaryImg",
				title: `Imagen de ${MAGIC_TITLE}`,
			}),
		],
	},
	{
		group: { name: "page", title: "Página de detalle" },
		fields: [
			image({
				type: "img",
				context: "page",
				purpose: "intro",
				title: "Sección de introducción",
				dsc: `Imagen de introducción`,
			}),
			listBlockText({
				type: "title",
				context: "page",
				purpose: "solution",
				title: "Sección de solución",
				dsc: `Título y introducción`,
			}),
			listBlockText({
				type: "post",
				context: "page",
				purpose: "solution",
				title: "Sección de solución",
				dsc: `Información detallada con imagen`,
			}),
			image({
				type: "img",
				context: "page",
				purpose: "divider",
				title: "Divisor",
				dsc: `Imagen divisora de secciones`,
			}),
			listBlockText({
				type: "title",
				context: "page",
				purpose: "result",
				title: "Sección de resultados",
				dsc: `Título e introducción`,
			}),
			stringText({
				type: "textarea",
				context: "page",
				purpose: "result",
				title: "Sección de resultados",
				dsc: `Descripción detallada de resultados`,
			}),
			bool({
				context: "page",
				purpose: "result",
				title: "¿Tiene video de resultados?",
			}),
			{
				name: "page_video_result_media",
				title: "Video de resultados",
				type: "url",
				hidden: ({ document }: { document: any }) =>
					!document?.page?.bool_page_result,
				description:
					"Se muestra cuando se selecciona 'Sí' en '¿Tiene video de resultados?'",
			},
			{
				...image({
					type: "img",
					context: "page",
					purpose: "resultImage",
					title: "Imagen de resultados",
					dsc: "Se muestra cuando se selecciona 'No' en '¿Tiene video de resultados?'",
				}),
				hidden: ({ document }: { document: any }) =>
					document?.page?.bool_page_result === true,
			},
			listBlockText({
				type: "title",
				context: "page",
				purpose: "gallery",
				title: "Sección de galería",
				dsc: `Título e introducción`,
			}),
			{
				name: "list_gallery",
				title: "Sección de galería",
				description: "Galería de imágenes",
				type: "array",
				of: [
					image({
						type: "img",
						context: "page",
						purpose: "gallery",
						title: "Imagen de la galería",
					}),
				],
				options: {
					layout: "grid",
				},
			},
		],
	},
];

export default {
	name: "product",
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
