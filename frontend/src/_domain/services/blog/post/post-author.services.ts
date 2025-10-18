import { getSanityClient } from "@/common/lib/sanity/sanity-client";

export const POSTAUTHOR_FIELDS = `
  _id,
  _type,
  string_line_author_name,
  string_line_author_position,
  string_textarea_author_bio
`;

export const getPostAuthorData = async () => {
	const QUERY = `
    *[_type == "postAuthor"][0] {
      ${POSTAUTHOR_FIELDS}
    }
  `;

	const data = await getSanityClient().fetch(QUERY);
	return data;
};
