import "./page.css";
import React from "react";
import { MachineModel } from "@/_domain/models/catalog/machine/machine.model";
import { getMachineByCategory } from "@/_domain/services/catalog/machine/machine.services";
import MachineCard from "@/common/components/cards/MachineCard";

const page = async ({ params }: { params: { slug: string } }) => {
	const rawData = await getMachineByCategory({ slug: params.slug });
	const data = rawData.map((item: any) => new MachineModel(item));
	return (
		<main id="CatMachines">
			<section className="section__hero">
				<div className="column__1">
					<span className="breadcrumbs">
						<a href="/renta-de-maquinaria">Renta de maquinaria</a>
						{" "}/{" "}
						Categoría /
					</span>
					<h1>{data[0].general?.ref_machineCategory?.string_line_category_name}</h1>
				</div>
			</section>
			<section className="section__content">
				<div className="column__1">
					<ul role="list" className="listado">
						{data.map((post: MachineModel, idx: number) => (
							<MachineCard key={idx ?? ""} data={post} />
						))}
					</ul>
				</div>
			</section>
		</main>
	);
};

export default page;
