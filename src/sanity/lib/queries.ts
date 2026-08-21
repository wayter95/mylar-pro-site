import "server-only";

import { getSanityClient, isSanityConfigured } from "@/sanity/lib/client";
import {
  categoryListSchema,
  footerGroupSchema,
  footerLinkSchema,
  linkButtonSchema,
  linksPageSchema,
  postPreviewSchema,
  postSchema,
  siteFooterSchema,
  socialLinkItemSchema,
  socialLinksSchema,
} from "@/sanity/lib/validation";
import type {
  Category,
  FooterGroup,
  FooterLinkItem,
  LinkButtonItem,
  LinksPageContent,
  Post,
  PostPreview,
  SiteFooterContent,
  SocialLinkItem,
} from "@/sanity/types/content";

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

const publishedPost = `_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()`;

const allPostsQuery = `*[${publishedPost}] | order(publishedAt desc) { ${postPreviewFields} }`;
const recentPostsQuery = `*[${publishedPost}] | order(publishedAt desc)[0...$limit] { ${postPreviewFields} }`;
const featuredPostQuery = `*[${publishedPost}] | order(publishedAt desc)[0] { ${postPreviewFields} }`;
const postBySlugQuery = `*[${publishedPost} && slug.current == $slug][0] { ${postFields} }`;
const categoriesQuery = `*[_type == "category" && defined(slug.current)] | order(title asc) { _id, title, "slug": slug.current, description }`;
const relatedPostsQuery = `*[${publishedPost} && _id in $ids] | order(publishedAt desc) { ${postPreviewFields} }`;
const postSlugsQuery = `*[${publishedPost}] { "slug": slug.current }`;

const CONTENT_REVALIDATE_SECONDS = 600;

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
  const data = await getSanityClient().fetch<unknown>(
    allPostsQuery,
    {},
    {
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
    },
  );
  return parseCmsData(postPreviewSchema.array(), data, "all posts");
}

export async function getRecentPosts(limit: number): Promise<PostPreview[]> {
  const data = await getSanityClient().fetch<unknown>(
    recentPostsQuery,
    { limit },
    { next: { revalidate: CONTENT_REVALIDATE_SECONDS } },
  );
  return parseCmsData(postPreviewSchema.array(), data, "recent posts");
}

export async function getFeaturedPost(): Promise<PostPreview | null> {
  const data = await getSanityClient().fetch<unknown>(
    featuredPostQuery,
    {},
    {
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
    },
  );
  return data === null
    ? null
    : parseCmsData(postPreviewSchema, data, "featured post");
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await getSanityClient().fetch<unknown>(
    postBySlugQuery,
    { slug },
    { next: { revalidate: CONTENT_REVALIDATE_SECONDS } },
  );
  return data === null ? null : parseCmsData(postSchema, data, `post "${slug}"`);
}

export async function getPublishedPostSlugs(): Promise<string[]> {
  const data = await getSanityClient().fetch<Array<{ slug?: string }>>(
    postSlugsQuery,
    {},
    { next: { revalidate: CONTENT_REVALIDATE_SECONDS } },
  );

  return data
    .map((item) => item.slug)
    .filter((slug): slug is string => typeof slug === "string");
}

export async function getCategories(): Promise<Category[]> {
  const data = await getSanityClient().fetch<unknown>(
    categoriesQuery,
    {},
    {
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
    },
  );
  return parseCmsData(categoryListSchema, data, "categories");
}

export async function getRelatedPosts(ids: string[]): Promise<PostPreview[]> {
  if (ids.length === 0) {
    return [];
  }

  const data = await getSanityClient().fetch<unknown>(
    relatedPostsQuery,
    { ids },
    { next: { revalidate: CONTENT_REVALIDATE_SECONDS } },
  );
  return parseCmsData(postPreviewSchema.array(), data, "related posts");
}

const linksPageQuery = `*[_type == "linksPage"][0] {
  tagline,
  links[] { label, href, icon, variant, utmContent, trackingEvent, shortSlug }
}`;

const siteFooterQuery = `*[_type == "siteFooter"][0] {
  brandDescription,
  groups[] { title, links[] { label, href, utmContent } }
}`;

const socialLinksQuery = `*[_type == "socialLinks"][0] {
  items[] { label, href, icon }
}`;

const linkByShortSlugQuery = `*[_type == "linksPage"][0].links[shortSlug == $slug][0] {
  label, href, icon, variant, utmContent, trackingEvent, shortSlug
}`;

async function fetchContent<T>(
  query: string,
  context: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await getSanityClient().fetch<T>(query, params, {
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
    });
  } catch (error) {
    console.error(`[Sanity] Failed to fetch ${context}:`, error);
    return null;
  }
}

function keepValid<T>(
  schema: {
    safeParse: (
      value: unknown,
    ) => { success: true; data: T } | { success: false };
  },
  items: unknown,
  context: string,
): T[] {
  if (!Array.isArray(items)) {
    return [];
  }

  const valid: T[] = [];

  items.forEach((item, index) => {
    const result = schema.safeParse(item);
    if (result.success) {
      valid.push(result.data);
    } else {
      console.error(`[Sanity] Dropped invalid ${context} at index ${index}.`);
    }
  });

  return valid;
}

export async function getLinksPage(): Promise<LinksPageContent | null> {
  const data = await fetchContent<unknown>(linksPageQuery, "links page");

  if (!data || typeof data !== "object") {
    return null;
  }

  const raw = data as { tagline?: unknown; links?: unknown };
  const links = keepValid<LinkButtonItem>(
    linkButtonSchema,
    raw.links,
    "link button",
  );
  const parsed = linksPageSchema.safeParse({ tagline: raw.tagline, links });

  if (!parsed.success || parsed.data.links.length === 0) {
    console.error("[Sanity] Links page unusable; falling back to code list.");
    return null;
  }

  return parsed.data;
}

export async function getSiteFooter(): Promise<SiteFooterContent | null> {
  const data = await fetchContent<unknown>(siteFooterQuery, "site footer");

  if (!data || typeof data !== "object") {
    return null;
  }

  const raw = data as { brandDescription?: unknown; groups?: unknown };
  const rawGroups = Array.isArray(raw.groups) ? raw.groups : [];
  const groups = rawGroups
    .map((rawGroup, groupIndex): FooterGroup | null => {
      const candidate =
        rawGroup && typeof rawGroup === "object"
          ? (rawGroup as { title?: unknown; links?: unknown })
          : { title: undefined, links: undefined };

      const links = keepValid<FooterLinkItem>(
        footerLinkSchema,
        candidate.links,
        `footer group ${groupIndex} link`,
      );

      const result = footerGroupSchema.safeParse({
        title: candidate.title,
        links,
      });

      if (!result.success) {
        console.error(
          `[Sanity] Dropped invalid footer group at index ${groupIndex}.`,
        );
        return null;
      }

      return result.data;
    })
    .filter((group): group is FooterGroup => group !== null)
    .filter((group) => group.links.length > 0);
  const parsed = siteFooterSchema.safeParse({
    brandDescription: raw.brandDescription,
    groups,
  });

  if (!parsed.success || parsed.data.groups.length === 0) {
    console.error("[Sanity] Site footer unusable; falling back to code list.");
    return null;
  }

  return parsed.data;
}

export async function getSocialLinks(): Promise<SocialLinkItem[] | null> {
  const data = await fetchContent<unknown>(socialLinksQuery, "social links");

  if (!data || typeof data !== "object") {
    return null;
  }

  const items = keepValid<SocialLinkItem>(
    socialLinkItemSchema,
    (data as { items?: unknown }).items,
    "social link",
  );
  const parsed = socialLinksSchema.safeParse({ items });

  if (!parsed.success || parsed.data.items.length === 0) {
    console.error("[Sanity] Social links unusable; falling back to code list.");
    return null;
  }

  return parsed.data.items;
}

export async function getLinkByShortSlug(
  slug: string,
): Promise<LinkButtonItem | null> {
  const data = await fetchContent<unknown>(
    linkByShortSlugQuery,
    `link for slug "${slug}"`,
    { slug },
  );

  if (!data) {
    return null;
  }

  const parsed = linkButtonSchema.safeParse(data);

  if (!parsed.success) {
    console.error(`[Sanity] Link for slug "${slug}" is invalid.`);
    return null;
  }

  return parsed.data;
}
