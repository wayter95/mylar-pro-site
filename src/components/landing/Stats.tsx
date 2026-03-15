"use client";

import { AnimateIn, AnimateInStagger, AnimateInItem } from "./AnimateIn";

const benefits = [
  {
    title: "Menos burocracia",
    description: "Contratos assinados digitalmente, com validade jurídica e sem papel.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Cobranças organizadas",
    description: "Boleto e PIX integrados, repasse automático ao proprietário e controle total.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Tudo em um só lugar",
    description: "CRM, imóveis, contratos, cobranças e portal do cliente na mesma plataforma.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: "Pensado para o Brasil",
    description: "Boleto, PIX, CNPJ, IGP-M, IPCA. Construído do zero para o mercado brasileiro.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
