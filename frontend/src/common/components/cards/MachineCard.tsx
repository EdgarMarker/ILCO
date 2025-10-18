import type { MachineModel } from "@/_domain/models/catalog/machine/machine.model";
import ResponsiveImage from "../images/ResponsiveImage";
import RedirectButton from "../buttons/RedirectButton";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";

interface Props {
	data: MachineModel;
	variant?: "primary" | "secondary";
}
const MachineCard = ({ data, variant = "primary" }: Props) => {
	return (
		<article>
			<header>
				<ResponsiveImage
					imageData={data.general.img_general_primaryImg}
					variant="card"
				/>
			</header>
			<p>{data.general.ref_productCategory.string_line_category_name}</p>
			<h4>{data.general.string_line_general_title}</h4>
			<footer>
				<RedirectButton
					href={`renta-de-maquinaria/${data.general.slug.current}`}
					type="primary"
				>
					{BUTTONS_TEXT.rentMachine}
				</RedirectButton>
			</footer>
		</article>
	);
};

export default MachineCard;
