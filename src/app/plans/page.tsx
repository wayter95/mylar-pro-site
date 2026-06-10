import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { PlansPage } from "@/components/plans/PlansPage";
import { PERSONA_ORDER } from "@/lib/personas";
import { fetchPersonaPlans } from "@/lib/personas/plans-api";
import type { PersonaPlan, PersonaSlug } from "@/lib/personas/types";

export const metadata: Metadata = {
  title: "Planos e preços — Mylar Pro",
  description:
    "Compare os planos do Mylar Pro para corretor, imobiliária e lançamentos. Mensal ou anual, com 30 dias grátis, sem cartão e sem multa de fidelidade.",
  openGraph: {
    title: "Planos e preços — Mylar Pro",
    description:
      "Escolha o plano que cresce com você. Corretor, imobiliária ou lançamentos — mensal ou anual.",
  },
};

export default async function Plans() {
  const results = await Promise.all(
    PERSONA_ORDER.map(async (slug) => {
      const plans = await fetchPersonaPlans(slug);
      return [slug, plans] as const;
    }),
  );

  const plansBySlug = results.reduce<Partial<Record<PersonaSlug, PersonaPlan[]>>>(
    (acc, [slug, plans]) => {
      if (plans) acc[slug] = plans;
      return acc;
    },
    {},
  );

  return (
    <>
      <Header />
      <PlansPage plansBySlug={plansBySlug} />
      <Footer />
    </>
  );
}
