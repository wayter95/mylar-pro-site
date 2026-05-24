"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PERSONA_HUB_CARDS, personasRecord } from "@/lib/personas";

export function Personas() {
  return (
    <section
      id="personas"
      className="relative overflow-hidden border-t border-slate-200 bg-[#F8F9FB] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
                Para quem
              </span>
            </div>
            <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Três versões.{" "}
              <span className="text-slate-400">Uma plataforma.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
            O Mylar Pro vai do corretor solo à incorporadora bilionária. Mesmo
            CRM, mesmo catálogo, mesmo motor financeiro — o que muda são os
            módulos e a capacidade.
          </p>
        </div>

        {/* Persona cards — editorial, sem ícone genérico nem gradient pastel */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:mt-20 lg:grid-cols-3">
          {PERSONA_HUB_CARDS.map((card, i) => {
            const persona = personasRecord[card.slug];
            return (
              <motion.div
                key={card.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.08 * i }}
                className="flex flex-col bg-white"
              >
                <Link
                  href={persona.href}
                  className="group flex h-full flex-col p-7 transition hover:bg-slate-50/60 lg:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-slate-300" />
                    <span
                      className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
                      style={{ color: card.accent }}
                    >
                      {persona.shortLabel}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl leading-tight font-extrabold tracking-tight text-slate-900 lg:text-[1.35rem]">
                    {card.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {card.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {card.highlights.slice(0, 3).map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-[13px] text-slate-700"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: card.accent }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between pt-7">
                    <div>
                      <p className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                        A partir de
                      </p>
                      <p className="mt-0.5 text-base font-bold text-slate-900">
                        R$ {card.fromPrice.toLocaleString("pt-BR")}
                        <span className="text-xs font-medium text-slate-500">
                          /mês
                        </span>
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center gap-1 text-[13px] font-semibold transition group-hover:gap-2"
                      style={{ color: card.accent }}
                    >
                      Ver detalhes
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-3.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Link para hub */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/personas"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
          >
            <span className="border-b border-dotted border-slate-400 pb-px group-hover:border-slate-600">
              Comparar as três lado a lado
            </span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
