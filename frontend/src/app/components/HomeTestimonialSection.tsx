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
interface StarRatingProps {
	grade: number;
	max?: number;
}

const StarRating = ({ grade, max = 5 }: StarRatingProps) => {
	const percent = Math.max(0, Math.min(grade / max, 1)) * 100;

	return (
		<div className="stars">
			{Array.from({ length: max }).map((_, i) => (
				<svg key={i} width={20} height={20} viewBox="0 0 20 20" fill="var(--color-secondary-dark)">
					<polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
				</svg>
			))}
		</div>
	);
};

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

	const section = useRef<HTMLElement>(null);
	const item = useRef<HTMLDivElement>(null);


	return (
		<section className="section__testimonios fadeInOut" ref={section}>
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
							<div className="testimonial__content" ref={item}>
								<div className="testimonial__header">
									<StarRating grade={Number(testy.grade)} />
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
