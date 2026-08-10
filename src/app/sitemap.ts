import type { MetadataRoute } from "next";

const SITE_URL = "https://mylarpro.com.br";

const FEATURE_SLUGS = [
  "broker-app",
  "client-portal",
  "digital-signature",
  "property-catalog",
];

const PERSONA_SLUGS = ["broker", "real-estate", "development"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/plans`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/features`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/personas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/partners`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/links`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/home/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/home/terms-of-use`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/brokers/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/brokers/terms-of-use`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const featureRoutes: MetadataRoute.Sitemap = FEATURE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/features/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const personaRoutes: MetadataRoute.Sitemap = PERSONA_SLUGS.map((slug) => ({
    url: `${SITE_URL}/personas/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...featureRoutes, ...personaRoutes].map((route) => ({
    ...route,
    lastModified: now,
  }));
}
