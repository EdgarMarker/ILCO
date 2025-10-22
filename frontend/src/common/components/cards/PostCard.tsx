import React from "react";
import type { PostModel } from "@/_domain/models/blog/post/post.model";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";
import RedirectButton from "../buttons/RedirectButton";
import ResponsiveImage from "../images/ResponsiveImage";
import Link from "next/link";

interface Props {
	postData: PostModel;
}

const PostCard = ({ postData }: Props) => {
	return (
		<div className="card card__post">
			<div className="card__header">
				<Link href={`/blog/${postData.general.slug.current}`}>
					<ResponsiveImage
						imageData={postData.general.img_general_primaryImg}
						variant="card"
					/>
				</Link>
			</div>
			<div className="card__body">
				<div className="card__description">
					<Link href={`/blog/categorias/${postData.general.ref_postCategory.slug.current}`} className="card__cat">
						Categoría:{" "}
						{postData.general.ref_postCategory.string_line_category_name}
					</Link>
					<Link className="card__title" href={`/blog/${postData.general.slug.current}`}>
						{postData.general.string_line_general_title}
					</Link>
				</div>
				<div className="card__desc__wrapper">
					<p>{postData.general.string_textarea_general_cardExcerpt}</p>
					<RedirectButton
						href={`/blog/${postData.general.slug.current}`}
						type="tertiary"
					>
						{BUTTONS_TEXT.readPost}
					</RedirectButton>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
