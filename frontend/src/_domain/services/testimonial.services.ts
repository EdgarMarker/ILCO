import { getSanityClient } from "@/common/lib/sanity/sanity-client";

export const TESTIMONIAL_FIELDS = `
  _id,
  _type,
  grade,
  list_block_info_testimonial_content,
  string_line_testimonial_authorLocation,
  string_line_testimonial_authorName
`;

export const getTestimonialData = async () => {
	const QUERY = `
    *[_type == "testimonial"][0] {
      ${TESTIMONIAL_FIELDS}
    }
  `;

	const data = await getSanityClient().fetch(QUERY);
	return data;
};
