"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppWindow } from "@/components/landing/AppWindow";

type Props = {
  accent: string;
  className?: string;
};

const campaigns = [
  {
    name: "Lançamento Aurora · Reels SP",
    spend: "R$ 18.4k",
    leads: 312,
    deals: 7,
    cac: "R$ 2.630",
    roas: "8.4x",
    status: "active",
  },
  {
    name: "Aurora · Carrossel Investidor",
    spend: "R$ 12.1k",
    leads: 184,
    deals: 4,
    cac: "R$ 3.025",
    roas: "6.1x",
    status: "active",
  },
  {
    name: "Retargeting Visitantes Stand",
    spend: "R$ 6.8k",
    leads: 92,
    deals: 3,
    cac: "R$ 2.267",
    roas: "9.2x",
    status: "active",
  },
  {
    name: "Reels Diretora · Bruta",
    spend: "R$ 4.2k",
    leads: 41,
    deals: 0,
    cac: "—",
    roas: "0",
    status: "paused",
  },
];

const funnel = [
  { label: "Impressões", value: "1.2M", pct: 100 },
  { label: "Leads", value: "629", pct: 72 },
  { label: "Visitas", value: "187", pct: 46 },
  { label: "Propostas", value: "38", pct: 24 },
  { label: "Vendas", value: "14", pct: 14 },
];

export function DevelopmentMetaAdsMockup({ accent, className = "" }: Props) {
  const reduce = useReducedMotion();

  return (
    <AppWindow dark={false} title="Meta Ads · Atribuição lead-to-deal" className={className}>
      <div className="grid grid-cols-12 gap-px bg-slate-200/70">
        {/* Funnel */}
        <div className="col-span-12 bg-white p-3 sm:col-span-5 md:col-span-4">
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 16 16" fill="#1877F2" className="size-3.5">
              <path d="M16 8a8 8 0 10-9.25 7.9V10.3H4.72V8h2.03V6.23c0-2 1.2-3.11 3.02-3.11.87 0 1.78.16 1.78.16v1.96H10.55c-1 0-1.3.62-1.3 1.25V8h2.22l-.35 2.3H9.25v5.6A8 8 0 0016 8z" />
            </svg>
            <p className="text-[10px] font-semibold text-slate-900">Funil Meta · 30 dias</p>
          </div>

          <div className="mt-3 space-y-1.5">
            {funnel.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 * i }}
              >
                <div className="flex items-baseline justify-between">
                  <p className="text-[9px] text-slate-600">{stage.label}</p>
                  <p className="text-[11px] font-bold text-slate-900">{stage.value}</p>
                </div>
                <div className="relative mt-0.5 h-3 overflow-hidden rounded-sm bg-slate-100">
                  <motion.div
                    initial={reduce ? false : { width: 0 }}
                    whileInView={{ width: `${stage.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 + 0.05 * i }}
                    className="h-full rounded-sm"
                    style={{ backgroundColor: accent, opacity: 0.5 + (stage.pct / 100) * 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-3 rounded-lg border border-slate-200 p-2">
            <p className="text-[9px] font-medium text-slate-500 uppercase">CAC blended</p>
            <p className="mt-0.5 text-[16px] font-bold" style={{ color: accent }}>
              R$ 2.945
            </p>
            <p className="text-[9px] font-semibold text-emerald-600">−38% vs último lançamento</p>
          </div>
        </div>

        {/* Campaigns */}
        <div className="col-span-12 bg-slate-50/60 sm:col-span-7 md:col-span-8">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
            <p className="text-[10px] font-semibold text-slate-900">Campanhas ativas</p>
            <span className="text-[9px] text-slate-500">R$ 41.5k este mês</span>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="grid grid-cols-12 gap-2 bg-slate-100/50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
              <div className="col-span-5">Campanha</div>
              <div className="col-span-2 text-right">Investido</div>
              <div className="col-span-1 text-right">Leads</div>
              <div className="col-span-1 text-right">Deals</div>
              <div className="col-span-2 text-right">CAC</div>
              <div className="col-span-1 text-right">ROAS</div>
            </div>
            {campaigns.map((c, i) => (
              <motion.div
                key={c.name}
                initial={reduce ? false : { opacity: 0, x: -4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 * i }}
                className="grid grid-cols-12 gap-2 bg-white px-3 py-2"
              >
                <div className="col-span-5 flex min-w-0 items-center gap-1.5">
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${
                      c.status === "active" ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  />
                  <p className="truncate text-[10px] font-semibold text-slate-900">{c.name}</p>
                </div>
                <p className="col-span-2 text-right text-[10px] text-slate-700">{c.spend}</p>
                <p className="col-span-1 text-right text-[10px] text-slate-700">{c.leads}</p>
                <p
                  className="col-span-1 text-right text-[10px] font-bold"
                  style={{ color: c.deals > 0 ? accent : "#cbd5e1" }}
                >
                  {c.deals}
                </p>
                <p className="col-span-2 text-right text-[10px] font-semibold text-slate-900">
                  {c.cac}
                </p>
                <p
                  className={`col-span-1 text-right text-[10px] font-bold ${
                    c.roas === "0" ? "text-slate-300" : "text-emerald-600"
                  }`}
                >
                  {c.roas}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
