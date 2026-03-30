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
    description: "Repasse automatico que funciona.",
    statusDetail:
      "Repasse ao proprietario e visibilidade do caixa no mesmo lugar: fim do giro entre sistemas.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <circle cx="14" cy="14" r="11" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 8v12M10 12l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 20h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function DashboardPreview() {
  const shouldReduceMotion = useReducedMotion();
  const [activePhase, setActivePhase] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const previousPhase = useRef(0);

  const totalPhases = steps.length;
  const finalIndex = totalPhases - 1;
  const currentStep = steps[activePhase];

  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;

    const intervalMs = activePhase === finalIndex ? 3000 : 2200;
    const timer = setTimeout(() => {
      setActivePhase((current) => (current + 1) % totalPhases);
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [activePhase, isPaused, shouldReduceMotion, totalPhases, finalIndex]);

  useEffect(() => {
    previousPhase.current = activePhase;
  }, [activePhase]);

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
          onMouseLeave={() => {
            setIsPaused(false);
          }}
        >
          <AnimateInStagger
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
            stagger={0.06}
          >
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              const isActive = index === activePhase;
              const isPassed = index < activePhase;
              const connectorProgress = isPassed
                ? "100%"
                : isActive
                  ? "55%"
                  : "0%";

              return (
                <AnimateInItem
                  key={step.title}
                  className="relative text-center"
                >
                  {/* Connector line */}
                  {!isLast && (
                    <span className="absolute top-8 left-[calc(50%+2.25rem)] hidden h-[2px] w-[calc(100%-3rem)] overflow-hidden rounded-full bg-slate-200 lg:block">
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
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { y: -2, scale: 1.02 }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.25,
                    }}
                  >
                    <motion.div
                      className={[
                        "flex size-16 items-center justify-center rounded-2xl border-2 transition-colors",
                        isActive
                          ? "border-[#2facde] bg-[#2facde] text-white shadow-lg shadow-[#2facde]/20"
                          : isPassed
                            ? "border-[#2facde]/30 bg-[#2facde]/10 text-[#2facde]"
                            : "border-slate-200 bg-slate-100 text-slate-400",
                      ].join(" ")}
                      initial={false}
                      animate={
                        shouldReduceMotion
                          ? {}
                          : isActive
                            ? {
                                scale: [1, 1.06, 1],
                              }
                            : { scale: 1 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : isActive
                            ? {
                                duration: 1.5,
                                ease: "easeInOut",
                                repeat: Infinity,
                              }
                            : { duration: 0.3 }
                      }
                    >
                      {step.icon}
                    </motion.div>

                    <h3
                      className={`mt-4 text-base font-bold ${isActive ? "text-slate-900" : "text-slate-600"}`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-1 text-sm leading-snug ${isActive ? "font-medium text-[#2facde]" : "text-slate-500"}`}
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
              activePhase === finalIndex
                ? "border-[#2facde]/30 bg-[#2facde]/5"
                : "border-slate-200 bg-slate-50",
            ].join(" ")}
            initial={false}
            animate={
              shouldReduceMotion
                ? {}
                : activePhase === finalIndex
                  ? { scale: [1, 1.02, 1] }
                  : { scale: 1 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : activePhase === finalIndex
                  ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.25 }
            }
          >
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-slate-400">
              {activePhase === finalIndex ? "Workflow concluido" : "Etapa atual"}
            </p>
            <p className="mt-1.5 text-lg font-bold text-slate-900">
              {currentStep.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {currentStep.statusDetail}
            </p>
          </motion.div>
        </AnimateIn>
      </div>
    </section>
  );
}
