import { getSanityClient } from "@/common/lib/sanity/sanity-client";

const CATALOGPAGE_FIELDS = `
  _id,
  _type,
  hero {
    img_hero_banner {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    img_hero_png {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_hero_title,
    string_h1,
    string_line_hero_button
  },
  machines {
    img_machines_banner {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_machines_title,
    string_line_machines_btn
  },
  products {
    list_block_title_products_title
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getCatalogPageData = async () => {
  const QUERY = `
    *[_type == "catalogPage"][0] {
      ${CATALOGPAGE_FIELDS}
    }
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data;
};