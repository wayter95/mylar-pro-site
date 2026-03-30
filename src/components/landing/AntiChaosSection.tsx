"use client";

import { AnimateIn, AnimateInItem, AnimateInStagger } from "./AnimateIn";
import { SectionHeader } from "./SectionHeader";

const comparisons = [
  {
    pain: "Instalacao demorada",
    old: "Semanas de setup e treinamento",
    modern: "Setup em minutos",
    modernDesc: "Onboarding guiado. Sua equipe opera no mesmo dia.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" opacity="0.15" />
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    pain: "Interface confusa",
    old: "Menus infinitos e sobrecarga visual",
    modern: "Navegacao fluida",
    modernDesc: "Design limpo e intuitivo. Zero curva de aprendizado.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" opacity="0.15" />
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 9h18M9 9v12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    pain: "Dados espalhados",
    old: "5 sistemas, 5 logins, zero visao unificada",
    modern: "Inteligencia centralizada",
    modernDesc: "Uma fonte de verdade para leads, imoveis, contratos e financeiro.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.15" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const highlights = [
  {
    title: "CRM & WhatsApp Nativo",
    description:
      "Pare de alternar entre abas. Enquanto seus concorrentes colam links do WhatsApp no CRM, sua equipe fecha negocios em uma plataforma onde tudo ja esta conectado.",
    features: ["Multiatendimento integrado", "Fluxo visual de vendas com dados"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-7">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Automacao Financeira Real",
    description:
      "Administrar alugueis nao precisa ser pesadelo de conciliacao. Cobranca, baixa e repasse automatico que devolve seu tempo.",
    features: ["Conciliacao bancaria automatica", "Repasse com demonstrativo PDF"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-7">
        <rect x="2" y="6" width="20" height="14" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 14h4M6 17h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: "Roberto",
    role: "Gestor Operacional",
    quote:
      "O MyLar Pro me devolveu a sanidade. O que eu levava 2 dias para conferir, hoje faco em 15 minutos com precisao absoluta.",
  },
  {
    name: "Carla",
    role: "Lider Comercial",
    quote:
      "Vencemos a concorrencia pela velocidade. O lead entra e ja esta sendo atendido com historico completo.",
  },
  {
    name: "Daniel",
    role: "Proprietario",
    quote:
      "Finalmente uma imobiliaria que usa tecnologia seria. Transparencia total via portal, sem travas de repasse.",
  },
];

export function AntiChaosSection() {
  return (
    <div className="bg-white">
      {/* Comparison cards */}
      <section className="border-t border-(--mylar-border) py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Elimine o caos"
            title="Pare de pagar 5 boletos"
            highlight="para ter 5 problemas."
            description="O MyLar Pro substitui custo e desordem por uma plataforma que funciona de verdade."
          />

          <AnimateInStagger
            className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-3"
            stagger={0.08}
          >
            {comparisons.map((item) => (
              <AnimateInItem key={item.pain} className="flex">
                <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-(--mylar-blue)/30 hover:shadow-lg hover:shadow-(--mylar-blue)/5">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-(--mylar-blue)/10 text-(--mylar-blue-dark) transition-colors group-hover:bg-(--mylar-blue) group-hover:text-white">
                    {item.icon}
                  </div>
                  <p className="text-sm font-medium text-slate-400 line-through decoration-slate-300">
                    {item.old}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    {item.modern}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {item.modernDesc}
                  </p>
                </div>
              </AnimateInItem>
            ))}
          </AnimateInStagger>

          {/* Highlight cards */}
          <AnimateInStagger
            className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2"
            stagger={0.08}
          >
            {highlights.map((item) => (
              <AnimateInItem key={item.title} className="flex">
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 p-7">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-(--mylar-blue)/10 text-(--mylar-blue-dark)">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-slate-600">{item.description}</p>
                  <ul className="mt-4 space-y-2">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="size-4 shrink-0 text-(--mylar-blue)">
                          <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm3.44-8.56a.75.75 0 00-1.06-1.06L7 8.76 5.53 7.28a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateInItem>
            ))}
          </AnimateInStagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Quem deu o salto"
            highlight="nao volta atras."
            description="Da operacao travada para a era da inteligencia imobiliaria."
          />
          <AnimateInStagger
            className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3"
            stagger={0.08}
          >
            {testimonials.map((item) => (
              <AnimateInItem key={item.name} className="flex">
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="mb-4 size-8 text-(--mylar-blue)/20">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                  <p className="flex-1 text-sm leading-relaxed text-slate-700 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
              </AnimateInItem>
            ))}
          </AnimateInStagger>
        </div>
      </section>
    </div>
  );
}
