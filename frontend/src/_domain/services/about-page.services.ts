import { getSanityClient } from "@/common/lib/sanity/sanity-client";

export const ABOUTPAGE_FIELDS = `
  _id,
  _type,
  about {
    img_about_banner {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_about_title
  },
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
  history {
    img_history_banner {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_history_title
  },
  machines {
    img_machines_banner {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_machines_title,
    string_line_machines_btn
  },
  philosophy {
    img_philosophy_banner {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_philosophy_title
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  },
  values {
    list_block_title_values_title,
    list_values[] {
      img_values_image {
        "media": asset -> { url },
        "alt": asset -> { altText }
      },
      string_line_values_title,
      string_textarea_values_description
    }
  }
`;

export const getAboutPageData = async () => {
    const QUERY = `
    *[_type == "aboutPage"][0] {
      ${ABOUTPAGE_FIELDS}
    }
  `;

    const data = await getSanityClient().fetch(QUERY);
    return data;
};