export type FeatureSlug =
  | "broker-app"
  | "property-catalog"
  | "client-portal"
  | "digital-signature";

export type FeatureKeyPoint = {
  title: string;
  body: string;
};

export type FeatureBenefit = string;

export type FeatureAudience = {
  label: string;
  description: string;
};

export type FeatureFaq = {
  q: string;
  a: string;
};

export type FeatureExternalLink = {
  label: string;
  href: string;
  kind: "app-store" | "play-store" | "external" | "demo";
};

export type FeatureMode = {
  title: string;
  body: string;
  example: string;
};

export type FeatureContent = {
  slug: FeatureSlug;
  label: string;
  shortLabel: string;
  href: string;
  accent: string;
  eyebrow: string;
  hero: {
    title: string;
    titleHighlight?: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary?: string;
    trust: string[];
  };
  externalLinks?: FeatureExternalLink[];
  modes?: FeatureMode[];
  keyPoints: FeatureKeyPoint[];
  keyPointsHeadline: {
    title: string;
    subtitle: string;
  };
  benefits: FeatureBenefit[];
  benefitsHeadline: {
    title: string;
    subtitle: string;
  };
  audience: FeatureAudience[];
  audienceHeadline: {
    title: string;
    subtitle: string;
  };
  faq: FeatureFaq[];
  hubCard: {
    description: string;
    highlights: string[];
  };
};
