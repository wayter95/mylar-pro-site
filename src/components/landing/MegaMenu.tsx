"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icons } from "@/lib/icons";
import {
  badgeLabels,
  featureCategories,
  type MegaMenuItem,
  type NavBadge,
} from "@/lib/navigation";

export function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const [activeKey, setActiveKey] = useState(featureCategories[0].key);
  const active =
    featureCategories.find((c) => c.key === activeKey) ?? featureCategories[0];

  return (
    <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-slate-950/98 shadow-2xl backdrop-blur-xl">
      <div className="w-[230px] shrink-0 border-r border-white/5 p-3">
        <p className="px-3 pt-1 pb-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          Recursos
        </p>
        <ul role="menu" className="flex flex-col gap-0.5">
          {featureCategories.map((category) => {
            const CategoryIcon = Icons[category.icon];
            const isActive = category.key === active.key;
            return (
              <li key={category.key} role="none">
                <button
                  type="button"
                  role="menuitem"
                  onMouseEnter={() => setActiveKey(category.key)}
                  onFocus={() => setActiveKey(category.key)}
                  onClick={() => setActiveKey(category.key)}
                  aria-current={isActive}
                  className={[
                    "relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200",
                  ].join(" ")}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mega-category-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <CategoryIcon aria-hidden className="size-4 shrink-0 opacity-70" />
                  <span className="min-w-0 flex-1">{category.label}</span>
                  <Icons.chevronRight
                    aria-hidden
                    className={`size-3 shrink-0 transition-opacity ${isActive ? "opacity-60" : "opacity-0"}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="min-w-0 flex-1 p-5">
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16 }}
          className="flex flex-col gap-5"
        >
          {active.groups.map((group) => (
            <div key={group.title}>
              <p className="mb-2.5 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                {group.title}
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {group.items.map((item) => (
                  <MegaMenuLink
                    key={item.href}
                    item={item}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="w-[300px] shrink-0 border-l border-white/5 p-5">
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16 }}
          className="flex h-full flex-col"
        >
          <p
            className="text-[11px] font-semibold tracking-wider uppercase"
            style={{ color: active.feature.accent }}
          >
            {active.feature.eyebrow}
          </p>
          <p className="mt-2.5 text-[15px] leading-snug font-semibold text-white">
            {active.feature.title}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
            {active.feature.description}
          </p>
          <Link
            href={active.feature.ctaHref}
            onClick={onNavigate}
            className="group mt-4 inline-flex items-center gap-1.5 self-start rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-[13px] font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            {active.feature.ctaLabel}
            <Icons.arrowRight
              aria-hidden
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <div className="mt-auto border-t border-white/5 pt-3.5">
            <Link
              href="/features"
              onClick={onNavigate}
              className="flex items-center justify-between text-[12px] font-semibold text-slate-300 transition hover:text-white"
            >
              <span>Ver todas as funcionalidades</span>
              <span aria-hidden className="text-slate-500">
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MegaMenuLink({
  item,
  onNavigate,
}: {
  item: MegaMenuItem;
  onNavigate: () => void;
}) {
  const ItemIcon = Icons[item.icon];

  return (
    <Link
      href={item.href}
      role="menuitem"
      onClick={onNavigate}
      className="group flex gap-2.5 rounded-lg px-2.5 py-2 transition hover:bg-white/[0.06]"
    >
      <ItemIcon
        aria-hidden
        className="mt-0.5 size-4 shrink-0 text-slate-500 transition-colors group-hover:text-slate-300"
      />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="text-[13px] font-semibold text-white">
            {item.label}
          </span>
          {item.badge && <NavBadgePill badge={item.badge} />}
        </span>
        <span className="mt-0.5 block text-[12px] leading-snug text-slate-400">
          {item.description}
        </span>
      </span>
    </Link>
  );
}

function NavBadgePill({ badge }: { badge: NavBadge }) {
  const styles: Record<NavBadge, string> = {
    novo: "border-[#2facde]/30 bg-[#2facde]/10 text-[#5ac4e6]",
    popular: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  };

  return (
    <span
      className={`rounded-full border px-1.5 py-px text-[10px] leading-tight font-semibold ${styles[badge]}`}
    >
      {badgeLabels[badge]}
    </span>
  );
}
