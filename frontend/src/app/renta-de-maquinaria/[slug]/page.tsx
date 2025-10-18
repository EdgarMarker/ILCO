import React from "react";
import { MachineModel } from "@/_domain/models/catalog/machine/machine.model";
import { getMachineData } from "@/_domain/services/catalog/machine/machine.services";
import ScrollButton from "@/common/components/buttons/ScrollButton";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { createMetadata } from "@/common/utils/helper-seo";
import { serialize } from "@/common/utils/helper-serialize";
import MachineGallerySlider from "../components/MachineGallerySlider";

interface Props {
	params: {
		slug: string;
	};
}

export const generateMetadata = async ({ params }: Props) => {
	const rawData = await getMachineData({ slug: params.slug });
	const data = new MachineModel(rawData);
	return createMetadata(data.seo);
};

const page = async ({ params }: Props) => {
	const rawData = await getMachineData({ slug: params.slug });
	const data = new MachineModel(rawData);

	return (
		<>
			{/* HERO */}
			<section className="section__hero">
				<div className="column__2">
					<div className="col__left">
						<div className="scrub">
							<span>
								<a href="/proyectos">RENTA DE MAQUINARIA</a>
							</span>
							/
							<span>
								<a
									href={`/renta-de-maquinaria/${data.general.ref_machineCategory.slug.current}`}
								>
									{data.general.ref_machineCategory.string_line_category_name}
								</a>
							</span>
						</div>
						<h1>{data.general.string_line_general_title}</h1>
						<ScrollButton type="secondary" scrollTo="#intro">
							Solicitar Cotización
						</ScrollButton>
						<a href={data.general.file_general_brochure}>
							Descargar Folleto (PDF)
						</a>
					</div>

					<div className="col__right">
						<MachineGallerySlider machineData={serialize(data)} />
					</div>
				</div>
			</section>

			{/* INTRO */}
			<section className="section__intro">
				<div className="column__2">
					<div className="col__left">
						<CustomPortableText
							hasImg={false}
							data={data.general.list_block_title_general_title}
						/>
					</div>
					<div className="col__right">
						<p>{data.general.string_textarea_general_fullDsc}</p>
					</div>
				</div>
			</section>

			{/* EXPECTS */}
			<section className="section__expects">
				<div className="column__1">
					<CustomPortableText
						hasImg={false}
						data={data.page.list_block_title_page_specifications}
					/>
				</div>

				<ul>
					{data.page.list_obj_specifications.map((spec, idx) => (
						<li key={idx ?? ""}>
							<strong>{spec.string_line_specification_title}</strong>
							<span>{spec.string_line_specification_value}</span>
						</li>
					))}
				</ul>
			</section>

			{/* DIVIDER IMAGE */}
			<section className="section__divider">
				<div className="column__1">
					<ResponsiveImage
						imageData={data.page.img_page_divider}
						variant="banner"
					/>
				</div>
			</section>


		</>
	);
};

export default page;
