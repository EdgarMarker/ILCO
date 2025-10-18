import type { ProductModel } from "@/_domain/models/catalog/product/product.model";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";
import RedirectButton from "../buttons/RedirectButton";
import ResponsiveImage from "../images/ResponsiveImage";

interface Props {
	data: ProductModel;
	variant?: "primary" | "secondary";
}

const ProductCard = ({ data, variant }: Props) => {
	return (
		<article className={`card card__product--${variant}`}>
			<header>
				<ResponsiveImage
					imageData={data.general.img_general_primaryImg}
					variant="card"
				/>
			</header>

			<p>{data.general.ref_productCategory.string_line_category_name}</p>
			<h4>{data.general.string_line_general_title}</h4>

			<footer>
				<p>{data.general.string_line_general_location}</p>
				<RedirectButton
					href={`/proyectos/${data.general.slug.current}`}
					type="primary"
				>
					{BUTTONS_TEXT.viewProject}
				</RedirectButton>
			</footer>
		</article>
	);
};

export default ProductCard;
