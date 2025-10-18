import { BaseModel, type Block, type Image } from "./modules/modules.model";

export class CompanyModel extends BaseModel {
    
    public _id!: string;
    public _type!: string;
    
    public contact!: {
        list_block_info_contact_hours: Block[];
        string_line_contact_address: string;
        string_line_contact_email: string;
        string_line_contact_phone: string;
    };
    public general!: {
        icon_general_footerLogo: Image;
        icon_general_navLogo: Image;
        string_line_general_brand: string;
        string_line_general_name: string;
        string_line_general_slogan: string;
    };
    public location!: {
        string_line_location_latitude: string;
        string_line_location_longitude: string;
        url_location_googleMaps: string;
    };
    public policy!: {
        list_block_post_policy_privacyNotice: Block[];
    };
    public social!: {
        arr_list: {
            icon_social_icon: Image;
            string_line_social_name: string;
            url_social_url: string;
        }[];
    };

    constructor(data: any) {
        super();
        
        Object.assign(this, {
            _id: this.safeString(data?._id),
            _type: this.safeString(data?._type),

            contact: {
                list_block_info_contact_hours: this.safeBlockText(data?.contact?.list_block_info_contact_hours),
                string_line_contact_address: this.safeString(data?.contact?.string_line_contact_address),
                string_line_contact_email: this.safeString(data?.contact?.string_line_contact_email),
                string_line_contact_phone: this.safeString(data?.contact?.string_line_contact_phone),
            },
            general: {
                icon_general_footerLogo: this.safeImage(data?.general?.icon_general_footerLogo),
                icon_general_navLogo: this.safeImage(data?.general?.icon_general_navLogo),
                string_line_general_brand: this.safeString(data?.general?.string_line_general_brand),
                string_line_general_name: this.safeString(data?.general?.string_line_general_name),
                string_line_general_slogan: this.safeString(data?.general?.string_line_general_slogan),
            },
            location: {
                string_line_location_latitude: this.safeString(data?.location?.string_line_location_latitude),
                string_line_location_longitude: this.safeString(data?.location?.string_line_location_longitude),
                url_location_googleMaps: this.safeString(data?.location?.url_location_googleMaps),
            },
            policy: {
                list_block_post_policy_privacyNotice: this.safeBlockText(data?.policy?.list_block_post_policy_privacyNotice),
            },
            social: {
                arr_list: this.safeString(data?.social?.arr_list),
            },
        }); 
    }
}