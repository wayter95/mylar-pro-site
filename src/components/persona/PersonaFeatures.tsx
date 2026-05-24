"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { PERSONA_FEATURE_VISUAL } from "@/components/persona/mockups";
import type { PersonaFeature, PersonaFeatureBlock } from "@/lib/personas/types";

type Props = {
  blocks: PersonaFeatureBlock[];
  features: PersonaFeature[];
  headline: { title: string; subtitle: string };
  accent: string;
};

export function PersonaFeatures({ blocks, features, headline, accent }: Props) {
  const secondaryFeatures = features.filter((f) => !f.hero);

  return (
    <section
      id="funcionalidades"
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
              Funcionalidades
            </span>
          </div>
          <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            {headline.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{headline.subtitle}</p>
        </div>

        {/* Product blocks */}
        <div className="mt-20 space-y-28 lg:mt-28 lg:space-y-36">
          {blocks.map((block, i) => {
            const Visual = PERSONA_FEATURE_VISUAL[block.visual];
            const isReverse = i % 2 === 1;
            const blockNumber = String(i + 1).padStart(2, "0");

            return (
              <ProductBlock
                key={block.title}
                block={block}
                visual={Visual ? <Visual accent={accent} /> : null}
                accent={accent}
                reverse={isReverse}
                index={blockNumber}
              />
            );
          })}
        </div>

        {/* Secondary features grid */}
        {secondaryFeatures.length > 0 && (
          <div className="mt-24 border-t border-slate-200 pt-16 lg:mt-32 lg:pt-20">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span
                className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase"
              >
                E também
              </span>
            </div>

            <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {secondaryFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: 0.05 * i }}
                  className="border-l-2 pl-5"
                  style={{ borderColor: `${accent}40` }}
                >
                  <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductBlock({
  block,
  visual,
  accent,
  reverse,
  index,
}: {
  block: PersonaFeatureBlock;
  visual: React.ReactNode;
  accent: string;
  reverse: boolean;
  index: string;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.55 }}
        className={reverse ? "lg:order-2" : ""}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400">
            {index}
          </span>
          <span className="h-px w-6 bg-slate-300" />
          <span
            className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: accent }}
          >
            {block.eyebrow}
          </span>
        </div>

        <h3 className="mt-5 text-2xl leading-[1.15] font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[2rem]">
          {block.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-slate-600 lg:text-[1.05rem]">
          {block.body}
        </p>

        <ul className="mt-6 space-y-2.5">
          {block.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm text-slate-700">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {bullet}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`relative ${reverse ? "lg:order-1" : ""}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-3xl blur-3xl"
          style={{ backgroundColor: `${accent}0F` }}
        />
        <div className="relative">{visual}</div>
      </motion.div>
    </div>
  );
}
