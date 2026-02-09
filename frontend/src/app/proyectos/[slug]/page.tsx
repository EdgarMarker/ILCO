import { ProductModel } from "@/_domain/models/catalog/product/product.model";
import { getProductData } from "@/_domain/services/catalog/product/product.services";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { createMetadata } from "@/common/utils/helper-seo";
import { serialize } from "@/common/utils/helper-serialize";
import ProductGallerySection from "../components/ProductGallerySection";
import "./page.css";
import Link from "next/link";
import PreFooter from "@/common/components/footer/PreFooter";
import Animations from "./page.animation";

interface Props {
	params: {
		slug: string;
	};
}

export const generateMetadata = async ({ params }: Props) => {
	const {slug} = await params
	const rawData = await getProductData({ slug });
	const data = new ProductModel(rawData);
	return createMetadata(data.seo);
};

const page = async ({ params }: Props) => {
	const {slug} = await params
	const rawData = await getProductData({ slug });
	const data = new ProductModel(rawData);



	function getYouTubeEmbedUrl(url: string) {
		if (!url) return "";
		const match = url.match(
			/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
		);
		return match ? `https://www.youtube.com/embed/${match[1]}` : url;
	}

	return (
		<main id="ProjectDetail">
			{/**hero */}
			<section className="section__hero">
				<ResponsiveImage
					imageData={data.general.img_general_primaryImg}
					variant="hero"
					dataSpeed="clamp(0.7)"
				/>
				<div className="column__1">
					<div className="proyect__title">
						<span className="breadcrumbs">
							<Link href="/proyectos">Proyectos</Link>/
							<Link
								href={`/proyectos/categoria/${data.general.ref_productCategory.slug.current}`}
							>
								{data.general.ref_productCategory.string_line_category_name}
							</Link>
						</span>
						<h1>{data.general.string_line_general_title}</h1>
					</div>
				</div>
			</section>

			{/**INTRO */}
			<section className="section__intro fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<ResponsiveImage
							imageData={data.page.img_page_intro}
							variant="banner"
						/>
					</div>
					<div className="col__right">
						<div className="portable__wrapper">
							<h3>Descripción</h3>
							<CustomPortableText
								hasImg={false}
								data={data.general.list_block_title_general_description}
							/>
						</div>
					</div>
				</div>
			</section>

			{/**SOLUTION */}
			<section className="section__solution fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<h3>Solución</h3>
						<CustomPortableText
							hasImg={false}
							data={data.page.list_block_title_page_solution}
						/>
					</div>
					<div className="col__right">
						<CustomPortableText
							hasImg={true}
							data={data.page.list_block_post_page_solution}
						/>
					</div>
				</div>
			</section>

			{/**DIVIDER */}
			<section className="section__divider fadeInOut">
				<div className="column__1">
					<ResponsiveImage
						imageData={data.page.img_page_divider}
						variant="banner"
					/>
				</div>
			</section>

			{/**RESULT */}
			<section className="section__result fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<h3>Resultado</h3>
						<CustomPortableText
							hasImg={false}
							data={data.page.list_block_title_page_result}
						/>
					</div>
					<div className="col__right">
						<p>{data.page.string_textarea_page_result}</p>
						{data.page.bool_page_result ? (
							<iframe
								width="560"
								height="315"
								src={getYouTubeEmbedUrl(data.page.page_video_result_media)}
								title="Resultado del proyecto"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						) : (
							<ResponsiveImage
								imageData={data.page.img_page_resultImage}
								variant="banner"
							/>
						)}
					</div>
				</div>
			</section>

			{/** GALLERY */}
			<ProductGallerySection productData={serialize(data)} />
			<PreFooter />
			<Animations />
		</main>
	);
};

export default page;
