"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  accent: string;
  className?: string;
};

export function BrokerMobileMockup({ accent, className = "" }: Props) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-end justify-center gap-3 sm:gap-6">
        {/* Phone 1 — Property listing */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-[160px] -rotate-[6deg] sm:w-[200px] md:w-[230px]"
        >
          <div className="rounded-[2.2rem] border-[10px] border-slate-900 bg-white shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.4rem] bg-slate-50">
              {/* Notch */}
              <div className="absolute left-1/2 top-1 z-10 h-3 w-16 -translate-x-1/2 rounded-full bg-slate-900" />

              {/* Header */}
              <div className="flex items-center justify-between px-3 pt-5 pb-2">
                <span className="font-mono text-[9px] text-slate-400">9:41</span>
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-slate-300" />
                  <span className="text-[8px] text-slate-400">📶 5G</span>
                </div>
              </div>

              {/* App header */}
              <div className="border-b border-slate-100 px-3 py-2">
                <p className="text-[9px] font-medium text-slate-500">Imóveis · 47</p>
                <p className="text-[14px] font-bold text-slate-900">Minha carteira</p>
              </div>

              {/* Quick action */}
              <div className="px-3 py-2.5">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-[10px] font-bold text-white"
                  style={{ backgroundColor: accent }}
                >
                  <svg viewBox="0 0 12 12" fill="currentColor" className="size-3">
                    <path d="M2 6h8M6 2v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Cadastrar imóvel
                </button>
              </div>

              {/* Property cards */}
              <div className="space-y-2 px-3 pb-3">
                {[
                  { title: "Apt 3q Vila Mariana", price: "R$ 680k", views: 24 },
                  { title: "Studio Pinheiros", price: "R$ 420k", views: 18 },
                  { title: "Casa Granja", price: "R$ 1.2M", views: 41 },
                ].map((p, i) => (
                  <div
                    key={p.title}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2"
                  >
                    <div
                      className="size-9 shrink-0 rounded-md"
                      style={{ background: `linear-gradient(135deg, ${accent}40, ${accent}10)` }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-semibold text-slate-900">{p.title}</p>
                      <p className="text-[9px] text-slate-500">👁 {p.views} visualizações</p>
                    </div>
                    <p className="text-[10px] font-bold" style={{ color: accent }}>
                      {p.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Phone 2 — Visit checkin */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative w-[160px] rotate-[6deg] sm:w-[200px] md:w-[230px]"
        >
          <div className="rounded-[2.2rem] border-[10px] border-slate-900 bg-white shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.4rem] bg-slate-50">
              <div className="absolute left-1/2 top-1 z-10 h-3 w-16 -translate-x-1/2 rounded-full bg-slate-900" />

              <div className="flex items-center justify-between px-3 pt-5 pb-2">
                <span className="font-mono text-[9px] text-slate-400">9:41</span>
                <span className="text-[8px] text-slate-400">📶 5G</span>
              </div>

              <div className="border-b border-slate-100 px-3 py-2">
                <p className="text-[9px] font-medium text-slate-500">Visita agendada</p>
                <p className="text-[14px] font-bold text-slate-900">Júlia · 14h</p>
              </div>

              <div className="px-3 py-2.5">
                <div
                  className="rounded-lg p-2.5"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
                >
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-white/80">
                    Próximo
                  </p>
                  <p className="mt-0.5 text-[11px] font-bold text-white">
                    Cobertura · Itaim Bibi
                  </p>
                  <p className="text-[9px] text-white/80">R. Joaquim Floriano, 248</p>
                  <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-md bg-white py-1.5 text-[10px] font-bold text-slate-900">
                    <svg viewBox="0 0 12 12" fill="currentColor" className="size-3">
                      <path d="M6 1a4 4 0 00-4 4c0 3 4 6 4 6s4-3 4-6a4 4 0 00-4-4zm0 5.5A1.5 1.5 0 116 3.5a1.5 1.5 0 010 3z" />
                    </svg>
                    Navegar até o imóvel
                  </button>
                </div>

                <div className="mt-2.5 space-y-1.5">
                  <div className="flex items-center gap-2 rounded-md bg-white px-2 py-1.5 ring-1 ring-slate-200">
                    <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <svg viewBox="0 0 12 12" fill="currentColor" className="size-2.5">
                        <path
                          fillRule="evenodd"
                          d="M10.4 3.2L4.6 9 1.6 6l.8-.8 2.2 2.2 5-5z"
                        />
                      </svg>
                    </span>
                    <p className="text-[10px] text-slate-700">Check-in confirmado</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-white px-2 py-1.5 ring-1 ring-slate-200">
                    <span className="flex size-5 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      📸
                    </span>
                    <p className="text-[10px] text-slate-700">Fotos da visita</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-white px-2 py-1.5 ring-1 ring-slate-200">
                    <span className="flex size-5 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      ✍︎
                    </span>
                    <p className="text-[10px] text-slate-700">Assinatura digital</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating notification */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -bottom-4 left-1/2 hidden w-[260px] -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 shadow-xl sm:block"
      >
        <div className="flex items-start gap-2">
          <div
            className="flex size-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            M
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-900">Novo lead · 🔥</p>
              <span className="text-[8px] text-slate-400">agora</span>
            </div>
            <p className="text-[10px] text-slate-600">
              Marcos quer agendar visita no Apt Itaim
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
