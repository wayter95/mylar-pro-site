"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { PlanLimitCards } from "@/components/persona/PlanLimitCards";
import { PersonaSwitcher } from "@/components/persona/PersonaSwitcher";
import { REGISTER_URL } from "@/lib/personas";
import type { PersonaPlan } from "@/lib/personas/types";

type Props = {
  plans: PersonaPlan[];
  personaLabel: string;
  accent: string;
};

function formatMonthly(price: number) {
  return price.toLocaleString("pt-BR");
}

export function PersonaPricing({ plans, personaLabel, accent }: Props) {
  return (
    <section
      id="planos"
      className="relative overflow-hidden border-t border-slate-200 bg-[#F8F9FB] py-20 lg:py-28"
      style={{ "--persona-accent": accent } as CSSProperties}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span
                className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: accent }}
              >
                Planos
              </span>
            </div>
            <h2 className="mt-5 text-3xl leading-[1.02] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Para{" "}
              <span className="text-slate-400">{personaLabel.toLowerCase()}</span>
              <br />
              em cada estágio.
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
              Três níveis que escalam com sua operação. 30 dias grátis com{" "}
              <span className="font-semibold text-slate-800">todas as funcionalidades</span>{" "}
              liberadas — você escolhe o plano depois de usar de verdade.
            </p>
            <div className="mt-5">
              <PersonaSwitcher
                accent={accent}
                variant="compact"
                prefix="Mostrando planos de"
              />
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:mt-20 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <PlanColumn
              key={plan.name}
              plan={plan}
              accent={accent}
              index={String(i + 1).padStart(2, "0")}
            />
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-8 max-w-2xl text-sm text-slate-500">
          Preço anual com pagamento mensal · sem multa de fidelidade · migração de dados inclusa
          em todos os planos.
        </p>
      </div>
    </section>
  );
}

function PlanColumn({
  plan,
  accent,
  index,
}: {
  plan: PersonaPlan;
  accent: string;
  index: string;
}) {
  const monthlyPrice = formatMonthly(plan.priceAnnual);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`relative flex flex-col bg-white p-7 lg:p-8 ${
        plan.featured ? "lg:scale-[1.02] lg:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)]" : ""
      }`}
      style={
        plan.featured
          ? ({ "--plan-accent": accent, boxShadow: `inset 0 0 0 2px ${accent}` } as CSSProperties)
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

      {/* Index + name */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400">
          {index}
        </span>
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">{plan.name}</h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{plan.tagline}</p>

      {/* Ideal for */}
      {plan.idealFor && (
        <div className="mt-5 border-l-2 pl-3" style={{ borderColor: `${accent}55` }}>
          <p className="text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
            Indicado para
          </p>
          <p className="mt-1 text-[13px] leading-snug text-slate-700">{plan.idealFor}</p>
        </div>
      )}

      {/* Limits */}
      <PlanLimitCards limits={plan.limits} accent={accent} />

      {/* Price */}
      <div className="mt-6 border-t border-slate-200 pt-6">
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-slate-400">R$</span>
          <span className="text-[2.75rem] leading-none font-extrabold tracking-tight text-slate-900">
            {monthlyPrice}
          </span>
          <span className="ml-1 text-sm text-slate-400">/mês</span>
        </div>
        <p className="mt-1.5 text-[11px] text-slate-500">
          ou R$ {formatMonthly(plan.price)}/mês no mensal
        </p>
      </div>

      {/* CTA */}
      <a
        href={REGISTER_URL}
        target="_blank"
        rel="noopener noreferrer"
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
        Testar 30 dias
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
            clipRule="evenodd"
          />
        </svg>
      </a>

      {/* Features */}
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
