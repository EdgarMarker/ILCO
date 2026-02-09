"use client";
import { useEffect, useRef, useState } from "react";
import type { CatalogPageModel } from "@/_domain/models/catalog/catalog-page.model";
import { ProductModel } from "@/_domain/models/catalog/product/product.model";
import type { ProductCategoryModel } from "@/_domain/models/catalog/product/product-category.model";
import { getAllProducts, getProductsByCategory } from "@/_domain/services/catalog/product/product.services";
import ProductCard from "@/common/components/cards/ProductCard";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
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
  const [didPaginate, setDidPaginate] = useState(false);
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<ProductCategoryModel[]>([]);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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

  // Carga inicial: obtén todos los productos y filtra categorías
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const allProducts = await getAllProducts();
        const productData = allProducts.map((item: any) => new ProductModel(item));

        // Obtén los IDs de categorías que tienen al menos un producto
        const categoryIdsWithProducts = new Set(
          productData
            .map((p: { general: { ref_productCategory: { _id: any; }; }; }) => p.general?.ref_productCategory?._id)
            .filter(Boolean)
        );

        // Filtra solo las categorías que tienen productos
        const filtered = categories.filter((cat) =>
          categoryIdsWithProducts.has(cat._id)
        );

        setCategoriesWithProducts(filtered);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setCategoriesWithProducts(categories);
      }
    };

    fetchInitialData();
  }, [categories]);

  // Carga de productos al cambiar categoría
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPage(1);
      setDidPaginate(false);
      const rawData =
        category === "all" ? await getAllProducts() : await getProductsByCategory({ slug: category });
      const productData = rawData.map((item: any) => new ProductModel(item));
      setProducts(productData);
      setLoading(false);
    };
    fetchData();
  }, [category]);

  // Scroll en paginación
  useEffect(() => {
    if (didPaginate && !loading) {
      requestAnimationFrame(() => {
        scrollToSectionTop();
        setDidPaginate(false);
      });
    }
  }, [page, loading, didPaginate]);

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
    <section id="Intro" className="section__projects" ref={sectionRef}>
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
              {categoriesWithProducts.map((cat) => (
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