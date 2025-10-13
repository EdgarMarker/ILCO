import { BaseModel } from "./modules/modules.model";
import { ProductCategoryTypes, ProductTypes } from "../interfaces/product.types";

class ProductCategoryModel extends BaseModel implements ProductCategoryTypes {
  general: ProductCategoryTypes["general"];
  seo: ProductCategoryTypes["seo"];

  constructor(data: ProductCategoryTypes) {
    super();
    this.general = {
      slug: data?.general?.slug,
      string_line_title: this.safeString(data?.general?.string_line_title),
    };
    this.seo = {
      string_titleSeo: this.safeString(data?.seo?.string_titleSeo),
      text_descSeo: this.safeString(data?.seo?.text_descSeo),
      text_keySeo: this.safeString(data?.seo?.text_keySeo),
    };
  }
}

export class ProductModel extends BaseModel implements ProductTypes {
    _id: string;
    _type: string;
    card: ProductTypes["card"];
    general: ProductTypes["general"];
    hero: ProductTypes["hero"];
    seo: ProductTypes["seo"];

  constructor(data: ProductTypes) {
    super();
    this._id = data?._id;
    this._type = data?._type;

    this.card = {
      img_imgCard: this.safeImage(data?.card?.img_imgCard),
      string_text_excerpt: this.safeString(data?.card?.string_text_excerpt),
    };

    this.general = {
      slug: data?.general?.slug,
      string_line_title: this.safeString(data?.general?.string_line_title),
      string_text_info: this.safeString(data?.general?.string_text_info),
      ref_productCategory: data?.general?.ref_productCategory
        ? new ProductCategoryModel(data?.general?.ref_productCategory)
        : undefined,
    };

    this.hero = {
      img_section: this.safeImage(data?.hero?.img_section),
      list_block_text_info: this.safeBlockText(
        data?.hero?.list_block_text_info
      ),
      list_block_title_section: this.safeBlockText(
        data?.hero?.list_block_title_section
      ),
      string_h1: this.safeString(data?.hero?.string_h1),
      string_line_button: this.safeString(data?.hero?.string_line_button),
    };

    this.seo = {
      string_titleSeo: this.safeString(data?.seo?.string_titleSeo),
      text_descSeo: this.safeString(data?.seo?.text_descSeo),
      text_keySeo: this.safeString(data?.seo?.text_keySeo),
    };
  }
}
