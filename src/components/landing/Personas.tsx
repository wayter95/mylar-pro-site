"use client";

import { motion } from "framer-motion";
import { AnimateInStagger, AnimateInItem } from "./AnimateIn";
import { SectionHeader } from "./SectionHeader";

const personas = [
  {
    title: "Imobiliárias",
    description:
      "Gestão completa da sua carteira de vendas e locações com CRM, contratos, cobranças e catálogo online — tudo integrado.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="size-8">
        <rect x="4" y="8" width="24" height="20" rx="2" fill="currentColor" opacity="0.15" />
        <path d="M4 8h24a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V10a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 15h4v4h-4zM18 15h4v4h-4zM10 22h4v6h-4z" fill="currentColor" opacity="0.3" />
        <path d="M16 2l-12 6h24l-12-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    features: ["CRM + Kanban", "Assinatura digital", "Portal de imóveis"],
    gradient: "from-blue-500/10 to-cyan-500/10",
    borderHover: "hover:border-blue-400/40",
  },
  {
    title: "Incorporadoras",
    description:
      "Controle de empreendimentos, vendas por unidade e CRM para equipes de lançamento em uma plataforma pensada para quem constrói.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="size-8">
        <rect x="6" y="4" width="10" height="24" rx="1" fill="currentColor" opacity="0.15" />
        <rect x="16" y="10" width="10" height="18" rx="1" fill="currentColor" opacity="0.1" />
        <path d="M6 4h10a1 1 0 011 1v22a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 10h10a1 1 0 011 1v16a1 1 0 01-1 1H16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 8h2v2H8zM12 8h2v2h-2zM8 13h2v2H8zM12 13h2v2h-2zM19 14h2v2h-2zM23 14h2v2h-2zM19 19h2v2h-2z" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    features: ["Gestão por unidade", "Comissões automáticas", "API de integração"],
    gradient: "from-purple-500/10 to-pink-500/10",
    borderHover: "hover:border-purple-400/40",
  },
  {
    title: "Corretores Autônomos",
    description:
      "CRM pessoal com pipeline visual, assinatura de contratos e portal de imóveis para captar clientes sem complexidade.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="size-8">
        <circle cx="16" cy="12" r="6" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 10l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    features: ["Pipeline pessoal", "Sem complexidade", "Catálogo próprio"],
    gradient: "from-emerald-500/10 to-teal-500/10",
    borderHover: "hover:border-emerald-400/40",
  },
];

export function Personas() {
  return (
    <section
      id="personas"
      className="border-t border-slate-200 bg-slate-50 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Para quem é"
          highlight="o Mylar Pro?"
          description="Uma plataforma que se adapta a cada perfil do mercado imobiliário."
        />

        <AnimateInStagger
          className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6"
          stagger={0.12}
        >
          {personas.map((p) => (
            <AnimateInItem key={p.title} className="flex">
              <motion.a
                href="/#funcionalidades"
                className={`group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all ${p.borderHover} hover:shadow-xl`}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <div className={`mb-5 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.gradient} text-slate-700`}>
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2facde] transition-all group-hover:gap-2.5">
                  Ver funcionalidades
                  <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
                  </svg>
                </span>
              </motion.a>
            </AnimateInItem>
          ))}
        </AnimateInStagger>
      </div>
    </section>
  );
}
