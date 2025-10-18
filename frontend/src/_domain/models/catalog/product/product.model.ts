import {
	BaseModel,
	type Block,
	type Image,
	type SEO,
	type SLUG,
} from "../../modules/modules.model";
import { ProductCategoryModel } from "./product-category.model";

export class ProductModel extends BaseModel {
	public _id!: string;
	public _type!: string;

	public general!: {
		img_general_primaryImg: Image;
		list_block_title_general_description: Block[];
		ref_productCategory: ProductCategoryModel;
		slug: SLUG;
		string_line_general_location: string;
		string_line_general_title: string;
		string_textarea_general_cardExcerpt: string;
	};
	public page!: {
		bool_page_result: string;
		img_page_divider: Image;
		img_page_intro: Image;
		img_page_resultImage: Image;
		list_block_post_page_solution: Block[];
		list_block_title_page_gallery: Block[];
		list_block_title_page_result: Block[];
		list_block_title_page_solution: Block[];
		list_gallery: Image[];
		string_textarea_page_result: string;
	};
	public seo!: SEO;

	constructor(data: any) {
		super();

		Object.assign(this, {
			_id: this.safeString(data?._id),
			_type: this.safeString(data?._type),

			general: {
				img_general_primaryImg: this.safeImage(
					data?.general?.img_general_primaryImg,
				),
				list_block_title_general_description: this.safeBlockText(
					data?.general?.list_block_title_general_description,
				),
				ref_productCategory: new ProductCategoryModel(
					data?.general?.ref_productCategory,
				),
				slug: this.safeSlug(data?.general?.slug),
				string_line_general_location: this.safeString(
					data?.general?.string_line_general_location,
				),
				string_line_general_title: this.safeString(
					data?.general?.string_line_general_title,
				),
				string_textarea_general_cardExcerpt: this.safeString(
					data?.general?.string_textarea_general_cardExcerpt,
				),
			},
			page: {
				bool_page_result: this.safeString(data?.page?.bool_page_result),
				img_page_divider: this.safeImage(data?.page?.img_page_divider),
				img_page_intro: this.safeImage(data?.page?.img_page_intro),
				img_page_resultImage: this.safeImage(data?.page?.img_page_resultImage),
				list_block_post_page_solution: this.safeBlockText(
					data?.page?.list_block_post_page_solution,
				),
				list_block_title_page_gallery: this.safeBlockText(
					data?.page?.list_block_title_page_gallery,
				),
				list_block_title_page_result: this.safeBlockText(
					data?.page?.list_block_title_page_result,
				),
				list_block_title_page_solution: this.safeBlockText(
					data?.page?.list_block_title_page_solution,
				),
				list_gallery: data?.page?.list_gallery.map((item: any) => {
					return this.safeImage(item);
				}),
				string_textarea_page_result: this.safeString(
					data?.page?.string_textarea_page_result,
				),
			},
			seo: this.safeString(data?.seo),
		});
	}
}
