import { BaseModel } from "../../modules/modules.model";

export class PostAuthorModel extends BaseModel {
	public _id!: string;
	public _type!: string;

	public string_line_author_name!: string;
	public string_line_author_position!: string;
	public string_textarea_author_bio!: string;

	constructor(data: any) {
		super();

		Object.assign(this, {
			_id: this.safeString(data?._id),
			_type: this.safeString(data?._type),

			string_line_author_name: this.safeString(data?.string_line_author_name),
			string_line_author_position: this.safeString(
				data?.string_line_author_position,
			),
			string_textarea_author_bio: this.safeString(
				data?.string_textarea_author_bio,
			),
		});
	}
}
