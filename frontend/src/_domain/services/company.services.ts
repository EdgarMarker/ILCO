import { getSanityClient } from "@/common/lib/sanity/sanity-client";

export const COMPANY_FIELDS = `
  _id,
  _type,
  contact {
    list_block_info_contact_hours,
    string_line_contact_address,
    string_line_contact_email,
    string_line_contact_phone
  },
  general {
    icon_general_footerLogo {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    icon_general_navLogo {
      "media": asset -> { url },
      "alt": asset -> { altText }
    },
    string_line_general_brand,
    string_line_general_name,
    string_line_general_slogan
  },
  location {
    string_line_location_latitude,
    string_line_location_longitude,
    url_location_googleMaps
  },
  policy {
    list_block_post_policy_privacyNotice
  },
  social {
    arr_list[]{
      _key,
      icon_social_icon {
        "media": asset -> { url },
        "alt": asset -> { altText }
      },
      string_line_social_name,
      url_social_url
    }
  }
`;

export const getCompanyData = async () => {
    const QUERY = `
    *[_type == "company"][0] {
      ${COMPANY_FIELDS}
    }
  `;

    const data = await getSanityClient().fetch(QUERY);
    return data;
};