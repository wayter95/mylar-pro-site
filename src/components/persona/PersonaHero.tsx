"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PERSONA_HERO_MOCKUP } from "@/components/persona/mockups";
import { PersonaSwitcher } from "@/components/persona/PersonaSwitcher";
import { Icons } from "@/lib/icons";
import { REGISTER_URL } from "@/lib/personas";
import type { PersonaContent } from "@/lib/personas/types";

type Props = {
  persona: PersonaContent;
};

const personaIndex: Record<PersonaContent["slug"], string> = {
  broker: "01",
  "real-estate": "02",
  development: "03",
};

export function PersonaHero({ persona }: Props) {
  const [before, mid, after] = persona.hero.title;
  const Mockup = PERSONA_HERO_MOCKUP[persona.slug];
  const index = personaIndex[persona.slug];

  return (
    <section
      className="relative overflow-hidden bg-[#FAFAF7] pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32"
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
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${persona.accent}33, transparent)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial header marker */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <span
            className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400"
          >
            {index}
          </span>
          <span className="h-px w-8 bg-slate-300" />
          <span
            className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: persona.accent }}
          >
            {persona.hero.tag}
          </span>
        </motion.div>

        <div className="mt-8 grid gap-12 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          {/* Text */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-[2rem] leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-[2.5rem] sm:leading-[1] md:text-5xl lg:text-[3.75rem] lg:leading-[0.98] xl:text-[4.25rem]"
            >
              {before}
              <span className="relative inline-block">
                <span className="relative z-10">{mid.trim()}</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 -z-0 h-[0.35em]"
                  style={{ backgroundColor: `${persona.accent}40` }}
                />
              </span>
              {after.startsWith(" ") ? after : ` ${after}`}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg lg:text-[1.125rem]"
            >
              {persona.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 sm:w-auto sm:text-base"
                style={{
                  backgroundColor: persona.accent,
                  boxShadow: `0 14px 24px -14px ${persona.accent}99`,
                }}
              >
                {persona.hero.ctaPrimary}
                <Icons.arrowRight className="size-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 sm:w-auto sm:text-base"
              >
                {persona.hero.ctaSecondary}
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-7 flex flex-col gap-y-1.5 text-[13px] text-slate-500 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1.5 sm:gap-y-2"
            >
              {persona.hero.trust.map((item, i) => (
                <li key={item} className="flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="size-1 shrink-0 rounded-full bg-slate-400 sm:hidden"
                    style={{ backgroundColor: persona.accent }}
                  />
                  {i > 0 && <span className="hidden text-slate-300 sm:inline">·</span>}
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.46 }}
              className="mt-8 border-t border-slate-200 pt-5"
            >
              <PersonaSwitcher
                accent={persona.accent}
                variant="hero"
                prefix="Vendo para"
              />
            </motion.div>
          </div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="relative"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-3xl blur-3xl"
              style={{ backgroundColor: `${persona.accent}10` }}
            />
            <Mockup accent={persona.accent} className="relative" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
