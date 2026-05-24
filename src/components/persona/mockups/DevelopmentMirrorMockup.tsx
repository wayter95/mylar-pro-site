"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppWindow } from "@/components/landing/AppWindow";

type Props = {
  accent: string;
  className?: string;
};

type UnitStatus = "sold" | "reserved" | "available" | "blocked";

const floors: { floor: string; units: UnitStatus[] }[] = [
  { floor: "14", units: ["available", "reserved", "available", "sold"] },
  { floor: "13", units: ["sold", "available", "sold", "reserved"] },
  { floor: "12", units: ["sold", "sold", "reserved", "available"] },
  { floor: "11", units: ["sold", "available", "sold", "sold"] },
  { floor: "10", units: ["reserved", "sold", "available", "sold"] },
  { floor: "09", units: ["sold", "sold", "sold", "available"] },
  { floor: "08", units: ["available", "sold", "reserved", "sold"] },
  { floor: "07", units: ["sold", "blocked", "sold", "sold"] },
  { floor: "06", units: ["sold", "sold", "available", "sold"] },
];

const legend: { label: string; status: UnitStatus }[] = [
  { label: "Vendido", status: "sold" },
  { label: "Reservado", status: "reserved" },
  { label: "Disponível", status: "available" },
  { label: "Bloqueado", status: "blocked" },
];

export function DevelopmentMirrorMockup({ accent, className = "" }: Props) {
  const reduce = useReducedMotion();

  const statusStyle = (s: UnitStatus): React.CSSProperties => {
    switch (s) {
      case "sold":
        return { backgroundColor: accent, color: "white" };
      case "reserved":
        return { backgroundColor: `${accent}33`, color: accent };
      case "available":
        return { backgroundColor: "white", color: "#475569", border: "1px solid #e2e8f0" };
      case "blocked":
        return { backgroundColor: "#f1f5f9", color: "#94a3b8" };
    }
  };

  const dotStyle = (s: UnitStatus): React.CSSProperties => {
    switch (s) {
      case "sold":
        return { backgroundColor: accent };
      case "reserved":
        return { backgroundColor: `${accent}55` };
      case "available":
        return { backgroundColor: "#e2e8f0" };
      case "blocked":
        return { backgroundColor: "#cbd5e1" };
    }
  };

  const totalSold = floors.flatMap((f) => f.units).filter((u) => u === "sold").length;
  const total = floors.flatMap((f) => f.units).length;
  const pct = Math.round((totalSold / total) * 100);

  return (
    <AppWindow dark={false} title="Residencial Aurora · Torre B" className={className}>
      <div className="grid grid-cols-12 gap-px bg-slate-200/70">
        {/* Sidebar — collapses in mobile */}
        <aside className="col-span-12 bg-white p-3 sm:col-span-4 md:col-span-3">
          <p className="text-[9px] font-medium tracking-wide text-slate-500 uppercase">
            Empreendimento
          </p>
          <p className="mt-1 text-[13px] font-bold text-slate-900">Aurora</p>
          <p className="text-[9px] text-slate-500">Torre B · 36 unidades</p>

          <div className="mt-3 rounded-lg border border-slate-200 p-2.5">
            <div className="flex items-baseline justify-between">
              <p className="text-[9px] font-medium text-slate-500 uppercase">VSO</p>
              <p className="text-[14px] font-bold" style={{ color: accent }}>
                {pct}%
              </p>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={reduce ? false : { width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full"
                style={{ backgroundColor: accent }}
              />
            </div>
            <p className="mt-1 text-[9px] text-slate-500">
              {totalSold} de {total} unidades
            </p>
          </div>

          <div className="mt-3 space-y-1.5">
            {legend.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className="size-2 rounded-sm" style={dotStyle(item.status)} />
                <span className="text-[9px] text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Espelho */}
        <div className="col-span-12 bg-slate-50/60 p-3 sm:col-span-8 md:col-span-9">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-900">Espelho de vendas</p>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
              3 vendas hoje
            </span>
          </div>

          <div className="mt-2.5 space-y-1.5">
            {floors.map((row, ri) => (
              <div key={row.floor} className="flex items-center gap-2">
                <span className="w-5 text-[9px] font-mono text-slate-400">{row.floor}</span>
                <div className="grid flex-1 grid-cols-4 gap-1.5">
                  {row.units.map((unit, ui) => (
                    <motion.div
                      key={`${row.floor}-${ui}`}
                      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.03 * (ri * 4 + ui) }}
                      className="flex h-7 items-center justify-center rounded-md text-[9px] font-semibold"
                      style={statusStyle(unit)}
                    >
                      {String.fromCharCode(65 + ui)}
                      {row.floor}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
