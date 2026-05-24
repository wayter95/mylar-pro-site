"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppWindow } from "@/components/landing/AppWindow";

type Props = {
  accent: string;
  className?: string;
};

const columns = [
  {
    name: "Captação",
    count: 8,
    dot: "bg-slate-400",
    cards: [
      { initials: "AM", name: "Ana M.", info: "2q · Vila Mariana", value: "R$ 680k" },
      { initials: "RB", name: "Rodrigo B.", info: "Studio · Pinheiros", value: "R$ 420k" },
      { initials: "TS", name: "Thiago S.", info: "1q · República", value: "R$ 310k" },
    ],
  },
  {
    name: "Visita",
    count: 5,
    dot: "bg-amber-500",
    cards: [
      { initials: "JS", name: "Júlia S.", info: "Cobertura · Itaim", value: "R$ 1.9M", hot: true },
      { initials: "FL", name: "Fernando L.", info: "3q · Moema", value: "R$ 1.2M" },
      { initials: "PR", name: "Patrícia R.", info: "2q · Brooklin", value: "R$ 890k" },
    ],
  },
  {
    name: "Proposta",
    count: 2,
    dot: "bg-emerald-500",
    cards: [
      { initials: "MC", name: "Marina C.", info: "Casa · Granja Viana", value: "R$ 2.4M", hot: true },
      { initials: "EG", name: "Eduardo G.", info: "Apt 4q · Higienópolis", value: "R$ 3.1M" },
    ],
  },
];

function Avatar({ initials, accent }: { initials: string; accent: string }) {
  return (
    <span
      className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
      style={{ backgroundColor: accent }}
    >
      {initials}
    </span>
  );
}

export function BrokerPipelineMockup({ accent, className = "" }: Props) {
  const reduce = useReducedMotion();

  return (
    <AppWindow dark={false} title="Pipeline · Corretor" className={className}>
      <div className="grid grid-cols-12 gap-px bg-slate-200/70">
        {/* Sidebar — hidden in mobile */}
        <aside className="hidden bg-white p-3 sm:block sm:col-span-3 md:col-span-2">
          <div className="space-y-2.5">
            <div
              className="flex h-7 items-center gap-2 rounded-md px-2 text-[10px] font-semibold"
              style={{ backgroundColor: `${accent}14`, color: accent }}
            >
              <span className="size-1.5 rounded-full" style={{ backgroundColor: accent }} />
              Pipeline
            </div>
            {["Imóveis", "Inbox", "Agenda", "Contratos", "Catálogo", "Comissões", "Relatórios"].map(
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
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2.5">
            <div>
              <p className="text-[11px] font-semibold text-slate-900">15 negociações ativas</p>
              <p className="text-[9px] text-slate-500">Atualizado agora · R$ 7.6M em pipeline</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                +24% mês
              </span>
              <span
                className="rounded-md px-2.5 py-1 text-[10px] font-semibold text-white"
                style={{ backgroundColor: accent }}
              >
                + Novo
              </span>
            </div>
          </div>

          {/* Kanban */}
          <div className="grid grid-cols-3 gap-1.5 p-2.5 pb-4 sm:gap-2 sm:p-3 sm:pb-5">
            {columns.map((col, ci) => (
              <div key={col.name} className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`size-1.5 rounded-full ${col.dot}`} />
                    <span className="text-[10px] font-semibold text-slate-700">{col.name}</span>
                  </div>
                  <span className="text-[9px] font-medium text-slate-400">{col.count}</span>
                </div>
                {col.cards.map((card, idx) => (
                  <motion.div
                    key={card.name}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 * (ci * 2 + idx) }}
                    className="rounded-lg border border-slate-200 bg-white p-2.5"
                  >
                    <div className="flex items-start gap-2">
                      <Avatar initials={card.initials} accent={accent} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <p className="truncate text-[10px] font-semibold text-slate-900">
                            {card.name}
                          </p>
                          {card.hot && (
                            <span className="text-[9px]" title="Lead quente">
                              🔥
                            </span>
                          )}
                        </div>
                        <p className="truncate text-[9px] text-slate-500">{card.info}</p>
                      </div>
                    </div>
                    <p className="mt-1.5 text-[10px] font-bold text-slate-900">{card.value}</p>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp floating card */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute -bottom-8 right-4 hidden w-[220px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl lg:block lg:-bottom-10 lg:-right-8"
      >
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
            JS
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-slate-900">Júlia S.</p>
            <p className="text-[9px] text-emerald-600">● Online · WhatsApp</p>
          </div>
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="max-w-[80%] rounded-lg rounded-tl-sm bg-slate-100 px-2.5 py-1.5 text-[10px] text-slate-700">
            Adorei a cobertura! Posso visitar sábado?
          </div>
          <div
            className="ml-auto max-w-[75%] rounded-lg rounded-tr-sm px-2.5 py-1.5 text-[10px] text-white"
            style={{ backgroundColor: accent }}
          >
            Claro! 10h ou 14h?
          </div>
        </div>
      </motion.div>
    </AppWindow>
  );
}
