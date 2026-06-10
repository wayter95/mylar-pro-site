# Página `/plans` dedicada — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma página `/plans` dedicada no padrão Bling (planos numa página única, com tabs de persona e toggle global Mensal/Anual), reaproveitando as personas e os preços reais do backend.

**Architecture:** Server component (`page.tsx`) busca os planos das 3 personas em paralelo via `fetchPersonaPlans()` e passa para um client component (`PlansPage`) que mantém estado de persona ativa e período de cobrança, orquestrando as seções (hero+tabs+toggle, cards, garantia, comparativo, FAQ, CTA). Componentes existentes `PersonaComparison` e `PersonaFaq` são reusados; a seção de cards é nova mas espelha a lógica visual de `PersonaPricing`.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind v4, framer-motion. Sem comentários no código. Texto user-facing em pt-BR. Sem testes automatizados (projeto não tem suíte de testes de UI; verificação via `tsc`, `lint`, `build` e preview).

---

## File Structure

- `src/lib/personas/types.ts` — adicionar `priceYearlyTotal?` e `annualDiscountPercent?` a `PersonaPlan`.
- `src/lib/personas/plans-api.ts` — mapear os dois campos novos da API.
- `src/components/plans/PlanCard.tsx` — **novo**: card de plano que reage ao período (mensal/anual).
- `src/components/plans/PlansPage.tsx` — **novo**: client component com estado e orquestração das seções.
- `src/app/plans/page.tsx` — **novo**: server component, busca planos e metadata.
- `src/components/landing/Header.tsx` — adicionar item "Planos" ao `navLinks`.

---

## Task 1: Expor campos de preço anual no tipo e na API

**Files:**
- Modify: `src/lib/personas/types.ts`
- Modify: `src/lib/personas/plans-api.ts`

- [ ] **Step 1: Adicionar campos ao tipo `PersonaPlan`**

Em `src/lib/personas/types.ts`, localizar o tipo `PersonaPlan` e adicionar dois campos opcionais antes do fechamento:

```ts
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
```

- [ ] **Step 2: Adicionar os campos ao tipo `ApiPlan` em `plans-api.ts`**

Em `src/lib/personas/plans-api.ts`, no tipo `ApiPlan`, adicionar após `priceAnnual?: number;`:

```ts
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
```

- [ ] **Step 3: Mapear os campos em `toPersonaPlan()`**

Em `src/lib/personas/plans-api.ts`, dentro de `toPersonaPlan()`, adicionar ao objeto retornado (após `priceAnnual,`):

```ts
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
```

- [ ] **Step 4: Verificar tipos**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && npx tsc --noEmit`
Expected: PASS (sem erros).

---

## Task 2: Componente `PlanCard` (reage ao período)

**Files:**
- Create: `src/components/plans/PlanCard.tsx`

- [ ] **Step 1: Criar o componente `PlanCard`**

Criar `src/components/plans/PlanCard.tsx`. Espelha a lógica visual de `PlanColumn` em `src/components/persona/PersonaPricing.tsx`, mas o bloco de preço reage ao `period`. Reusa `PlanLimitCards`, `Icons` e `REGISTER_URL`.

```tsx
"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { PlanLimitCards } from "@/components/persona/PlanLimitCards";
import { Icons } from "@/lib/icons";
import { REGISTER_URL } from "@/lib/personas";
import type { PersonaPlan } from "@/lib/personas/types";

type BillingPeriod = "monthly" | "annual";

type Props = {
  plan: PersonaPlan;
  accent: string;
  index: string;
  period: BillingPeriod;
};

function formatPrice(price: number) {
  const hasCents = !Number.isInteger(price);
  return price.toLocaleString("pt-BR", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

export function PlanCard({ plan, accent, index, period }: Props) {
  const annualMonthly =
    plan.priceAnnual && plan.priceAnnual > 0 ? plan.priceAnnual : plan.price;
  const isAnnual = period === "annual";
  const displayPrice = isAnnual ? annualMonthly : plan.price;
  const yearlyTotal =
    plan.priceYearlyTotal && plan.priceYearlyTotal > 0
      ? plan.priceYearlyTotal
      : annualMonthly * 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`relative flex flex-col bg-white p-7 lg:p-8 ${
        plan.featured
          ? "lg:scale-[1.02] lg:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)]"
          : ""
      }`}
      style={
        plan.featured
          ? ({ boxShadow: `inset 0 0 0 2px ${accent}` } as CSSProperties)
          : undefined
      }
    >
      {plan.badge && (
        <div
          className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase"
          style={{ backgroundColor: accent }}
        >
          <span className="size-1.5 rounded-full bg-white" />
          {plan.badge}
        </div>
      )}

      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400">
          {index}
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">
          {plan.name}
        </h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        {plan.tagline}
      </p>

      {plan.idealFor && (
        <div className="mt-5 border-l-2 pl-3" style={{ borderColor: `${accent}55` }}>
          <p className="text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
            Indicado para
          </p>
          <p className="mt-1 text-[13px] leading-snug text-slate-700">
            {plan.idealFor}
          </p>
        </div>
      )}

      <PlanLimitCards limits={plan.limits} accent={accent} />

      <div className="mt-6 border-t border-slate-200 pt-6">
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-slate-400">R$</span>
          <span className="text-[2.75rem] leading-none font-extrabold tracking-tight text-slate-900">
            {formatPrice(displayPrice)}
          </span>
          <span className="ml-1 text-sm text-slate-400">/mês</span>
        </div>
        <p className="mt-1.5 text-[11px] text-slate-500">
          {isAnnual
            ? `cobrado R$ ${formatPrice(yearlyTotal)}/ano`
            : `cobrança mensal · ou R$ ${formatPrice(annualMonthly)}/mês no anual`}
        </p>
      </div>

      <a
        href={plan.contactSales ? "/contact" : REGISTER_URL}
        target={plan.contactSales ? undefined : "_blank"}
        rel={plan.contactSales ? undefined : "noopener noreferrer"}
        className={`mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-lg py-3 text-sm font-semibold transition ${
          plan.featured
            ? "text-white hover:-translate-y-0.5"
            : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
        }`}
        style={
          plan.featured
            ? { backgroundColor: accent, boxShadow: `0 14px 24px -14px ${accent}99` }
            : undefined
        }
      >
        {plan.cta}
        <Icons.arrowRight className="size-4" />
      </a>

      <ul className="mt-7 space-y-3 border-t border-slate-100 pt-6">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-700"
          >
            <span
              aria-hidden
              className="mt-1.5 size-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
            />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verificar tipos**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && npx tsc --noEmit`
Expected: PASS (PlanCard ainda não é importado em lugar nenhum, mas deve tipar).

---

## Task 3: Componente `PlansPage` (estado + seções)

**Files:**
- Create: `src/components/plans/PlansPage.tsx`

- [ ] **Step 1: Criar o componente `PlansPage`**

Criar `src/components/plans/PlansPage.tsx`. Recebe os planos reais por slug e os `PersonaContent` estáticos. Mantém estado de persona ativa e período. Reusa `PersonaComparison` e `PersonaFaq` existentes.

```tsx
"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { PersonaComparison } from "@/components/persona/PersonaComparison";
import { PersonaFaq } from "@/components/persona/PersonaFaq";
import { PlanCard } from "@/components/plans/PlanCard";
import { Icons } from "@/lib/icons";
import { PERSONA_ORDER, personasRecord } from "@/lib/personas";
import type { PersonaPlan, PersonaSlug } from "@/lib/personas/types";

type BillingPeriod = "monthly" | "annual";

type Props = {
  plansBySlug: Partial<Record<PersonaSlug, PersonaPlan[]>>;
};

function resolveDiscount(plans?: PersonaPlan[]): number {
  if (!plans) return 0;
  const withDiscount = plans.find(
    (p) => typeof p.annualDiscountPercent === "number" && p.annualDiscountPercent > 0,
  );
  return withDiscount?.annualDiscountPercent ?? 0;
}

export function PlansPage({ plansBySlug }: Props) {
  const [activePersona, setActivePersona] = useState<PersonaSlug>("broker");
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  const persona = personasRecord[activePersona];
  const accent = persona.accent;
  const plans = plansBySlug[activePersona];
  const discount = resolveDiscount(plans);

  return (
    <main className="pt-14 sm:pt-16" style={{ "--persona-accent": accent } as CSSProperties}>
      <section className="relative overflow-hidden bg-[#FAFAF7] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-slate-300" />
            <span
              className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: accent }}
            >
              Planos e preços
            </span>
          </div>
          <h1 className="mt-6 max-w-3xl text-[2.5rem] leading-[1.02] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
            Escolha o plano que cresce com você.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
            30 dias grátis com todas as funcionalidades liberadas. Sem cartão, sem multa
            de fidelidade. Você escolhe o plano depois de usar de verdade.
          </p>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="tablist"
              aria-label="Selecionar perfil"
              className="inline-flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1"
            >
              {PERSONA_ORDER.map((slug) => {
                const p = personasRecord[slug];
                const active = slug === activePersona;
                return (
                  <button
                    key={slug}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActivePersona(slug)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      active ? "text-white" : "text-slate-600 hover:text-slate-900"
                    }`}
                    style={active ? { backgroundColor: p.accent } : undefined}
                  >
                    {p.shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="inline-flex items-center gap-3">
              <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setPeriod("monthly")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    period === "monthly"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Mensal
                </button>
                <button
                  type="button"
                  onClick={() => setPeriod("annual")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    period === "annual"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Anual
                </button>
              </div>
              {discount > 0 && (
                <span
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide"
                  style={{ backgroundColor: `${accent}1a`, color: accent }}
                >
                  <Icons.sparkles className="size-3.5" />
                  -{discount}% · 2 meses grátis
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#F8F9FB] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {plans && plans.length > 0 ? (
            <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:grid-cols-3">
              {plans.map((plan, i) => (
                <PlanCard
                  key={plan.name}
                  plan={plan}
                  accent={accent}
                  index={String(i + 1).padStart(2, "0")}
                  period={period}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-base font-semibold text-slate-900">
                Planos sob consulta para {persona.label.toLowerCase()}.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Fale com nosso time para montar a proposta ideal.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Falar com vendas
                <Icons.arrowRight className="size-4" />
              </a>
            </div>
          )}

          <p className="mt-8 max-w-2xl text-sm text-slate-500">
            Preço anual com pagamento facilitado · sem multa de fidelidade · migração de
            dados inclusa em todos os planos.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Icons.sparkles, t: "30 dias grátis", d: "Todas as funcionalidades liberadas." },
            { icon: Icons.shieldCheck, t: "Sem cartão", d: "Comece sem informar pagamento." },
            { icon: Icons.heart, t: "Sem fidelidade", d: "Cancele quando quiser, sem multa." },
            { icon: Icons.database, t: "Migração inclusa", d: "Trazemos seus dados sem custo." },
          ].map((item) => (
            <div key={item.t} className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${accent}14`, color: accent }}
              >
                <item.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.t}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-slate-500">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PersonaComparison comparison={persona.comparison} accent={accent} />

      <PersonaFaq faq={persona.faq} personaLabel={persona.label} />

      <section className="border-t border-slate-200 bg-slate-900 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Precisa de algo sob medida?
          </motion.h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Operações maiores, integrações específicas ou volume fora do padrão — montamos
            uma proposta para o seu caso.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
          >
            Falar com vendas
            <Icons.arrowRight className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verificar tipos**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && npx tsc --noEmit`
Expected: PASS.

---

## Task 4: Rota `/plans` (server component)

**Files:**
- Create: `src/app/plans/page.tsx`

- [ ] **Step 1: Criar a página server**

Criar `src/app/plans/page.tsx`. Busca os planos das 3 personas em paralelo e monta o record por slug.

```tsx
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
```

- [ ] **Step 2: Verificar tipos**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && npx tsc --noEmit`
Expected: PASS.

---

## Task 5: Adicionar "Planos" ao Header

**Files:**
- Modify: `src/components/landing/Header.tsx`

- [ ] **Step 1: Inserir item no `navLinks`**

Em `src/components/landing/Header.tsx`, no array `navLinks`, adicionar um item `{ href: "/plans", label: "Planos" }` logo após o bloco de `/personas` (que termina em `]`) e antes de `{ href: "/contact", label: "Contato" }`:

```ts
  {
    href: "/personas",
    label: "Para quem",
    children: [
      // ... (mantém os children existentes)
    ],
  },
  { href: "/plans", label: "Planos" },
  { href: "/contact", label: "Contato" },
];
```

- [ ] **Step 2: Verificar tipos**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && npx tsc --noEmit`
Expected: PASS.

---

## Task 6: Verificação final

**Files:** nenhum (verificação).

- [ ] **Step 1: Type-check**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && npx tsc --noEmit`
Expected: PASS sem erros.

- [ ] **Step 2: Lint**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && yarn lint`
Expected: PASS (sem novos erros nos arquivos criados/modificados).

- [ ] **Step 3: Build**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && yarn build`
Expected: build conclui; rota `/plans` aparece na lista de rotas.

- [ ] **Step 4: Verificação no preview**

Iniciar o dev server (`preview_start`), abrir `/plans` e confirmar via `preview_snapshot` / `preview_screenshot`:
- Tabs de persona trocam cards, tabela comparativa e FAQ.
- Toggle Mensal/Anual recalcula os preços nos 3 cards.
- Selo de desconto aparece quando `annualDiscountPercent` existe.
- Item "Planos" visível no Header.
Capturar screenshot final como prova.
