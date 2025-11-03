import {
	BaseModel,
	type Block,
	type Image,
	type SEO,
	type SLUG,
} from "../../modules/modules.model";
import { PostAuthorModel } from "./post-author.model";
import { PostCategoryModel } from "./post-category.model";

export class PostModel extends BaseModel {
	public _id!: string;
	public _type!: string;

	public general!: {
		img_general_primaryImg: Image;
		ref_postAuthor: PostAuthorModel;
		ref_postCategory: PostCategoryModel;
		slug: SLUG;
		string_line_general_title: string;
		string_textarea_general_cardExcerpt: string;
		date: string;
	};
	public page!: {
		list_block_post_page_content: Block[];
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
				ref_postAuthor: new PostAuthorModel(data?.general?.ref_postAuthor),
				ref_postCategory: new PostCategoryModel(
					data?.general?.ref_postCategory,
				),
				slug: this.safeSlug(data?.general?.slug),
				string_line_general_title: this.safeString(
					data?.general?.string_line_general_title,
				),
				string_textarea_general_cardExcerpt: this.safeString(
					data?.general?.string_textarea_general_cardExcerpt,
				),
				date: this.safeDate(data?.general?.date),
			},
			page: {
				list_block_post_page_content: this.safeBlockText(
					data?.page?.list_block_post_page_content,
				),
			},
			seo: this.safeString(data?.seo),
		});
	}
}
