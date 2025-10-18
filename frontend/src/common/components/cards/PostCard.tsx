import React from "react";
import type { PostModel } from "@/_domain/models/blog/post/post.model";
import { BUTTONS_TEXT } from "@/common/utils/constants-text";
import RedirectButton from "../buttons/RedirectButton";
import ResponsiveImage from "../images/ResponsiveImage";

interface Props {
	postData: PostModel;
}

const PostCard = ({ postData }: Props) => {
	return (
		<article>
			<header>
				<ResponsiveImage
					imageData={postData.general.img_general_primaryImg}
					variant="card"
				/>
				<h4>
					CATEGORÍA:{" "}
					{postData.general.ref_postCategory.string_line_category_name}
				</h4>
				<h3>{postData.general.string_line_general_title}</h3>
			</header>
			<footer>
				<p>{postData.general.string_textarea_general_cardExcerpt}</p>
				<RedirectButton
					href={`/blog/${postData.general.slug.current}`}
					type="tertiary"
				>
					{BUTTONS_TEXT.readPost}
				</RedirectButton>
			</footer>
		</article>
	);
};

export default PostCard;
