import { getSanityClient } from "@/common/lib/sanity/sanity-client";
import { POST_FIELDS } from "./post/post.services";

const BLOGPAGE_FIELDS = `
  _id,
  _type,
  featured {
    ref_post -> {
      ${POST_FIELDS}
    }
  },
  post {
    list_block_title_blogPage_title
  },
  seo {
    string_titleSeo,
    text_descSeo,
    text_keySeo
  }
`;

export const getBlogPageData = async () => {
	const QUERY = `
    *[_type == "blogPage"][0] {
      ${BLOGPAGE_FIELDS}
    }
  `;

	const data = await getSanityClient().fetch(QUERY);
	return data;
};
