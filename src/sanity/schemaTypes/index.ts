import { calloutBlock } from "@/sanity/schemaTypes/blocks/calloutBlock";
import { comparisonBlock } from "@/sanity/schemaTypes/blocks/comparisonBlock";
import { ctaBlock } from "@/sanity/schemaTypes/blocks/ctaBlock";
import { faqBlock } from "@/sanity/schemaTypes/blocks/faqBlock";
import { featureBlock } from "@/sanity/schemaTypes/blocks/featureBlock";
import { imageBlock } from "@/sanity/schemaTypes/blocks/imageBlock";
import { relatedPostsBlock } from "@/sanity/schemaTypes/blocks/relatedPostsBlock";
import { richTextBlock } from "@/sanity/schemaTypes/blocks/richTextBlock";
import { tableBlock } from "@/sanity/schemaTypes/blocks/tableBlock";
import { videoBlock } from "@/sanity/schemaTypes/blocks/videoBlock";
import { author } from "@/sanity/schemaTypes/documents/author";
import { category } from "@/sanity/schemaTypes/documents/category";
import { post } from "@/sanity/schemaTypes/documents/post";
import { imageWithAlt } from "@/sanity/schemaTypes/objects/image";
import { seo } from "@/sanity/schemaTypes/objects/seo";

export const schemaTypes = [
  post,
  author,
  category,
  seo,
  imageWithAlt,
  richTextBlock,
  imageBlock,
  calloutBlock,
  ctaBlock,
  featureBlock,
  tableBlock,
  comparisonBlock,
  faqBlock,
  videoBlock,
  relatedPostsBlock,
];
