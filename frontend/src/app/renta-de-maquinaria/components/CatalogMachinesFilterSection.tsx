"use client";
import { useEffect, useState } from "react";
import type { CatalogMachinesPageModel } from "@/_domain/models/catalog/catalogMachine-page.model";
import { MachineModel } from "@/_domain/models/catalog/machine/machine.model";
import type { MachineCategoryModel } from "@/_domain/models/catalog/machine/machine-category.model";
import {
	getAllMachines,
	getMachineByCategory,
} from "@/_domain/services/catalog/machine/machine.services";
import MachineCard from "@/common/components/cards/MachineCard";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";

interface Props {
	dataPage: CatalogMachinesPageModel;
	categories: MachineCategoryModel[];
}

const CatalogFilterSection = ({ dataPage, categories }: Props) => {
	const [category, setCategory] = useState("all");
	const [machines, setMachines] = useState<MachineModel[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	const itemsPerPage = 9;
	const totalPages = Math.ceil(machines.length / itemsPerPage);
	const currentMachines = machines.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage,
	);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setPage(1);

			const rawData =
				category === "all"
					? await getAllMachines()
					: await getMachineByCategory({slug: category});

			const machineData = rawData.map((item: any) => new MachineModel(item));
			setMachines(machineData);
			setLoading(false);
		};

		fetchData();
	}, [category]);

	return (
		<section className="section__projects">
			<div className="column__2">
				<div className="col__left">
					<CustomPortableText
						hasImg={false}
						data={dataPage.machines.list_block_title_machines_title}
					/>
				</div>
				<div className="col__right">
					<label htmlFor="filterMachines">
						Filtrar por tipo de máquina:{" "}
						<select
							id="filterMachines"
							name="filterMachines"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							disabled={loading}
						>
							<option value="all">Seleccione una opción</option>
							{categories.map((cat) => (
								<option key={cat._id} value={cat.slug.current}>
									{cat.string_line_category_name}
								</option>
							))}
						</select>
					</label>
				</div>
			</div>

			<div className="column__1">
				{loading ? (
					<div>Cargando máquinas...</div>
				) : (
					<>
						<ul role="list" className="listado">
							{currentMachines.map((machine, idx) => (
								<MachineCard key={idx ?? ""} data={machine} variant="primary" />
							))}

							{totalPages > 1 && (
								<div className="pagination">
									<button
										type="submit"
										onClick={() => setPage(page - 1)}
										disabled={page === 1}
									>
										‹
									</button>

									{Array.from({ length: totalPages }, (_, i) => i + 1).map(
										(num) => (
											<button
												type="submit"
												key={num}
												onClick={() => setPage(num)}
												className={page === num ? "active" : ""}
											>
												{num}
											</button>
										),
									)}

									<button
										type="submit"
										onClick={() => setPage(page + 1)}
										disabled={page === totalPages}
									>
										›
									</button>
								</div>
							)}
						</ul>
					</>
				)}
			</div>
		</section>
	);
};

export default CatalogFilterSection;
