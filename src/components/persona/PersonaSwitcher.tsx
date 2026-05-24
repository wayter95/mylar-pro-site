"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PERSONA_ORDER, personasRecord } from "@/lib/personas";

type Props = {
  accent: string;
  variant?: "hero" | "compact";
  prefix?: string;
};

export function PersonaSwitcher({ accent, variant = "hero", prefix }: Props) {
  const pathname = usePathname();
  const activeSlug = PERSONA_ORDER.find(
    (slug) => personasRecord[slug].href === pathname,
  );

  if (variant === "compact") {
    return (
      <CompactSwitcher accent={accent} activeSlug={activeSlug} prefix={prefix} />
    );
  }

  return <HeroSwitcher accent={accent} activeSlug={activeSlug} prefix={prefix} />;
}

function HeroSwitcher({
  accent,
  activeSlug,
  prefix,
}: {
  accent: string;
  activeSlug?: (typeof PERSONA_ORDER)[number];
  prefix?: string;
}) {
  return (
    <nav
      aria-label="Trocar de perfil"
      className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[13px] text-slate-500"
    >
      {prefix && (
        <span className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-400">
          {prefix}
        </span>
      )}
      {PERSONA_ORDER.map((slug, i) => {
        const persona = personasRecord[slug];
        const active = slug === activeSlug;

        return (
          <Fragment key={slug}>
            {i > 0 && <span className="text-slate-300">·</span>}
            {active ? (
              <span
                className="relative inline-flex items-center font-semibold"
                style={{ color: accent }}
              >
                {persona.shortLabel}
                <span
                  aria-hidden
                  className="ml-1.5 size-1.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
              </span>
            ) : (
              <Link
                href={persona.href}
                className="inline-flex items-center text-slate-500 transition hover:text-slate-900"
              >
                <span className="border-b border-dotted border-slate-300 pb-px hover:border-slate-500">
                  {persona.shortLabel}
                </span>
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}

function CompactSwitcher({
  accent,
  activeSlug,
  prefix,
}: {
  accent: string;
  activeSlug?: (typeof PERSONA_ORDER)[number];
  prefix?: string;
}) {
  const activePersona = activeSlug ? personasRecord[activeSlug] : undefined;
  const others = PERSONA_ORDER.filter((slug) => slug !== activeSlug);

  return (
    <p className="text-[13px] leading-relaxed text-slate-500">
      {prefix ? <span className="text-slate-400">{prefix} </span> : null}
      {activePersona && (
        <span className="font-semibold text-slate-700">{activePersona.shortLabel}</span>
      )}
      {others.length > 0 && (
        <>
          <span className="text-slate-400">. Ver planos para </span>
          {others.map((slug, i) => {
            const persona = personasRecord[slug];
            return (
              <Fragment key={slug}>
                {i > 0 && <span className="text-slate-300"> · </span>}
                <Link
                  href={persona.href}
                  className="font-semibold transition"
                  style={{ color: accent }}
                >
                  <span
                    className="border-b border-dotted pb-px"
                    style={{ borderColor: accent }}
                  >
                    {persona.shortLabel}
                  </span>
                </Link>
              </Fragment>
            );
          })}
        </>
      )}
    </p>
  );
}
