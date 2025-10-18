import { getSanityClient } from "@/common/lib/sanity/sanity-client";
import { POST_FIELDS } from "./blog/post/post.services";
import { PRODUCT_FIELDS } from "./catalog/product/product.services";
import { TESTIMONIAL_FIELDS } from "./testimonial.services";

const HOMEPAGE_FIELDS = `
  _id,
  _type,
  about {
    img_about_banner {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_about_title,
    string_line_about_btn
  },
  blog {
    list_block_title_blog_title,
    list_ref_posts [] -> {
      ${POST_FIELDS}
    }
  },
  experience {
    list_block_title_experience_title,
    list_stats[] {
      number_experience_metric,
      string_line_experience_label
    }
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
  machines {
    img_machines_banner {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    list_block_title_machines_title,
    string_line_machines_btn
  },
  products {
    list_block_title_products_title,
    list_ref_products []-> {
      ${PRODUCT_FIELDS}
    },
    string_line_products_btn
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  },
  testimonials {
    list_block_title_testimonials_title,
    list_ref_testimonials [] -> {
      ${TESTIMONIAL_FIELDS}
    }
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
