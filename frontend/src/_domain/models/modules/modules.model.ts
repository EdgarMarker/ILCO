export interface Image {
	_type: "image";
	media: {
		url: string;
	};
	alt: {
		altText: string;
	};
}

export interface Block {
	_type: "block";
	children: Array<{
		_type: "span";
		text: string;
		marks?: string[];
	}>;
	style: string;
}

export interface SEO {
	string_titleSeo: string;
	text_descSeo: string;
	text_keySeo: string;
}

export interface SLUG {
	_type: "slug";
	current: string;
}

export class BaseModel {
	DEFAULT_STRING: string;
	DEFAULT_IMAGE_ALT: string;
	DEFAULT_IMAGE_URL: string;
	DEFAULT_NUMBER: number;

	constructor() {
		this.DEFAULT_STRING = "";
		this.DEFAULT_IMAGE_ALT = "Imagen Example";
		this.DEFAULT_IMAGE_URL = "https://picsum.photos/id/1/1440/900";
		this.DEFAULT_NUMBER = 0;
	}

	safeString(value: unknown): string {
		if (typeof value === "string" && value.trim()) {
			return value;
		}
		return this.DEFAULT_STRING;
	}

	safeImage(value: Image): Image {
		return {
			...value,
			media: {
				url: value?.media?.url || this.DEFAULT_IMAGE_URL,
			},
			alt: {
				altText: value?.alt?.altText || this.DEFAULT_IMAGE_ALT,
			},
		};
	}

	safeBlockText(blocks: any): Block[] {
		if (!Array.isArray(blocks)) {
			return [
				{
					_type: "block",
					children: [
						{
							_type: "span",
							text: this.DEFAULT_STRING,
							marks: [],
						},
					],
					style: "normal",
				},
			];
		}

		return blocks.map((block: any) => ({
			_type: "block",
			children:
				Array.isArray(block.children) && block.children.length > 0
					? block.children.map((child: any) => ({
							_type: "span",
							text: child.text || this.DEFAULT_STRING,
							marks: child.marks || [],
						}))
					: [
							{
								_type: "span",
								text: this.DEFAULT_STRING,
								marks: [],
							},
						],
			style: block.style || "normal",
		}));
	}

	safeNumber(value: unknown): number {
		if (typeof value === "number") {
			return value;
		}
		if (typeof value === "string" && !isNaN(Number(value))) {
			return Number(value);
		}
		return this.DEFAULT_NUMBER;
	}
}
