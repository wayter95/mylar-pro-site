"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppWindow } from "./AppWindow";

const invoices = [
  { tenant: "Carlos Mendes", property: "Apt 302 - Ed. Aurora", value: "R$ 3.200,00", status: "Pago", statusColor: "bg-emerald-500/15 text-emerald-400" },
  { tenant: "Ana Oliveira", property: "Sala 1204 - WTC", value: "R$ 5.800,00", status: "Pendente", statusColor: "bg-amber-500/15 text-amber-400" },
  { tenant: "Roberto Dias", property: "Casa 15 - Cond. Verde", value: "R$ 4.500,00", status: "Pago", statusColor: "bg-emerald-500/15 text-emerald-400" },
  { tenant: "Juliana Santos", property: "Apt 701 - Ed. Sol", value: "R$ 2.100,00", status: "Vencido", statusColor: "bg-red-500/15 text-red-400" },
];

export function FinancialMockup({ className = "" }: { className?: string }) {
  const shouldReduce = useReducedMotion();
  const dur = shouldReduce ? 0 : 0.5;

  return (
    <AppWindow title="Financeiro — Cobranças" className={className}>
      <div className="p-3 sm:p-4">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { label: "Faturado", value: "R$ 48.600", icon: "up", color: "text-emerald-400" },
            { label: "Pendente", value: "R$ 12.300", icon: "clock", color: "text-amber-400" },
            { label: "Repasse", value: "R$ 36.200", icon: "send", color: "text-[#2facde]" },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: dur }}
            >
              <p className="text-[9px] text-slate-500">{card.label}</p>
              <p className={`mt-0.5 text-sm font-bold sm:text-base ${card.color}`}>
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Invoice table */}
        <motion.div
          className="mt-3 rounded-lg border border-slate-800 bg-slate-900/60 sm:mt-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: dur }}
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 border-b border-slate-800 px-3 py-2 text-[9px] font-semibold text-slate-500 uppercase tracking-wider sm:text-[10px]">
            <span>Inquilino</span>
            <span className="hidden sm:block">Imóvel</span>
            <span>Valor</span>
            <span>Status</span>
          </div>
          {/* Table rows */}
          {invoices.map((inv, i) => (
            <motion.div
              key={inv.tenant}
              className="grid grid-cols-[1fr_1fr_auto_auto] items-center gap-2 border-b border-slate-800/50 px-3 py-2 last:border-0"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.06, duration: dur }}
            >
              <span className="truncate text-[10px] font-medium text-slate-300 sm:text-[11px]">
                {inv.tenant}
              </span>
              <span className="hidden truncate text-[10px] text-slate-500 sm:block">
                {inv.property}
              </span>
              <span className="text-[10px] font-semibold text-white sm:text-[11px]">
                {inv.value}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[8px] font-semibold sm:text-[9px] ${inv.statusColor}`}>
                {inv.status}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AppWindow>
  );
}
