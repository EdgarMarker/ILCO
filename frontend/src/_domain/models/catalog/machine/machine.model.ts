import {
	BaseModel,
	type Block,
	type Image,
	type SEO,
	type SLUG,
} from "../../modules/modules.model";
import { MachineCategoryModel } from "./machine-category.model";

export class MachineModel extends BaseModel {
	public _id!: string;
	public _type!: string;

	public general!: {
		file_general_brochure: string;
		img_general_primaryImg: Image;
		list_block_title_general_title: Block[];
		ref_machineCategory: MachineCategoryModel;
		slug: SLUG;
		string_line_general_title: string;
		string_textarea_general_fullDsc: string;
		date: string;
	};
	public page!: {
		img_page_divider: Image;
		list_block_title_page_specifications: Block[];
		list_obj_specifications: {
			string_line_specification_title: string;
			string_line_specification_value: string;
		}[];
		list_img: Image[];
	};
	public seo!: SEO;

	constructor(data: any) {
		super();

		Object.assign(this, {
			_id: this.safeString(data?._id),
			_type: this.safeString(data?._type),

			general: {
				file_general_brochure: this.safeString(
					data?.general?.file_general_brochure?.url
				),
				img_general_primaryImg: this.safeImage(
					data?.general?.img_general_primaryImg,
				),
				list_block_title_general_title: this.safeBlockText(
					data?.general?.list_block_title_general_title,
				),
				ref_machineCategory: new MachineCategoryModel(
					data?.general?.ref_machineCategory,
				),
				slug: this.safeSlug(data?.general?.slug),
				string_line_general_title: this.safeString(
					data?.general?.string_line_general_title,
				),
				string_textarea_general_fullDsc: this.safeString(
					data?.general?.string_textarea_general_fullDsc,
				),
				date: this.safeDate(data?.general?.date),
			},
			page: {
				list_img: data?.page?.list_img.map((item: any) => {
					return this.safeImage(item);
				}),
				img_page_divider: this.safeImage(data?.page?.img_page_divider),
				list_block_title_page_specifications: this.safeBlockText(
					data?.page?.list_block_title_page_specifications,
				),
				list_obj_specifications: data?.page?.list_obj_specifications.map(
					(item: any) => {
						return {
							string_line_specification_title: this.safeString(
								item?.string_line_specification_title,
							),
							string_line_specification_value: this.safeString(
								item?.string_line_specification_value,
							),
						};
					},
				),
			},
			seo: this.safeSEO(data?.seo),
		});
	}
}
