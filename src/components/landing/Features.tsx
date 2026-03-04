"use client";

import { motion } from "framer-motion";
import { AnimateIn, AnimateInStagger, AnimateInItem } from "./AnimateIn";

export function Features() {
  const features = [
    {
      title: "Assinatura Eletrônica",
      description:
        "Assine contratos direto na plataforma — com validação de identidade, código de confirmação e captura de assinatura. Sem precisar de terceiros.",
      badge: "Diferencial",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ),
    },
    {
      title: "Gestão de Imóveis, Clientes e Agentes",
      description:
        "Cadastre imóveis, proprietários e inquilinos. Inclua corretores e vendedores como parceiros, com comissões e acessos controlados. Tudo em um só lugar.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Cobranças com Reajuste Automático",
      description:
        "Boleto e PIX integrados, com reajuste automático por IGPM ou IPCA. Controle vencimentos, repasses e receita extra por cobrança.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Portal Público de Imóveis",
      description:
        "Seu catálogo online com busca por mapa interativo. Cada imobiliária tem seu portal próprio, integrado ao CRM.",
      badge: "Diferencial",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: "CRM Completo com Kanban",
      description:
        "Pipeline visual de vendas e locações. Gerencie leads, agende visitas e acompanhe cada negociação do primeiro contato ao fechamento.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
          />
        </svg>
      ),
    },
    {
      title: "Notificações via WhatsApp",
      description:
        "Notificações de cobrança, lembretes de visita e atualizações — enviadas direto pelo WhatsApp, sem intervenção manual.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="funcionalidades" className="border-t border-slate-200 bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Funcionalidades que fazem a diferença
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Tecnologia moderna, diferenciais competitivos e tudo que sua
            imobiliária precisa em uma única plataforma.
          </p>
        </AnimateIn>
        <AnimateInStagger
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-16 lg:grid-cols-3"
          stagger={0.08}
        >
          {features.map((feature, i) => (
            <AnimateInItem key={i} className="flex">
              <div className="group h-full">
                <motion.div
                  className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-[background-color,border-color] duration-300 hover:border-white/40 hover:bg-[#37B6D6]"
                  initial={false}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(55, 182, 214, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)",
                    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Shine overlay */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  {feature.badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 transition-colors duration-300 group-hover:bg-white/25 group-hover:text-white">
                      {feature.badge}
                    </span>
                  )}
                  <div className="mb-4 size-12 shrink-0 rounded-xl bg-[#37B6D6] p-3 transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white">
                    <span className="flex size-full items-center justify-center text-white [&>svg]:text-current group-hover:text-[#37B6D6]">{feature.icon}</span>
                  </div>
                  <h3 className="shrink-0 text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 min-h-0 flex-1 text-slate-600 transition-colors duration-300 group-hover:text-white/90">
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
