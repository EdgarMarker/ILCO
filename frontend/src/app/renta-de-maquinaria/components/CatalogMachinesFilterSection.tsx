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

	// 👇 Nuevo: flag para saber si el cambio de page viene de la paginación
  	const [didPaginate, setDidPaginate] = useState(false);

	const itemsPerPage = 9;
	const totalPages = Math.ceil(machines.length / itemsPerPage);
	const currentMachines = machines.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage,
	);

	// Scroll helper (con Smoother si existe, si no nativo)
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

  // Carga inicial / cambio de categoría
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPage(1);          // reset de página al cambiar categoría
      setDidPaginate(false); // 👈 NO queremos scrollear por esto
      const rawData =
        category === "all" ? await getAllMachines() : await getMachineByCategory({ slug: category });
      const productData = rawData.map((item: any) => new MachineModel(item));
      setMachines(productData);
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
          // re-calcula alturas internas de smoother y luego scrollea
          smoother.refresh(true);
          // usa un micro delay para no competir con el repaint
          gsap.delayedCall(0, () => smoother.scrollTo(el, true));
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        setDidPaginate(false);
      });
    });
    return () => {
      cancelAnimationFrame(id1);
      // id2 puede no existir si se desmonta antes
    };
  }
}, [didPaginate, loading, page]);

  // Handlers de paginación que activan el flag
  const goToPage = (num: number) => {
  if (num === page) return;   // 👈 evita falso positivo
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
						</ul>
						{totalPages > 1 && (
							<div className="pagination">
								

								<button type="button" onClick={goPrev} disabled={page === 1}>‹</button>

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

								<button type="button" onClick={goNext} disabled={page === totalPages}>›</button>
								
							</div>
						)}
					</>
				)}
			</div>
		</section>
	);
};

export default CatalogFilterSection;
