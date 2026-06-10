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

          <div
            id="migracao"
            className="mt-8 flex flex-col gap-5 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-7 sm:flex-row sm:items-center sm:justify-between lg:p-8"
            style={{ boxShadow: `inset 0 0 0 1px ${accent}1f` }}
          >
            <div className="flex items-start gap-4">
              <span
                className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${accent}14`, color: accent }}
              >
                <Icons.database className="size-6" />
              </span>
              <div>
                <p className="text-base font-bold text-slate-900">
                  Vem de outro sistema ou tem outras dúvidas?
                </p>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-500">
                  Ajudamos na migração dos seus dados e tiramos qualquer dúvida sobre os
                  planos. Fale com nosso time e a gente cuida do resto.
                </p>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              style={{ backgroundColor: accent, boxShadow: `0 14px 24px -14px ${accent}99` }}
            >
              Falar com vendas
              <Icons.arrowRight className="size-4" />
            </a>
          </div>

          <p className="mt-8 max-w-2xl text-sm text-slate-500">
            Plano mensal sem fidelidade · plano anual com 12 meses e desconto · sem
            surpresa na hora de escalar.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Icons.sparkles, t: "30 dias grátis", d: "Todas as funcionalidades liberadas." },
            { icon: Icons.shieldCheck, t: "Sem cartão", d: "Comece sem informar pagamento." },
            { icon: Icons.heart, t: "Pagamento flexível", d: "Mensal sem fidelidade ou anual com desconto." },
            { icon: Icons.message, t: "Suporte humano", d: "Atendimento por chat e WhatsApp com gente de verdade." },
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
