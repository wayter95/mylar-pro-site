"use client";

import { AnimateIn } from "./AnimateIn";

type Props = {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
};

export function SectionHeader({
  badge,
  title,
  highlight,
  description,
  align = "center",
  dark = false,
  className = "",
}: Props) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";
  const titleColor = dark ? "text-white" : "text-slate-900";
  const descColor = dark ? "text-slate-300" : "text-slate-600";
  const badgeColor = dark
    ? "border-white/20 bg-white/10 text-white/90"
    : "border-(--mylar-blue)/20 bg-(--mylar-blue)/5 text-(--mylar-blue-dark)";

  return (
    <AnimateIn className={`max-w-3xl ${alignClass} ${className}`}>
      {badge && (
        <span
          className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase ${badgeColor}`}
        >
          <span className="size-1.5 animate-pulse rounded-full bg-current" />
          {badge}
        </span>
      )}
      <h2
        className={`${badge ? "mt-0" : ""} text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] ${titleColor}`}
      >
        {title}
        {highlight && (
          <>
            <br className="hidden sm:block" />{" "}
            <span className="bg-gradient-to-r from-(--mylar-blue-dark) to-(--mylar-blue) bg-clip-text text-transparent">
              {highlight}
            </span>
          </>
        )}
      </h2>
      {description && (
        <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${align === "center" ? "mx-auto" : ""} ${descColor}`}>
          {description}
        </p>
      )}
    </AnimateIn>
  );
}
