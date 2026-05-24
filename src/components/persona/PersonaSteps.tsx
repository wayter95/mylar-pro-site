"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import type { PersonaStep } from "@/lib/personas/types";

type Props = {
  steps: PersonaStep[];
  headline: { title: string; subtitle: string };
  accent: string;
};

export function PersonaSteps({ steps, headline, accent }: Props) {
  return (
    <section
      className="relative overflow-hidden border-t border-slate-200 bg-white py-20 lg:py-28"
      style={{ "--persona-accent": accent } as CSSProperties}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial header */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span
                className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: accent }}
              >
                Como começar
              </span>
            </div>
            <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              {headline.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
            {headline.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16 lg:mt-24">
          {/* Horizontal connector line (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[34px] hidden h-px lg:block"
            style={{
              background: `linear-gradient(to right, transparent 4%, ${accent}33 12%, ${accent}33 88%, transparent 96%)`,
            }}
          />

          {/* Vertical connector (mobile) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[14px] top-0 bottom-0 w-px lg:hidden"
            style={{ backgroundColor: `${accent}33` }}
          />

          <ol
            className={`grid gap-x-8 gap-y-10 ${
              steps.length === 4
                ? "lg:grid-cols-4"
                : steps.length === 3
                  ? "lg:grid-cols-3"
                  : "lg:grid-cols-2"
            }`}
          >
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              return (
                <motion.li
                  key={step.num}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.08 * i }}
                  className="relative pl-12 lg:pl-0"
                >
                  {/* Node */}
                  <div className="absolute left-0 top-0 lg:relative lg:left-auto lg:top-auto">
                    <div
                      className="relative flex size-8 items-center justify-center rounded-full bg-white ring-2 lg:size-9"
                      style={{ "--tw-ring-color": accent } as CSSProperties}
                    >
                      <span
                        className="font-mono text-[11px] font-extrabold tracking-tight lg:text-xs"
                        style={{ color: accent }}
                      >
                        {step.num}
                      </span>
                    </div>
                  </div>

                  {/* Mobile connector chevron */}
                  {!isLast && (
                    <span
                      aria-hidden
                      className="absolute left-[14px] top-9 hidden h-6 w-px lg:hidden"
                      style={{ backgroundColor: `${accent}55` }}
                    />
                  )}

                  {/* Content */}
                  <div className="lg:mt-6">
                    <h3 className="text-lg font-extrabold tracking-tight text-slate-900 lg:text-[1.15rem]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
