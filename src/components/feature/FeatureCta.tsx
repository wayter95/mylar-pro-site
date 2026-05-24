"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { REGISTER_URL } from "@/lib/features";
import type { FeatureContent } from "@/lib/features/types";

type Props = {
  feature: FeatureContent;
};

export function FeatureCta({ feature }: Props) {
  return (
    <section
      className="relative overflow-hidden border-t border-slate-200 bg-[#F8F9FB] py-24 lg:py-32"
      style={{ "--feature-accent": feature.accent } as CSSProperties}
    >
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
            background: `linear-gradient(to right, transparent, ${feature.accent}55, transparent)`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-slate-300" />
          <span
            className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: feature.accent }}
          >
            Experimente sem compromisso
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mt-6 max-w-4xl text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[3rem]"
        >
          30 dias grátis com {feature.label.toLowerCase()}{" "}
          <span className="text-slate-400">
            e tudo mais que o Mylar Pro oferece.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600"
        >
          Sem cartão de crédito, sem letra miúda. Cancele quando quiser. Migração
          de dados inclusa.
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
              backgroundColor: feature.accent,
              boxShadow: `0 14px 24px -14px ${feature.accent}aa`,
            }}
          >
            {feature.hero.ctaPrimary}
            <Icons.arrowRight className="size-4" />
          </a>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
          >
            <span
              className="border-b border-dotted pb-0.5"
              style={{ borderColor: feature.accent }}
            >
              Prefiro conversar com a equipe
            </span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
