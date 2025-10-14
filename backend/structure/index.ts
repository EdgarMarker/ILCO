import {
	FaComment,
	FaDesktop,
	FaNewspaper,
	FaRegBuilding,
	FaStore,
	FaTags,
	FaUser,
} from "react-icons/fa";
import { GiTowTruck } from "react-icons/gi";
import { GrProjects } from "react-icons/gr";
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
				.title("Nosotros")
				.child(S.document().schemaType("aboutPage").documentId("aboutPage")),
			S.listItem()
				.icon(FaDesktop)
				.title(`Catálogo de ${MAGIC_TITLE}s`)
				.child(
					S.document()
						.title(`Catálogo de ${MAGIC_TITLE}s`)
						.schemaType("catalogPage")
						.documentId("catalogPage"),
				),
			S.listItem()
				.icon(FaDesktop)
				.title("Catálogo de Maquinas")
				.child(
					S.document()
						.title("Catálogo de Maquinas")
						.schemaType("catalogMachinesPage")
						.documentId("catalogMachinesPage"),
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
			S.listItem()
				.icon(FaDesktop)
				.title("Contacto")
				.child(
					S.document()
						.title("Contacto")
						.schemaType("contactPage")
						.documentId("contactPage"),
				),
			//----------------------------------------------
			S.divider(),
			//----------------------------------------------
			S.listItem()
				.icon(GrProjects)
				.title(`Lista de ${MAGIC_TITLE}s`)
				.child(
					S.documentTypeList("product")
						.title(`Lista de ${MAGIC_TITLE}s`)
						.filter('_type == "product"'),
				),
			S.listItem()
				.icon(GiTowTruck)
				.title(`Lista de Maquinas`)
				.child(
					S.documentTypeList("machine")
						.title(`Lista de Maquinas`)
						.filter('_type == "machine"'),
				),
			S.listItem()
				.icon(FaNewspaper)
				.title("Lista de Artículos")
				.child(
					S.documentTypeList("post")
						.title("Lista de Artículos")
						.filter('_type == "post"'),
				),
			S.listItem()
				.icon(FaComment)
				.title("Lista de Testimonios")
				.child(
					S.documentTypeList("testimonial")
						.title("Lista de Testimonios")
						.filter('_type == "testimonial"'),
				),
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
				.title(`Categorías de Maquinas`)
				.child(
					S.documentTypeList("machineCategory")
						.title(`Categorías de Maquinas`)
						.filter('_type == "machineCategory"'),
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
