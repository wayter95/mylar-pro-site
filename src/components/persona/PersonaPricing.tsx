"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { PlanLimitCards } from "@/components/persona/PlanLimitCards";
import { PersonaSwitcher } from "@/components/persona/PersonaSwitcher";
import { CustomPlanCta } from "@/components/plans/CustomPlanCta";
import { Icons } from "@/lib/icons";
import { REGISTER_URL } from "@/lib/personas";
import type { PersonaPlan } from "@/lib/personas/types";

type Props = {
  plans?: PersonaPlan[];
  personaLabel: string;
  accent: string;
};

function formatMonthly(price: number) {
  const hasCents = !Number.isInteger(price);
  return price.toLocaleString("pt-BR", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

export function PersonaPricing({ plans, personaLabel, accent }: Props) {
  if (!plans || plans.length === 0) {
    return (
      <section
        id="planos"
        className="relative overflow-hidden border-t border-slate-200 bg-[#F8F9FB] py-20 lg:py-28"
        style={{ "--persona-accent": accent } as CSSProperties}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PricingHeader
            personaLabel={personaLabel}
            accent={accent}
            subtitle="Operações de lançamento têm formato próprio. Em vez de preço de tabela, desenhamos o plano junto com você."
          />
          <div className="mt-16 lg:mt-20">
            <CustomPlanCta accent={accent} personaLabel={personaLabel} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="planos"
      className="relative overflow-hidden border-t border-slate-200 bg-[#F8F9FB] py-20 lg:py-28"
      style={{ "--persona-accent": accent } as CSSProperties}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PricingHeader
          personaLabel={personaLabel}
          accent={accent}
          subtitle="Dois níveis que escalam com sua operação. 30 dias grátis com todas as funcionalidades liberadas, você escolhe o plano depois de usar de verdade."
        />

        {/* Plans */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:mt-20 lg:grid-cols-2">
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

function PricingHeader({
  personaLabel,
  accent,
  subtitle,
}: {
  personaLabel: string;
  accent: string;
  subtitle: string;
}) {
  return (
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
        <p className="text-base leading-relaxed text-slate-600 lg:text-lg">{subtitle}</p>
        <div className="mt-5">
          <PersonaSwitcher
            accent={accent}
            variant="compact"
            prefix="Mostrando planos de"
          />
        </div>
      </div>
    </div>
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
  const annualMonthlyValue =
    plan.priceAnnual && plan.priceAnnual > 0 ? plan.priceAnnual : plan.price;
  const monthlyPrice = formatMonthly(annualMonthlyValue);
  const discountPercent =
    plan.price > 0 && annualMonthlyValue < plan.price
      ? Math.round((1 - annualMonthlyValue / plan.price) * 100)
      : 0;

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
          {discountPercent > 0 && (
            <span
              className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide"
              style={{ backgroundColor: `${accent}1a`, color: accent }}
            >
              -{discountPercent}%
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[11px] text-slate-500">
          {discountPercent > 0
            ? `no plano anual · ou R$ ${formatMonthly(plan.price)}/mês no mensal`
            : `cobrança mensal`}
        </p>
      </div>

      {/* CTA */}
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
