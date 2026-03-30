"use client";

import { motion } from "framer-motion";
import { AnimateInStagger, AnimateInItem } from "./AnimateIn";
import { SectionHeader } from "./SectionHeader";

const features = [
  {
    title: "CRM com Kanban",
    description:
      "Pipeline visual de vendas e locações. Gerencie leads, agende visitas e acompanhe cada negociação do primeiro contato ao fechamento.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <rect x="2" y="4" width="7" height="20" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="10.5" y="4" width="7" height="14" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="19" y="4" width="7" height="18" rx="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Assinatura Eletrônica",
    description:
      "Assine contratos direto na plataforma com validação de identidade, código de confirmação e validade jurídica (Lei 14.063).",
    badge: "Diferencial",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <path d="M6 22c2-3 4-8 6-8s3 5 5 5 3-12 5-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="7" r="4" fill="currentColor" opacity="0.2" />
        <path d="M20.5 7l1 1 2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Cobranças Integradas",
    description:
      "Boleto e PIX integrados com reajuste automático por IGP-M, IPCA ou índice fixo. Repasses e comissões por cobrança.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <rect x="2" y="7" width="24" height="16" rx="3" fill="currentColor" opacity="0.15" />
        <rect x="2" y="7" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12h24" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="19" r="2.5" fill="currentColor" opacity="0.4" />
        <circle cx="16.5" cy="19" r="2.5" fill="currentColor" opacity="0.25" />
      </svg>
    ),
  },
  {
    title: "Portal de Imóveis",
    description:
      "Catálogo online com busca por mapa interativo. Cada imobiliária tem seu portal próprio, integrado ao CRM e captação de leads.",
    badge: "Diferencial",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <circle cx="14" cy="12" r="10" fill="currentColor" opacity="0.1" />
        <path d="M14 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 018 8c0 4-3.5 7.5-8 12-4.5-4.5-8-8-8-12a8 8 0 018-8z" fill="currentColor" opacity="0.3" />
        <circle cx="14" cy="12" r="3" fill="currentColor" />
        <path d="M14 25l-1-1.2c-4-4.8-7-7.8-7-10.8a8 8 0 0116 0c0 3-3 6-7 10.8L14 25z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Gestão Completa",
    description:
      "Cadastre imóveis, proprietários e inquilinos. Inclua corretores como parceiros, com comissões e acessos controlados.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <rect x="4" y="2" width="20" height="24" rx="2" fill="currentColor" opacity="0.1" />
        <path d="M4 2h20a2 2 0 012 2v20a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 8h6M8 12h12M8 16h8M8 20h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <rect x="18" y="5" width="5" height="5" rx="1" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Portal do Cliente",
    description:
      "Inquilino e proprietário com acesso próprio para faturas, contratos, chamados e manutenção. Menos WhatsApp, mais autonomia.",
    badge: "Diferencial",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="size-7">
        <circle cx="14" cy="10" r="5" fill="currentColor" opacity="0.2" />
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 25c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 20l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section
      id="funcionalidades"
      className="relative border-t border-slate-100 bg-gradient-to-b from-slate-50/80 to-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Funcionalidades"
          title="Tudo que sua imobiliária precisa"
          highlight="em um só lugar."
          description="Tecnologia moderna, diferenciais competitivos e zero dependência de sistemas legados ou integrações frágeis."
        />

        <AnimateInStagger
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          stagger={0.08}
        >
          {features.map((feature, i) => (
            <AnimateInItem key={i} className="flex">
              <div className="group relative flex h-full w-full flex-col">
                <motion.div
                  className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-[border-color] duration-300 hover:border-[#2facde]/40"
                  whileHover={{
                    y: -6,
                    boxShadow:
                      "0 20px 40px -12px rgba(47, 172, 222, 0.15), 0 0 0 1px rgba(47, 172, 222, 0.1)",
                    transition: {
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {/* Shine overlay */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#2facde]/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  {feature.badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold tracking-wider text-amber-700 uppercase">
                      {feature.badge}
                    </span>
                  )}

                  <div className="mb-5 flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#2facde]/10 text-[#2facde] transition-all duration-300 group-hover:bg-[#2facde] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#2facde]/25">
                    {feature.icon}
                  </div>

                  <h3 className="shrink-0 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 min-h-0 flex-1 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </motion.div>
              </div>
            </AnimateInItem>
          ))}
        </AnimateInStagger>
      </div>
    </section>
  );
}
