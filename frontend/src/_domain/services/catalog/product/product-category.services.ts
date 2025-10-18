import { getSanityClient } from "@/common/lib/sanity/sanity-client";

export const PRODUCTCATEGORY_FIELDS = `
  _id,
  _type,
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  },
  slug,
  string_line_category_name
`;

export const getProductCategoryData = async () => {
	const QUERY = `
    *[_type == "productCategory"][0] {
      ${PRODUCTCATEGORY_FIELDS}
    }
  `;

	const data = await getSanityClient().fetch(QUERY);
	return data;
};
