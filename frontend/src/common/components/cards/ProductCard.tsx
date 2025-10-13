import { ProductTypes } from "@/_domain/interfaces/product.types";
import React from "react";
import ResponsiveImage from "../images/ResponsiveImage";

interface Props {
  data: ProductTypes;
  variant?: "primary" | "secondary";
}

const ProductCard = ({ data, variant }: Props) => {
  return (
    <article className={`card card__product--${variant}`}>
      <header>
        {data.general.string_line_title}
        {data.general.ref_productCategory?.general.string_line_title}
      </header>
      <ResponsiveImage imageData={data.card.img_imgCard} variant="card" />
      <footer>{data.card.string_text_excerpt}</footer>
    </article>
  );
};

export default ProductCard;
