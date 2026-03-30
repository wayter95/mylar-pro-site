"use client";

import { AnimateInStagger, AnimateInItem } from "./AnimateIn";
import { SectionHeader } from "./SectionHeader";

const highlights = [
  {
    label: "Dados isolados por empresa",
    description: "Multi-tenant com isolamento total entre organizacoes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Conformidade LGPD",
    description: "Privacidade e consentimento desde a arquitetura",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <rect x="3" y="11" width="18" height="10" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Servidores no Brasil",
    description: "Baixa latencia e conformidade com legislacao local",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Stack moderna e rapida",
    description: "NestJS, React, PostgreSQL e infraestrutura cloud",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function Trust() {
  return (
    <section className="relative overflow-hidden border-t border-[#2facde]/10 bg-slate-950 py-16 sm:py-20">
      {/* Subtle gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/3 h-[300px] w-[400px] rounded-full bg-[#2facde]/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[200px] w-[300px] rounded-full bg-indigo-500/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Construido com seguranca"
          highlight="e performance."
          description="Infraestrutura pensada para proteger seus dados e acelerar sua operacao."
          dark
        />

        <AnimateInStagger
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {highlights.map((item) => (
            <AnimateInItem key={item.label}>
              <div className="group flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all hover:border-[#2facde]/20 hover:bg-white/[0.06]">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-[#2facde]/10 text-[#2facde] transition-all group-hover:bg-[#2facde]/20 group-hover:scale-110">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="mt-1.5 text-sm text-slate-400">{item.description}</p>
                </div>
              </div>
            </AnimateInItem>
          ))}
        </AnimateInStagger>
      </div>
    </section>
  );
}
