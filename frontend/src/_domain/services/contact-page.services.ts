import { getSanityClient } from "@/common/lib/sanity/sanity-client";

export const CONTACTPAGE_FIELDS = `
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
    string_h1
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getContactPageData = async () => {
    const QUERY = `
    *[_type == "contactPage"][0] {
      ${CONTACTPAGE_FIELDS}
    }
  `;

    const data = await getSanityClient().fetch(QUERY);
    return data;
};