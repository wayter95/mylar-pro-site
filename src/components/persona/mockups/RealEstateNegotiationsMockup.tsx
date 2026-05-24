"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppWindow } from "@/components/landing/AppWindow";

type Props = {
  accent: string;
  className?: string;
};

type StageKey = "interest" | "visit" | "proposal" | "docs" | "signature";

const stages: { key: StageKey; label: string; count: number }[] = [
  { key: "interest", label: "Interesse", count: 12 },
  { key: "visit", label: "Visita", count: 7 },
  { key: "proposal", label: "Proposta", count: 4 },
  { key: "docs", label: "Documentação", count: 3 },
  { key: "signature", label: "Assinatura", count: 2 },
];

type Negotiation = {
  id: string;
  type: "Locação" | "Venda";
  tenant: { initials: string; name: string };
  property: string;
  value: string;
  stage: StageKey;
  stageLabel: string;
  daysOpen: number;
  agent: string;
  next: string;
  hot?: boolean;
};

const negotiations: Negotiation[] = [
  {
    id: "NEG-1042",
    type: "Locação",
    tenant: { initials: "AP", name: "Ana Pereira" },
    property: "Apt 3q · Vila Mariana",
    value: "R$ 4.200/mês",
    stage: "signature",
    stageLabel: "Assinatura",
    daysOpen: 14,
    agent: "Camila",
    next: "Aguardando assinatura do fiador",
    hot: true,
  },
  {
    id: "NEG-1041",
    type: "Venda",
    tenant: { initials: "MC", name: "Marcos Cardoso" },
    property: "Cobertura · Itaim Bibi",
    value: "R$ 2.4M",
    stage: "proposal",
    stageLabel: "Proposta",
    daysOpen: 6,
    agent: "Rafael",
    next: "Contraproposta enviada · resposta até 25/05",
    hot: true,
  },
  {
    id: "NEG-1039",
    type: "Locação",
    tenant: { initials: "JS", name: "Júlia Santos" },
    property: "Studio · Pinheiros",
    value: "R$ 2.450/mês",
    stage: "docs",
    stageLabel: "Documentação",
    daysOpen: 9,
    agent: "Camila",
    next: "Aguardando comprovante de renda",
  },
  {
    id: "NEG-1037",
    type: "Locação",
    tenant: { initials: "FL", name: "Fernando Lima" },
    property: "Casa · Granja Viana",
    value: "R$ 8.800/mês",
    stage: "visit",
    stageLabel: "Visita",
    daysOpen: 3,
    agent: "Bruno",
    next: "Visita marcada · sábado 14h",
  },
];

const stageColors = (accent: string): Record<StageKey, { bg: string; text: string }> => ({
  interest: { bg: "#f1f5f9", text: "#475569" },
  visit: { bg: "#fef3c7", text: "#b45309" },
  proposal: { bg: `${accent}1f`, text: accent },
  docs: { bg: "#e0e7ff", text: "#4338ca" },
  signature: { bg: "#dcfce7", text: "#15803d" },
});

export function RealEstateNegotiationsMockup({ accent, className = "" }: Props) {
  const reduce = useReducedMotion();
  const colors = stageColors(accent);

  return (
    <AppWindow dark={false} title="Negociações · Imobiliária" className={className}>
      <div className="grid grid-cols-12 gap-px bg-slate-200/70">
        {/* Sidebar — hidden in mobile */}
        <aside className="hidden bg-white p-3 sm:block sm:col-span-3 md:col-span-2">
          <div className="space-y-2.5">
            <div
              className="flex h-7 items-center gap-2 rounded-md px-2 text-[10px] font-semibold"
              style={{ backgroundColor: `${accent}14`, color: accent }}
            >
              <span className="size-1.5 rounded-full" style={{ backgroundColor: accent }} />
              Negociações
            </div>
            {["Contratos", "Imóveis", "Clientes", "Cobranças", "Vistorias", "Chamados"].map(
              (label) => (
                <div
                  key={label}
                  className="flex h-7 items-center gap-2 rounded-md px-2 text-[10px] text-slate-500"
                >
                  <span className="size-1.5 rounded-full bg-slate-300" />
                  {label}
                </div>
              ),
            )}
          </div>
        </aside>

        {/* Main */}
        <div className="col-span-12 bg-slate-50/60 sm:col-span-9 md:col-span-10">
          {/* Top bar with funnel */}
          <div className="border-b border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-900">
                  28 negociações em andamento
                </p>
                <p className="text-[9px] text-slate-500">
                  Funil de vendas e locação · R$ 12.4M em pipeline
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                  +18% mês
                </span>
                <span
                  className="rounded-md px-2.5 py-1 text-[10px] font-semibold text-white"
                  style={{ backgroundColor: accent }}
                >
                  + Nova negociação
                </span>
              </div>
            </div>

            {/* Funnel bar */}
            <div className="mt-3 flex items-center gap-1.5">
              {stages.map((stage, i) => {
                const max = Math.max(...stages.map((s) => s.count));
                const width = 40 + (stage.count / max) * 110;
                const isCurrent = stage.key === "proposal";
                return (
                  <motion.div
                    key={stage.key}
                    initial={reduce ? false : { opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.05 * i }}
                    className="flex flex-col items-center gap-1"
                    style={{ width }}
                  >
                    <div
                      className="h-1.5 w-full rounded-full"
                      style={{
                        backgroundColor: isCurrent ? accent : `${accent}33`,
                      }}
                    />
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="truncate text-[9px] font-medium text-slate-600">
                        {stage.label}
                      </span>
                      <span
                        className="shrink-0 text-[9px] font-bold"
                        style={{ color: isCurrent ? accent : "#94a3b8" }}
                      >
                        {stage.count}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Negotiations list */}
          <div className="divide-y divide-slate-100">
            {negotiations.map((neg, i) => {
              const stageColor = colors[neg.stage];
              return (
                <motion.div
                  key={neg.id}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.06 * i }}
                  className="bg-white px-4 py-3 transition hover:bg-slate-50/60"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {neg.tenant.initials}
                    </div>

                    {/* Body */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono text-slate-400">{neg.id}</span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                            neg.type === "Venda"
                              ? "bg-violet-50 text-violet-700"
                              : "bg-sky-50 text-sky-700"
                          }`}
                        >
                          {neg.type}
                        </span>
                        {neg.hot && (
                          <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-semibold text-rose-700">
                            🔥 quente
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] font-semibold text-slate-900">
                        {neg.tenant.name}
                      </p>
                      <p className="text-[10px] text-slate-500">{neg.property}</p>

                      <div className="mt-1.5 flex items-center gap-2">
                        <svg
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="size-3 text-slate-400"
                        >
                          <circle cx="6" cy="6" r="5" />
                          <path d="M6 3v3l2 1.5" strokeLinecap="round" />
                        </svg>
                        <p className="text-[9px] text-slate-600">{neg.next}</p>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col items-end gap-1.5">
                      <p className="text-[11px] font-bold text-slate-900">{neg.value}</p>
                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
                        style={{
                          backgroundColor: stageColor.bg,
                          color: stageColor.text,
                        }}
                      >
                        {neg.stageLabel}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-slate-400">
                          {neg.daysOpen}d · {neg.agent}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
