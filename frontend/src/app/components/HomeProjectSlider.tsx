"use client";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useRef, useState } from "react";
import type { HomePageModel } from "@/_domain/models/home-page.model";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import "@splidejs/react-splide/css";

interface Props {
	projectData: HomePageModel;
}

const HomeProjectSlider = ({ projectData }: Props) => {
	const mainSliderRef = useRef<any>(null);
	const textSliderRef = useRef<any>(null);
	const [mainMounted, setMainMounted] = useState(false);
	const [textMounted, setTextMounted] = useState(false);

	const splideOptions: any = {
		type: "loop",
		arrows: false,
		pagination: false,
		drag: false,
		autoplay: false,
	};

	const mainSliderOptions = {
		...splideOptions,
	};

	const textSliderOptions = {
		...splideOptions,
	};

	const goToPrev = () => {
		mainSliderRef.current?.splide?.go("<");
	};

	const goToNext = () => {
		mainSliderRef.current?.splide?.go(">");
	};

	useEffect(() => {
		if (mainMounted && textMounted) {
			const mainSplide = mainSliderRef.current?.splide;
			const textSplide = textSliderRef.current?.splide;

			if (mainSplide && textSplide) {
				mainSplide.sync(textSplide);
			}
		}
	}, [mainMounted, textMounted]);

	return (
		<div>
			<Splide
				ref={mainSliderRef}
				options={mainSliderOptions}
				onMounted={() => setMainMounted(true)}
			>
				{projectData.products.list_ref_products.map((project, index) => (
					<SplideSlide key={index ?? ""}>
						<ResponsiveImage
							imageData={project.general.img_general_primaryImg}
							variant="banner"
						/>
					</SplideSlide>
				))}
			</Splide>

			<div className="slider-nav">
				<button type="submit" onClick={goToPrev} aria-label="Previous slide">
					&#8249;
				</button>

				<button type="submit" onClick={goToNext} aria-label="Next slide">
					&#8250;
				</button>
			</div>

			<Splide
				ref={textSliderRef}
				options={textSliderOptions}
				onMounted={() => setTextMounted(true)}
			>
				{projectData.products.list_ref_products.map((project, index) => (
					<SplideSlide key={index ?? ""}>
						<p>{project.general.string_textarea_general_cardExcerpt}</p>
					</SplideSlide>
				))}
			</Splide>
		</div>
	);
};

export default HomeProjectSlider;
