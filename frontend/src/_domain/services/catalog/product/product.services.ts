import { getSanityClient } from "@/common/lib/sanity/sanity-client";
import { PRODUCTCATEGORY_FIELDS } from "./product-category.services";

export const PRODUCT_FIELDS = `
  _id,
  _type,
  general {
    img_general_primaryImg {
      "media": asset -> {
        _id,
        url,
        metadata{
          lqip,
          dimensions{width, height, aspectRatio}
        }
      },
      "alt": asset -> { altText }
    },
    list_block_title_general_description,
    ref_productCategory -> {
      ${PRODUCTCATEGORY_FIELDS}
    },
    slug,
    string_line_general_location,
    string_line_general_title,
    string_textarea_general_cardExcerpt
  },
  page {
    page_video_result_media,
    bool_page_result,
    img_page_divider {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    img_page_intro {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    img_page_resultImage {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_post_page_solution[]{
      ...,
      _type == "image" => {
        "media": asset -> { url },
        "alt": asset -> { altText }
      }
    },
    list_block_title_page_gallery,
    list_block_title_page_result,
    list_block_title_page_solution,
    list_gallery[]{
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    string_textarea_page_result
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getProductData = async ({slug}: {slug: string}) => {
	const QUERY = `
    *[_type == "product" && general.slug.current == "${slug}"][0] {
      ${PRODUCT_FIELDS}
    }
  `;

	const data = await getSanityClient().fetch(QUERY);
	return data;
};

export const getAllProducts = async () => {
	const QUERY = `
    *[_type == "product"] {
      ${PRODUCT_FIELDS}
    } | order(_createdAt desc)
  `;

	const data = await getSanityClient().fetch(QUERY);
	return data;
};

export const getAllProductCategories = async () => {
	const QUERY = `
    *[_type == "productCategory"] {
      ${PRODUCTCATEGORY_FIELDS}
    } | order(string_line_category_name asc)
  `;

	const data = await getSanityClient().fetch(QUERY);
	return data;
};

export const getProductsByCategory = async ({ slug }: { slug: string }) => {
  const QUERY = `
    *[_type == "product" && general.ref_productCategory->slug.current == "${slug}"] {
      ${PRODUCT_FIELDS}
    }
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data;
};


