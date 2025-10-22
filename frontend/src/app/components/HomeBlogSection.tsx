"use client";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useRef } from "react";
import type { HomePageModel } from "@/_domain/models/home-page.model";
import PostCard from "@/common/components/cards/PostCard";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";

interface Props {
    blogData: HomePageModel;
}

const HomeBlogSection = ({ blogData }: Props) => {
    const splideRef = useRef<any>(null);

    const goToPrev = () => {
        splideRef.current?.splide?.go('<');
    };

    const goToNext = () => {
        splideRef.current?.splide?.go('>');
    };

    const splideOptions = {
        arrows: false,
        pagination: false,
        perPage: 3,
        gap: '5%',
        padding: '5%',
        breakpoints: {
            1024:{
                perPage: 2,
            },
            768: {
                perPage: 1,
            },
        },
    };

    return (
        <section className="section__blog">
            <div className="column__2">
                <div className="col__left">
                    <CustomPortableText
                        hasImg={false}
                        data={blogData.blog.list_block_title_blog_title}
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

                        <button
						type="submit"
                            onClick={goToNext}
                            aria-label="Next posts"
                        >
                            &#8250;
                        </button>
                    </div>
                </div>
            </div>
            <div className="column__1">
                <Splide
                    ref={splideRef}
                    options={splideOptions}
                >
                    {blogData.blog.list_ref_posts.map((post, idx) => (
                        <SplideSlide key={idx ?? ""}>
                            <PostCard postData={post} />
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </section>
    );
};

export default HomeBlogSection;
