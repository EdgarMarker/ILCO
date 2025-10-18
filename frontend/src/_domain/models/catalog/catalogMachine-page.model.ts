import type { Block, Image, SEO } from "../modules/modules.model";
import { BaseModel } from "../modules/modules.model";

export class CatalogMachinesPageModel extends BaseModel {
	public _id!: string;
	public _type!: string;

	public hero!: {
		img_hero_banner: Image;
		img_hero_png: Image;
		list_block_title_hero_title: Block[];
		string_h1: string;
	};
	public machines!: {
		list_block_title_machines_title: Block[];
	};
	public seo!: SEO;

	constructor(data: any) {
		super();

		Object.assign(this, {
			_id: this.safeString(data?._id),
			_type: this.safeString(data?._type),

			hero: {
				img_hero_banner: this.safeImage(data?.hero?.img_hero_banner),
				img_hero_png: this.safeImage(data?.hero?.img_hero_png),
				list_block_title_hero_title: this.safeBlockText(
					data?.hero?.list_block_title_hero_title,
				),
				string_h1: this.safeString(data?.hero?.string_h1),
			},
			machines: {
				list_block_title_machines_title: this.safeBlockText(
					data?.machines?.list_block_title_machines_title,
				),
			},
			seo: data?.seo,
		});
	}
}
