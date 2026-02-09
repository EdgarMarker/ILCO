"use client";
import { useEffect, useRef, useState } from "react";
import type { CatalogMachinesPageModel } from "@/_domain/models/catalog/catalogMachine-page.model";
import { MachineModel } from "@/_domain/models/catalog/machine/machine.model";
import type { MachineCategoryModel } from "@/_domain/models/catalog/machine/machine-category.model";
import {
	getAllMachines,
	getMachineByCategory,
} from "@/_domain/services/catalog/machine/machine.services";
import MachineCard from "@/common/components/cards/MachineCard";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { ScrollSmoother } from "@/common/lib/gsap/manager.animation";
import gsap from "gsap";

interface Props {
	dataPage: CatalogMachinesPageModel;
	categories: MachineCategoryModel[];
}

const CatalogFilterSection = ({ dataPage, categories }: Props) => {
	const sectionRef = useRef<HTMLElement>(null);

	const [category, setCategory] = useState("all");
	const [machines, setMachines] = useState<MachineModel[]>([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [didPaginate, setDidPaginate] = useState(false);
	const [categoriesWithMachines, setCategoriesWithMachines] = useState<MachineCategoryModel[]>([]);

	const itemsPerPage = 9;
	const totalPages = Math.ceil(machines.length / itemsPerPage);
	const currentMachines = machines.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage,
	);

	// Scroll helper
	const scrollToSectionTop = () => {
		const el = sectionRef.current;
		if (!el) return;

		const smoother = ScrollSmoother?.get ? ScrollSmoother.get() : null;
		if (smoother) {
			smoother.scrollTo(el, true);
		} else {
			el.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	// Carga inicial: obtén todas las máquinas y filtra categorías
	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				const allMachines = await getAllMachines();
				const machineData = allMachines.map((item: any) => new MachineModel(item));

				// Obtén los IDs de categorías que tienen al menos una máquina
				const categoryIdsWithMachines = new Set(
					machineData
						.map((m: { general: { ref_machineCategory: { _id: any; }; }; }) => m.general?.ref_machineCategory?._id)
						.filter(Boolean)
				);

				// Filtra solo las categorías que tienen máquinas
				const filtered = categories.filter((cat) =>
					categoryIdsWithMachines.has(cat._id)
				);

				setCategoriesWithMachines(filtered);
			} catch (error) {
				console.error("Error fetching initial data:", error);
				setCategoriesWithMachines(categories);
			}
		};

		fetchInitialData();
	}, [categories]);

	// Carga de máquinas al cambiar categoría
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setPage(1);
			setDidPaginate(false);
			const rawData =
				category === "all" ? await getAllMachines() : await getMachineByCategory({ slug: category });
			const machineData = rawData.map((item: any) => new MachineModel(item));
			setMachines(machineData);
			setLoading(false);
		};
		fetchData();
	}, [category]);

	// Solo scrollea si el cambio de page vino desde la paginación y ya terminó de cargar
	useEffect(() => {
		if (didPaginate && !loading) {
			const id1 = requestAnimationFrame(() => {
				const id2 = requestAnimationFrame(() => {
					const el = sectionRef.current;
					if (!el) return;

					const smoother = ScrollSmoother?.get ? ScrollSmoother.get() : null;

					if (smoother) {
						smoother.refresh(true);
						gsap.delayedCall(0, () => smoother.scrollTo(el, true));
					} else {
						el.scrollIntoView({ behavior: "smooth", block: "start" });
					}

					setDidPaginate(false);
				});
			});
			return () => {
				cancelAnimationFrame(id1);
			};
		}
	}, [didPaginate, loading, page]);

	// Handlers de paginación que activan el flag
	const goToPage = (num: number) => {
		if (num === page) return;
		setDidPaginate(true);
		setPage(num);
	};

	const goPrev = () => {
		setDidPaginate(true);
		setPage((p) => Math.max(1, p - 1));
	};

	const goNext = () => {
		setDidPaginate(true);
		setPage((p) => Math.min(totalPages, p + 1));
	};

	return (
		<section className="section__projects" ref={sectionRef}>
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
							{categoriesWithMachines.map((cat) => (
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
						</ul>
						{totalPages > 1 && (
							<div className="pagination">
								<button type="button" onClick={goPrev} disabled={page === 1}>
									‹
								</button>

								{Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
									<button
										type="button"
										key={num}
										onClick={() => goToPage(num)}
										className={page === num ? "active" : ""}
									>
										{num}
									</button>
								))}

								<button type="button" onClick={goNext} disabled={page === totalPages}>
									›
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</section>
	);
};

export default CatalogFilterSection;
