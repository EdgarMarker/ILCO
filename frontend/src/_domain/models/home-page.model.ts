import { BaseModel } from "./modules/modules.model";
import { ProductTypes } from "../interfaces/product.types";
import { HomePageTypes } from "../interfaces/home-page.types";

export class HomePageModel extends BaseModel {
  _id: string;
  _type: string;
  benefits: HomePageTypes["benefits"];
  hero: HomePageTypes["hero"];
  intro: HomePageTypes["intro"];
  joinUs: HomePageTypes["joinUs"];
  number_reward: HomePageTypes["number_reward"];
  seo: HomePageTypes["seo"];

  constructor(data: HomePageTypes) {
    super();
    
    this._id = data?._id;
    this._type = data?._type;

    this.benefits = {
      img_section: this.safeImage(data?.benefits?.img_section),
      list_block_title_benefits: this.safeBlockText(data?.benefits?.list_block_title_benefits),
      list_block_title_section: this.safeBlockText(data?.benefits?.list_block_title_section),
      list_obj_faqs: (data?.benefits?.list_obj_faqs || []).map((item) => ({
        list_block_text_answer: this.safeBlockText(item?.list_block_text_answer),
        list_block_title_question: this.safeBlockText(item?.list_block_title_question)
      })),
      string_text_info: this.safeString(data?.benefits?.string_text_info)
    };

    this.hero = {
      img_section: this.safeImage(data?.hero?.img_section),
      list_block_text_info: this.safeBlockText(data?.hero?.list_block_text_info),
      list_block_title_section: this.safeBlockText(data?.hero?.list_block_title_section),
      list_obj_items: (data?.hero?.list_obj_items || []).map((item) => ({
        img_icon_item: this.safeImage(item?.img_icon_item),
        list_block_title_item: this.safeBlockText(item?.list_block_title_item)
      })),
      string_h1: this.safeString(data?.hero?.string_h1),
      string_line_button: this.safeString(data?.hero?.string_line_button)
    };

    this.intro = (data?.intro || []).map((item) => ({
      img_icon_section: this.safeImage(item?.img_icon_section),
      img_section: this.safeImage(item?.img_section),
      list_block_title_section: this.safeBlockText(item?.list_block_title_section),
      string_text_info: this.safeString(item?.string_text_info)
    }));

    this.joinUs = {
      img_section: this.safeImage(data?.joinUs?.img_section),
      list_block_title_joinUs: this.safeBlockText(data?.joinUs?.list_block_title_joinUs),
      list_block_title_section: this.safeBlockText(data?.joinUs?.list_block_title_section),
      list_obj_items: (data?.joinUs?.list_obj_items || []).map((item) => ({
        img_icon_item: this.safeImage(item?.img_icon_item),
        string_line_item: this.safeString(item?.string_line_item)
      }))
    };

    this.number_reward = this.safeNumber(data?.number_reward);

    this.seo = {
      string_titleSeo: this.safeString(data?.seo?.string_titleSeo),
      text_descSeo: this.safeString(data?.seo?.text_descSeo),
      text_keySeo: this.safeString(data?.seo?.text_keySeo)
    };
  }
}