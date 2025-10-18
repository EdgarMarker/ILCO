import { getSanityClient } from "@/common/lib/sanity/sanity-client";

export const POSTCATEGORY_FIELDS = `
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

export const getPostCategoryData = async () => {
	const QUERY = `
    *[_type == "postCategory"][0] {
      ${POSTCATEGORY_FIELDS}
    }
  `;

	const data = await getSanityClient().fetch(QUERY);
	return data;
};
