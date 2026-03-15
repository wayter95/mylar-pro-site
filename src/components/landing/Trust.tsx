"use client";

import { AnimateIn, AnimateInStagger, AnimateInItem } from "./AnimateIn";

const highlights = [
  {
    label: "Dados isolados por empresa",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: "Conformidade com a LGPD",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    label: "Servidores no Brasil",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Tecnologia moderna e rápida",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export function Trust() {
  return (
    <section className="border-t border-[#37B6D6]/20 bg-[#0c4a6e] py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Construído com segurança e performance
          </h2>
          <p className="mt-2 text-slate-300">
            Infraestrutura pensada para proteger seus dados e acelerar sua operação
          </p>
        </AnimateIn>
        <AnimateInStagger
          className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4"
          stagger={0.1}
        >
          {highlights.map((item, i) => (
            <AnimateInItem key={i}>
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-[#37B6D6]">
                  {item.icon}
                </div>
                <p className="text-sm font-medium text-white sm:text-base">{item.label}</p>
              </div>
            </AnimateInItem>
          ))}
        </AnimateInStagger>
      </div>
    </section>
  );
}
