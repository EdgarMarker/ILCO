import { BaseModel, type SEO, type SLUG } from "../../modules/modules.model";

export class PostCategoryModel extends BaseModel {
	public _id!: string;
	public _type!: string;

	public seo!: SEO;
	public slug!: SLUG;
	public string_line_category_name!: string;

	constructor(data: any) {
		super();

		Object.assign(this, {
			_id: this.safeString(data?._id),
			_type: this.safeString(data?._type),

			seo: this.safeString(data?.seo),
			slug: this.safeSlug(data?.slug),
			string_line_category_name: this.safeString(
				data?.string_line_category_name,
			),
		});
	}
}
