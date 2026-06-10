import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PersonaLanding } from "@/components/persona/PersonaLanding";
import { allPersonaSlugs, getPersona, isPersonaSlug } from "@/lib/personas";
import { fetchPersonaPlans } from "@/lib/personas/plans-api";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allPersonaSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const persona = getPersona(slug);

  if (!persona) {
    return { title: "Página não encontrada" };
  }

  return {
    title: `${persona.label} — Planos e funcionalidades`,
    description: persona.hero.subtitle,
    openGraph: {
      title: `Mylar Pro para ${persona.label}`,
      description: persona.hero.subtitle,
    },
  };
}

export default async function PersonaPage({ params }: Props) {
  const { slug } = await params;

  if (!isPersonaSlug(slug)) {
    notFound();
  }

  const persona = getPersona(slug);

  if (!persona) {
    notFound();
  }

  const apiPlans = await fetchPersonaPlans(slug);
  const personaWithPlans = { ...persona, plans: apiPlans };

  return <PersonaLanding persona={personaWithPlans} />;
}
