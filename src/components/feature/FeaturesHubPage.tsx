"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { FEATURE_ORDER, featuresRecord, REGISTER_URL } from "@/lib/features";
import type { FeatureContent } from "@/lib/features/types";

export function FeaturesHubPage() {
  return (
    <>
      <HubHero />
      <HubFeatureList />
      <HubCta />
    </>
  );
}

function HubHero() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF7] pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(226 232 240 / 0.5) 1px, transparent 1px)",
            backgroundSize: "120px 100%",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-slate-300" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
            Recursos · Tudo em uma plataforma
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mt-8 max-w-4xl text-[2rem] leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-[2.5rem] sm:leading-[1] md:text-5xl lg:text-[3.75rem] lg:leading-[0.98]"
        >
          Quatro recursos.{" "}
          <span className="text-[#2facde]">
            Uma plataforma que cresce com você.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:text-[1.125rem]"
        >
          App nativo, site público de imóveis, portal do cliente e assinatura
          digital. Não são produtos vendidos separadamente — são partes do mesmo
          Mylar Pro, integradas desde o primeiro dia.
        </motion.p>
      </div>
    </section>
  );
}

function HubFeatureList() {
  return (
    <section className="border-t border-slate-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
                Os quatro recursos
              </span>
            </div>
            <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Conheça cada um por dentro.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
            Cada recurso tem uma página dedicada com detalhes de funcionamento,
            casos de uso e perguntas frequentes. Tudo libera junto no teste
            grátis.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:gap-10">
          {FEATURE_ORDER.map((slug, i) => {
            const feature = featuresRecord[slug];
            return (
              <HubFeatureCard key={slug} feature={feature} index={i} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HubFeatureCard({
  feature,
  index,
}: {
  feature: FeatureContent;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-slate-300 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12 lg:p-10"
    >
      <div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-slate-300" />
          <span
            className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: feature.accent }}
          >
            {feature.shortLabel}
          </span>
        </div>

        <h3 className="mt-5 text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-[1.75rem]">
          {feature.label}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          {feature.hubCard.description}
        </p>

        <ul className="mt-6 space-y-2.5">
          {feature.hubCard.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2.5 text-sm text-slate-700"
            >
              <span
                aria-hidden
                className="mt-1.5 size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: feature.accent }}
              />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            href={feature.href}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            style={{
              backgroundColor: feature.accent,
              boxShadow: `0 12px 24px -14px ${feature.accent}aa`,
            }}
          >
            Ver detalhes de {feature.shortLabel.toLowerCase()}
            <Icons.arrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* Highlight side */}
      <div
        className="rounded-2xl bg-[#F8F9FB] p-7 lg:border-l-2"
        style={{ borderColor: `${feature.accent}40` }}
      >
        <p className="font-mono text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
          O que você ganha
        </p>
        <p className="mt-3 text-base leading-snug font-medium text-slate-800 lg:text-lg">
          {feature.benefits[0]}
        </p>
        {feature.benefits[1] && (
          <p className="mt-3 border-t border-slate-200 pt-3 text-sm leading-relaxed text-slate-600">
            {feature.benefits[1]}
          </p>
        )}
      </div>
    </motion.article>
  );
}

function HubCta() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-[#F8F9FB] py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(226 232 240 / 0.5) 1px, transparent 1px)",
            backgroundSize: "120px 100%",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-slate-300" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
            Teste grátis
          </span>
        </div>

        <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
          Os quatro recursos liberados.{" "}
          <span className="text-slate-400">Sem cartão, sem fidelidade.</span>
        </h2>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg">
          30 dias para testar tudo de verdade — App do Corretor, Catálogo,
          Portal do Cliente e Assinatura Digital — com sua operação real e seus
          dados migrados.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2facde] px-7 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5"
            style={{ boxShadow: "0 14px 24px -14px rgba(47, 172, 222, 0.7)" }}
          >
            Começar 30 dias grátis
            <Icons.arrowRight className="size-4" />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
          >
            <span className="border-b border-dotted border-slate-400 pb-px">
              Conversar com a equipe primeiro
            </span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
