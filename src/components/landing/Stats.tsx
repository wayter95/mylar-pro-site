"use client";

import { AnimateIn, AnimateInStagger, AnimateInItem } from "./AnimateIn";

const benefits = [
  {
    title: "Menos burocracia",
    description: "Contratos assinados digitalmente, sem papel e sem atrasos.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Cobranças organizadas",
    description: "Boleto e PIX integrados, repasse automático. Controle total do financeiro.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Tudo em um só lugar",
    description: "CRM, imóveis, contratos e financeiro na mesma plataforma.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: "Seus dados protegidos",
    description: "Cada imobiliária com informações isoladas e seguras.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export function Stats() {
  return (
    <section className="border-t border-slate-200 bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn className="mb-10 text-center sm:mb-16">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            O que você ganha com a plataforma
          </h2>
          <p className="mt-2 text-slate-600">
            Benefícios reais para o dia a dia da sua imobiliária
          </p>
        </AnimateIn>
        <AnimateInStagger className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4" stagger={0.1}>
          {benefits.map((item, i) => (
            <AnimateInItem key={i}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 text-center transition hover:border-[#37B6D6]/30 hover:bg-white hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#37B6D6] text-white">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            </AnimateInItem>
          ))}
        </AnimateInStagger>
      </div>
    </section>
  );
}
