"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AnimateIn, AnimateInItem, AnimateInStagger } from "./AnimateIn";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    title: "Lead Unificado",
    description: "Captacao automatica sem digitar de novo.",
    statusDetail:
      "Leads de portais, site e campanhas entram na base unica, sem planilhas.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <circle cx="14" cy="14" r="11" fill="currentColor" opacity="0.1" />
        <path d="M7 14l4-6 3 4 4-5 3 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21" cy="14" r="3" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Omnichannel",
    description: "WhatsApp nativo sem limites.",
    statusDetail:
      "Atendimento e historico no mesmo CRM: sem integracoes frageis nem custo extra.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <path d="M14 24c5.5 0 10-4.5 10-10S19.5 4 14 4 4 8.5 4 14c0 2 .6 3.9 1.6 5.4L4 24l4.6-1.6c1.5 1 3.4 1.6 5.4 1.6z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 13h8M10 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Fechamento",
    description: "Assinatura digital sem taxas extras.",
    statusDetail:
      "Contrato com assinatura nativa: sem surpresa de terceiros nem cobranca por envio.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <rect x="5" y="3" width="18" height="22" rx="2" fill="currentColor" opacity="0.1" />
        <path d="M5 3h18a2 2 0 012 2v18a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 18c1.5-2 3-5 4.5-5s2.5 3 4 3 2-4 3.5-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Conciliacao",
    description: "Adeus a conferencia manual.",
    statusDetail:
      "Cobrancas, baixas e conciliacao acompanham o fluxo real — sem conferencia linha a linha.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <rect x="3" y="6" width="22" height="16" rx="2" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 11h22" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 16l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Repasse",
    description: "Dinheiro na conta da imobiliaria.",
    statusDetail:
      "Repasse automatico ao proprietario com demonstrativo. Caixa visivel em tempo real.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <circle cx="14" cy="14" r="11" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 8v12M10 12l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 20h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

/* Coin particle config */
const COINS = [
  { x: -18, delay: 0, size: 7, dur: 1.6 },
  { x: 6, delay: 0.2, size: 5, dur: 1.4 },
  { x: 18, delay: 0.35, size: 6, dur: 1.5 },
  { x: -8, delay: 0.5, size: 4, dur: 1.3 },
  { x: 14, delay: 0.15, size: 5, dur: 1.7 },
  { x: -14, delay: 0.4, size: 6, dur: 1.4 },
];

const SPARKLES = [0, 60, 120, 180, 240, 300];

export function DashboardPreview() {
  const shouldReduceMotion = useReducedMotion();
  const [activePhase, setActivePhase] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const previousPhase = useRef(0);

  const totalPhases = steps.length;
  const finalIndex = totalPhases - 1;
  const isFinal = activePhase === finalIndex;
  const currentStep = steps[activePhase];

  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;

    const intervalMs = isFinal ? 3500 : 2200;
    const timer = setTimeout(() => {
      setActivePhase((current) => (current + 1) % totalPhases);
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [activePhase, isPaused, shouldReduceMotion, totalPhases, isFinal]);

  useEffect(() => {
    if (!shouldReduceMotion && previousPhase.current !== finalIndex && activePhase === finalIndex) {
      setBurstKey((k) => k + 1);
    }
    previousPhase.current = activePhase;
  }, [activePhase, finalIndex, shouldReduceMotion]);

  return (
    <section className="border-t border-(--mylar-border) bg-(--mylar-surface) py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Workflow Anti-Caos"
          title="A Solucao para o"
          highlight="Fluxo Fragmentado."
          description="Nao aceite mais sistemas que fingem integracao. Um ciclo perfeito, centralizado e transparente."
        />

        <div
          className="mt-12 lg:mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimateInStagger
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
            stagger={0.06}
          >
            {steps.map((step, index) => {
              const isLast = index === finalIndex;
              const isActive = index === activePhase;
              const isPassed = index < activePhase;
              const isFinalActive = isLast && isActive;
              const connectorProgress = isPassed ? "100%" : isActive ? "55%" : "0%";

              return (
                <AnimateInItem key={step.title} className="relative text-center">
                  {/* Connector line */}
                  {!isLast && (
                    <span className="absolute top-8 left-[calc(50%+2.25rem)] hidden h-[2px] w-[calc(100%-3rem)] overflow-hidden rounded-full bg-slate-200 lg:block">
                      {/* Green flash on connector before final */}
                      {index === finalIndex - 1 && !shouldReduceMotion && (
                        <motion.span
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/0 via-emerald-400/80 to-emerald-400/0"
                          initial={false}
                          animate={{
                            opacity: isFinal ? [0, 1, 0.5, 1, 0] : 0,
                          }}
                          transition={{
                            duration: isFinal ? 1.2 : 0.2,
                            ease: "easeInOut",
                            repeat: isFinal ? 1 : 0,
                          }}
                        />
                      )}
                      <motion.span
                        className="block h-full rounded-full bg-gradient-to-r from-(--mylar-blue-dark) to-(--mylar-blue)"
                        initial={false}
                        animate={{ width: connectorProgress }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : isPassed ? 0.35 : 1.2,
                          ease: "easeInOut",
                        }}
                      />
                    </span>
                  )}

                  <motion.button
                    type="button"
                    className="relative mx-auto flex w-full max-w-[200px] cursor-pointer flex-col items-center rounded-xl px-2 py-2 text-center outline-none"
                    onClick={() => setActivePhase(index)}
                    aria-label={`Ativar etapa ${step.title}`}
                    aria-current={isActive ? "step" : undefined}
                    whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                  >
                    {/* Floating coins for final step */}
                    {isLast && !shouldReduceMotion && (
                      <div className="pointer-events-none absolute top-0 left-1/2 hidden h-20 w-16 -translate-x-1/2 lg:block">
                        {COINS.map((coin, ci) => (
                          <motion.span
                            key={ci}
                            className="absolute rounded-full shadow-sm"
                            style={{
                              width: coin.size,
                              height: coin.size,
                              left: `calc(50% + ${coin.x}px)`,
                              bottom: 0,
                              background: "linear-gradient(135deg, #f7c948, #f59e0b)",
                              boxShadow: "0 1px 4px rgba(245,158,11,0.4)",
                            }}
                            initial={false}
                            animate={
                              isFinalActive
                                ? {
                                    y: [0, -50 - ci * 6],
                                    opacity: [0, 1, 1, 0],
                                    scale: [0.6, 1, 1, 0.7],
                                  }
                                : { y: 0, opacity: 0, scale: 0.6 }
                            }
                            transition={
                              isFinalActive
                                ? {
                                    duration: coin.dur,
                                    delay: coin.delay,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                  }
                                : { duration: 0.2 }
                            }
                          />
                        ))}

                        {/* Sparkle burst on arrival */}
                        <AnimatePresence>
                          {burstKey > 0 && (
                            <motion.div
                              key={`burst-${burstKey}`}
                              className="absolute bottom-6 left-1/2"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 1.6] }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                            >
                              {SPARKLES.map((angle) => (
                                <motion.span
                                  key={angle}
                                  className="absolute block h-[2.5px] w-[12px] rounded-full bg-amber-400"
                                  style={{
                                    transform: `rotate(${angle}deg) translateX(8px)`,
                                    transformOrigin: "left center",
                                  }}
                                  initial={{ opacity: 0.9, scaleX: 0.8 }}
                                  animate={{ opacity: 0, scaleX: 1.6, translateX: 14 }}
                                  transition={{ duration: 0.6, delay: angle * 0.0005 }}
                                />
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    <motion.div
                      className={[
                        "flex size-16 items-center justify-center rounded-2xl border-2 transition-colors",
                        isFinalActive
                          ? "border-emerald-400 bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                          : isActive
                            ? "border-[#2facde] bg-[#2facde] text-white shadow-lg shadow-[#2facde]/20"
                            : isPassed
                              ? "border-[#2facde]/30 bg-[#2facde]/10 text-[#2facde]"
                              : "border-slate-200 bg-slate-100 text-slate-400",
                      ].join(" ")}
                      initial={false}
                      animate={
                        shouldReduceMotion
                          ? {}
                          : isFinalActive
                            ? { scale: [1, 1.1, 1] }
                            : isActive
                              ? { scale: [1, 1.06, 1] }
                              : { scale: 1 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : isFinalActive
                            ? { duration: 1.2, ease: "easeInOut", repeat: Infinity }
                            : isActive
                              ? { duration: 1.5, ease: "easeInOut", repeat: Infinity }
                              : { duration: 0.3 }
                      }
                    >
                      {/* Show checkmark on final active */}
                      {isFinalActive ? (
                        <svg viewBox="0 0 28 28" fill="none" className="size-7">
                          <circle cx="14" cy="14" r="11" fill="currentColor" opacity="0.15" />
                          <motion.path
                            d="M8.5 14.5l3.5 3.5 7.5-8"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                          />
                        </svg>
                      ) : (
                        step.icon
                      )}
                    </motion.div>

                    <h3
                      className={`mt-4 text-base font-bold ${
                        isFinalActive
                          ? "text-emerald-600"
                          : isActive
                            ? "text-slate-900"
                            : "text-slate-600"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-1 text-sm leading-snug ${
                        isFinalActive
                          ? "font-medium text-emerald-500"
                          : isActive
                            ? "font-medium text-[#2facde]"
                            : "text-slate-500"
                      }`}
                    >
                      {step.description}
                    </p>
                  </motion.button>
                </AnimateInItem>
              );
            })}
          </AnimateInStagger>
        </div>

        {/* Status box */}
        <AnimateIn delay={0.15} className="mt-10 flex justify-center">
          <motion.div
            className={[
              "w-full max-w-2xl rounded-2xl border px-6 py-5 text-center",
              isFinal
                ? "border-emerald-300/40 bg-emerald-50/60"
                : "border-slate-200 bg-slate-50",
            ].join(" ")}
            initial={false}
            animate={
              shouldReduceMotion
                ? {}
                : isFinal
                  ? { scale: [1, 1.02, 1] }
                  : { scale: 1 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : isFinal
                  ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.25 }
            }
          >
            <AnimatePresence mode="wait">
              {isFinal ? (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      className="flex size-6 items-center justify-center rounded-full bg-emerald-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.1 }}
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="size-3.5 text-white">
                        <path d="M4 8.5l2.5 2.5L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-emerald-600">
                      Repasse concluido
                    </p>
                  </div>

                  {/* Animated deposit */}
                  <div className="mt-3 flex items-baseline justify-center gap-1">
                    <span className="text-sm text-emerald-500">R$</span>
                    <motion.span
                      className="text-3xl font-extrabold tracking-tight text-emerald-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      36.480
                    </motion.span>
                    <motion.span
                      className="text-sm font-semibold text-emerald-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      ,00
                    </motion.span>
                  </div>

                  <motion.p
                    className="mt-2 text-sm text-emerald-600/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Depositado na conta da imobiliaria
                  </motion.p>

                  {/* Mini receipt lines */}
                  <motion.div
                    className="mx-auto mt-3 flex max-w-xs justify-center gap-4 text-[10px] text-emerald-500/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className="flex items-center gap-1">
                      <svg viewBox="0 0 12 12" fill="currentColor" className="size-2.5">
                        <circle cx="6" cy="6" r="5" />
                      </svg>
                      12 faturas pagas
                    </span>
                    <span className="flex items-center gap-1">
                      <svg viewBox="0 0 12 12" fill="currentColor" className="size-2.5">
                        <circle cx="6" cy="6" r="5" />
                      </svg>
                      3 proprietarios
                    </span>
                    <span className="flex items-center gap-1">
                      <svg viewBox="0 0 12 12" fill="currentColor" className="size-2.5">
                        <circle cx="6" cy="6" r="5" />
                      </svg>
                      Demonstrativo PDF
                    </span>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="normal"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-slate-400">
                    Etapa atual
                  </p>
                  <p className="mt-1.5 text-lg font-bold text-slate-900">
                    {currentStep.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {currentStep.statusDetail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimateIn>
      </div>
    </section>
  );
}
