import { BaseModel, type Block} from "./modules/modules.model";

export class TestimonialModel extends BaseModel {
    
    public _id!: string;
    public _type!: string;
    
    public grade!: string;
    public list_block_info_testimonial_content!: Block[];
    public string_line_testimonial_authorLocation!: string;
    public string_line_testimonial_authorName!: string;

    constructor(data: any) {
        super();
        
        Object.assign(this, {
            _id: this.safeString(data?._id),
            _type: this.safeString(data?._type),

            grade: this.safeString(data?.grade),
            list_block_info_testimonial_content: this.safeBlockText(data?.list_block_info_testimonial_content),
            string_line_testimonial_authorLocation: this.safeString(data?.string_line_testimonial_authorLocation),
            string_line_testimonial_authorName: this.safeString(data?.string_line_testimonial_authorName),
        }); 
    }
}