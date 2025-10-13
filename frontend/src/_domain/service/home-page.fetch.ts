import { getSanityClient } from "@/common/lib/sanity/sanity-client";

const HOMEPAGE_FIELDS = `
  _id,
  _type,
  benefits {
    img_section {
      "media": asset -> {
        url
      },
      "alt": asset -> {
        altText
      }
    },
    list_block_title_benefits,
    list_block_title_section,
    list_obj_faqs[] {
      list_block_text_answer,
      list_block_title_question
    },
    string_text_info
  },
  hero {
    img_section {
      "media": asset -> {
        url
      },
      "alt": asset -> {
        altText
      }
    },
    list_block_text_info,
    list_block_title_section,
    list_obj_items[] {
      img_icon_item {
        "media": asset -> {
          url
        },
        "alt": asset -> {
          altText
        }
      },
      list_block_title_item
    },
    string_h1,
    string_line_button
  },
  intro[] {
    img_icon_section {
      "media": asset -> {
        url
      },
      "alt": asset -> {
        altText
      }
    },
    img_section {
      "media": asset -> {
        url
      },
      "alt": asset -> {
        altText
      }
    },
    list_block_title_section,
    string_text_info
  },
  joinUs {
    img_section {
      "media": asset -> {
        url
      },
      "alt": asset -> {
        altText
      }
    },
    list_block_title_joinUs,
    list_block_title_section,
    list_obj_items[] {
      img_icon_item {
        "media": asset -> {
          url
        },
        "alt": asset -> {
          altText
        }
      },
      string_line_item
    }
  },
  number_reward,
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getHomePageData = async () => {
  const QUERY = `
    *[_type == "homePage"][0] {
      ${HOMEPAGE_FIELDS}
    }
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data;
};