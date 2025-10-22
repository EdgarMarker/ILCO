"use client";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useRef, useState } from "react";
import type { HomePageModel } from "@/_domain/models/home-page.model";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import "@splidejs/react-splide/css";
import RedirectButton from "@/common/components/buttons/RedirectButton";

interface Props {
	projectData: HomePageModel;
}

const HomeProjectSlider = ({ projectData }: Props) => {
	const mainSliderRef = useRef<any>(null);
	const textSliderRef = useRef<any>(null);
	const [mainMounted, setMainMounted] = useState(false);
	const [textMounted, setTextMounted] = useState(false);

	const splideOptions: any = {
		arrows: false,
		pagination: false,
		drag: true,
		autoplay: false,
	};

	const mainSliderOptions = {
		...splideOptions,
		type: "loop",
	};

	const textSliderOptions = {
		...splideOptions,
		type: "loop",
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

			<div className="slider__nav">
				<button className="slider__nav__previous" type="submit" onClick={goToPrev} aria-label="Previous slide">
					&#8249;
				</button>

				<button className="slider__nav__next" type="submit" onClick={goToNext} aria-label="Next slide">
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
						<div className="banner__text">
							<div className="banner__left">
								<h3><span>Categoría: </span>{project.general.ref_productCategory.string_line_category_name}</h3>
								<h2>{project.general.string_line_general_title}</h2>
							</div>
							<div className="banner__right">
								<p>{project.general.string_textarea_general_cardExcerpt}</p>
								<RedirectButton href={`/proyectos/${project.general.slug.current}`} type="primary">
									Ver proyecto
								</RedirectButton>
							</div>
						</div>
					</SplideSlide>
				))}
			</Splide>
		</div>
	);
};

export default HomeProjectSlider;
