export interface SanityImage {
  asset: {
    _ref: string;
  };
  alt: string;
  caption?: string;
}

export interface Category {
  _id?: string;
  title: string;
  slug: string;
  description?: string;
}

export interface Author {
  name: string;
  photo?: SanityImage;
  bio?: string;
}

export interface Seo {
  title?: string;
  description?: string;
}

export interface PortableTextSpan {
  _key?: string;
  _type: "span";
  text: string;
  marks?: string[];
}

export interface PortableTextLink {
  _key: string;
  _type: "link";
  href: string;
}

export interface PortableTextBlock {
  _key: string;
  _type: "block";
  style?: "normal" | "h2" | "h3" | "blockquote";
  listItem?: "bullet" | "number";
  children: PortableTextSpan[];
  markDefs?: PortableTextLink[];
}

export type RichTextBlock = {
  _key: string;
  _type: "richTextBlock";
  content: PortableTextBlock[];
};

export type ImageBlock = {
  _key: string;
  _type: "imageBlock";
  image: SanityImage;
};

export type CalloutBlock = {
  _key: string;
  _type: "calloutBlock";
  title: string;
  message: string;
  tone: "informação" | "dica" | "aviso";
};

export type CtaBlock = {
  _key: string;
  _type: "ctaBlock";
  label: string;
  destination: string;
};

export type FeatureBlock = {
  _key: string;
  _type: "featureBlock";
  title: string;
  features: string[];
};

export type TableBlock = {
  _key: string;
  _type: "tableBlock";
  title?: string;
  rows: Array<{ cells: string[] }>;
};

export type ComparisonBlock = {
  _key: string;
  _type: "comparisonBlock";
  title: string;
  intro?: string;
  columns: string[];
  rows: Array<{ label: string; values: string[] }>;
};

export type FaqBlock = {
  _key: string;
  _type: "faqBlock";
  title?: string;
  items: Array<{ question: string; answer: string }>;
};

export type VideoBlock = {
  _key: string;
  _type: "videoBlock";
  title?: string;
  url: string;
};

export type RelatedPostsBlock = {
  _key: string;
  _type: "relatedPostsBlock";
  title?: string;
  posts: string[];
};

export type ArticleBlock =
  | RichTextBlock
  | ImageBlock
  | CalloutBlock
  | CtaBlock
  | FeatureBlock
  | TableBlock
  | ComparisonBlock
  | FaqBlock
  | VideoBlock
  | RelatedPostsBlock;

export interface PostPreview {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: SanityImage;
  publishedAt: string;
  readingTime: number;
  category: Category;
}

export interface Post extends PostPreview {
  author: Author;
  seo?: Seo;
  content: ArticleBlock[];
}

export interface LinkButtonItem {
  label: string;
  href: string;
  icon: string;
  variant: "primary" | "secondary";
  utmContent?: string;
  trackingEvent?: string;
  shortSlug?: string;
}

export interface FooterLinkItem {
  label: string;
  href: string;
  utmContent?: string;
}

export interface FooterGroup {
  title: string;
  links: FooterLinkItem[];
}

export interface SocialLinkItem {
  label: string;
  href: string;
  icon: string;
}

export interface LinksPageContent {
  tagline: string;
  links: LinkButtonItem[];
}

export interface SiteFooterContent {
  brandDescription: string;
  groups: FooterGroup[];
}
