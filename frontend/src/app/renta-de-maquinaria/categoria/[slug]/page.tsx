import "./page.css";
import React from "react";
import { MachineModel } from "@/_domain/models/catalog/machine/machine.model";
import { getMachineByCategory } from "@/_domain/services/catalog/machine/machine.services";
import MachineCard from "@/common/components/cards/MachineCard";

const page = async ({ params }: { params: { slug: string } }) => {
	const rawData = await getMachineByCategory({ slug: params.slug });
	const data = rawData.map((item: any) => new MachineModel(item));
	return (
		<>
			<section className="section__hero fadeInOut">
				<div className="column__1">
					<h1>{params.slug.toUpperCase()}</h1>
				</div>
			</section>
			<section className="section__content fadeInOut">
				<div className="listado">
					<div className="column__1">
						{data.map((post: MachineModel, idx: number) => (
							<MachineCard key={idx ?? ""} data={post} />
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default page;
