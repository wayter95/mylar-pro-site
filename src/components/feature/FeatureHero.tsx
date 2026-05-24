"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GooglePlayLogo } from "@/components/ui/GooglePlayLogo";
import { Icons } from "@/lib/icons";
import { REGISTER_URL } from "@/lib/features";
import type { FeatureContent } from "@/lib/features/types";

type Props = {
  feature: FeatureContent;
};

export function FeatureHero({ feature }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-[#FAFAF7] pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32"
      style={{ "--feature-accent": feature.accent } as CSSProperties}
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
            background: `linear-gradient(to right, transparent, ${feature.accent}33, transparent)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial marker */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-slate-300" />
          <span
            className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: feature.accent }}
          >
            {feature.eyebrow}
          </span>
        </motion.div>

        <div className="mt-8 max-w-4xl lg:mt-12">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-[2rem] leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-[2.5rem] sm:leading-[1] md:text-5xl lg:text-[3.75rem] lg:leading-[0.98] xl:text-[4.25rem]"
          >
            {feature.hero.title}
            {feature.hero.titleHighlight && (
              <span className="relative inline-block">
                <span className="relative z-10">{feature.hero.titleHighlight}</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 -z-0 h-[0.35em]"
                  style={{ backgroundColor: `${feature.accent}40` }}
                />
              </span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-lg lg:text-[1.125rem]"
          >
            {feature.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 sm:text-base"
              style={{
                backgroundColor: feature.accent,
                boxShadow: `0 14px 24px -14px ${feature.accent}99`,
              }}
            >
              {feature.hero.ctaPrimary}
              <Icons.arrowRight className="size-4" />
            </a>

            {/* External / secondary links */}
            {feature.externalLinks && feature.externalLinks.length > 0 ? (
              <ExternalLinks
                links={feature.externalLinks}
                accent={feature.accent}
              />
            ) : feature.hero.ctaSecondary ? (
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 sm:text-base"
              >
                {feature.hero.ctaSecondary}
              </Link>
            ) : null}
          </motion.div>

          {/* Trust */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="mt-7 flex flex-col gap-y-1.5 text-[13px] text-slate-500 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1.5 sm:gap-y-2"
          >
            {feature.hero.trust.map((item, i) => (
              <li key={item} className="flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="size-1 shrink-0 rounded-full sm:hidden"
                  style={{ backgroundColor: feature.accent }}
                />
                {i > 0 && <span className="hidden text-slate-300 sm:inline">·</span>}
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

function ExternalLinks({
  links,
  accent,
}: {
  links: FeatureContent["externalLinks"];
  accent: string;
}) {
  if (!links) return null;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 sm:py-3.5"
        >
          {link.kind === "app-store" && <AppStoreIcon />}
          {link.kind === "play-store" && <PlayStoreIcon />}
          {(link.kind === "external" || link.kind === "demo") && (
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
          )}
          {link.label}
        </a>
      ))}
    </div>
  );
}

function AppStoreIcon() {
  return <Icons.apple className="size-4 text-slate-700" />;
}

function PlayStoreIcon() {
  return <GooglePlayLogo className="size-4" />;
}
