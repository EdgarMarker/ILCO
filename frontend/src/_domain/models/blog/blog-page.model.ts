import { BaseModel, type Block, type SEO } from "../modules/modules.model";
import { PostModel } from "./post/post.model";

export class BlogPageModel extends BaseModel {
    
    public _id!: string;
    public _type!: string;
    
    public featured!: {
        ref_post: PostModel;
    };
    public post!: {
        list_block_title_blogPage_title: Block[];
    };
    public seo!: SEO;

    constructor(data: any) {
        super();
        
        Object.assign(this, {
            _id: this.safeString(data?._id),
            _type: this.safeString(data?._type),

            featured: {
                ref_post: new PostModel(data?.featured?.ref_post),
            },
            post: {
                list_block_title_blogPage_title: this.safeBlockText(data?.post?.list_block_title_blogPage_title),
            },
            seo: this.safeString(data?.seo),
        }); 
    }
}