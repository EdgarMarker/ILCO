import { getSanityClient } from "@/common/lib/sanity/sanity-client";

const PRODUCTCATEGORY_FIELDS = `
  _id,
  _type,
  general {
    slug {
      current
    },
    string_line_title
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;


const PRODUCT_FIELDS = `
  _id,
  _type,
  card {
    img_imgCard {
      "media": asset -> {
        url
      },
      "alt": asset -> {
        altText
      }
    },
    string_text_excerpt
  },
  general {
    slug {
      current
    },
    string_line_title,
    string_text_info,
    ref_productCategory {
      ${PRODUCTCATEGORY_FIELDS}
    },
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
    string_h1,
    string_line_button
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getProductData = async (slug: string) => {
  const QUERY = `
    *[_type == "product" && slug.current == ${slug}][0]{
      ${PRODUCT_FIELDS}
    }
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data;
};
