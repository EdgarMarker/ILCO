"use client";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRef } from "react";
import type { ProductModel } from "@/_domain/models/catalog/product/product.model";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";

interface Props {
	productData: ProductModel;
}

const ProductGallerySection = ({ productData }: Props) => {
	const splideRef = useRef<any>(null);

	const goToPrev = () => {
		splideRef.current?.splide?.go("<");
	};

	const goToNext = () => {
		splideRef.current?.splide?.go(">");
	};

	const splideOptions = {
		arrows: false,
		pagination: false,
		perPage: 1,
		gap: "1rem",
		breakpoints: {
			768: {
				perPage: 1,
			},
		},
	};
	return (
		<section className="section__gallery fadeInOut">
			<div className="column__2">
				<div className="col__left">
					<CustomPortableText
						hasImg={false}
						data={productData.page.list_block_title_page_gallery}
					/>
				</div>
				<div className="col__right">
					<div className="slider__nav">
						<button
							type="submit"
							onClick={goToPrev}
							aria-label="Previous posts"
						>
							&#8249;
						</button>

						<button type="submit" onClick={goToNext} aria-label="Next posts">
							&#8250;
						</button>
					</div>
				</div>
			</div>

			<div className="column__1">
				<Splide ref={splideRef} options={splideOptions}>
					{productData.page.list_gallery.map((img, idx) => (
						<SplideSlide key={idx ?? ""}>
							<ResponsiveImage imageData={img} variant="gallery" />
						</SplideSlide>
					))}
				</Splide>
			</div>
		</section>
	);
};

export default ProductGallerySection;
