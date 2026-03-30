"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  title?: string;
  className?: string;
  dark?: boolean;
  perspective?: boolean;
};

export function AppWindow({
  children,
  title = "Mylar Pro",
  className = "",
  dark = true,
  perspective = false,
}: Props) {
  const chrome = dark
    ? "bg-slate-900 border-slate-700/60"
    : "bg-white border-slate-200";
  const dotBg = dark ? "bg-slate-700" : "bg-slate-300";
  const titleColor = dark ? "text-slate-400" : "text-slate-500";
  const bodyBg = dark ? "bg-slate-950/80" : "bg-slate-50";

  return (
    <motion.div
      className={`overflow-hidden rounded-2xl border shadow-2xl ${chrome} ${className}`}
      style={
        perspective
          ? {
              perspective: "1200px",
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Chrome bar */}
      <div
        className={`flex items-center gap-2 border-b px-4 py-2.5 ${dark ? "border-slate-800" : "border-slate-200"}`}
      >
        <div className="flex gap-1.5">
          <span className={`size-2.5 rounded-full ${dark ? "bg-red-400/70" : "bg-red-400"}`} />
          <span className={`size-2.5 rounded-full ${dark ? "bg-amber-400/70" : "bg-amber-400"}`} />
          <span className={`size-2.5 rounded-full ${dark ? "bg-emerald-400/70" : "bg-emerald-400"}`} />
        </div>
        <div className={`mx-auto flex items-center gap-2 rounded-md px-3 py-0.5 text-[11px] font-medium ${dark ? "bg-slate-800/60 text-slate-500" : "bg-slate-100 text-slate-400"}`}>
          <svg viewBox="0 0 16 16" className="size-3 opacity-50" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 1.2a5.8 5.8 0 110 11.6A5.8 5.8 0 018 2.2z" />
            <path d="M8 4.5a.6.6 0 01.6.6v2.3l1.7 1a.6.6 0 11-.6 1l-2-.8a.6.6 0 01-.3-.5v-3a.6.6 0 01.6-.6z" />
          </svg>
          {title}
        </div>
        <div className="w-[52px]" />
      </div>
      {/* Body */}
      <div className={bodyBg}>{children}</div>
    </motion.div>
  );
}
