"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import type { PersonaTestimonial } from "@/lib/personas/types";

type Props = {
  testimonials: PersonaTestimonial[];
  accent: string;
};

export function PersonaTestimonials({ testimonials, accent }: Props) {
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const others = testimonials.filter((t) => t !== featured).slice(0, 2);

  if (!featured) return null;

  return (
    <section
      className="relative overflow-hidden border-t border-slate-200 bg-white py-20 lg:py-28"
      style={{ "--persona-accent": accent } as CSSProperties}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-slate-300" />
            <span
              className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: accent }}
            >
              Construído com o mercado real
            </span>
          </div>
          <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Quem opera no Brasil de verdade —{" "}
            <span className="text-slate-400">e o que mudou na operação.</span>
          </h2>
        </div>

        {/* Featured */}
        <motion.figure
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16"
        >
          <div>
            <Icons.quote
              aria-hidden
              className="size-7"
              style={{ color: accent, opacity: 0.25 }}
            />
            <blockquote className="mt-4">
              <p className="text-2xl leading-[1.25] font-medium tracking-tight text-slate-900 sm:text-[1.65rem] lg:text-[1.85rem]">
                “{featured.quote}”
              </p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: accent }}
              >
                {featured.avatar}
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{featured.name}</p>
                <p className="text-xs text-slate-500">{featured.role}</p>
              </div>
            </figcaption>
          </div>

          {featured.stats && featured.stats.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
              {featured.stats.map((stat) => (
                <div
                  key={stat.l}
                  className="rounded-2xl border border-slate-200 bg-[#F8F9FB] p-6"
                >
                  <p
                    className="font-extrabold tracking-tight"
                    style={{ color: accent, fontSize: "2.5rem", lineHeight: 1 }}
                  >
                    {stat.v}
                  </p>
                  <p className="mt-2 text-xs font-medium tracking-wide text-slate-500 uppercase">
                    {stat.l}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.figure>

        {/* Secondary quotes */}
        {others.length > 0 && (
          <div className="mt-20 grid gap-10 border-t border-slate-200 pt-16 sm:grid-cols-2 lg:mt-24 lg:gap-16">
            {others.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <blockquote>
                  <p className="text-lg leading-[1.45] font-medium text-slate-800">
                    “{t.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {t.avatar}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
