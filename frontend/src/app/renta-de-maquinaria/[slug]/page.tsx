import React from "react";
import { MachineModel } from "@/_domain/models/catalog/machine/machine.model";
import { getMachineData } from "@/_domain/services/catalog/machine/machine.services";
import ScrollButton from "@/common/components/buttons/ScrollButton";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { createMetadata } from "@/common/utils/helper-seo";
import { serialize } from "@/common/utils/helper-serialize";
import MachineGallerySlider from "../components/MachineGallerySlider";
import "./page.css";
import Link from "next/link";
import PreFooter from "@/common/components/footer/PreFooter";

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
		<main id="MachineDetail">
			{/* HERO */}
			<section className="section__hero fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<span className="breadcrumbs">
							<Link href="/renta-de-maquinaria">Renta de maquinaria</Link>
							{" "}/{" "}
							<Link
								href={`/renta-de-maquinaria/categoria/${data.general.ref_machineCategory.slug.current}`}
							>
								{data.general.ref_machineCategory.string_line_category_name}
							</Link>
						</span>
						<h1>{data.general.string_line_general_title}</h1>
						<div className="btn__wrapper">
							<ScrollButton type="secondary" scrollTo="#intro">
								Solicitar Cotización
							</ScrollButton>
							<a className="btn" href={data.general.file_general_brochure} target="_blank">
								Descargar ficha técnica
							</a>
						</div>
						
					</div>

					<div className="col__right">
						<MachineGallerySlider machineData={serialize(data)} />
					</div>
				</div>
			</section>

			{/* INTRO */}
			<section className="section__intro fadeInOut">
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
			<section className="section__expects fadeInOut">
				<div className="column__1">
					<CustomPortableText
						hasImg={false}
						data={data.page.list_block_title_page_specifications}
					/>
					<ul role="list" className="listado">
						{data.page.list_obj_specifications.map((spec, idx) => (
							<li key={idx ?? ""}>
								<strong>{spec.string_line_specification_title}</strong>
								<span>{spec.string_line_specification_value}</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* DIVIDER IMAGE */}
			<section className="section__divider fadeInOut">
				<div className="column__1">
					<ResponsiveImage
						imageData={data.page.img_page_divider}
						variant="banner"
					/>
				</div>
			</section>
			<PreFooter />

		</main>
	);
};

export default page;
