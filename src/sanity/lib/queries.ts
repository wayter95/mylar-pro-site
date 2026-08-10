import "server-only";

import { getSanityClient } from "@/sanity/lib/client";
import {
  categoryListSchema,
  postPreviewSchema,
  postSchema,
} from "@/sanity/lib/validation";
import type { Category, Post, PostPreview } from "@/sanity/types/content";

const postPreviewFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage { "asset": { "_ref": asset.asset._ref }, alt, caption },
  publishedAt,
  "readingTime": math::max([1, round((
    coalesce(math::sum(content[_type == "richTextBlock"]{ "n": length(pt::text(content)) }.n), 0) +
    coalesce(math::sum(content[_type == "comparisonBlock"].rows[]{ "n": string::length(label) + string::length(array::join(values, "")) }.n), 0) +
    coalesce(math::sum(content[_type == "tableBlock"].rows[]{ "n": string::length(array::join(cells, "")) }.n), 0) +
    coalesce(math::sum(content[_type == "faqBlock"].items[]{ "n": string::length(question) + string::length(answer) }.n), 0) +
    coalesce(math::sum(content[_type == "featureBlock"]{ "n": string::length(array::join(features, "")) }.n), 0)
  ) / 1200)]),
  "category": category->{ _id, title, "slug": slug.current, description }
`;

const postFields = `
  ${postPreviewFields},
  "author": author->{ name, photo { "asset": { "_ref": asset.asset._ref }, alt, caption }, bio },
  seo { title, description },
  content[] {
    _key,
    _type,
    _type == "richTextBlock" => { content },
    _type == "imageBlock" => { image { "asset": { "_ref": asset.asset._ref }, alt, caption } },
    _type == "calloutBlock" => { title, message, tone },
    _type == "ctaBlock" => { label, destination },
    _type == "featureBlock" => { title, features },
    _type == "tableBlock" => { title, rows[] { cells } },
    _type == "comparisonBlock" => { title, intro, columns, rows[] { label, values } },
    _type == "faqBlock" => { title, items[] { question, answer } },
    _type == "videoBlock" => { title, url },
    _type == "relatedPostsBlock" => { title, "posts": posts[]._ref }
  }
`;

const allPostsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${postPreviewFields} }`;
const recentPostsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...$limit] { ${postPreviewFields} }`;
const featuredPostQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0] { ${postPreviewFields} }`;
const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] { ${postFields} }`;
const categoriesQuery = `*[_type == "category" && defined(slug.current)] | order(title asc) { _id, title, "slug": slug.current, description }`;
const relatedPostsQuery = `*[_type == "post" && _id in $ids && defined(slug.current)] | order(publishedAt desc) { ${postPreviewFields} }`;

function parseCmsData<T>(
  schema: {
    safeParse: (
      data: unknown,
    ) =>
      | { success: true; data: T }
      | {
          success: false;
          error: { issues: Array<{ path: PropertyKey[]; message: string }> };
        };
  },
  data: unknown,
  context: string,
): T {
  const result = schema.safeParse(data);

  if (result.success) {
    return result.data;
  }

  const issues = result.error.issues
    .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("; ");

  throw new Error(`Invalid Sanity CMS data for ${context}: ${issues}`);
}

export async function getAllPosts(): Promise<PostPreview[]> {
  const data = await getSanityClient().fetch<unknown>(allPostsQuery);
  return parseCmsData(postPreviewSchema.array(), data, "all posts");
}

export async function getRecentPosts(limit: number): Promise<PostPreview[]> {
  const data = await getSanityClient().fetch<unknown>(recentPostsQuery, {
    limit,
  });
  return parseCmsData(postPreviewSchema.array(), data, "recent posts");
}

export async function getFeaturedPost(): Promise<PostPreview | null> {
  const data = await getSanityClient().fetch<unknown>(featuredPostQuery);
  return data === null
    ? null
    : parseCmsData(postPreviewSchema, data, "featured post");
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await getSanityClient().fetch<unknown>(postBySlugQuery, {
    slug,
  });
  return data === null ? null : parseCmsData(postSchema, data, `post "${slug}"`);
}

export async function getCategories(): Promise<Category[]> {
  const data = await getSanityClient().fetch<unknown>(categoriesQuery);
  return parseCmsData(categoryListSchema, data, "categories");
}

export async function getRelatedPosts(ids: string[]): Promise<PostPreview[]> {
  if (ids.length === 0) {
    return [];
  }

  const data = await getSanityClient().fetch<unknown>(relatedPostsQuery, {
    ids,
  });
  return parseCmsData(postPreviewSchema.array(), data, "related posts");
}
