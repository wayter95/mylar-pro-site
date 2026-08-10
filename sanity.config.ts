import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const isStudioConfigured = Boolean(projectId && dataset);

export default defineConfig({
  basePath: "/studio",
  title: "MyLar Pro",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
