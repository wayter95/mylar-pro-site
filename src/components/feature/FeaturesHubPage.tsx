"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { FEATURE_GROUPS, featuresRecord, REGISTER_URL } from "@/lib/features";
import type { FeatureContent } from "@/lib/features/types";

export function FeaturesHubPage() {
  return (
    <>
      <HubHero />
      <HubGroups />
      <HubCta />
    </>
  );
}

function HubHero() {
  const total = FEATURE_GROUPS.reduce((sum, g) => sum + g.slugs.length, 0);

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
            Recursos
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mt-8 max-w-4xl text-[2rem] leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-[2.5rem] sm:leading-[1] md:text-5xl lg:text-[3.75rem] lg:leading-[0.98]"
        >
          Cada peça da operação imobiliária,{" "}
          <span className="text-[#2facde]">no mesmo lugar.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:text-[1.125rem]"
        >
          {total} módulos que dividem os mesmos imóveis, clientes, contratos e
          lançamentos financeiros. Nada de exportar de um para importar no outro.
        </motion.p>

        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {FEATURE_GROUPS.map((group) => (
            <a
              key={group.title}
              href={`#${slugifyGroup(group.title)}`}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              {group.title}
            </a>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}

function HubGroups() {
  return (
    <>
      {FEATURE_GROUPS.map((group, groupIndex) => (
        <section
          key={group.title}
          id={slugifyGroup(group.title)}
          className={`scroll-mt-20 border-t border-slate-200 py-16 lg:py-20 ${
            groupIndex % 2 === 0 ? "bg-white" : "bg-[#F8F9FB]"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-slate-300" />
                  <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
                  {group.title}
                </h2>
              </div>
              <p className="text-base leading-relaxed text-slate-600">
                {group.description}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
              {group.slugs.map((slug, i) => (
                <HubFeatureCard
                  key={slug}
                  feature={featuresRecord[slug]}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
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
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: 0.04 * index }}
    >
      <Link
        href={feature.href}
        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-sm"
      >
        <span
          className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase"
          style={{ color: feature.accent }}
        >
          {feature.shortLabel}
        </span>

        <h3 className="mt-3 text-[17px] leading-snug font-bold text-slate-900">
          {feature.label}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {feature.hubCard.description}
        </p>

        <ul className="mt-4 space-y-2">
          {feature.hubCard.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2 text-[13px] leading-snug text-slate-700"
            >
              <span
                aria-hidden
                className="mt-1.5 size-1 shrink-0 rounded-full"
                style={{ backgroundColor: feature.accent }}
              />
              {highlight}
            </li>
          ))}
        </ul>

        <span
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold transition-transform group-hover:translate-x-0.5"
          style={{ color: feature.accent }}
        >
          Ver a página
          <Icons.arrowRight aria-hidden className="size-3.5" />
        </span>
      </Link>
    </motion.div>
  );
}

function HubCta() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-[#FAFAF7] py-20 lg:py-24">
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
          Comece pelo módulo que dói mais hoje.{" "}
          <span className="text-slate-400">Você não precisa ligar tudo de uma vez.</span>
        </h2>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg">
          Trinta dias com todas as funcionalidades liberadas, sem cartão e sem
          fidelidade. A gente ajuda a priorizar e a migrar os seus dados.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2facde] px-7 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5"
            style={{ boxShadow: "0 14px 24px -14px rgba(47, 172, 222, 0.7)" }}
          >
            Criar conta grátis
            <Icons.arrowRight className="size-4" />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
          >
            <span className="border-b border-dotted border-slate-400 pb-px">
              Falar com especialista
            </span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function slugifyGroup(title: string) {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
