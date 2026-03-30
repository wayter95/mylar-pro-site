"use client";

import { motion } from "framer-motion";
import { AnimateInStagger, AnimateInItem } from "./AnimateIn";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    number: "01",
    title: "Crie sua conta gratis",
    description:
      "Cadastro em segundos. Sem cartao de credito, sem compromisso. Acesso imediato a plataforma completa.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <circle cx="14" cy="10" r="5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 25c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 7l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Configure sua imobiliaria",
    description:
      "Onboarding guiado passo a passo. Importe seus imoveis, cadastre sua equipe e personalize seu portal.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <rect x="3" y="3" width="22" height="22" rx="4" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 9h4v4H9zM15 9h4v4h-4zM9 15h4v4H9z" fill="currentColor" opacity="0.3" />
        <path d="M15 15h4v4h-4z" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Explore no seu ritmo",
    description:
      "Use todos os modulos sem limite de tempo. Quando estiver pronto, escolha o plano ideal para escalar.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <path d="M14 3l3 6.5 7 1-5 5 1.2 7L14 19l-6.2 3.5L9 15.5 4 10.5l7-1L14 3z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function GettingStarted() {
  return (
    <section className="border-t border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Comece agora"
          title="Tres passos para sair"
          highlight="do caos operacional."
          description="Crie sua conta gratuita e explore a plataforma completa. Sem pressao, sem prazo."
        />

        {/* Steps */}
        <AnimateInStagger
          className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8"
          stagger={0.12}
        >
          {steps.map((step, i) => (
            <AnimateInItem key={step.number} className="flex">
              <motion.div
                className="group relative flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/50 p-7 transition-all hover:border-[#2facde]/30 hover:shadow-xl hover:shadow-[#2facde]/5"
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                {/* Step number */}
                <span className="mb-5 text-4xl font-extrabold tracking-tighter text-slate-100 transition-colors group-hover:text-[#2facde]/15">
                  {step.number}
                </span>

                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#2facde]/10 text-[#2facde] transition-all duration-300 group-hover:bg-[#2facde] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#2facde]/25">
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>

                {/* Connector arrow (between cards on desktop) */}
                {i < steps.length - 1 && (
                  <div className="pointer-events-none absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <svg viewBox="0 0 24 24" fill="none" className="size-8 text-slate-200">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            </AnimateInItem>
          ))}
        </AnimateInStagger>
      </div>
    </section>
  );
}
