import "server-only";

import { createClient } from "next-sanity";

export const apiVersion = "2026-08-10";

export function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_READ_TOKEN;

  if (!projectId || !dataset) {
    throw new Error(
      "Sanity configuration requires NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
    );
  }

  return createClient({
    apiVersion,
    dataset,
    projectId,
    token,
    useCdn: !token,
  });
}
