import { SEO } from "@/_domain/interfaces/modules/modules.types";
import type { Metadata } from "next";

export const createMetadata = (seo: SEO): Metadata => ({
  title: seo.string_titleSeo,
  description: seo.text_descSeo,
  keywords: seo.text_keySeo,
});
