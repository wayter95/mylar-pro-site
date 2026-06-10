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

function formatMoney(value: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
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
  const yearlyFull = plan.price * 12;
  const annualSavings = yearlyFull - yearlyTotal;
  const showAnnualBreakdown = isAnnual && annualSavings > 0;

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

        {showAnnualBreakdown ? (
          <div className="mt-3 space-y-2">
            <p className="text-[13px] leading-snug text-slate-600">
              De{" "}
              <span className="text-slate-400 line-through">
                R$ {formatMoney(yearlyFull)}
              </span>{" "}
              por{" "}
              <span className="font-bold text-slate-900">
                R$ {formatMoney(yearlyTotal)}
              </span>
              .
            </p>
            <p
              className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide"
              style={{ backgroundColor: `${accent}1a`, color: accent }}
            >
              Economia de R$ {formatMoney(annualSavings)}/ano
            </p>
            <p className="text-[12px] leading-snug text-slate-500">
              Parcelas de{" "}
              <span className="text-slate-400 line-through">
                R$ {formatMoney(plan.price)}
              </span>{" "}
              por{" "}
              <span className="font-semibold text-slate-700">
                R$ {formatMoney(annualMonthly)}/mês
              </span>{" "}
              (plano fidelidade 12 meses).
            </p>
          </div>
        ) : (
          <p className="mt-1.5 text-[11px] text-slate-500">
            {`cobrança mensal · ou R$ ${formatPrice(annualMonthly)}/mês no anual`}
          </p>
        )}
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
