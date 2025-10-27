import { PortableText } from "@portabletext/react";
import type {
	Image as BaseImg,
	Block,
} from "@/_domain/models/modules/modules.model";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";

interface Props {
	data: (Block | BaseImg)[];
	imgContainerClassName?: string;
	hasImg: boolean;
	quality?: number;
	imageVariant?: "hero" | "card" | "thumbnail" | "gallery" | "icon" | "banner";
	imageClassName?: string;
}

const CustomPortableText = ({
	hasImg = false,
	data,
	imgContainerClassName,
	quality,
	imageVariant = "card",
	imageClassName,
}: Props) => {
	const components = {
		types: {
			image: ({ value }: { value: BaseImg }) => {
				if (!hasImg) return null;

				return (
					<ResponsiveImage
						imageData={value}
						variant={imageVariant}
						containerClassName={imgContainerClassName}
						className={imageClassName}
						quality={quality}
					/>
				);
			},
		},
	};

	return (
		<div className={`portableText`}>
			<PortableText value={data} components={components} />
		</div>
	);
};

export default CustomPortableText;
