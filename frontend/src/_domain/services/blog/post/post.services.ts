import { getSanityClient } from "@/common/lib/sanity/sanity-client";
import { POSTAUTHOR_FIELDS } from "./post-author.services";
import { POSTCATEGORY_FIELDS } from "./post-category.services";

export const POST_FIELDS = `
  _id,
  _type,
  general {
    img_general_primaryImg {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    ref_postAuthor -> {
      ${POSTAUTHOR_FIELDS}
    },
    ref_postCategory -> {
      ${POSTCATEGORY_FIELDS}
    },
    slug,
    string_line_general_title,
    string_textarea_general_cardExcerpt
  },
  page {
    list_block_post_page_content[]{
      ...,
      _type == "image" => {
        "media": asset -> { url },
        "alt": asset -> { altText }
      }
    }
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getPostData = async ({ slug }: { slug: string }) => {
	const QUERY = `
    *[_type == "post" && general.slug.current == "${slug}"][0] {
      ${POST_FIELDS}
    }
  `;

	const data = await getSanityClient().fetch(QUERY);
	return data;
};

export const getAllPost = async () => {
	const QUERY = `
    *[_type == "post"] {
      ${POST_FIELDS}
    } | order(_createdAt desc)
  `;
	const data = await getSanityClient().fetch(QUERY);
	return data;
};

export const getAllPostCategories = async () => {
  const QUERY = `
    *[_type == "postCategory"] {
      ${POSTCATEGORY_FIELDS}
    } | order(string_line_category_name asc)
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data;
};

export const getPostsByCategory = async ({ slug }: { slug: string }) => {
  const QUERY = `
    *[_type == "post" && general.ref_postCategory->slug.current == "${slug}"] {
      ${POST_FIELDS}
    } | order(_createdAt desc)
  `;

  const data = await getSanityClient().fetch(QUERY);
  return data;
}
