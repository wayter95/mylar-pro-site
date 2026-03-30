"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppWindow } from "./AppWindow";

const columns = [
  {
    title: "Lead Novo",
    color: "bg-blue-500",
    count: 3,
    cards: [
      { name: "Ana Oliveira", property: "Apt 3q Moema", value: "R$ 450.000", avatar: "AO" },
      { name: "Carlos Mendes", property: "Cobertura Itaim", value: "R$ 1.850.000", avatar: "CM" },
    ],
  },
  {
    title: "Qualificação",
    color: "bg-amber-500",
    count: 2,
    cards: [
      { name: "Roberto Dias", property: "Casa Vila Madalena", value: "R$ 1.200.000", avatar: "RD" },
    ],
  },
  {
    title: "Visita Agendada",
    color: "bg-purple-500",
    count: 4,
    cards: [
      { name: "Juliana Santos", property: "Studio Pinheiros", value: "R$ 320.000", avatar: "JS" },
      { name: "Fernando Lima", property: "Apt 2q Brooklin", value: "R$ 680.000", avatar: "FL" },
    ],
  },
  {
    title: "Proposta",
    color: "bg-emerald-500",
    count: 1,
    cards: [
      { name: "Maria Costa", property: "Sala Comercial Faria Lima", value: "R$ 180.000", avatar: "MC" },
    ],
  },
];

function AvatarCircle({ initials, index }: { initials: string; index: number }) {
  const colors = [
    "bg-blue-500/20 text-blue-300",
    "bg-emerald-500/20 text-emerald-300",
    "bg-purple-500/20 text-purple-300",
    "bg-amber-500/20 text-amber-300",
    "bg-rose-500/20 text-rose-300",
  ];
  return (
    <span className={`flex size-6 items-center justify-center rounded-full text-[8px] font-bold ${colors[index % colors.length]}`}>
      {initials}
    </span>
  );
}

export function KanbanMockup({ className = "" }: { className?: string }) {
  const shouldReduce = useReducedMotion();
  const dur = shouldReduce ? 0 : 0.5;

  return (
    <AppWindow title="CRM — Pipeline de Vendas" className={className}>
      <div className="p-3 sm:p-4">
        {/* Toolbar */}
        <motion.div
          className="mb-3 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: dur }}
        >
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-slate-800 px-2.5 py-1 text-[10px] font-medium text-slate-300">
              Vendas
            </div>
            <div className="rounded-md bg-slate-800/40 px-2.5 py-1 text-[10px] text-slate-500">
              Locações
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md bg-slate-800/50 px-2 py-1 text-[9px] text-slate-500">
              <svg viewBox="0 0 14 14" fill="currentColor" className="size-2.5">
                <circle cx="7" cy="7" r="6" opacity="0.3" />
                <path d="M7 3v4l2.5 1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
              Filtros
            </div>
            <div className="size-5 rounded-md bg-[#2facde]/20 flex items-center justify-center">
              <svg viewBox="0 0 14 14" fill="currentColor" className="size-2.5 text-[#2facde]">
                <path d="M7 1v12M1 7h12" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Kanban columns */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {columns.map((col, colIdx) => (
            <motion.div
              key={col.title}
              className="min-h-[200px] rounded-lg bg-slate-800/30 p-2"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + colIdx * 0.1, duration: dur }}
            >
              {/* Column header */}
              <div className="mb-2 flex items-center gap-1.5">
                <span className={`size-2 rounded-full ${col.color}`} />
                <span className="text-[9px] font-semibold text-slate-300 sm:text-[10px]">
                  {col.title}
                </span>
                <span className="ml-auto rounded bg-slate-700/80 px-1.5 py-0.5 text-[8px] text-slate-500">
                  {col.count}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {col.cards.map((card, cardIdx) => (
                  <motion.div
                    key={card.name}
                    className="rounded-md border border-slate-700/50 bg-slate-900/80 p-2 transition-colors hover:border-slate-600"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.6 + colIdx * 0.1 + cardIdx * 0.08,
                      duration: dur,
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <AvatarCircle initials={card.avatar} index={colIdx + cardIdx} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[9px] font-semibold text-slate-200 sm:text-[10px]">
                          {card.name}
                        </p>
                        <p className="truncate text-[8px] text-slate-500 sm:text-[9px]">
                          {card.property}
                        </p>
                      </div>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-[9px] font-medium text-emerald-400/80">
                        {card.value}
                      </span>
                      <div className="flex -space-x-0.5">
                        <span className="size-3 rounded-full border border-slate-800 bg-slate-700" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}
