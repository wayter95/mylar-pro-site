"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import type { PersonaPain } from "@/lib/personas/types";

type Props = {
  pains: PersonaPain[];
  accent: string;
};

export function PersonaPains({ pains, accent }: Props) {
  return (
    <section
      className="relative overflow-hidden border-t border-slate-200 bg-[#F8F9FB] py-20 lg:py-28"
      style={{ "--persona-accent": accent } as CSSProperties}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span
                className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: accent }}
              >
                A operação hoje
              </span>
            </div>
            <h2 className="mt-5 text-3xl leading-[1.02] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Você não está sozinho —{" "}
              <span className="text-slate-400">e a gente já viu isso antes.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
            O Mylar Pro nasceu das dores reais do mercado imobiliário brasileiro — não de um
            playbook genérico de SaaS. Cada problema abaixo virou um módulo específico,
            construído com quem vive o dia a dia.
          </p>
        </div>

        {/* Pain list */}
        <div className="mt-16 divide-y divide-slate-200 border-y border-slate-200 lg:mt-20">
          {pains.map((pain, i) => (
            <PainRow
              key={pain.title}
              pain={pain}
              accent={accent}
              index={String(i + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PainRow({
  pain,
  accent,
  index,
}: {
  pain: PersonaPain;
  accent: string;
  index: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="grid gap-6 py-10 lg:grid-cols-[80px_1fr_1fr] lg:items-start lg:gap-12 lg:py-14"
    >
      {/* Index */}
      <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
        <span className="font-mono text-2xl font-bold tracking-tight text-slate-300 lg:text-3xl">
          {index}
        </span>
        <span className="h-px w-12 bg-slate-300 lg:hidden" />
      </div>

      {/* Antes (problema) */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-sm bg-rose-50 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-rose-700 uppercase">
            Antes
          </span>
        </div>
        <h3 className="mt-3 text-xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-2xl">
          {pain.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{pain.body}</p>
      </div>

      {/* Depois (solução) */}
      <div className="relative">
        <span
          aria-hidden
          className="absolute -left-4 top-0 hidden h-full w-[3px] rounded-full lg:block"
          style={{ backgroundColor: accent }}
        />
        <div className="flex items-center gap-2">
          <span
            className="rounded-sm px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
            style={{ backgroundColor: `${accent}1a`, color: accent }}
          >
            No Mylar Pro
          </span>
          <span
            className="flex size-4 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: accent }}
            aria-hidden
          >
            <Icons.check className="size-2.5" />
          </span>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed font-medium text-slate-800">
          {pain.resolved}
        </p>
      </div>
    </motion.article>
  );
}
