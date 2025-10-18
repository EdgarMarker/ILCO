import type { Block, Image, SEO } from "./modules/modules.model";
import { BaseModel } from "./modules/modules.model";

export class AboutPageModel extends BaseModel {
	public _id!: string;
	public _type!: string;

	public about!: {
		img_about_banner: Image;
		list_block_title_about_title: Block[];
	};
	public hero!: {
		img_hero_banner: Image;
		img_hero_png: Image;
		list_block_title_hero_title: Block[];
		string_h1: string;
		string_line_hero_button: string;
	};
	public history!: {
		img_history_banner: Image;
		list_block_title_history_title: Block[];
	};
	public machines!: {
		img_machines_banner: Image;
		list_block_title_machines_title: Block[];
		string_line_machines_btn: string;
	};
	public philosophy!: {
		img_philosophy_banner: Image;
		list_block_title_philosophy_title: Block[];
	};
	public seo!: SEO;
	public values!: {
		list_block_title_values_title: Block[];
		list_values: {
			img_values_image: Image;
			string_line_values_title: string;
			string_textarea_values_description: string;
		}[];
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
			history: {
				img_history_banner: this.safeImage(data?.history?.img_history_banner),
				list_block_title_history_title: this.safeBlockText(
					data?.history?.list_block_title_history_title,
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
			philosophy: {
				img_philosophy_banner: this.safeImage(
					data?.philosophy?.img_philosophy_banner,
				),
				list_block_title_philosophy_title: this.safeBlockText(
					data?.philosophy?.list_block_title_philosophy_title,
				),
			},
			seo: data?.seo,
			values: {
				list_block_title_values_title: this.safeBlockText(
					data?.values?.list_block_title_values_title,
				),
				list_values: Array.isArray(data?.values?.list_values)
					? data.values.list_values.map((item: any) => ({
							img_values_image: this.safeImage(item?.img_values_image),
							string_line_values_title: this.safeString(
								item?.string_line_values_title,
							),
							string_textarea_values_description: this.safeString(
								item?.string_textarea_values_description,
							),
						}))
					: [],
			},
		});
	}
}
