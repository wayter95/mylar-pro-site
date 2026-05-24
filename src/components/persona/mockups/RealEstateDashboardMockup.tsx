"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppWindow } from "@/components/landing/AppWindow";

type Props = {
  accent: string;
  className?: string;
};

const kpis = [
  { label: "Faturado mês", value: "R$ 842k", trend: "+18%", positive: true },
  { label: "Contratos ativos", value: "247", trend: "+12", positive: true },
  { label: "Inadimplência", value: "3.4%", trend: "-1.2pp", positive: true },
];

const contracts = [
  { id: "#4821", tenant: "Ana Pereira", property: "Apt · Vila Olímpia", status: "Pago", statusColor: "emerald", value: "R$ 4.200" },
  { id: "#4820", tenant: "Carlos Silva", property: "Casa · Granja Viana", status: "Atraso 3d", statusColor: "amber", value: "R$ 8.800" },
  { id: "#4819", tenant: "Marina Costa", property: "Studio · Pinheiros", status: "Pago", statusColor: "emerald", value: "R$ 2.450" },
  { id: "#4818", tenant: "Pedro Lima", property: "Apt · Tatuapé", status: "Aguardando", statusColor: "slate", value: "R$ 3.600" },
];

const statusStyles: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  slate: "bg-slate-100 text-slate-600",
};

export function RealEstateDashboardMockup({ accent, className = "" }: Props) {
  const reduce = useReducedMotion();
  const chartBars = [42, 55, 48, 67, 71, 65, 78, 82, 75, 88, 92, 96];

  return (
    <AppWindow dark={false} title="Dashboard · Imobiliária" className={className}>
      <div className="grid grid-cols-12 gap-px bg-slate-200/70">
        {/* Sidebar — hidden in mobile */}
        <aside className="hidden bg-white p-3 sm:block sm:col-span-3 md:col-span-2">
          <div className="space-y-2.5">
            <div
              className="flex h-7 items-center gap-2 rounded-md px-2 text-[10px] font-semibold"
              style={{ backgroundColor: `${accent}14`, color: accent }}
            >
              <span className="size-1.5 rounded-full" style={{ backgroundColor: accent }} />
              Dashboard
            </div>
            {["Contratos", "Cobranças", "Vistorias", "Chamados", "Financeiro"].map((label) => (
              <div
                key={label}
                className="flex h-7 items-center gap-2 rounded-md px-2 text-[10px] text-slate-500"
              >
                <span className="size-1.5 rounded-full bg-slate-300" />
                {label}
              </div>
            ))}
          </div>
        </aside>

        {/* Main */}
        <div className="col-span-12 bg-slate-50/60 p-3 sm:col-span-9 md:col-span-10">
          {/* KPIs */}
          <div className="grid grid-cols-3 gap-2">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="rounded-lg border border-slate-200 bg-white p-2.5"
              >
                <p className="text-[9px] font-medium tracking-wide text-slate-500 uppercase">
                  {kpi.label}
                </p>
                <p className="mt-1 text-[15px] font-bold text-slate-900">{kpi.value}</p>
                <p
                  className={`mt-0.5 text-[9px] font-semibold ${
                    kpi.positive ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {kpi.trend} vs mês anterior
                </p>
              </motion.div>
            ))}
          </div>

          {/* Chart + table */}
          <div className="mt-2 grid grid-cols-5 gap-2">
            {/* Chart */}
            <div className="col-span-2 rounded-lg border border-slate-200 bg-white p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold text-slate-700">Receita 12m</p>
                <span className="text-[9px] text-slate-400">R$</span>
              </div>
              <div className="mt-2 flex h-[88px] items-end gap-1">
                {chartBars.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.04 * i }}
                    className="flex-1 rounded-t-sm"
                    style={{ backgroundColor: i >= 9 ? accent : `${accent}33` }}
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-between text-[8px] text-slate-400">
                <span>Jan</span>
                <span>Dez</span>
              </div>
            </div>

            {/* Table */}
            <div className="col-span-3 rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 px-2.5 py-1.5">
                <p className="text-[10px] font-semibold text-slate-700">Cobranças do dia</p>
                <span className="text-[9px] text-slate-400">{contracts.length}</span>
              </div>
              <div className="divide-y divide-slate-100">
                {contracts.map((row, i) => (
                  <motion.div
                    key={row.id}
                    initial={reduce ? false : { opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.05 * i }}
                    className="flex items-center gap-2 px-2.5 py-1.5"
                  >
                    <span className="text-[9px] font-mono text-slate-400">{row.id}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-semibold text-slate-900">
                        {row.tenant}
                      </p>
                      <p className="truncate text-[9px] text-slate-500">{row.property}</p>
                    </div>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${statusStyles[row.statusColor]}`}
                    >
                      {row.status}
                    </span>
                    <span className="w-[60px] text-right text-[10px] font-bold text-slate-900">
                      {row.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
