import { PostModel } from "./blog/post/post.model";
import { ProductModel } from "./catalog/product/product.model";
import {
	BaseModel,
	type Block,
	type Image,
	type SEO,
} from "./modules/modules.model";
import { TestimonialModel } from "./testimonial.model";

export class HomePageModel extends BaseModel {
	public _id!: string;
	public _type!: string;

	public about!: {
		img_about_banner: Image;
		list_block_title_about_title: Block[];
		string_line_about_btn: string;
	};
	public blog!: {
		list_block_title_blog_title: Block[];
		list_ref_posts: PostModel[];
	};
	public experience!: {
		list_block_title_experience_title: Block[];
		list_stats: {
			number_experience_metric: number;
			string_line_experience_label: string;
		}[];
	};
	public hero!: {
		img_hero_banner: Image;
		img_hero_png: Image;
		list_block_title_hero_title: Block[];
		string_h1: string;
		string_line_hero_button: string;
	};
	public machines!: {
		img_machines_banner: Image;
		list_block_title_machines_title: Block[];
		string_line_machines_btn: string;
	};
	public products!: {
		list_block_title_products_title: Block[];
		list_ref_products: ProductModel[];
		string_line_products_btn: string;
	};
	public seo!: SEO;
	public testimonials!: {
		list_block_title_testimonials_title: Block[];
		list_ref_testimonials: TestimonialModel[];
	};

	constructor(data: any) {
		super();

		Object.assign(this, {
			_id: this.safeString(data?._id),
			_type: this.safeString(data?._type),

			about: {
				img_about_banner: this.safeImage(data?.about?.img_about_banner),
				list_block_title_about_title: this.safeBlockText(
					data?.about?.list_block_title_about_title,
				),
				string_line_about_btn: this.safeString(
					data?.about?.string_line_about_btn,
				),
			},
			blog: {
				list_block_title_blog_title: this.safeBlockText(
					data?.blog?.list_block_title_blog_title,
				),
				list_ref_posts: data?.blog?.list_ref_posts?.map(
					(post: any) => new PostModel(post),
				),
			},
			experience: {
				list_block_title_experience_title: this.safeBlockText(
					data?.experience?.list_block_title_experience_title,
				),
				list_stats: data?.experience?.list_stats?.map((item: any) => ({
					number_experience_metric: this.safeNumber(
						item?.number_experience_metric,
					),
					string_line_experience_label: this.safeString(
						item?.string_line_experience_label,
					),
				})),
			},
			hero: {
				img_hero_banner: this.safeImage(data?.hero?.img_hero_banner),
				img_hero_png: this.safeImage(data?.hero?.img_hero_png),
				list_block_title_hero_title: this.safeBlockText(
					data?.hero?.list_block_title_hero_title,
				),
				string_h1: this.safeString(data?.hero?.string_h1),
				string_line_hero_button: this.safeString(
					data?.hero?.string_line_hero_button,
				),
			},
			machines: {
				img_machines_banner: this.safeImage(
					data?.machines?.img_machines_banner,
				),
				list_block_title_machines_title: this.safeBlockText(
					data?.machines?.list_block_title_machines_title,
				),
				string_line_machines_btn: this.safeString(
					data?.machines?.string_line_machines_btn,
				),
			},
			products: {
				list_block_title_products_title: this.safeBlockText(
					data?.products?.list_block_title_products_title,
				),
				list_ref_products: data?.products?.list_ref_products?.map(
					(product: any) => new ProductModel(product),
				) || [],
				string_line_products_btn: this.safeString(
					data?.products?.string_line_products_btn,
				),
			},
			seo: data?.seo,
			testimonials: {
				list_block_title_testimonials_title: this.safeBlockText(
					data?.testimonials?.list_block_title_testimonials_title,
				),
				list_ref_testimonials: data?.testimonials?.list_ref_testimonials?.map(
					(testimonial: any) => new TestimonialModel(testimonial),
				),
			},

		});
	}
}
