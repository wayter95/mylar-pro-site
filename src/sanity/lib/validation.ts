import { z } from "zod";

import { safeUrl } from "@/lib/safe-url";
import { safeLinkHref } from "@/lib/safe-link-href";

const safeUrlSchema = z
  .string()
  .trim()
  .min(1)
  .refine((value) => safeUrl(value) !== null, {
    message: "Use an internal path or an HTTP(S) URL.",
  });

const optionalText = z
  .string()
  .trim()
  .min(1)
  .nullish()
  .transform((value) => value ?? undefined);

const imageSchema = z.object({
  asset: z.object({
    _ref: z.string().min(1),
  }),
  alt: z.string().trim().min(1),
  caption: optionalText,
});

const categorySchema = z.object({
  _id: z.string().min(1).optional(),
  title: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  description: optionalText,
});

const portableTextSpanSchema = z.object({
  _key: z.string().min(1).optional(),
  _type: z.literal("span"),
  text: z.string(),
  marks: z.array(z.string()).optional(),
});

const portableTextLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal("link"),
  href: safeUrlSchema,
});

const portableTextBlockSchema = z
  .object({
    _key: z.string().min(1),
    _type: z.literal("block"),
    style: z.enum(["normal", "h2", "h3", "blockquote"]).optional(),
    listItem: z.enum(["bullet", "number"]).optional(),
    children: z.array(portableTextSpanSchema).min(1),
    markDefs: z.array(portableTextLinkSchema).optional(),
  })
  .superRefine((block, context) => {
    const linkKeys = new Set(
      block.markDefs?.map((definition) => definition._key),
    );

    block.children.forEach((span, spanIndex) => {
      span.marks?.forEach((mark, markIndex) => {
        if (mark !== "strong" && mark !== "em" && !linkKeys.has(mark)) {
          context.addIssue({
            code: "custom",
            message: "Only strong, emphasis, and link marks are supported.",
            path: ["children", spanIndex, "marks", markIndex],
          });
        }
      });
    });
  });

const articleBlockSchema = z.discriminatedUnion("_type", [
  z.object({
    _key: z.string().min(1),
    _type: z.literal("richTextBlock"),
    content: z.array(portableTextBlockSchema).min(1),
  }),
  z.object({
    _key: z.string().min(1),
    _type: z.literal("imageBlock"),
    image: imageSchema,
  }),
  z.object({
    _key: z.string().min(1),
    _type: z.literal("calloutBlock"),
    title: z.string().trim().min(1),
    message: z.string().trim().min(1),
    tone: z.enum(["informação", "dica", "aviso"]),
  }),
  z.object({
    _key: z.string().min(1),
    _type: z.literal("ctaBlock"),
    label: z.string().trim().min(1),
    destination: safeUrlSchema,
  }),
  z.object({
    _key: z.string().min(1),
    _type: z.literal("featureBlock"),
    title: z.string().trim().min(1),
    features: z.array(z.string().trim().min(1)).min(1),
  }),
  z.object({
    _key: z.string().min(1),
    _type: z.literal("tableBlock"),
    title: optionalText,
    rows: z
      .array(z.object({ cells: z.array(z.string().trim().min(1)).min(1) }))
      .min(1),
  }),
  z.object({
    _key: z.string().min(1),
    _type: z.literal("comparisonBlock"),
    title: z.string().trim().min(1),
    intro: optionalText,
    columns: z.array(z.string().trim().min(1)).min(2).max(4),
    rows: z
      .array(
        z.object({
          label: z.string().trim().min(1),
          values: z.array(z.string().trim().min(1)).min(2),
        }),
      )
      .min(1),
  }),
  z.object({
    _key: z.string().min(1),
    _type: z.literal("faqBlock"),
    title: optionalText,
    items: z
      .array(
        z.object({
          question: z.string().trim().min(1),
          answer: z.string().trim().min(1),
        }),
      )
      .min(1),
  }),
  z.object({
    _key: z.string().min(1),
    _type: z.literal("videoBlock"),
    title: optionalText,
    url: z.url(),
  }),
  z.object({
    _key: z.string().min(1),
    _type: z.literal("relatedPostsBlock"),
    title: optionalText,
    posts: z.array(z.string().min(1)).min(1),
  }),
]);

export const postPreviewSchema = z.object({
  _id: z.string().min(1).optional(),
  slug: z.string().trim().min(1),
  title: z.string().trim().min(1),
  excerpt: z.string().trim().min(1),
  coverImage: imageSchema.nullish().transform((image) => image ?? undefined),
  publishedAt: z.iso.datetime(),
  readingTime: z.number().int().positive(),
  category: categorySchema,
});

export const postSchema = postPreviewSchema.extend({
  author: z.object({
    name: z.string().trim().min(1),
    photo: imageSchema.nullish().transform((image) => image ?? undefined),
    bio: optionalText,
  }),
  seo: z
    .object({
      title: optionalText,
      description: optionalText,
    })
    .nullish()
    .transform((seo) => seo ?? undefined),
  content: z.array(articleBlockSchema),
});

export const categoryListSchema = z.array(categorySchema);

const safeLinkHrefSchema = z
  .string()
  .trim()
  .min(1)
  .refine((value) => safeLinkHref(value) !== null, {
    message: "Use an internal path, HTTP(S) URL, mailto: or tel:.",
  });

export const linkButtonSchema = z.object({
  label: z.string().trim().min(1),
  href: safeLinkHrefSchema,
  icon: z.string().trim().min(1),
  variant: z.enum(["primary", "secondary"]),
});

export const footerLinkSchema = z.object({
  label: z.string().trim().min(1),
  href: safeLinkHrefSchema,
});

export const socialLinkItemSchema = z.object({
  label: z.string().trim().min(1),
  href: safeLinkHrefSchema,
  icon: z.string().trim().min(1),
});

export const footerGroupSchema = z.object({
  title: z.string().trim().min(1),
  links: z.array(footerLinkSchema),
});

export const linksPageSchema = z.object({
  tagline: z.string().trim().min(1),
  links: z.array(linkButtonSchema),
});

export const siteFooterSchema = z.object({
  brandDescription: z.string().trim().min(1),
  groups: z.array(footerGroupSchema),
});

export const socialLinksSchema = z.object({
  items: z.array(socialLinkItemSchema),
});
