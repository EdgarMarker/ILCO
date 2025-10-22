"use client";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRef } from "react";
import type { AboutPageModel } from "@/_domain/models/about-page.model";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";

interface Props {
	aboutData: AboutPageModel;
}

const AboutValuesSection = ({ aboutData }: Props) => {
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
		<section className="section__values">
			<div className="column__2">
				<div className="col__left">
					<CustomPortableText
						hasImg={false}
						data={aboutData.values.list_block_title_values_title}
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
					{aboutData.values.list_values.map((item, idx) => (
						<SplideSlide key={idx ?? ""}>
							<div className="column__1">
								<div className="block__title">
									<h3>{idx + 1}<span> / </span>{aboutData.values.list_values.length}</h3>
									<h4>{item.string_line_values_title}</h4>
								</div>
								<ResponsiveImage
									imageData={item.img_values_image}
									variant="card"
								/>
								<div className="block__description">
									<p>{item.string_textarea_values_description}</p>
								</div>
							</div>
						</SplideSlide>
					))}
				</Splide>
			</div>
		</section>
	);
};

export default AboutValuesSection;
