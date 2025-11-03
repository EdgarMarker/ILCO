import { getSanityClient } from "@/common/lib/sanity/sanity-client";
import { MACHINECATEGORY_FIELDS } from "./machine-category.services";

export const MACHINE_FIELDS = `
  _id,
  _type,
  general {
    file_general_brochure {
      "url": asset -> url
    },
    img_general_primaryImg {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_general_title,
    ref_machineCategory -> {
      ${MACHINECATEGORY_FIELDS}
    },
    slug,
    string_line_general_title,
    string_textarea_general_fullDsc,
    date
  },
  page {
  list_img[]{
    "media": asset -> { url },
    "alt": asset -> { altText }
  },
    img_page_divider {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_page_specifications,
    list_obj_specifications[] {
      string_line_specification_title,
      string_line_specification_value
    }
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getMachineData = async ({ slug }: { slug: string }) => {
	const QUERY = `
    *[_type == "machine" && general.slug.current == '${slug}'][0] {
      ${MACHINE_FIELDS}
    }
  `;

	const data = await getSanityClient().fetch(QUERY);
	return data;
};

export const getAllMachines = async () => {
	const QUERY = `
    *[_type == "machine"] {
      ${MACHINE_FIELDS}
    } | order(_createdAt desc)
  `;

	const data = await getSanityClient().fetch(QUERY);
	return data;
};

export const getAllMachineCategories = async () => {
	const QUERY = `
    *[_type == "machineCategory"] {
      ${MACHINECATEGORY_FIELDS}
    } | order(string_line_category_name asc)
  `;

	const data = await getSanityClient().fetch(QUERY);
	return data;
};

export const getMachineByCategory = async ({slug}: {slug: string}) => {
	const QUERY = `
    *[_type == "machine" && general.ref_machineCategory->slug.current == "${slug}"] {
      ${MACHINE_FIELDS}
    }
  `;

	const data = await getSanityClient().fetch(QUERY);

  return data;
};

