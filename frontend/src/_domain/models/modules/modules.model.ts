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
	_type: "block" | "image";
	children?: Array<{
		_type: "span";
		text: string;
		marks?: string[];
	}>;
	style?: string;
	media?: {
		url: string;
	};
	alt?: {
		altText: string;
	};
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
	DEFAULT_SLUG: SLUG;
	DEFAULT_SEO: SEO;

	constructor() {
		this.DEFAULT_STRING = "";
		this.DEFAULT_IMAGE_ALT = "Imagen Example";
		this.DEFAULT_IMAGE_URL = "https://picsum.photos/id/1/1440/900";
		this.DEFAULT_NUMBER = 0;
		this.DEFAULT_SEO = {
			string_titleSeo: "",
			text_descSeo: "",
			text_keySeo: "",
		};
		this.DEFAULT_SLUG = {
			_type: "slug",
			current: "",
		};
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

		return blocks.map((block: any) => {
			// Si es una imagen, usar la estructura que viene de GROQ
			if (block._type === "image") {
				return {
					_type: "image",
					media: {
						url: block.media?.url || this.DEFAULT_IMAGE_URL,
					},
					alt: {
						altText: block.alt?.altText || this.DEFAULT_IMAGE_ALT,
					},
				};
			}

			// Si es un bloque de texto (comportamiento original)
			return {
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
			};
		});
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
	safeSlug(value: unknown): SLUG {
		if (typeof value === "object" && value !== null) {
			const slugValue = value as Partial<SLUG>;
			return {
				_type: "slug",
				current: this.safeString(slugValue.current),
			};
		}
		return this.DEFAULT_SLUG;
	}
	safeSEO(value: unknown): SEO {
		if (typeof value === "object" && value !== null) {
			const seoValue = value as Partial<SEO>;
			return {
				string_titleSeo: this.safeString(seoValue.string_titleSeo),
				text_descSeo: this.safeString(seoValue.text_descSeo),
				text_keySeo: this.safeString(seoValue.text_keySeo),
			};
		}
		return this.DEFAULT_SEO;
	}

	safeDate(value: unknown): string {
		if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
			const [year, month, day] = value.split("-");
			return `${day}-${month}-${year}`;
		}

		let date: Date | null = null;
		if (typeof value === "string" || typeof value === "number") {
			const parsed = new Date(value);
			if (!isNaN(parsed.getTime())) {
				date = parsed;
			}
		} else if (value instanceof Date && !isNaN(value.getTime())) {
			date = value;
		}

		if (!date) {
			return "";
		}

		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();

		return `${day}-${month}-${year}`;
	}
}
