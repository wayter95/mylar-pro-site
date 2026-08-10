"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { personaNavItems } from "@/lib/navigation";

export function PersonaCards() {
  return (
    <section className="border-t border-slate-200 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
                Para quem
              </span>
            </div>
            <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              A mesma plataforma, do corretor solo à incorporadora.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
            O que muda são os módulos ligados e a capacidade — não o sistema. Quem
            começa sozinho e monta equipe depois não troca de plataforma no meio
            do caminho.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
          {personaNavItems.map((persona, i) => {
            const PersonaIcon = Icons[persona.icon];
            return (
              <motion.div
                key={persona.href}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.06 * i }}
              >
                <Link
                  href={persona.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-sm"
                >
                  <span
                    className="flex size-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${persona.accent}14` }}
                  >
                    <PersonaIcon
                      aria-hidden
                      className="size-5"
                      style={{ color: persona.accent }}
                    />
                  </span>

                  <h3 className="mt-4 text-[17px] leading-snug font-bold text-slate-900">
                    {persona.label}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {persona.description}
                  </p>

                  <span
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold transition-transform group-hover:translate-x-0.5"
                    style={{ color: persona.accent }}
                  >
                    Ver a plataforma
                    <Icons.arrowRight aria-hidden className="size-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
