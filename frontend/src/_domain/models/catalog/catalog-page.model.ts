import { BaseModel, type Block, type Image, type SEO } from "../modules/modules.model";

export class CatalogPageModel extends BaseModel {
    
    public _id!: string;
    public _type!: string;
    
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
                list_block_title_hero_title: this.safeBlockText(data?.hero?.list_block_title_hero_title),
                string_h1: this.safeString(data?.hero?.string_h1),
                string_line_hero_button: this.safeString(data?.hero?.string_line_hero_button),
            },
            machines: {
                img_machines_banner: this.safeImage(data?.machines?.img_machines_banner),
                list_block_title_machines_title: this.safeBlockText(data?.machines?.list_block_title_machines_title),
                string_line_machines_btn: this.safeString(data?.machines?.string_line_machines_btn),
            },
            products: {
                list_block_title_products_title: this.safeBlockText(data?.products?.list_block_title_products_title),
            },
            seo: this.safeString(data?.seo),
        }); 
    }
}