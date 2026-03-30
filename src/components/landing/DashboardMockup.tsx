"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppWindow } from "./AppWindow";

const sidebarItems = [
  { icon: "grid", active: true },
  { icon: "building" },
  { icon: "users" },
  { icon: "file" },
  { icon: "dollar" },
  { icon: "chart" },
];

const metrics = [
  { label: "Imóveis Ativos", value: "156", trend: "+12%", color: "text-emerald-400" },
  { label: "Leads Qualificados", value: "87", trend: "+23%", color: "text-emerald-400" },
  { label: "Visitas Agendadas", value: "34", trend: "+8%", color: "text-emerald-400" },
  { label: "Taxa de Conversão", value: "38%", trend: "+5%", color: "text-emerald-400" },
];

const chartBars = [65, 45, 78, 56, 89, 67, 92, 74, 83, 60, 95, 71];
const chartMonths = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function SidebarIcon({ type, active }: { type: string; active?: boolean }) {
  const cls = active
    ? "text-[#2facde]"
    : "text-slate-500 group-hover:text-slate-300";

  const icons: Record<string, React.ReactNode> = {
    grid: (
      <svg viewBox="0 0 18 18" fill="currentColor" className={`size-4 ${cls}`}>
        <rect x="1" y="1" width="7" height="7" rx="1.5" />
        <rect x="10" y="1" width="7" height="7" rx="1.5" />
        <rect x="1" y="10" width="7" height="7" rx="1.5" />
        <rect x="10" y="10" width="7" height="7" rx="1.5" />
      </svg>
    ),
    building: (
      <svg viewBox="0 0 18 18" fill="currentColor" className={`size-4 ${cls}`}>
        <path d="M3 2a1 1 0 011-1h10a1 1 0 011 1v15H3V2zm3 2h2v2H6V4zm4 0h2v2h-2V4zM6 8h2v2H6V8zm4 0h2v2h-2V8zm-2 5h2v4H8v-4z" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 18 18" fill="currentColor" className={`size-4 ${cls}`}>
        <circle cx="7" cy="5" r="3" />
        <path d="M1 16c0-3.3 2.7-6 6-6s6 2.7 6 6H1z" />
        <circle cx="13" cy="6" r="2.2" />
        <path d="M17 16c0-2.5-1.5-4.6-3.6-5.4.7-.4 1.5-.6 2.3-.6 2.5 0 4.3 2 4.3 4.5V16h-3z" opacity="0.5" />
      </svg>
    ),
    file: (
      <svg viewBox="0 0 18 18" fill="currentColor" className={`size-4 ${cls}`}>
        <path d="M4 1a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V6l-5-5H4zm6 0v4a1 1 0 001 1h4" />
        <path d="M6 9h6M6 12h4" opacity="0.5" />
      </svg>
    ),
    dollar: (
      <svg viewBox="0 0 18 18" fill="currentColor" className={`size-4 ${cls}`}>
        <circle cx="9" cy="9" r="8" opacity="0.15" />
        <path d="M9 3v1.5m0 9V15m-2.5-4.5c0 1.1 1.1 2 2.5 2s2.5-.9 2.5-2-1.1-2-2.5-2S6.5 7.4 6.5 6.5s1.1-2 2.5-2 2.5.9 2.5 2" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 18 18" fill="currentColor" className={`size-4 ${cls}`}>
        <rect x="1" y="10" width="3" height="7" rx="0.5" opacity="0.4" />
        <rect x="5.5" y="6" width="3" height="11" rx="0.5" opacity="0.6" />
        <rect x="10" y="3" width="3" height="14" rx="0.5" opacity="0.8" />
        <rect x="14.5" y="1" width="3" height="16" rx="0.5" />
      </svg>
    ),
  };

  return icons[type] || null;
}

export function DashboardMockup({ className = "" }: { className?: string }) {
  const shouldReduce = useReducedMotion();
  const dur = shouldReduce ? 0 : 0.5;

  return (
    <AppWindow title="app.mylarpro.com.br" className={className}>
      <div className="flex min-h-[320px] sm:min-h-[380px]">
        {/* Sidebar */}
        <div className="hidden w-12 shrink-0 border-r border-slate-800 bg-slate-900/80 sm:block">
          <div className="flex flex-col items-center gap-1 px-1.5 pt-3">
            {sidebarItems.map((item, i) => (
              <motion.div
                key={item.icon}
                className={`group flex size-8 cursor-default items-center justify-center rounded-lg transition ${
                  item.active
                    ? "bg-[#2facde]/15"
                    : "hover:bg-slate-800"
                }`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06, duration: dur }}
              >
                <SidebarIcon type={item.icon} active={item.active} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden p-3 sm:p-4">
          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 sm:p-3"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.08, duration: dur }}
              >
                <p className="text-[9px] font-medium text-slate-500 sm:text-[10px]">
                  {metric.label}
                </p>
                <p className="mt-1 text-lg font-bold text-white sm:text-xl">
                  {metric.value}
                </p>
                <span className={`text-[9px] font-semibold ${metric.color}`}>
                  {metric.trend}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Chart area */}
          <motion.div
            className="mt-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 sm:mt-4 sm:p-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: dur }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-white sm:text-xs">
                  Receita Mensal
                </p>
                <p className="text-[9px] text-slate-500">2026</p>
              </div>
              <div className="flex gap-3">
                <span className="flex items-center gap-1 text-[9px] text-slate-400">
                  <span className="size-1.5 rounded-full bg-[#2facde]" />
                  Faturado
                </span>
                <span className="flex items-center gap-1 text-[9px] text-slate-400">
                  <span className="size-1.5 rounded-full bg-[#2facde]/30" />
                  Anterior
                </span>
              </div>
            </div>
            <div className="flex items-end gap-[3px] sm:gap-1">
              {chartBars.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div className="relative flex w-full items-end justify-center gap-px">
                    <motion.div
                      className="w-full max-w-[14px] rounded-t-sm bg-[#2facde]/25"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h * 0.6}px` }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.8 + i * 0.04,
                        duration: shouldReduce ? 0 : 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    />
                    <motion.div
                      className="w-full max-w-[14px] rounded-t-sm bg-[#2facde]"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h * 0.85}px` }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.9 + i * 0.04,
                        duration: shouldReduce ? 0 : 0.7,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    />
                  </div>
                  <span className="text-[7px] text-slate-600 sm:text-[8px]">
                    {chartMonths[i]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom row */}
          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3">
            <motion.div
              className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 sm:p-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: dur }}
            >
              <p className="text-[10px] font-semibold text-white sm:text-xs">
                Pipeline Ativo
              </p>
              <div className="mt-2 space-y-1.5">
                {[
                  { label: "Qualificação", w: "72%", color: "bg-[#2facde]" },
                  { label: "Visita", w: "45%", color: "bg-amber-400" },
                  { label: "Proposta", w: "28%", color: "bg-emerald-400" },
                ].map((bar) => (
                  <div key={bar.label} className="flex items-center gap-2">
                    <span className="w-16 text-[8px] text-slate-500 sm:text-[9px]">
                      {bar.label}
                    </span>
                    <div className="h-1.5 flex-1 rounded-full bg-slate-800">
                      <motion.div
                        className={`h-full rounded-full ${bar.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: bar.w }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 1.4,
                          duration: shouldReduce ? 0 : 0.8,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 sm:p-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3, duration: dur }}
            >
              <p className="text-[10px] font-semibold text-white sm:text-xs">
                Atividade Recente
              </p>
              <div className="mt-2 space-y-2">
                {[
                  { text: "Contrato #412 assinado", time: "2min", dot: "bg-emerald-400" },
                  { text: "Lead via portal", time: "15min", dot: "bg-[#2facde]" },
                  { text: "Pagamento confirmado", time: "1h", dot: "bg-amber-400" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-2">
                    <span className={`mt-1 size-1.5 shrink-0 rounded-full ${item.dot}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[9px] text-slate-300 sm:text-[10px]">
                        {item.text}
                      </p>
                      <p className="text-[8px] text-slate-600">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
