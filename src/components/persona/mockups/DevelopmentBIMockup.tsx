"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppWindow } from "@/components/landing/AppWindow";

type Props = {
  accent: string;
  className?: string;
};

const kpis = [
  { label: "VSO 12m", value: "63%", trend: "+8pp", positive: true },
  { label: "Velocidade", value: "4.2", unit: "u/sem", trend: "+12%", positive: true },
  { label: "Ticket médio", value: "R$ 1.18M", trend: "+5%", positive: true },
  { label: "Receita projetada", value: "R$ 142M", trend: "12m" },
];

const projects = [
  { name: "Aurora · Torre A", units: 36, sold: 28, vgv: "R$ 38M", color: "#0E2849" },
  { name: "Aurora · Torre B", units: 36, sold: 21, vgv: "R$ 26M", color: "#1E3A6E" },
  { name: "Marina Residence", units: 48, sold: 12, vgv: "R$ 19M", color: "#3B5DA0" },
  { name: "Park Lounge", units: 60, sold: 41, vgv: "R$ 58M", color: "#5B7BC0" },
];

const tipologyMix = [
  { label: "1 dorm", pct: 22, color: 0.3 },
  { label: "2 dorm", pct: 38, color: 0.55 },
  { label: "3 dorm", pct: 28, color: 0.8 },
  { label: "4+ dorm", pct: 12, color: 1 },
];

export function DevelopmentBIMockup({ accent, className = "" }: Props) {
  const reduce = useReducedMotion();
  const projection = [62, 71, 68, 78, 85, 92, 88, 95, 102, 108, 118, 142];

  return (
    <AppWindow dark={false} title="BI Executivo · Comitê Comercial" className={className}>
      <div className="bg-slate-50/60 p-3">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="rounded-lg border border-slate-200 bg-white p-2.5"
            >
              <p className="text-[8px] font-medium tracking-wide text-slate-500 uppercase">
                {kpi.label}
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <p className="text-[15px] font-bold text-slate-900">{kpi.value}</p>
                {kpi.unit && <p className="text-[9px] text-slate-500">{kpi.unit}</p>}
              </div>
              <p
                className={`mt-0.5 text-[8px] font-semibold ${
                  kpi.positive ? "text-emerald-600" : "text-slate-500"
                }`}
              >
                {kpi.trend}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chart + breakdown */}
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-5">
          {/* Projection chart */}
          <div className="rounded-lg border border-slate-200 bg-white p-3 sm:col-span-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-slate-900">
                  Receita realizada × projetada
                </p>
                <p className="text-[8px] text-slate-500">R$ milhões · 12 meses</p>
              </div>
              <div className="flex items-center gap-2 text-[8px]">
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="size-1.5 rounded-sm" style={{ backgroundColor: accent }} />
                  Realizado
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <span
                    className="size-1.5 rounded-sm border border-dashed"
                    style={{ borderColor: accent }}
                  />
                  Projetado
                </span>
              </div>
            </div>

            <div className="mt-3 flex h-[100px] items-end gap-1">
              {projection.map((v, i) => {
                const isRealized = i < 8;
                return (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { height: 0 }}
                    whileInView={{ height: `${(v / 150) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.04 * i }}
                    className="flex-1 rounded-t-sm"
                    style={{
                      backgroundColor: isRealized ? accent : `${accent}30`,
                      borderTop: isRealized ? undefined : `1px dashed ${accent}80`,
                    }}
                  />
                );
              })}
            </div>
            <div className="mt-1 flex justify-between text-[8px] text-slate-400">
              <span>Jan</span>
              <span>Hoje</span>
              <span>Dez</span>
            </div>
          </div>

          {/* Mix tipologias */}
          <div className="rounded-lg border border-slate-200 bg-white p-3 sm:col-span-2">
            <p className="text-[10px] font-semibold text-slate-900">Mix por tipologia</p>
            <p className="text-[8px] text-slate-500">Vendas últimos 90d</p>

            <div className="mt-3 space-y-2">
              {tipologyMix.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={reduce ? false : { opacity: 0, x: -4 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.06 * i }}
                >
                  <div className="flex items-baseline justify-between">
                    <p className="text-[9px] text-slate-600">{t.label}</p>
                    <p className="text-[10px] font-bold text-slate-900">{t.pct}%</p>
                  </div>
                  <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={reduce ? false : { width: 0 }}
                      whileInView={{ width: `${t.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.1 + 0.06 * i }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: accent, opacity: t.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="mt-2 rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-3 py-1.5">
            <p className="text-[10px] font-semibold text-slate-900">Portfólio consolidado</p>
            <span className="text-[8px] text-slate-500">4 empreendimentos · 180 unidades</span>
          </div>
          <div className="divide-y divide-slate-100">
            {projects.map((p, i) => {
              const pct = Math.round((p.sold / p.units) * 100);
              return (
                <motion.div
                  key={p.name}
                  initial={reduce ? false : { opacity: 0, x: -4 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.05 * i }}
                  className="flex items-center gap-3 px-3 py-1.5"
                >
                  <p className="min-w-0 flex-1 truncate text-[10px] font-semibold text-slate-900">
                    {p.name}
                  </p>
                  <div className="hidden w-[120px] sm:block">
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full"
                        style={{ width: `${pct}%`, backgroundColor: p.color }}
                      />
                    </div>
                  </div>
                  <p className="w-[60px] text-right text-[9px] font-semibold text-slate-700">
                    {p.sold}/{p.units}
                  </p>
                  <p className="w-[70px] text-right text-[10px] font-bold text-slate-900">
                    {p.vgv}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
