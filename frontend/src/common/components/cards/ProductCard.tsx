import type { ProductModel } from "@/_domain/models/catalog/product/product.model";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";
import RedirectButton from "../buttons/RedirectButton";
import ResponsiveImage from "../images/ResponsiveImage";
import Link from "next/link";

interface Props {
	data: ProductModel;
	variant?: "primary" | "secondary";
}



const ProductCard = ({ data, variant }: Props) => {
	
	return (
		<li className={`card card__product--${variant}`}>
			<div className="card__header">
				<a href={`/proyectos/${data.general.slug.current}`}>
					<ResponsiveImage
						imageData={data.general.img_general_primaryImg}
						variant="card"
					/>
				</a>
			</div>
			<div className="card__body">
				<div>				
					<a className="card__cat" href={`/proyectos/categoria/${data.general.ref_productCategory.slug.current}`}>
						{data.general.ref_productCategory.string_line_category_name}
					</a>

					<a className="card__title" href={`/proyectos/${data.general.slug.current}`}>
						{data.general.string_line_general_title}
					</a>
					<p>{data.general.string_line_general_location}</p>
				</div>
				<RedirectButton
					href={`/proyectos/${data.general.slug.current}`}
					type="primary"
				>
					{BUTTONS_TEXT.viewProject}
				</RedirectButton>
			</div>
		</li>
	);
};

export default ProductCard;
