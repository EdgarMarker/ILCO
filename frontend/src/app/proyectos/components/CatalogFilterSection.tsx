"use client";
import { useEffect, useRef, useState } from "react";
import type { CatalogPageModel } from "@/_domain/models/catalog/catalog-page.model";
import { ProductModel } from "@/_domain/models/catalog/product/product.model";
import type { ProductCategoryModel } from "@/_domain/models/catalog/product/product-category.model";
import { getAllProducts, getProductsByCategory } from "@/_domain/services/catalog/product/product.services";
import ProductCard from "@/common/components/cards/ProductCard";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
// 👇 si tienes expuesto gsap/ScrollSmoother en tu helper, impórtalo
import { gsap, ScrollSmoother } from "@/common/lib/gsap/manager.animation";

interface Props {
  dataPage: CatalogPageModel;
  categories: ProductCategoryModel[];
}

const CatalogFilterSection = ({ dataPage, categories }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);

  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // 👇 Nuevo: flag para saber si el cambio de page viene de la paginación
  const [didPaginate, setDidPaginate] = useState(false);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
        category === "all" ? await getAllProducts() : await getProductsByCategory({ slug: category });
      const productData = rawData.map((item: any) => new ProductModel(item));
      setProducts(productData);
      setLoading(false);
    };
    fetchData();
  }, [category]);

  // Solo scrollea si el cambio de page vino desde la paginación y ya terminó de cargar
  useEffect(() => {
    if (didPaginate && !loading) {
      // espera un tick para asegurar DOM actualizado
      requestAnimationFrame(() => {
        scrollToSectionTop();
        setDidPaginate(false); // reset
      });
    }
  }, [page, loading, didPaginate]);

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
    <section id="Intro" className="section__projects" ref={sectionRef}>
      {/* ... encabezado/selector ... */}

      <div className="column__2">
				<div className="col__left">
					<CustomPortableText
						hasImg={false}
						data={dataPage.products.list_block_title_products_title}
					/>
				</div>
				<div className="col__right">
					<label htmlFor="filterMachines">
						Filtrar proyectos por sector:{" "}
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
          <div>Cargando proyectos...</div>
        ) : (
          <>
            <ul role="list" className="listado">
              {currentProducts.map((product, idx) => (
                <ProductCard key={idx ?? ""} data={product} variant="primary" />
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