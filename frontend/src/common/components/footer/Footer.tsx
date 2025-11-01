import ResponsiveImage from "../images/ResponsiveImage";
import { getCompanyData } from "@/_domain/services/company.services";
import { CompanyModel } from "@/_domain/models/company.model";

import { ProductCategoryModel } from "@/_domain/models/catalog/product/product-category.model";
import { getAllProductCategories } from "@/_domain/services/catalog/product/product.services";

import { MachineCategoryModel } from "@/_domain/models/catalog/machine/machine-category.model";
import { getAllMachineCategories } from "@/_domain/services/catalog/machine/machine.services";









import Link from "next/link";
import { NAV_ITEMS } from "@/common/utils/constants-nav";



export default async function Footer() {
	const rawData = await getCompanyData();
	const data= new CompanyModel(rawData);

    const rawAllCategory = await getAllProductCategories();
    const allCategory = rawAllCategory.map(
        (cat: any) => new ProductCategoryModel(cat),
    );

    const rawAllMachineCategory = await getAllMachineCategories();
    const allMachineCategory = rawAllMachineCategory.map(
        (catM: any) => new MachineCategoryModel(catM),
    );

	return (
		<footer>
			<div className="column__2">
                <div className="col__left">
                    <div className="foot__item">
                        <h3>Mapa del sitio</h3>
                        <ul role="list">
                            {NAV_ITEMS.map((item) => {
                                return (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="foot__item">
                        <h3>Proyectos por sector</h3>
                        <ul role="list">
                            <li>
                                <a href={"/proyectos"}>Todos los proyectos</a>
                            </li>
                            {allCategory.map((category: ProductCategoryModel) => (
                                <li key={category._id ?? category.slug.current}>
                                    <a href={`/proyectos/categoria/${category.slug.current}`}>
                                        {category.string_line_category_name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="foot__item">
                        <h3>Maquinaria por tipo</h3>
                        <ul role="list">
                            <li>
                                <a href="/renta-de-maquinaria">Todas las máquinas</a>
                            </li>

                            {allMachineCategory.map((category: MachineCategoryModel) => (
                                <li key={category._id ?? category.slug.current}>
                                <a href={`/renta-de-maquinaria/categoria/${category.slug.current}`}>
                                    {category.string_line_category_name}
                                </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="foot__item">
                        <h3>Síguenos en</h3>
                        <ul role="list">
                            {data.social.arr_list.map((item, index) => (
                                <li key={index ?? ""}>
                                    <a href={item.url_social_url} target="_blank">{item.string_line_social_name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col__right">
                    <a href={"/"}>
                        <ResponsiveImage
                            imageData={data.general.icon_general_footerLogo}
                            variant="icon"
                        />
                    </a>
                </div>
			</div>

			<div className="column__1">
				<span>
					ILCO Constructores ® Todos los derechos reservados.{" "}
					<a href="/aviso-de-privacidad">Aviso de Privacidad</a>. Sitio
					web creado por{" "}
					<a
						href="https://marker.com.mx"
						target="_blank"
						rel="noopener noreferrer"
					>
						Marker Branding
					</a>
				</span>
			</div>
		</footer>
	);
}
