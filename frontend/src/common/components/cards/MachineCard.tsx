import type { MachineModel } from "@/_domain/models/catalog/machine/machine.model";
import ResponsiveImage from "../images/ResponsiveImage";
import RedirectButton from "../buttons/RedirectButton";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";
import Link from "next/link";

interface Props {
	data: MachineModel;
	variant?: "primary" | "secondary";
}
const MachineCard = ({ data, variant = "primary" }: Props) => {
	return (
		<li className={`card machine__card`}>
			<div className="card__header">
				<a href={`renta-de-maquinaria/${data.general.slug.current}`}>
					<ResponsiveImage
						imageData={data.general.img_general_primaryImg}
						variant="card"
					/>
				</a>
			</div>
			<div className="card__body">
				<div className="card__description">
					<a className="card__cat" href={`renta-de-maquinaria/categoria/${data.general.ref_machineCategory.slug.current}`}>
						{data.general.ref_machineCategory.string_line_category_name}
					</a>
					<a className="card__title" href={`renta-de-maquinaria/${data.general.slug.current}`}>
						{data.general.string_line_general_title}
					</a>
				</div>
			</div>
			<RedirectButton
				href={`renta-de-maquinaria/${data.general.slug.current}`}
				type="primary"
			>
				{BUTTONS_TEXT.rentMachine}
			</RedirectButton>
		</li>
	);
};

export default MachineCard;
