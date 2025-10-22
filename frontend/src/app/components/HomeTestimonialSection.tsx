"use client";
// @ts-expect-error
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRef } from "react";
import type { HomePageModel } from "@/_domain/models/home-page.model";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";

interface Props {
	testyData: HomePageModel;
}

const HomeTestimonialSection = ({ testyData }: Props) => {
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
		perPage: 3,
		gap: "5%",
		padding: "5%",
		breakpoints: {
			1024: {
				perPage: 2,
			},
			768: {
				perPage: 1,
			},
		},
	};

	return (
		<section className="section__testimonios">
			<div className="column__2">
				<div className="col__left">
					<CustomPortableText
						hasImg={false}
						data={testyData.testimonials.list_block_title_testimonials_title}
					/>
				</div>
				<div className="col__right">
					<div className="slider__nav">
						<button
							type="submit"
							onClick={goToPrev}
							aria-label="Previous testimonials"
						>
							&#8249;
						</button>

						<button
							type="submit"
							onClick={goToNext}
							aria-label="Next testimonials"
						>
							&#8250;
						</button>
					</div>
				</div>
			</div>
			<div className="column__1">
				<Splide ref={splideRef} options={splideOptions}>
					{testyData.testimonials.list_ref_testimonials.map((testy, idx) => (
						<SplideSlide key={idx ?? ""}>
							<div className="testimonial__content">
								<div className="testimonial__header">
									<CustomPortableText
										hasImg={false}
										data={testy.list_block_info_testimonial_content}
									/>
								</div>
								<div className="testimonial__body">
										<h3>{testy.string_line_testimonial_authorName}</h3>
										<span>{testy.string_line_testimonial_authorLocation}</span>
								</div>
							</div>
						</SplideSlide>
					))}
				</Splide>
			</div>
		</section>
	);
};

export default HomeTestimonialSection;
