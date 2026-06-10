export type PersonaSlug = "broker" | "development" | "real-estate";

export type PersonaHero = {
  tag: string;
  title: [string, string, string];
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trust: string[];
};

export type PersonaPain = {
  title: string;
  body: string;
  resolved: string;
};

export type PersonaFeatureBlockVisual =
  | "broker-pipeline"
  | "broker-catalog"
  | "broker-mobile"
  | "real-estate-negotiations"
  | "real-estate-billing"
  | "real-estate-financial"
  | "development-mirror"
  | "development-meta-ads"
  | "development-bi";

export type PersonaFeatureBlock = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  visual: PersonaFeatureBlockVisual;
};

export type PersonaFeature = {
  hero?: boolean;
  title: string;
  body: string;
};

export type PersonaStep = {
  num: string;
  title: string;
  body: string;
};

export type PersonaTestimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  featured?: boolean;
  stats?: { v: string; l: string }[];
};

export type PersonaPlan = {
  name: string;
  price: number;
  priceAnnual: number;
  priceYearlyTotal?: number;
  annualDiscountPercent?: number;
  tagline: string;
  idealFor?: string;
  limits: { v: string; l: string }[];
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
  contactSales?: boolean;
};

export type PersonaComparison = {
  headers: string[];
  groups: {
    name: string;
    rows: [string, boolean, boolean, boolean][];
  }[];
};

export type PersonaFaq = { q: string; a: string };

export type PersonaHubCard = {
  slug: PersonaSlug;
  label: string;
  description: string;
  fromPrice: number;
  highlights: string[];
  accent: string;
};

export type PersonaContent = {
  slug: PersonaSlug;
  label: string;
  shortLabel: string;
  accent: string;
  href: string;
  hero: PersonaHero;
  pains: PersonaPain[];
  featureBlocks: PersonaFeatureBlock[];
  features: PersonaFeature[];
  featuresHeadline: { title: string; subtitle: string };
  steps: PersonaStep[];
  stepsHeadline: { title: string; subtitle: string };
  testimonials: PersonaTestimonial[];
  plans?: PersonaPlan[];
  comparison: PersonaComparison;
  faq: PersonaFaq[];
};
