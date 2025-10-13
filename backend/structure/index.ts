import {
	FaDesktop,
	FaNewspaper,
	FaRegBuilding,
	FaStore,
	FaTags,
	FaUser,
} from "react-icons/fa";
import type { StructureResolver } from "sanity/structure";
import { MAGIC_TITLE } from "../schemaTypes/pages/catalog/product/product";

export const structure: StructureResolver = (S) =>
	S.list()
		.title("Contenido")
		.items([
			S.listItem()
				.icon(FaDesktop)
				.title("Inicio")
				.child(S.document().schemaType("homePage").documentId("homePage")),
			S.listItem()
				.icon(FaDesktop)
				.title("Catálogo")
				.child(
					S.document()
						.title("Catálogo")
						.schemaType("catalogPage")
						.documentId("catalogPage"),
				),
			S.listItem()
				.icon(FaDesktop)
				.title("Blog")
				.child(
					S.document()
						.title("Blog")
						.schemaType("blogPage")
						.documentId("blogPage"),
				),
			//----------------------------------------------
			S.divider(),
			//----------------------------------------------
			S.listItem()
				.icon(FaStore)
				.title(`Lista de ${MAGIC_TITLE}s`)
				.child(
					S.documentTypeList("product")
						.title(`Lista de ${MAGIC_TITLE}s`)
						.filter('_type == "product"'),
				),
			S.listItem()
				.icon(FaNewspaper)
				.title("Lista de Artículos")
				.child(
					S.documentTypeList("post")
						.title("Lista de Artículos")
						.filter('_type == "post"'),
				),
			/*
			S.listItem()
				.icon(BsHouseCheck)
				.title("Lista de Testimonios")
				.child(
					S.documentTypeList("testimonial")
						.title("Lista de Testimonios")
						.filter('_type == "testimonial"'),
				),
        */
			//----------------------------------------------
			S.divider(),
			//----------------------------------------------
			S.listItem()
				.icon(FaTags)
				.title(`Categorías de ${MAGIC_TITLE}s`)
				.child(
					S.documentTypeList("productCategory")
						.title(`Categorías de ${MAGIC_TITLE}s`)
						.filter('_type == "productCategory"'),
				),
			S.listItem()
				.icon(FaTags)
				.title("Categorías de Artículos")
				.child(
					S.documentTypeList("postCategory")
						.title("Categorías de Artículos")
						.filter('_type == "postCategory"'),
				),
			S.listItem()
				.icon(FaUser)
				.title("Autores de Artículos")
				.child(
					S.documentTypeList("postAuthor")
						.title("Autores de Artículos")
						.filter('_type == "postAuthor"'),
				),
			//----------------------------------------------
			S.divider(),
			//----------------------------------------------
			S.listItem()
				.icon(FaRegBuilding)
				.title("Empresa")
				.child(
					S.document()
						.title("Empresa")
						.schemaType("company")
						.documentId("company"),
				),
		]);
