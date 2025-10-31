"use client";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRef } from "react";
import type { MachineModel } from "@/_domain/models/catalog/machine/machine.model";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";

interface Props {
	machineData: MachineModel;
}

const MachineGallerySlider = ({ machineData }: Props) => {
	const splideRef = useRef<any>(null);

	const splideOptions = {
		arrows: true,
		pagination: true,
		perPage: 1,
		gap: "1rem",
		breakpoints: {
			768: {
				perPage: 1,
			},
		},
	};

	

	return (
		<div>
			{/* Botones de navegación */}
			

			<Splide ref={splideRef} options={splideOptions}>
				{machineData.page.list_img.map((image, index) => (
					<SplideSlide key={index ?? ""}>
						<ResponsiveImage imageData={image} variant="gallery" dataSpeed="clamp(0.8)" />
					</SplideSlide>
				))}
			</Splide>
		</div>
	);
};

export default MachineGallerySlider;
