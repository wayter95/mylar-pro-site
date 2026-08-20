import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/sanity/schemaTypes";
import {
  singletonActions,
  singletonTypeNames,
  structure,
} from "./src/sanity/lib/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const isStudioConfigured = Boolean(projectId && dataset);

export default defineConfig({
  basePath: "/studio",
  title: "MyLar Pro",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypeNames.has(schemaType)),
  },
  document: {
    actions: (input, { schemaType }) =>
      singletonTypeNames.has(schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
