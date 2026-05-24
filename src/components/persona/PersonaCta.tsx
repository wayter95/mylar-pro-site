"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { REGISTER_URL } from "@/lib/personas";
import type { PersonaContent } from "@/lib/personas/types";

type Props = {
  persona: PersonaContent;
};

export function PersonaCta({ persona }: Props) {
  const closingQuote = persona.testimonials.find((t) => t.featured) ?? persona.testimonials[0];

  return (
    <section
      className="relative overflow-hidden border-t border-slate-200 bg-[#F8F9FB] py-24 lg:py-32"
      style={{ "--persona-accent": persona.accent } as CSSProperties}
    >
      {/* Editorial grid lines */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(226 232 240 / 0.5) 1px, transparent 1px)",
            backgroundSize: "120px 100%",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${persona.accent}55, transparent)`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-slate-300" />
          <span
            className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: persona.accent }}
          >
            Próximo passo
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mt-6 max-w-4xl text-4xl leading-[1.02] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]"
        >
          Comece como {persona.shortLabel.toLowerCase()} hoje.{" "}
          <span className="text-slate-400">
            Decida o plano depois de 30 dias usando de verdade.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600"
        >
          Acesso completo a todas as funcionalidades — inclusive recursos do plano mais avançado.
          Sem cartão, sem letra miúda. Migração dos seus dados incluída.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5"
            style={{
              backgroundColor: persona.accent,
              boxShadow: `0 14px 24px -14px ${persona.accent}aa`,
            }}
          >
            {persona.hero.ctaPrimary}
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
          >
            <span
              className="border-b border-dotted pb-0.5"
              style={{ borderColor: persona.accent }}
            >
              Prefiro conversar com a equipe primeiro
            </span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>

        {closingQuote && (
          <motion.figure
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-16 max-w-3xl border-l-2 pl-6 lg:mt-20"
            style={{ borderColor: persona.accent }}
          >
            <blockquote>
              <p className="text-lg leading-[1.5] font-medium text-slate-700 lg:text-xl">
                “{closingQuote.quote}”
              </p>
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: persona.accent }}
              >
                {closingQuote.avatar}
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{closingQuote.name}</p>
                <p className="text-xs text-slate-500">{closingQuote.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        )}
      </div>
    </section>
  );
}
