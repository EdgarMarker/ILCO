import { getSanityClient } from "@/common/lib/sanity/sanity-client";

export const MACHINECATEGORY_FIELDS = `
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

export const getMachineCategoryData = async () => {
    const QUERY = `
    *[_type == "machineCategory"][0] {
      ${MACHINECATEGORY_FIELDS}
    }
  `;

    const data = await getSanityClient().fetch(QUERY);
    return data;
};