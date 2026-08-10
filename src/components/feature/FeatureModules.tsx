"use client";

import { motion } from "framer-motion";
import type { FeatureModule } from "@/lib/features/types";

type Props = {
  modules: FeatureModule[];
  headline: { title: string; subtitle: string };
  accent: string;
};

export function FeatureModules({ modules, headline, accent }: Props) {
  return (
    <section className="border-t border-slate-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span
                className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: accent }}
              >
                O módulo por dentro
              </span>
            </div>
            <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              {headline.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
            {headline.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {modules.map((module, i) => (
            <motion.article
              key={module.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.03 * i }}
              className="bg-white p-6 transition-colors hover:bg-slate-50"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-1 size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-slate-900">
                    {module.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {module.body}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
