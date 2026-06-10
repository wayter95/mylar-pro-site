import type { PersonaPlan, PersonaSlug } from "./types";

const SLUG_TO_PERSONA: Record<PersonaSlug, string> = {
  broker: "BROKER",
  "real-estate": "AGENCY",
  development: "DEVELOPER",
};

type ApiLimit = { v: string; l: string };

type ApiPlan = {
  name: string;
  price: number;
  priceAnnual?: number;
  priceYearlyTotal?: number;
  annualDiscountPercent?: number;
  tagline: string;
  idealFor?: string | null;
  badge?: string | null;
  featured?: boolean;
  contactSales?: boolean;
  cta: string;
  limits: ApiLimit[];
  features: string[];
};

function isValidPlan(plan: unknown): plan is ApiPlan {
  if (!plan || typeof plan !== "object") return false;
  const p = plan as Record<string, unknown>;
  return (
    typeof p.name === "string" &&
    typeof p.price === "number" &&
    typeof p.cta === "string" &&
    Array.isArray(p.limits) &&
    Array.isArray(p.features)
  );
}

function toPersonaPlan(plan: ApiPlan): PersonaPlan {
  const priceAnnual =
    typeof plan.priceAnnual === "number" && plan.priceAnnual > 0
      ? plan.priceAnnual
      : plan.price;

  return {
    name: plan.name,
    price: plan.price,
    priceAnnual,
    priceYearlyTotal:
      typeof plan.priceYearlyTotal === "number"
        ? plan.priceYearlyTotal
        : priceAnnual * 12,
    annualDiscountPercent:
      typeof plan.annualDiscountPercent === "number"
        ? plan.annualDiscountPercent
        : undefined,
    tagline: plan.tagline ?? "",
    idealFor: plan.idealFor ?? undefined,
    limits: plan.limits,
    features: plan.features,
    cta: plan.cta,
    featured: plan.featured ?? false,
    badge: plan.badge ?? undefined,
    contactSales: plan.contactSales ?? false,
  };
}

export async function fetchPersonaFromPrices(): Promise<
  Partial<Record<PersonaSlug, number>> | undefined
> {
  const slugs: PersonaSlug[] = ["broker", "real-estate", "development"];

  const results = await Promise.all(
    slugs.map(async (slug) => {
      const plans = await fetchPersonaPlans(slug);
      if (!plans || plans.length === 0) return null;
      const cheapest = Math.min(...plans.map((p) => p.price));
      return [slug, cheapest] as const;
    }),
  );

  const entries = results.filter(
    (r): r is readonly [PersonaSlug, number] => r !== null,
  );

  if (entries.length === 0) return undefined;

  return Object.fromEntries(entries) as Partial<Record<PersonaSlug, number>>;
}

export async function fetchPersonaPlans(
  slug: PersonaSlug,
): Promise<PersonaPlan[] | undefined> {
  const apiUrl = process.env.CORE_API_URL;
  if (!apiUrl) return undefined;

  const persona = SLUG_TO_PERSONA[slug];

  try {
    const res = await fetch(
      `${apiUrl}/subscription-plans/by-persona/marketing?persona=${persona}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) return undefined;

    const json = (await res.json()) as { success?: boolean; data?: unknown };

    if (!json?.success || !Array.isArray(json.data)) return undefined;

    const plans = json.data.filter(isValidPlan);

    if (plans.length === 0) return undefined;

    return plans.map(toPersonaPlan);
  } catch {
    return undefined;
  }
}
