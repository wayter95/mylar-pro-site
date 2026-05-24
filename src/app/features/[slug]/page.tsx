import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureLanding } from "@/components/feature/FeatureLanding";
import { allFeatureSlugs, getFeature, isFeatureSlug } from "@/lib/features";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allFeatureSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);

  if (!feature) {
    return { title: "Página não encontrada" };
  }

  return {
    title: `${feature.label} — Recursos`,
    description: feature.hero.subtitle,
    openGraph: {
      title: `${feature.label} — Mylar Pro`,
      description: feature.hero.subtitle,
    },
  };
}

export default async function FeaturePage({ params }: Props) {
  const { slug } = await params;

  if (!isFeatureSlug(slug)) {
    notFound();
  }

  const feature = getFeature(slug);

  if (!feature) {
    notFound();
  }

  return <FeatureLanding feature={feature} />;
}
