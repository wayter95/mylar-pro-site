"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppWindow } from "@/components/landing/AppWindow";

type Props = {
  accent: string;
  className?: string;
};

type StepStatus = "done" | "current" | "pending";

const rules: { day: string; channel: "email" | "whatsapp"; label: string; status: StepStatus }[] = [
  { day: "−3 dias", channel: "email", label: "Lembrete amigável", status: "done" },
  { day: "0 (vencto)", channel: "whatsapp", label: "Boleto + PIX disponíveis", status: "done" },
  { day: "+1 dia", channel: "whatsapp", label: "Aviso de atraso + acordo", status: "current" },
  { day: "+5 dias", channel: "email", label: "Notificação formal", status: "pending" },
  { day: "+10 dias", channel: "whatsapp", label: "Última chamada · escritório", status: "pending" },
];

const stats = [
  { label: "Taxa de quitação", value: "94%", trend: "+9pp" },
  { label: "Tempo médio", value: "1.8d", trend: "−3d" },
];

function ChannelIcon({ channel, color }: { channel: "email" | "whatsapp"; color: string }) {
  if (channel === "whatsapp") {
    return (
      <svg viewBox="0 0 16 16" fill={color} className="size-3.5">
        <path d="M8 1.6a6.4 6.4 0 00-5.5 9.7L1.6 14.4l3.2-.9A6.4 6.4 0 108 1.6zm3.7 9.1c-.2.4-.9.8-1.2.9-.3.1-.7.1-1.1 0-.3-.1-.7-.2-1.2-.4-2-.9-3.4-2.9-3.5-3-.1-.1-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.8.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.6 1.5c.1.1.1.3 0 .4l-.2.4-.2.2c-.1.1-.2.2-.1.4.1.2.5.8 1.1 1.3.7.6 1.3.8 1.5.9.2.1.3.1.4-.1l.5-.6c.1-.2.3-.1.4-.1.2.1 1.2.6 1.4.7.2.1.3.1.4.2.1.2.1.5-.1.9z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" className="size-3.5">
      <rect x="2" y="3.5" width="12" height="9" rx="1" />
      <path d="M2 5l6 4 6-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RealEstateBillingMockup({ accent, className = "" }: Props) {
  const reduce = useReducedMotion();

  return (
    <AppWindow dark={false} title="Régua de cobrança · Contrato #4821" className={className}>
      <div className="grid grid-cols-12 gap-px bg-slate-200/70">
        {/* Left: Boleto preview */}
        <div className="col-span-12 bg-white p-4 sm:col-span-5">
          <p className="text-[9px] font-medium tracking-wide text-slate-500 uppercase">
            Boleto · vencimento amanhã
          </p>
          <div className="mt-2 rounded-lg border border-slate-200 p-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <div
                  className="flex size-5 items-center justify-center rounded text-[8px] font-bold text-white"
                  style={{ backgroundColor: accent }}
                >
                  M
                </div>
                <span className="text-[10px] font-bold text-slate-900">Mylar Pro</span>
              </div>
              <span className="font-mono text-[8px] text-slate-400">04821</span>
            </div>
            <div className="mt-2">
              <p className="text-[9px] text-slate-500">Pagador</p>
              <p className="text-[10px] font-semibold text-slate-900">Ana Pereira</p>
            </div>
            <div className="mt-1.5">
              <p className="text-[9px] text-slate-500">Aluguel · jun/2026</p>
              <p className="text-[20px] font-bold text-slate-900">R$ 4.200,00</p>
            </div>

            {/* Barcode */}
            <div className="mt-2 flex h-6 items-end gap-px">
              {Array.from({ length: 60 }).map((_, i) => (
                <span
                  key={i}
                  className="bg-slate-900"
                  style={{
                    width: i % 3 === 0 ? "2px" : "1px",
                    height: `${60 + (i % 4) * 10}%`,
                    opacity: i % 7 === 0 ? 0.4 : 1,
                  }}
                />
              ))}
            </div>

            {/* PIX option */}
            <div className="mt-2.5 flex items-center justify-between rounded-md p-2" style={{ backgroundColor: `${accent}10` }}>
              <div>
                <p className="text-[9px] font-semibold text-slate-700">Pagar via PIX</p>
                <p className="text-[8px] text-slate-500">Instantâneo, sem taxa</p>
              </div>
              <div className="grid grid-cols-4 gap-px rounded-sm bg-white p-1 ring-1 ring-slate-200">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className="size-1"
                    style={{
                      backgroundColor: [0, 3, 5, 6, 9, 10, 12, 15].includes(i) ? accent : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Régua */}
        <div className="col-span-12 bg-slate-50/60 p-4 sm:col-span-7">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-900">Régua automatizada</p>
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
              style={{ backgroundColor: `${accent}1a`, color: accent }}
            >
              5 disparos
            </span>
          </div>

          <div className="mt-2.5 space-y-2">
            {rules.map((rule, i) => {
              const isDone = rule.status === "done";
              const isCurrent = rule.status === "current";
              return (
                <motion.div
                  key={rule.label}
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.06 * i }}
                  className="flex items-center gap-2"
                >
                  <span
                    className="flex size-6 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: isDone ? `${accent}` : isCurrent ? `${accent}22` : "#f1f5f9",
                    }}
                  >
                    {isDone ? (
                      <svg viewBox="0 0 12 12" fill="white" className="size-3">
                        <path
                          fillRule="evenodd"
                          d="M10.4 3.2L4.6 9 1.6 6l.8-.8 2.2 2.2 5-5z"
                        />
                      </svg>
                    ) : (
                      <ChannelIcon channel={rule.channel} color={isCurrent ? accent : "#94a3b8"} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[10px] font-semibold text-slate-900">
                        {rule.label}
                      </p>
                      <span className="shrink-0 font-mono text-[9px] text-slate-400">
                        {rule.day}
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-500 capitalize">{rule.channel}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="rounded-md border border-slate-200 bg-white p-2">
                <p className="text-[9px] font-medium text-slate-500 uppercase">{s.label}</p>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <p className="text-[14px] font-bold text-slate-900">{s.value}</p>
                  <span className="text-[9px] font-semibold text-emerald-600">{s.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}
