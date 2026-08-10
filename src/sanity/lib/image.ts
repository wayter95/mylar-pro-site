import "server-only";

import { createImageUrlBuilder } from "@sanity/image-url";

import { getSanityClient } from "@/sanity/lib/client";
import type { SanityImage } from "@/sanity/types/content";

export function urlForImage(image: SanityImage) {
  return createImageUrlBuilder(getSanityClient()).image(image);
}
