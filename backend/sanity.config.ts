import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { media } from "sanity-plugin-media";
export default defineConfig({
	name: "default",
	title: "ILCO",

	projectId: "tigcvllx",
	dataset: "production",

	plugins: [structureTool({ structure }),  media(), visionTool()],

	schema: {
		types: schemaTypes,
	},
});
